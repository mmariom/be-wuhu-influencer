import { PartialType } from '@nestjs/mapped-types';
import { RegisterInfluencerDto } from './register-influencer.dto';

export class UpdateInfluencerDto extends PartialType(RegisterInfluencerDto) {}
