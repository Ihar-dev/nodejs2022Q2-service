import { ApiProperty } from '@nestjs/swagger';

export class Payload {
  @ApiProperty()
  id: string;

  @ApiProperty()
  login: string;
}
