import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type  VideoDocument = Video & Document;

@Schema()
export class Video {
    @Prop({required: true})
    title: string;

    @Prop()
    idCourse: mongoose.Types.ObjectId;

    @Prop()
    description: string;

    @Prop()
    source: string;

    @Prop()
    score: number;
}

export const VideoSchema = SchemaFactory.createForClass(Video);