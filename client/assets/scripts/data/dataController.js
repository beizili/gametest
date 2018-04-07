import playerData from "./playerData"

const dataController = function () {
    let that = {};
    that.playerData = playerData();
    return that;
};

export default dataController;