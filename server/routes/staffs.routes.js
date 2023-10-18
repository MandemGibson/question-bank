const staffRouter = require("express").Router();

staffRouter.get("/", async (req, res, next) => {
    try {
        const staff = await prisma.staff.findMany({
            include: { class: true },
        });
        res.json(staff);
    } catch (error) {
        next(error);
    }
});

staffRouter.post("/", async (req, res, next) => {
    try {
        const data = req.body;
        if (data.profile_pic && data.profile_pic.data) {
            data.profile_pic = Buffer.from(data.profile_pic.data, "base64");
        }
        const staff = await prisma.staff.create({
            data: data,
        });
        res.json(staff);
    } catch (error) {
        next(error);
    }
});

staffRouter.patch("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        if (data.profile_pic && data.profile_pic.data) {
            data.profile_pic = Buffer.from(data.profile_pic.data, "base64");
        }
        const staff = await prisma.staff.update({
            where: {
                id: Number(id),
            },
            data: data,
        });
        res.json(staff);
    } catch (error) {
        next(error);
    }
});

staffRouter.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const staff = await prisma.staff.delete({
            where: {
                id: Number(id),
            },
        });
        res.json(staff);
    } catch (error) {
        next(error);
    }
});

module.exports = staffRouter