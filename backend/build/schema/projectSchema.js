"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const colorSubSchema = zod_1.z.object({
    label: zod_1.z.string(),
    value: zod_1.z
        .string()
        .regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/, 'Must be a valid hex color'),
});
const radiusSchema = zod_1.z.object({
    baseSize: zod_1.z.number().refine((value) => {
        return [4, 8, 12, 16, 32].includes(value);
    }),
    multiplier: zod_1.z.number().refine((value) => {
        return [1, 2].includes(value);
    }),
});
const spacingSchema = zod_1.z.object({
    baseSize: zod_1.z.number().refine((value) => {
        return [6, 8, 12].includes(value);
    }),
});
const projectSchema = zod_1.z.object({
    name: zod_1.z.string(),
    colors: zod_1.z.array(colorSubSchema).default([
        { label: 'Primary', value: '#0096FF' },
        { label: 'Secondary', value: '#4cbb17' },
    ]),
    radius: radiusSchema.default({
        baseSize: 8,
        multiplier: 2,
    }),
    spacing: spacingSchema.default({
        baseSize: 12,
    }),
    owner: zod_1.z.string().refine((value) => (0, mongoose_1.isValidObjectId)(value)),
});
exports.default = projectSchema;
//# sourceMappingURL=projectSchema.js.map