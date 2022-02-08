import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";

@Schema({timestamps: true})
export class work extends Document{
    @Prop()
    name: string;
    @Prop()
    todo: string;
}

export const workSchema = SchemaFactory.createForClass(work)