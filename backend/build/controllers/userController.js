"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.updateProfile = exports.getProfile = exports.registerUser = exports.loginUser = void 0;
const tslib_1 = require("tslib");
const hashData_1 = require("../utils/hashData");
const http_status_codes_1 = require("http-status-codes");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const index_1 = tslib_1.__importDefault(require("../errors/index"));
const user_1 = tslib_1.__importDefault(require("../models/user"));
const asyncWrapper_1 = tslib_1.__importDefault(require("../utils/asyncWrapper"));
const createJWT_1 = require("../utils/createJWT");
const httpResponse_1 = require("../utils/httpResponse");
exports.loginUser = (0, asyncWrapper_1.default)(async (req, res, next) => {
    const { email, password } = req.body;
    // Find admin by email
    const user = await user_1.default.findOne({ email });
    if (user == null)
        return next(new index_1.default.NotFoundError('User not found'));
    // Compare entered password with hashed password in the database
    const passwordMatch = await (0, hashData_1.verifyHashedData)(password, user.password);
    if (!passwordMatch)
        return next(new index_1.default.UnauthorizedError('Invalid Password'));
    // Create and sign a JWT
    const token = (0, createJWT_1.createToken)(user._id.toString());
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .json((0, httpResponse_1.httpResponse)(true, 'Successfully logged in', { token }));
});
exports.registerUser = (0, asyncWrapper_1.default)(async (req, res, next) => {
    // hash the password
    const hashedPassword = await (0, hashData_1.hashData)(req.body.password);
    // Check if user with the email already exists
    try {
        const user = await user_1.default.create(Object.assign(Object.assign({}, req.body), { password: hashedPassword }));
        res.status(http_status_codes_1.StatusCodes.CREATED).json((0, httpResponse_1.httpResponse)(true, 'User registered successfully', Object.assign(Object.assign({}, user.toObject()), { password: undefined })));
    }
    catch (error) {
        if (error.code === 11000)
            return next(new index_1.default.BadRequestError('User with that email / number already exists'));
        return next(new index_1.default.InternalServerError(error.message));
    }
});
exports.getProfile = (0, asyncWrapper_1.default)(async (req, res, next) => {
    const user = await user_1.default.aggregate([
        { $match: { _id: new mongoose_1.default.Types.ObjectId(req.userId) } },
        { $limit: 1 },
        { $project: { password: 0 } },
    ]);
    if (user === null || user.length === 0)
        return next(new index_1.default.NotFoundError('User not found'));
    res.status(http_status_codes_1.StatusCodes.OK).json((0, httpResponse_1.httpResponse)(true, 'User found', user[0]));
});
exports.updateProfile = (0, asyncWrapper_1.default)(async (req, res, next) => {
    try {
        const user = await user_1.default.findOneAndUpdate({
            _id: req.userId,
        }, Object.assign({}, req.body), { new: true });
        if (user == null) {
            return next(new index_1.default.NotFoundError('User not found'));
        }
        res.status(http_status_codes_1.StatusCodes.OK).json((0, httpResponse_1.httpResponse)(true, 'User updated successfully', Object.assign({}, user.toObject())));
    }
    catch (error) {
        if (error.code === 11000)
            return next(new index_1.default.BadRequestError('User with that email / number already exists'));
        next(error);
    }
});
exports.updatePassword = (0, asyncWrapper_1.default)(async (req, res, next) => {
    console.log('Request body', req.body);
    const { email, OTP, newPassword } = req.body;
    console.log(email, OTP, newPassword);
    if (email == null || OTP == null)
        return next(new index_1.default.BadRequestError('Email and OTP are required'));
    try {
        const hashedPassword = await (0, hashData_1.hashData)(newPassword);
        const user = await user_1.default.findOneAndUpdate({
            email,
        }, {
            password: hashedPassword,
        }, { new: true });
        if (user == null) {
            return next(new index_1.default.NotFoundError('User not found'));
        }
        // Create and sign a JWT
        const token = (0, createJWT_1.createToken)(user._id.toString());
        res.status(http_status_codes_1.StatusCodes.OK).json((0, httpResponse_1.httpResponse)(true, 'Password updated successfully and new token issued', Object.assign(Object.assign({}, user.toObject()), { token })));
    }
    catch (error) {
        if (error.code === 11000)
            return next(new index_1.default.BadRequestError('User with that email / number already exists'));
        next(error);
    }
});
//# sourceMappingURL=userController.js.map