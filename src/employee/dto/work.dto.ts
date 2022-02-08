import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

export class workDto{
    @ApiProperty()
    name: string;
    @ApiProperty()
    toDo: string;
}