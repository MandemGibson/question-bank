const { getAllStaff, createStaff, updateStaff, deleteStaff } = require("../services/staffs.service");

async function getStaffHandler(req, res, next) {
    try {
        const staff = await getAllStaff()
        res.json(staff);
    } catch (error) {
        next(error);
    }
}

async function createStaffHandler(req, res, next) {
    try {
        const data = req.body;
        data.dob = new Date(data.dob)
        // if (data.profile_pic && data.profile_pic.data) {
        //     data.profile_pic = Buffer.from(data.profile_pic.data, "base64");
        // }
        const staff = await createStaff(data)
        res.status(201).json(staff);
    } catch (error) {
        next(error);
    }
}

async function updateStaffHandler(req, res, next) {
    try {
        const { id } = req.params;
        const data = req.body;
        data.dob = new Date(data.dob)

        // if (data.profile_pic && data.profile_pic.data) {
        //     data.profile_pic = Buffer.from(data.profile_pic.data, "base64");
        // }
        const staff = await updateStaff({ id, staffDetails: data })
        res.json(staff);
    } catch (error) {
        next(error);
    }
}

async function deleteStaffHandler(req, res, next) {
    try {
        const { id } = req.params;
        const staff = deleteStaff(id)
        res.json(staff);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getStaffHandler,
    createStaffHandler,
    updateStaffHandler,
    deleteStaffHandler,
}