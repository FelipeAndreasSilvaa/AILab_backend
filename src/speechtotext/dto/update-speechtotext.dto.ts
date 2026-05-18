import { PartialType } from '@nestjs/mapped-types';
import { CreateSpeechtotextDto } from './create-speechtotext.dto';

export class UpdateSpeechtotextDto extends PartialType(CreateSpeechtotextDto) {}
