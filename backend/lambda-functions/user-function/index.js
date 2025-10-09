const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { query } = require("./database");

// Helper: Create response
function createResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": process.env.FRONTEND_URL || "*",
      "Access-Control-Allow-Credentials": "true",
    },
    body: JSON.stringify(body),
  };
}

// Helper: Extract route and method
function parseEvent(event) {
  const method = event.httpMethod;
  const path = event.path || event.resource;
  const body = event.body ? JSON.parse(event.body) : {};

  return { method, path, body };
}

// Main Lambda handler
exports.handler = async (event) => {
  console.log("Event:", JSON.stringify(event, null, 2));

  try {
    const { method, path, body } = parseEvent(event);

    // Route to appropriate handler
    if (path.includes("/signup") && method === "POST") {
      return await handleSignup(body);
    } else if (path.includes("/login") && method === "POST") {
      return await handleLogin(body);
    } else if (path.includes("/me") && method === "GET") {
      return await handleGetUser(event);
    } else {
      return createResponse(404, { message: "Not found" });
    }
  } catch (error) {
    console.error("Lambda error:", error);
    return createResponse(500, {
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Handler: User signup
async function handleSignup(body) {
  const { firstName, lastName, email, password } = body;

  // Validation
  if (!firstName || !lastName || !email || !password) {
    return createResponse(400, { message: "Required fields missing" });
  }

  try {
    // Check if user exists
    const existingUser = await query(
      "SELECT user_id FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return createResponse(409, { message: "Email already exists" });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert user
    const result = await query(
      "INSERT INTO users (first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING user_id, first_name, last_name, email",
      [firstName, lastName, email, passwordHash]
    );

    const user = result.rows[0];

    // Create JWT token
    const token = jwt.sign(
      { userId: user.user_id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return createResponse(201, {
      message: "User created successfully",
      user: {
        userId: user.user_id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return createResponse(500, {
      message: "Error creating user",
      error: error.message,
    });
  }
}

// Handler: User login
async function handleLogin(body) {
  const { email, password } = body;

  if (!email || !password) {
    return createResponse(400, { message: "Email and password required" });
  }

  try {
    // Get user
    const result = await query(
      "SELECT user_id, first_name, last_name, email, password_hash FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return createResponse(401, { message: "Invalid credentials" });
    }

    const user = result.rows[0];

    // Check password
    const isValid = await bcrypt.compare(password, user.password_hash);

    if (!isValid) {
      return createResponse(401, { message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user.user_id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return createResponse(200, {
      message: "Login successful",
      user: {
        userId: user.user_id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return createResponse(500, {
      message: "Error logging in",
      error: error.message,
    });
  }
}

// Handler: Get current user
async function handleGetUser(event) {
  // Extract token from Authorization header
  const authHeader =
    event.headers?.Authorization || event.headers?.authorization;

  if (!authHeader) {
    return createResponse(401, { message: "No token provided" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user
    const result = await query(
      "SELECT user_id, first_name, last_name, email FROM users WHERE user_id = $1",
      [decoded.userId]
    );

    if (result.rows.length === 0) {
      return createResponse(404, { message: "User not found" });
    }

    const user = result.rows[0];

    return createResponse(200, {
      user: {
        userId: user.user_id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Get user error:", error);
    return createResponse(401, { message: "Invalid token" });
  }
}
