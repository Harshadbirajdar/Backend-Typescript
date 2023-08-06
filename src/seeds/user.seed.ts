import bcrypt from "bcrypt";

const users = [
  {
    name: "Admin user",
    email: "admim@example.com",
    password: bcrypt.hashSync("123456", 8),
    verified: true,
  },
  {
    name: "User",
    email: "user@example.com",
    password: bcrypt.hashSync("123456", 8),
    verified: true,
  },
];

export default users;
