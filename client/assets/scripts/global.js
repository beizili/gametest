import SocketController from "./data/socketController"
import dataController from "./data/dataController"

const global = {};
global.socket = SocketController();
global.dataController = dataController();
export default global;