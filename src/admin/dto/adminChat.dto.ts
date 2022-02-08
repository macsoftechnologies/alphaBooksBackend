import { Prop } from "@nestjs/mongoose";

export class adminChatDto{
    @Prop()
    name: string;
    @Prop()
    adminChat: string;
}