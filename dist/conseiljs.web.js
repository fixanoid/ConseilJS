"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./utils/config");
config_1.config.isWeb = true;
__export(require("./tezos/TezosConseilQuery"));
__export(require("./tezos/TezosNodeQuery"));
__export(require("./tezos/TezosOperations"));
__export(require("./tezos/TezosWallet"));
//# sourceMappingURL=conseiljs.web.js.map