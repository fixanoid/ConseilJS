"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const QueryTypes_1 = require("../v2/QueryTypes");
var ConseilDataClient;
(function (ConseilDataClient) {
    function executeEntityQuery(serverInfo, platform, network, entity, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${serverInfo.url}/v2/data/${platform}/${network}/${entity}`;
            return node_fetch_1.default(url, {
                method: 'POST',
                headers: { "apiKey": serverInfo.apiKey, "Content-Type": 'application/json' },
                body: JSON.stringify(query)
            })
                .then(response => {
                if (!response.ok) {
                    throw new QueryTypes_1.ConseilRequestError(response.status, response.statusText, url, query);
                }
                return response;
            })
                .then(response => response.json());
        });
    }
    ConseilDataClient.executeEntityQuery = executeEntityQuery;
    function executeComplexQuery(serverInfo, platform, network, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${serverInfo.url}/v2/query/${platform}/${network}`;
            return node_fetch_1.default(url, {
                method: 'POST',
                headers: { "apiKey": serverInfo.apiKey, "Content-Type": 'application/json' },
                body: JSON.stringify(query)
            })
                .then(response => {
                if (!response.ok) {
                    throw new QueryTypes_1.ConseilRequestError(response.status, response.statusText, url, query);
                }
                return response;
            })
                .then(response => response.json());
        });
    }
    ConseilDataClient.executeComplexQuery = executeComplexQuery;
})(ConseilDataClient = exports.ConseilDataClient || (exports.ConseilDataClient = {}));
//# sourceMappingURL=ConseilDataClient.js.map