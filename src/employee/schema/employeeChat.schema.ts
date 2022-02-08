import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({timestamps: true})
export class employeeChat extends Document{
    @Prop()
    name: string;
    @Prop()
    chatEmployee: string;
}
 export const employeeChatSchema = SchemaFactory.createForClass(employeeChat);