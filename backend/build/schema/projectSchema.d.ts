import { z } from 'zod';
declare const projectSchema: z.ZodObject<{
    name: z.ZodString;
    colors: z.ZodDefault<z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        label: string;
    }, {
        value: string;
        label: string;
    }>, "many">>;
    radius: z.ZodDefault<z.ZodObject<{
        baseSize: z.ZodEffects<z.ZodNumber, number, number>;
        multiplier: z.ZodEffects<z.ZodNumber, number, number>;
    }, "strip", z.ZodTypeAny, {
        baseSize: number;
        multiplier: number;
    }, {
        baseSize: number;
        multiplier: number;
    }>>;
    spacing: z.ZodDefault<z.ZodObject<{
        baseSize: z.ZodEffects<z.ZodNumber, number, number>;
    }, "strip", z.ZodTypeAny, {
        baseSize: number;
    }, {
        baseSize: number;
    }>>;
    owner: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    name: string;
    colors: {
        value: string;
        label: string;
    }[];
    radius: {
        baseSize: number;
        multiplier: number;
    };
    spacing: {
        baseSize: number;
    };
    owner: string;
}, {
    name: string;
    owner: string;
    colors?: {
        value: string;
        label: string;
    }[] | undefined;
    radius?: {
        baseSize: number;
        multiplier: number;
    } | undefined;
    spacing?: {
        baseSize: number;
    } | undefined;
}>;
export default projectSchema;
