import logger from "../logger";
import RoleModel from "../model/role.model";
import UserModel from "../model/user.model";
import roles from "../seeds/role.seed";
import users from "../seeds/user.seed";

const addUserAndRole = async () => {
  const usersData = await UserModel.findOne();

  if (!usersData) {
    const rolesData = await RoleModel.insertMany(roles);

    const adminRole = rolesData[0]._id;
    const userRole = rolesData[1]._id;

    const sampleUser = users.map((usr, index) => {
      return { ...usr, role: index === 0 ? adminRole : userRole };
    });

    await UserModel.insertMany(sampleUser);

    logger.info("Seed user and role added");
  }
};

export default { addUserAndRole };
