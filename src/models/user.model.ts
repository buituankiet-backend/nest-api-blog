import {IsEmail, IsNotEmpty, MinLength, MaxLength, IsString} from 'class-validator';

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(12)
    password: string;
}

export class RegisterDto extends LoginDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    username: string;
}

export interface AuthPayload {
    username: string;
}