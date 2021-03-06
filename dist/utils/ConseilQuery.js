"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const querystring = __importStar(require("querystring"));
const node_fetch_1 = __importDefault(require("node-fetch"));
function queryConseilServer(server, route, apiKey) {
    const url = `${server}/${route}`;
    console.log(`Querying Conseil server at URL ${url}`);
    return node_fetch_1.default(url, {
        method: 'get',
        headers: {
            "apiKey": apiKey
        }
    })
        .then(response => { return response.json(); });
}
exports.queryConseilServer = queryConseilServer;
function queryConseilServerWithFilter(server, route, filter, apiKey) {
    let params = querystring.stringify(sanitizeFilter(filter));
    let cmdWithParams = `${route}?${params}`;
    return queryConseilServer(server, cmdWithParams, apiKey);
}
exports.queryConseilServerWithFilter = queryConseilServerWithFilter;
function sanitizeFilter(filter) {
    return {
        limit: filter.limit,
        block_id: filter.block_id.filter(Boolean),
        block_level: filter.block_level.filter(Boolean),
        block_netid: filter.block_netid.filter(Boolean),
        block_protocol: filter.block_protocol.filter(Boolean),
        operation_id: filter.operation_id.filter(Boolean),
        operation_source: filter.operation_source.filter(Boolean),
        operation_destination: filter.operation_destination.filter(Boolean),
        operation_participant: filter.operation_participant.filter(Boolean),
        operation_kind: filter.operation_kind.filter(Boolean),
        account_id: filter.account_id.filter(Boolean),
        account_manager: filter.account_manager.filter(Boolean),
        account_delegate: filter.account_delegate.filter(Boolean)
    };
}
//# sourceMappingURL=ConseilQuery.js.map