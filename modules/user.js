

// Function to insert a new user
async function insertUser(userData) {
  const {
    first_name,
    last_name,
    age,
    date_of_birth,
    email,
    password,
    phone,
    allergies,
    disabilities,
    lifestyle_choices,
  } = userData;

  const queryText = `
    INSERT INTO "user" (first_name, last_name, age, date_of_birth, email, password, phone, allergies, disabilities, lifestyle_choices)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *;
  `;
  const values = [first_name, last_name, age, date_of_birth, email, password, phone, allergies, disabilities, lifestyle_choices];

  try {
    const result = await pool.query(queryText, values);
    console.log('User inserted:', result.rows[0]);
    return result.rows[0]; // Return the newly inserted record
  } catch (error) {
    console.error('Error inserting user:', error);
    throw error;
  }
}

// Function to update an existing user by user_id
async function updateUser(userId, updateData) {
  const {
    first_name,
    last_name,
    age,
    date_of_birth,
    email,
    password,
    phone,
    allergies,
    disabilities,
    lifestyle_choices,
  } = updateData;

  const queryText = `
    UPDATE "user"
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
  const values = [first_name, last_name, age, date_of_birth, email, password, phone, allergies, disabilities, lifestyle_choices, userId];

  try {
    const result = await pool.query(queryText, values);
    console.log('User updated:', result.rows[0]);
    return result.rows[0]; // Return the updated record
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

// Example usage for inserting a user
const newUser = {
  first_name: 'John',
  last_name: 'Doe',
  age: 30,
  date_of_birth: '1993-01-01',
  email: 'john.doe@example.com',
  password: 'securepassword',
  phone: '123-456-7890',
  allergies: ['peanuts', 'shellfish'],
  disabilities: ['none'],
  lifestyle_choices: ['non-smoker', 'occasional drinker'],
};

// Example usage for updating a user
const updatedUserData = {
  first_name: 'Jane',
  last_name: 'Doe',
  age: 29,
  date_of_birth: '1994-02-02',
  email: 'jane.doe@example.com',
  password: 'newsecurepassword',
  phone: '987-654-3210',
  allergies: ['none'],
  disabilities: ['none'],
  lifestyle_choices: ['smoker', 'non-drinker'],
};

// Insert a new user
insertUser(newUser)
  .then(user => console.log('Inserted User:', user))
  .catch(err => console.error(err));

// Update an existing user with user_id = 1
updateUser(1, updatedUserData)
  .then(user => console.log('Updated User:', user))
  .catch(err => console.error(err));
