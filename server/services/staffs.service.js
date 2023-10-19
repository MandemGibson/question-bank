const generateId = require("../util/generateId");
const PrismaService = require("./prisma.service");

const prisma = PrismaService

async function getAllStaff() {
    return await prisma.staff.findMany({
        include: { class: true },
    })
}

async function createStaff(staffDetails) {
    const id = await generateId(await getAllStaff())
    return await prisma.staff.create({
        data: {
            id,
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
}