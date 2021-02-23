const listCommands = {
    "GET_WORLD_DATA": ""
}

function execute(cmd, socket) {
    let res = listCommands[cmd];

    if (res === undefined) {
        return("Command error.")
    }
    return res;
}

module.exports = {
    execute
}