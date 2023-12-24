async function seedDatabase() {
    const superAdmin = await createSuperAdmin();
    console.log(
        superAdmin ? `Created super admin ${superAdmin.id}` : "Super Admin exists"
    );

    const admin = await createAdmin();
    console.log(admin ? `Created admin ${admin.id}` : "Admin exists");

    await createClass();
    await createSubjects();
}

module.exports = seedDatabase