import { v4 as uuidv4 } from "uuid";

export default function UsersDao(db) {
  let { users = [] } = db;

  const createUser = (user) => {
    const newUser = { ...user, _id: uuidv4(), role: user.role || "STUDENT" };
    users = [...users, newUser];
    db.users = users;
    return newUser;
  };

  const findAllUsers = () => users;

  const findUserById = (userId) => {
    return users.find((user) => user._id === userId);
  };

  const findUserByUsername = (username) => {
    return users.find((user) => user.username === username);
  };

  const findUserByCredentials = (username, password) => {
    return users.find(
      (user) => user.username === username && user.password === password
    );
  };

  const updateUser = (userId, userUpdates) => {
    users = users.map((u) => (u._id === userId ? { ...u, ...userUpdates } : u));
    db.users = users;
    const updatedUser = users.find((u) => u._id === userId);
    return updatedUser;
  };

  const deleteUser = (userId) => {
    users = users.filter((u) => u._id !== userId);
    db.users = users;
  };

  return {
    createUser,
    findAllUsers,
    findUserById,
    findUserByUsername,
    findUserByCredentials,
    updateUser,
    deleteUser
  };
}