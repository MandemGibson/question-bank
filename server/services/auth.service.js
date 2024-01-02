const { decryptPassword } = require("../util/password");
const { loginAdmin } = require("./admin.service");
const { loginSuperAdmin } = require("../services/superadmin.service");
const PrismaService = require("./prisma.service");
const { getStaffById } = require("./staffs.service");
const { getStudentById } = require("./students.service");

const prisma = PrismaService;

async function getAuth(userId) {
  return await prisma.auth.findUnique({
    where: {
      userId
    }
  });
}

async function updatePassword({ userId, password }) {
  return await prisma.auth.update({
    where: {
      userId
    },
    data: {
      password
    }
  })
}

async function loginUser({ userId, password }) {
  let auth =
    (await getAuth(userId)) ??
    (await loginAdmin({ username: userId, password })) ??
    (await loginSuperAdmin({ username: userId, password }));

  if (!auth) return undefined;

  if (auth.role) return auth;

  const isEqual = await decryptPassword(password, auth.password);

  if (!isEqual) return undefined;

  return (
    (await getStudentById({ student_id: auth.userId })) ??
    (await getStaffById({ staff_id: auth.userId })) ??
    undefined
  );
}

async function logoutUser(id) {
  return await prisma.sessions.update({
    where: {
      id
    },
    data: {
      valid: false
    }
  });
}

module.exports = {
  getAuth,
  loginUser,
  logoutUser,
  updatePassword
};
