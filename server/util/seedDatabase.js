const { createAdmin } = require("../services/admin.service");
const { createCategories, getCategories } = require("../services/category.service");
const { createClass } = require("../services/class.service");
const { createSubjects } = require("../services/subjects.service");
const { createSuperAdmin } = require("../services/superadmin.service");

async function seedDatabase() {
    const superAdmin = await createSuperAdmin();
    console.log(
        superAdmin ? `Created super admin ${superAdmin.id}` : "Super Admin exists"
    );

    const admin = await createAdmin();
    console.log(admin ? `Created admin ${admin.id}` : "Admin exists");

    await createClass();
    await createSubjects();

    const categories = await getCategories()

    if (categories.length === 0) await createCategories()
}

module.exports = seedDatabase