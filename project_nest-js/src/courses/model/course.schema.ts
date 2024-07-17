import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type CourseDocument = Course & Document;

@Schema()
export class Course {
    //@Prop({unique:true})
    //id: string;

    @Prop({required: true})
    title: string;

    //@Prop({ required: true })
    //idAuthor: mongoose.Types.ObjectId;

    @Prop()
    description: string;

    @Prop()
    price: number;

    @Prop()
    cover: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);