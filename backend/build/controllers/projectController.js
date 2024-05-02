"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectById = exports.updateProject = exports.createProject = exports.getUserProjects = void 0;
const tslib_1 = require("tslib");
const http_status_codes_1 = require("http-status-codes");
const index_1 = tslib_1.__importDefault(require("../errors/index"));
const asyncWrapper_1 = tslib_1.__importDefault(require("../utils/asyncWrapper"));
const project_1 = tslib_1.__importDefault(require("../models/project"));
const httpResponse_1 = require("../utils/httpResponse");
exports.getUserProjects = (0, asyncWrapper_1.default)(async (req, res, next) => {
    const userId = req.userId;
    const projects = await project_1.default.find({ owner: userId });
    if (!projects || projects.length === 0) {
        return next(new index_1.default.NotFoundError('No projects found for this user'));
    }
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .json((0, httpResponse_1.httpResponse)(true, 'Projects found', projects));
});
exports.createProject = (0, asyncWrapper_1.default)(async (req, res) => {
    try {
        const userId = req.userId;
        const projectData = Object.assign(Object.assign({}, req.body), { owner: userId });
        const project = await project_1.default.create(projectData);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            success: true,
            data: project,
        });
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
            success: false,
            error: {
                code: http_status_codes_1.StatusCodes.BAD_REQUEST,
                message: error.message || 'Failed to create project.',
            },
        });
    }
});
exports.updateProject = (0, asyncWrapper_1.default)(async (req, res, next) => {
    const userId = req.userId;
    const { id } = req.params;
    const project = await project_1.default.findById(id);
    if (!project) {
        return next(new index_1.default.NotFoundError('Project not found'));
    }
    if (project.owner.toString() !== userId) {
        return next(new index_1.default.ForbiddenError('Access denied'));
    }
    const updatedProject = await project_1.default.findByIdAndUpdate(id, req.body, {
        new: true,
    });
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .json((0, httpResponse_1.httpResponse)(true, 'Project updated', updatedProject));
});
exports.getProjectById = (0, asyncWrapper_1.default)(async (req, res, next) => {
    const userId = req.userId;
    const { id } = req.params;
    const project = await project_1.default.findById(id);
    if (!project) {
        return next(new index_1.default.NotFoundError('Project not found'));
    }
    if (project.owner.toString() !== userId) {
        return next(new index_1.default.ForbiddenError('Access denied'));
    }
    res.status(http_status_codes_1.StatusCodes.OK).json((0, httpResponse_1.httpResponse)(true, 'Project found', {
        project,
        enums: {
            radiusBaseSize: [4, 8, 12, 16, 32],
            radiusMultiplier: [1, 2],
            spacingBaseSize: [6, 8, 12],
        },
    }));
});
//# sourceMappingURL=projectController.js.map