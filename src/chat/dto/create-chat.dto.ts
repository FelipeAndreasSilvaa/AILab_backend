import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateChatDto {
    @IsString()
    @IsNotEmpty({ message: 'Question cannot be empty' })
    @MaxLength(1000, { message: 'Question is too long' })
    question: string;
  
    @IsString()
    @IsOptional()
    chatId?: string;
}
