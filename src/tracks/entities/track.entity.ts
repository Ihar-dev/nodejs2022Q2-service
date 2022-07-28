import { ApiProperty } from '@nestjs/swagger';

export class Track {
  @ApiProperty({
    example: '566f9040-37b9-4170-849b-d867a3f009f4',
    description: 'Track id as UUID',
  })
  id?: string;

  @ApiProperty({ example: 'The Show Must Go On' })
  name: string;

  @ApiProperty({ example: '92e0a93a-59ce-4220-8ef6-def797c2440e' })
  artistId: string | null;

  @ApiProperty({ example: '441f4f18-d265-4af2-8d54-2cb5d1e15b9b' })
  albumId: string | null;

  @ApiProperty({ example: 123 })
  duration: number;
}
