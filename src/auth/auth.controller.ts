import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginDto, RegisterDto } from 'src/models/user.model';
import { AuthService } from './auth.service';

@Controller('user')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post()
    register(@Body(ValidationPipe) credentials: RegisterDto) {
        return this.authService.register(credentials);
    }

    @Post('/login')
    login(@Body(ValidationPipe) credentials: LoginDto) {
        return this.authService.login(credentials);
    }
}
