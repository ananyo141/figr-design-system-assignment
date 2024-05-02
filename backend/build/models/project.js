"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const projectSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    colors: {
        type: [
            {
                label: { type: String, required: true },
                value: { type: String, required: true },
            },
        ],
        default: [
            { label: 'Primary', value: '#0096FF' },
            { label: 'Secondary', value: '#4cbb17' },
        ],
    },
    radius: {
        baseSize: {
            type: Number,
            required: true,
            default: 8,
            enum: [4, 8, 12, 16, 32],
        },
        multiplier: {
            type: Number,
            required: true,
            default: 2,
            enum: [1, 2],
        },
    },
    spacing: {
        baseSize: {
            type: Number,
            required: true,
            default: 12,
            enum: [6, 8, 12],
        },
    },
    owner: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});
const Project = mongoose_1.default.model('Project', projectSchema);
exports.default = Project;
//# sourceMappingURL=project.js.map