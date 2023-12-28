async function completeTopic(topicId) {
    return await prisma.topic.update({
        where: {
            id: topicId
        },
        data: {
            isDone: true
        }
    })
}

module.exports = {
    completeTopic
}