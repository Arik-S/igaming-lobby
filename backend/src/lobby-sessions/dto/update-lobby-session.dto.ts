import { PartialType } from '@nestjs/mapped-types';
import { CreateLobbySessionDto } from './create-lobby-session.dto';

export class UpdateLobbySessionDto extends PartialType(CreateLobbySessionDto) {}
