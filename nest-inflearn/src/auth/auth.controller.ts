import { Controller, Post, Body, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authCredentialsDto } from './dto/auth-credentail.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto: authCredentialsDto): Promise<void>{
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialsDto: authCredentialsDto): Promise<{accessToken: string}> {
        return this.authService.signin(authCredentialsDto);
    }
    
    @Post('/authTest')
    @UseGuards(AuthGuard())
    authTest(@Req()req) {
        console.log(req);
    }
}
