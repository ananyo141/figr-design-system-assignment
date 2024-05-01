import { isValidObjectId } from 'mongoose';
import { z } from 'zod';

const colorSubSchema = z.object({
  label: z.string(),
  value: z
    .string()
    .regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/, 'Must be a valid hex color'),
});

const radiusSchema = z.object({
  baseSize: z.number().refine((value) => {
    return [4, 8, 12, 16, 32].includes(value);
  }),
  multiplier: z.number().refine((value) => {
    return [1, 2].includes(value);
  }),
});

const spacingSchema = z.object({
  baseSize: z.number().refine((value) => {
    return [6, 8, 12].includes(value);
  }),
});

const projectSchema = z.object({
  name: z.string(),
  colors: z.array(colorSubSchema).default([
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
  owner: z.string().refine((value) => isValidObjectId(value)),
});

export default projectSchema;
