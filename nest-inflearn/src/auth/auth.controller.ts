import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authCredentialsDto } from './dto/auth-credentail.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    @Post('/signup')
    signUp(@Body() authCredentialsDto: authCredentialsDto): Promise<void>{
        return this.authService.signUp(authCredentialsDto);
    }
    
}
