import Role from "../enums/role.enum";

const roles = [
  { name: "Admin", rights: Object.values(Role), isDefaultRole: false },
  { name: "User", rights: [], isDefaultRole: true },
];

export default roles;
