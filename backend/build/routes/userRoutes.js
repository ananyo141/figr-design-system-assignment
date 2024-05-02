"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("../controllers/userController");
const tokenMiddleware_1 = require("../middlewares/tokenMiddleware");
const validatorMiddleware_1 = require("../middlewares/validatorMiddleware");
const userSchema_1 = require("../schema/userSchema");
exports.default = (router) => {
    router.post('/user/login', (0, validatorMiddleware_1.validateSchema)(userSchema_1.loginSchema.strict()), userController_1.loginUser);
    router.post('/user/register', (0, validatorMiddleware_1.validateSchema)(userSchema_1.userSchema.strict()), userController_1.registerUser);
    router
        .route('/user/:id')
        .patch(tokenMiddleware_1.verifyUserToken, (0, validatorMiddleware_1.validateSchema)(userSchema_1.userSchema.partial()), userController_1.updateProfile)
        .get(tokenMiddleware_1.verifyUserToken, userController_1.getProfile);
};
//# sourceMappingURL=userRoutes.js.map