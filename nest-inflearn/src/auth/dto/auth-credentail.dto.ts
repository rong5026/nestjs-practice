import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class authCredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @IsNotEmpty()
    userName: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: '패스워드는 영어랑 숫자만 가능'
    })
    @IsNotEmpty()
    password: string;
}