import User from "../models/User.js";

// =================================
// GET ALL USERS
// =================================

const getAllUsers = async () => {
  try {
    const users = await User.find(
      { role: "user" },
      {
        password: 0,
      }
    ).sort({
      createdAt: -1,
    });

    return users;

  } catch (error) {
    console.error(
      "Get all users service error:",
      error
    );

    throw error;
  }
};


// =================================
// GET USER BY ID
// =================================

const getUserById = async (userId) => {
  try {
    const user = await User.findOne(
      {
        _id: userId,
        role: "user",
      },
      {
        password: 0,
      }
    );

    return user;

  } catch (error) {
    console.error(
      "Get user by ID service error:",
      error
    );

    throw error;
  }
};


// =================================
// DELETE USER
// =================================

const deleteUser = async (userId) => {
  try {
    const user = await User.findOneAndDelete({
      _id: userId,
      role: "user",
    });

    return user;

  } catch (error) {
    console.error(
      "Delete user service error:",
      error
    );

    throw error;
  }
};


export {
  getAllUsers,
  getUserById,
  deleteUser,
};