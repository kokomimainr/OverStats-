const { User } = require("../db/models");

class UserServices {
  static getUser = async (email) => {
    const user = await User.findOne({ where: { email } });

    if (user) {
      return user.get();
    }
    return null;
  };

  static createUser = async ({ name, email, password, role }) => {
    let user;
    user = await User.findOne({ where: { email } });

    if (!user) {
      user = await User.create({ name, email, password, role });
      return user.get();
    }
    return null;
  };
}

module.exports = UserServices;