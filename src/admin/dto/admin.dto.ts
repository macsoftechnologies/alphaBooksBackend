import { ApiProperty } from "@nestjs/swagger";

export class AdminRegisterDto{
   
    
    @ApiProperty()
    name : string
  
    @ApiProperty()
    password : string
   
    @ApiProperty()
    type: string
}
