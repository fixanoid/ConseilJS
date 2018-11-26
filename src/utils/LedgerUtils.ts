import * as sodium from 'libsodium-wrappers-sumo';
import HID from "node-hid";

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
    static transport = null;
    static async getInstance() {
        if (this.transport === null) {
            this.transport = await Transport.create();
        }
        return this.transport
    }
}


/**
    initialize of transport
*/

export async function initLedgerTransport () {
    TransportInstance.transport = null;  
}

export function getDevices () {
    return Transport.list();
}

/**
 * Given a BIP44 derivation path for Tezos, get the Tezos Public Key
 * @param derivationPath BIP44 Derivation Path
 */
export async function getTezosPublicKey(derivationPath: string): Promise<string> {
    const transport = await TransportInstance.getInstance();
    const xtz = new App(transport);
    const result = await xtz.getAddress(derivationPath, true);
    const hexEncodedPublicKey = result.publicKey;
    return hexEncodedPublicKey;
}

/**
 * Given a BIP44 derivation path for Tezos, get the Tezos Public Key
 * @param derivationPath BIP44 Derivation Path
 */
export async function getTezosPublicKeyOnHidden(derivationPath: string, device): Promise<string> {
    // let transport;
    // if (TransportInstance.transport) {
    //     transport = new Transport(new HID.HID(device));
    //     TransportInstance.transport = transport;
    // } else {
    //     transport = await TransportInstance.getInstance();
    // }
    let transport = await TransportInstance.getInstance();
    const xtz = new App(transport);
    const result = await xtz.getAddress(derivationPath, false);
    const hexEncodedPublicKey = result.publicKey;
    TransportInstance.transport = null;
    return hexEncodedPublicKey;
}

/**
 * Given a BIP44 derivation path for Tezos, and the hex encoded, watermarked
 * Tezos Operation, sign using the ledger
 * @param derivationPath BIP44 Derivation Path
 * @param watermarkedOpInHex Operation
 */
export async function signTezosOperation(derivationPath: string, watermarkedOpInHex: string): Promise<Buffer> {
    console.log('Signing using Ledger..');
    const transport = await TransportInstance.getInstance();
    const xtz = new App(transport);
    const result = await xtz.signOperation(derivationPath, watermarkedOpInHex);
    const hexEncodedSignature = result.signature;
    const signatureBytes = sodium.from_hex(hexEncodedSignature);
    return signatureBytes;
}