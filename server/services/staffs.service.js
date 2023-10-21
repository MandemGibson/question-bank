const generateId = require("../util/generateId");
const PrismaService = require("./prisma.service");

const prisma = PrismaService

async function getAllStaff() {
    return await prisma.staff.findMany({
        select: { password: false },
        include: { class: true },
    })
}

async function getStaffById(id) {
    return await prisma.staff.findUnique({
        where: {
            id
        }
    })
}

async function createStaff(staffDetails) {
    const staff_id = await generateId(await getAllStaff(), 'staff')
    return await prisma.staff.create({
        data: {
            staff_id,
            ...staffDetails
        },
    });
}

async function updateStaff({ id, staffDetails }) {
    return await prisma.staff.update({
        where: {
            id,
        },
        data: staffDetails,
    });
}

async function deleteStaff(id) {
    return await prisma.staff.delete({
        where: {
            id,
        },
    });
}

module.exports = {
    getAllStaff,
    createStaff,
    updateStaff,
    deleteStaff,
    getStaffById,
}