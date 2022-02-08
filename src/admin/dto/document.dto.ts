import { ApiProperty } from "@nestjs/swagger";

export class docsDto{
    @ApiProperty()
    docsId: string;
    @ApiProperty()
    requiredDocs: string;
}