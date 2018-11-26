import { HardwareDeviceType } from "../types/HardwareDeviceType";
import { KeyStore } from "../types/KeyStore";
export declare namespace TezosHardwareWallet {
    function unlockAddress(deviceType: HardwareDeviceType, derivationPath: string): Promise<KeyStore>;
    function initLedgerTransport(): void;
    function getDevices(): any;
    function getTezosPublicKey(derivationPath: any, device: any): Promise<string>;
}
