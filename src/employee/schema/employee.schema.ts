import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { v4 as uuid } from 'uuid';
@Schema({timestamps:true})
export class employee extends Document{
    @Prop({required:true, unique:true, default:uuid})
    employeeId: string;
    @Prop()
    name: string;
    @Prop()
    email: string;
    @Prop()
    password: string;
    @Prop()
    type: string
}

export const  employeeSchema = SchemaFactory.createForClass(employee);