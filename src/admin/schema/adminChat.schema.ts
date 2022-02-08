import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({timestamps: true})
export class adminChat extends Document{
    @Prop()
    name: string;
    @Prop()
    adminChat: string;
}

export const adminChatSchema = SchemaFactory.createForClass(adminChat)