/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/app.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/app.ts":
/*!********************!*\
  !*** ./app/app.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst AccountController = __webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module '../dist/account.controller.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\nconst ChartRenderer = __webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module '../dist/graphs.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\nlet form = document.getElementById(\"account-form\");\nlet input = document.getElementById('account');\nlet divError = document.getElementById('error');\nlet responseUl = document.getElementById('response');\n// account with con contract msgs 0x4Cf890695E2188a124495EbC3b1Ec6341F21C9CF & another one 0x829bd824b016326a401d083b33d092293333a830\n// account with no contract msgs but txns 0xd73953bc13c031459f3856a9a5adce36bed18fdc\n// account with only 2 contract messages 0xb7605ddc0327406a7ac225b9de87865e22ac5927\nform.addEventListener('submit', async (e) => {\n    e.preventDefault();\n    // handle empty input\n    if (input.value === '') {\n        return;\n    }\n    AccountController.monitor_account(input.value)\n        .then((values) => {\n        // empty input text content\n        input.value = '';\n        // clear error message if there is one\n        let errors = document.querySelectorAll('p.error');\n        if (errors.length > 0) {\n            errors.forEach((error) => {\n                divError.removeChild(error);\n            });\n        }\n        // handling error\n        if (values['errorMessage'] !== '') {\n            let errorDomString = `<p class=\"error\">An error occurred!</p><p class=\"error\">${values['errorMessage']}</p>`;\n            divError.innerHTML = errorDomString;\n        }\n        else {\n            // handle length when there are over 10 txns and contmsgs\n            values['transactions'].lengthOther = values['transactions'].length;\n            values['contractMessages'].lengthOther = values['contractMessages'].length;\n            if (values['transactions'].length === 10) {\n                values['transactions'].lengthOther = `10(+)<p>Ten last transactions in order are:</p>`;\n            }\n            if (values['contractMessages'].length === 10) {\n                values['contractMessages'].lengthOther = '10(+)<p>Ten last messages in order are:</p>';\n            }\n            // create all displayed data\n            let domString = `\n                <h4>General Stats</h4>\n                <li>Balance: ${values['balance']} ETH</li>\n                <h4>Transactions Stats</h4>\n                <button id=\"toggle-transactions\">Toggle Transactions</button>\n                <p>Total number of transactions: ${values['transactions'].lengthOther}</p>\n                <div class=\"row\">\n                <div class=\"column-s\">\n                `;\n            values['transactions'].forEach((txn, index) => {\n                domString = domString + `\n                    <li class=\"txn\">Txn ${index}: ${txn.value} ETH</li> \n                    `;\n            });\n            domString = domString + `\n                </div>\n                <div class=\"column\">\n                <div id=\"graphs\">\n                    <canvas id=\"txnChart\" width=\"400\" height=\"200\"></canvas>\n                </div>\n                </div>\n                </div>\n                `;\n            values['transactions'].forEach((txn, index) => {\n                domString = domString + `\n                    <p><button class=\"txn t${index}\">></button><span>Transaction ${index}</span></p>\n                    <li class=\"txn t${index}\">Hash: ${txn.txHash}</li> \n                    <li class=\"txn t${index}\">Block hash: ${txn.blockHash}</li> \n                    <li class=\"txn t${index}\">Gas limit: ${txn.gasLimit}</li> \n                    <li class=\"txn t${index}\">Gas price: ${txn.gasPrice}</li> \n                    <li class=\"txn t${index}\">Gas used: ${txn.gasUsed}</li> \n                    `;\n            });\n            domString = domString + `\n                <h4>Activities Stats</h4>\n                <button id=\"toggle-activities\">Toggle Activities</button>\n                <p>Total number of contract messages: ${values['contractMessages'].lengthOther}</p>\n                `;\n            values['contractMessages'].forEach((contractMessage, index) => {\n                domString = domString + `\n                    <p><button class=\"activity a${index}\">></button><span>Activity ${index}</span></p>\n                    <li class=\"activity a${index}\">Type of action: ${contractMessage.type}</li>\n                    <li class=\"activity a${index}\">Block rank: ${contractMessage.blockRank}</li>\n                    <li class=\"activity a${index}\">Hash of the contract: ${contractMessage.contractCreated}</li>\n                    <li class=\"activity a${index}\">Recipient address: ${contractMessage.toAddress}</li>\n                    <li class=\"activity a${index}\">Transaction hash: ${contractMessage.txHash}</li>\n                    <li class=\"activity a${index}\">Block hash: ${contractMessage.blockHash}</li>\n                    `;\n            });\n            responseUl.innerHTML = domString;\n        }\n        let canvas = document.getElementById('txnChart');\n        // call chart function\n        ChartRenderer.renderChart(values, canvas);\n    })\n        .catch((err) => {\n        console.error(err);\n        let errorDomString = `<p class=\"error\">An error occurred!</p>`;\n        divError.innerHTML = errorDomString;\n    });\n});\n// toggle function\nconst toggle = (type) => {\n    let lis = document.querySelectorAll(`li.${type}`);\n    if (lis.length > 0) {\n        lis.forEach(li => {\n            if (li.style.display === 'none') {\n                li.style.display = 'block';\n            }\n            else {\n                li.style.display = 'none';\n            }\n        });\n    }\n    else {\n        console.log(`No ${type} to hide`);\n    }\n};\n// event delegation model\ndocument.addEventListener('click', function (e) {\n    let regex = new RegExp(/^txn|activity/);\n    // toggle activities event\n    if (e.target && e.target['id'] === 'toggle-transactions') {\n        toggle('txn');\n    }\n    // toggle activities event\n    else if (e.target && e.target['id'] === 'toggle-activities') {\n        toggle('activity');\n    }\n    // toggle a single entry\n    else if (e.target && regex.test(e.target['className'])) {\n        let type = e.target['className'].split(' ').join('.');\n        toggle(type);\n    }\n});\n\n\n//# sourceURL=webpack:///./app/app.ts?");

/***/ })

/******/ });