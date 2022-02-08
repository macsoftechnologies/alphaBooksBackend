import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';
@Schema({ timestamps: true })
export class Admin extends Document{
    @Prop()
    name : string;
    @Prop()
    password : string;
    @Prop()
    type: string;
}
export const  AdminSchema = SchemaFactory.createForClass(Admin);