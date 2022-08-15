import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateUpdateArtistDto {
  @ApiProperty({ example: 'Freddie Mercury' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: false })
  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}
