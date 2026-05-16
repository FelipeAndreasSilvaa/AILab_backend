import { IsString, MinLength, MaxLength } from 'class-validator';

export class AskDocumentDto {
  @IsString()
  @MinLength(1)
  @MaxLength(2000)
  question: string;
}