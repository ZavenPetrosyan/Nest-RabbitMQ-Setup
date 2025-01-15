import { IsString, IsNotEmpty, IsObject, IsDateString } from 'class-validator';

export class EventDto {
  @IsString()
  @IsNotEmpty()
  action: string;

  @IsObject()
  query: any;

  @IsString()
  @IsNotEmpty()
  result: string;

  @IsDateString()
  timestamp: Date;
}
