import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { v4 as uuid } from "uuid";
@Schema({timestamps: true})
export class documents extends Document{
  
    @Prop({required: true, unique: true, default:uuid})
    docsId: string
    @Prop()
    requiredDocs: string
}

export const documentsSchema = SchemaFactory.createForClass(documents)