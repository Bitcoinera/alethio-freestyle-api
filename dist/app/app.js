"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccountController = require("../dist/account.controller.js");
let input = document.getElementById('account');
let inputButton = document.getElementById('enter');
inputButton.addEventListener('click', () => {
    console.log('hi');
    AccountController.monitor_account(input.value);
    console.log(AccountController.monitor_account(input.value));
});
