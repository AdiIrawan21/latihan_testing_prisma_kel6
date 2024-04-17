const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  login: async (email, password) => {
    try {
      let users = await prisma.user.findUnique({ where: { email } });
      if (!users) throw "email belum terdaftar";

      if (users.password !== password) throw "invalid password";

      return users;
    } catch (error) {
      throw error;
    }
  },
};
