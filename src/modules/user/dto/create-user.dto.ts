import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

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
