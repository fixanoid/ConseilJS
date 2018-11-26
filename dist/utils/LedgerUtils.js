"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const sodium = __importStar(require("libsodium-wrappers-sumo"));
const node_hid_1 = __importDefault(require("node-hid"));
/**
 * These two lines allow us to interface with Ledgerjs and use their transport
 * layer code
 */
let Transport = require("@ledgerhq/hw-transport-node-hid").default;
let App = require("basil-tezos-ledger").default;
/**
 * Current solution to keep global instance of Ledgerjs transport object,
 * for signing use.
 */
class TransportInstance {
    static getInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.transport === null) {
                this.transport = yield Transport.create();
            }
            return this.transport;
        });
    }
}
TransportInstance.transport = null;
/**
    initialize of transport
*/
function initLedgerTransport() {
    return __awaiter(this, void 0, void 0, function* () {
        TransportInstance.transport = null;
    });
}
exports.initLedgerTransport = initLedgerTransport;
function getDevices() {
    Transport.list().then((devices) => __awaiter(this, void 0, void 0, function* () {
        const dec = new Transport(new node_hid_1.default.HID(devices[0]));
        const xtz = new App(dec);
        const result = yield xtz.getAddress(`44'/1729'/0'/0'/0'`, true);
    }));
    return Transport.list();
}
exports.getDevices = getDevices;
/**
 * Given a BIP44 derivation path for Tezos, get the Tezos Public Key
 * @param derivationPath BIP44 Derivation Path
 */
function getTezosPublicKey(derivationPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const transport = yield TransportInstance.getInstance();
        const xtz = new App(transport);
        const result = yield xtz.getAddress(derivationPath, true);
        const hexEncodedPublicKey = result.publicKey;
        return hexEncodedPublicKey;
    });
}
exports.getTezosPublicKey = getTezosPublicKey;
/**
 * Given a BIP44 derivation path for Tezos, get the Tezos Public Key
 * @param derivationPath BIP44 Derivation Path
 */
function getTezosPublicKeyOnHidden(derivationPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const transport = yield TransportInstance.getInstance();
        const xtz = new App(transport);
        const result = yield xtz.getAddress(derivationPath, false);
        const hexEncodedPublicKey = result.publicKey;
        return hexEncodedPublicKey;
    });
}
exports.getTezosPublicKeyOnHidden = getTezosPublicKeyOnHidden;
/**
 * Given a BIP44 derivation path for Tezos, and the hex encoded, watermarked
 * Tezos Operation, sign using the ledger
 * @param derivationPath BIP44 Derivation Path
 * @param watermarkedOpInHex Operation
 */
function signTezosOperation(derivationPath, watermarkedOpInHex) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Signing using Ledger..');
        const transport = yield TransportInstance.getInstance();
        const xtz = new App(transport);
        const result = yield xtz.signOperation(derivationPath, watermarkedOpInHex);
        const hexEncodedSignature = result.signature;
        const signatureBytes = sodium.from_hex(hexEncodedSignature);
        return signatureBytes;
    });
}
exports.signTezosOperation = signTezosOperation;
//# sourceMappingURL=LedgerUtils.js.map