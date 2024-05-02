import mongoose from 'mongoose';
declare const Project: mongoose.Model<{
    name: string;
    colors: mongoose.Types.DocumentArray<{
        value: string;
        label: string;
    }>;
    owner: mongoose.Types.ObjectId;
    radius?: {
        baseSize: number;
        multiplier: number;
    } | null | undefined;
    spacing?: {
        baseSize: number;
    } | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    name: string;
    colors: mongoose.Types.DocumentArray<{
        value: string;
        label: string;
    }>;
    owner: mongoose.Types.ObjectId;
    radius?: {
        baseSize: number;
        multiplier: number;
    } | null | undefined;
    spacing?: {
        baseSize: number;
    } | null | undefined;
}> & {
    name: string;
    colors: mongoose.Types.DocumentArray<{
        value: string;
        label: string;
    }>;
    owner: mongoose.Types.ObjectId;
    radius?: {
        baseSize: number;
        multiplier: number;
    } | null | undefined;
    spacing?: {
        baseSize: number;
    } | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    colors: mongoose.Types.DocumentArray<{
        value: string;
        label: string;
    }>;
    owner: mongoose.Types.ObjectId;
    radius?: {
        baseSize: number;
        multiplier: number;
    } | null | undefined;
    spacing?: {
        baseSize: number;
    } | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name: string;
    colors: mongoose.Types.DocumentArray<{
        value: string;
        label: string;
    }>;
    owner: mongoose.Types.ObjectId;
    radius?: {
        baseSize: number;
        multiplier: number;
    } | null | undefined;
    spacing?: {
        baseSize: number;
    } | null | undefined;
}>> & mongoose.FlatRecord<{
    name: string;
    colors: mongoose.Types.DocumentArray<{
        value: string;
        label: string;
    }>;
    owner: mongoose.Types.ObjectId;
    radius?: {
        baseSize: number;
        multiplier: number;
    } | null | undefined;
    spacing?: {
        baseSize: number;
    } | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
export default Project;
