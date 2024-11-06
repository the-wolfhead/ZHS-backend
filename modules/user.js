const pool = require('../lib/db');

// Function to insert a new user (hashes the password before storing)
async function insertUser(userData) {
  const {
    first_name,
    last_name,
    age,
    date_of_birth,
    email,
    password, // Plain text password
    phone,
    allergies,
    disabilities,
    lifestyle_choices,
  } = userData;

  // Hash the password

  const queryText = `
    INSERT INTO "patient" (first_name, last_name, age, date_of_birth, email, password, phone, allergies, disabilities, lifestyle_choices) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
    RETURNING *;
  `;

  const values = [
    first_name,
    last_name,
    age,
    date_of_birth,
    email,
    hashedPassword,
    phone,
    allergies,
    disabilities,
    lifestyle_choices,
  ];

  const { rows } = await pool.query(queryText, values);
  return rows[0];
}

// Function to update an existing user
async function updateUser(userId, userData) {
  const {
    first_name,
    last_name,
    age,
    date_of_birth,
    email,
    password, // Plain text password
    phone,
    allergies,
    disabilities,
    lifestyle_choices,
  } = userData;

  // Hash the password

  const queryText = `
    UPDATE "patient" 
    SET 
      first_name = $1,
      last_name = $2,
      age = $3,
      date_of_birth = $4,
      email = $5,
      password = $6,
      phone = $7,
      allergies = $8,
      disabilities = $9,
      lifestyle_choices = $10
    WHERE user_id = $11
    RETURNING *;
  `;

  const values = [
    first_name,
    last_name,
    age,
    date_of_birth,
    email,
    hashedPassword,
    phone,
    allergies,
    disabilities,
    lifestyle_choices,
    userId,
  ];

  const { rows } = await pool.query(queryText, values);
  return rows[0];
}

// Function to get a user by ID
async function getUserById(userId) {
  const queryText = 'SELECT * FROM "patient" WHERE user_id = $1';
  const { rows } = await pool.query(queryText, [userId]);
  return rows[0];
}

// Function to get all users
async function getUsers() {
  try {
    const result = await pool.query('SELECT * FROM "patient"');
    return result.rows;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

// Function to get user by email and verify password
async function getUserByEmailAndPassword(email, password) {
  // Query to fetch the user by email
  const queryText = 'SELECT * FROM "patient" WHERE email = $1';
  const { rows } = await pool.query(queryText, [email]);

  // If no user is found, throw an error
  if (rows.length === 0) {
    throw new Error('User not found');
  }

  const user = rows[0];

  // Directly compare the provided password with the stored password (no bcrypt)
  if (password !== user.password) {
    throw new Error('Invalid password');
  }

  // Return the user data without the password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}


module.exports = {
  insertUser,
  updateUser,
  getUserById,
  getUsers,
  getUserByEmailAndPassword, // New function added
};
