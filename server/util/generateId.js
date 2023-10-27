async function generateId(data, type) {
    if (type === 'staff') {
        const prefix = 'STA'

        return data.length === 0 ? `${prefix}1000` : `${prefix}${+(data[data.length - 1].staff_id.replace('STA', '')) + 1}`
    }

    if (type === 'student') return data.length === 0 ? `1000` : `${+(data[data.length - 1].student_id) + 1}`

}

module.exports = generateId