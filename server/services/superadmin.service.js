const PrismaService = require("./prisma.service");
const { createPassword, decryptPassword } = require("../util/password");

const prisma = PrismaService;

async function getSuperAdmins() {
  return await prisma.superAdmin.findMany({
    select: {
      id: true,
      username: true,
      role: true
    }
  });
}

async function getSuperAdmin(filter) {
  return await prisma.superAdmin.findFirst({
    where: filter
  });
}

async function loginSuperAdmin({ username, password }) {
  const superAdmin = await getSuperAdmin({ username });

  console.log(username, password);

  if (!superAdmin) return undefined;

  const validPassword = await decryptPassword(password, superAdmin.password);

  if (!validPassword) return undefined;

  return {
    id: superAdmin.id,
    username: superAdmin.username,
    role: superAdmin.role
  };
}

async function createSuperAdmin() {
  const superAdmin = await getSuperAdmins();

  if (superAdmin?.length !== 0) return;

  const password = await createPassword("superadmin");

  return await prisma.superAdmin.create({
    data: {
      username: "superadmin",
      password
    }
  });
}

module.exports = {
  getSuperAdmin,
  loginSuperAdmin,
  createSuperAdmin
};
