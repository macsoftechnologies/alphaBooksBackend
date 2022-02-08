import { ApiProperty } from "@nestjs/swagger";

export class userChatDto{
    @ApiProperty()
    name: string;
    @ApiProperty()
    chat: string;
}