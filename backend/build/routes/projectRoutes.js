"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const projectController_1 = require("../controllers/projectController");
const tokenMiddleware_1 = require("../middlewares/tokenMiddleware");
exports.default = (router) => {
    router
        .route('/projects')
        .get(tokenMiddleware_1.verifyUserToken, projectController_1.getUserProjects)
        .post(tokenMiddleware_1.verifyUserToken, 
    // validateSchema(projectSchema.strict().partial()),
    projectController_1.createProject);
    router
        .route('/projects/:id')
        .get(tokenMiddleware_1.verifyUserToken, projectController_1.getProjectById)
        .patch(tokenMiddleware_1.verifyUserToken, 
    // validateSchema(userSchema.strict().partial()),
    projectController_1.updateProject);
};
//# sourceMappingURL=projectRoutes.js.map