"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DeviceUtils {
    static setLedgerUtils(ledger) {
        this.ledgerUtils = ledger;
    }
    static getLedgerUtils() {
        return this.ledgerUtils;
    }
}
DeviceUtils.ledgerUtils = null;
exports.default = DeviceUtils;
//# sourceMappingURL=DeviceUtils.js.map