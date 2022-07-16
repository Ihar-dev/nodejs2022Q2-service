import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTrackDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: '92e0a93a-59ce-4220-8ef6-def797c2440e' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  artistId: string | null;

  @ApiProperty({ example: '441f4f18-d265-4af2-8d54-2cb5d1e15b9b' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  albumId: string | null;

  @ApiProperty({ example: 123 })
  @IsNotEmpty()
  @IsInt()
  duration: number;
}
