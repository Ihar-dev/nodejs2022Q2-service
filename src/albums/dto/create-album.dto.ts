import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUpdateAlbumDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 2015 })
  @IsNotEmpty()
  @IsInt()
  year: number;

  @ApiProperty({ example: 'c47daf6f-59ba-4a06-a578-2334fa1502dd' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  artistId: string | null;
}
