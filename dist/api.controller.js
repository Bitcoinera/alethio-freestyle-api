"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function get_smart_contracts_by_transaction(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const hash = '0xe3a18b08b5fa88a63a5dfe686437f038e19af4e97b738f120888c6a782fa2249';
        const base_url = process.env.BASE_URL;
        //http.get(`${base_url}/transactions/${hash}/contractMessages`, res => { console.log(res)});
        // res
        //     .json( http.get(`${base_url}/transactions/${hash}/contractMessages`) )
    });
}
exports.get_smart_contracts_by_transaction = get_smart_contracts_by_transaction;
