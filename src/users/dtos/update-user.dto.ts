import { IsEmail, IsString, MinLength,IsOptional } from "class-validator";

export class UpdateUserDto {
    @IsEmail()
    @IsString()
    @IsOptional()

    email: string;

    @MinLength(8)
    @IsString()
    @IsOptional()
    password: string;
}