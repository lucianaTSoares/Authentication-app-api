import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsPhoneNumber, IsString, Length } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  @Length(3, 50)
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly photo?: string;

  @IsOptional()
  @IsString()
  @Length(3, 100)
  readonly bio?: string;

  @IsOptional()
  @IsString()
  @IsPhoneNumber('BR')
  readonly phone?: string;
}
