import { ApiProperty } from "@nestjs/swagger";

export class employeeChatDto{
    @ApiProperty()
    name: string;
    @ApiProperty()
    chatEmployee: string;
}