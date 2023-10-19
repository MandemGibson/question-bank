async function generateId(staff) {
    const prefix = 'STA'

    return staff.length === 0 ? `${prefix}1000` : `${prefix}${+(staff[staff.length - 1].id.replace('STA', '')) + 1}`
}

module.exports = generateId