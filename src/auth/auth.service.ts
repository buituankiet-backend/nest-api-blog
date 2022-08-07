import { RegisterDto, LoginDto } from './../models/user.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class AuthService {

    private kietUser = {
        "email": "kiet@gmail.com",
        "token": "jwt.token.here",
        "username": "tuankiet",
        "bio": "Backend Deverloper",
        "image": null
    }

    register(credentials: RegisterDto) {
        return this.kietUser;
    }

    login(credentials: LoginDto) {
        if(credentials.email === this.kietUser.email){
            return this.kietUser;
        }

        throw new InternalServerErrorException();
    }
}
