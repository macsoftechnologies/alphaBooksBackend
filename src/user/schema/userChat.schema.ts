import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({timestamps: true})
export class userChat extends Document{
    @Prop()
    name: string;
    @Prop()
    userChat: string;
}
 
export const userChatSchema = SchemaFactory.createForClass(userChat);