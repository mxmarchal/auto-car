function generatePayload() {
    const payload = {
        world: {
            x: Number(process.env.WORLD_SIZE_X),
            y: Number(process.env.WORLD_SIZE_Y)
        }
    }
    return JSON.stringify(payload);
}

module.exports = {
    generatePayload
}