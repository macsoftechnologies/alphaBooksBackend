import { ApiProperty } from "@nestjs/swagger";

export class employeeDto{
    @ApiProperty()
    employeeId: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    type: string
}