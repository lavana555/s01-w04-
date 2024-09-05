"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetRouter = void 0;
const resetController_1 = require("./resetController");
const express_1 = require("express");
exports.resetRouter = (0, express_1.Router)();
exports.resetRouter.delete('/', resetController_1.resetController);
