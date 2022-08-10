import { UserEntity } from './../enities/user.entity';
import { RegisterDto, LoginDto } from '../models/user.model';
import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor( 
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        private jwtService: JwtService,
    ) {}

    async register(credentials: RegisterDto) {
        try {
            const user = await this.userRepository.create(credentials);
            console.log(user);
            await user.save();
            const payload = { username: user.username };
            const token = this.jwtService.sign(payload);
            return { user: { ...user.toJSON(), token } };
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException("Username has alrealy been taken");
            }
            throw new InternalServerErrorException();
        }
    }

    async login({ email, password}: LoginDto) {
     try { 
        const user = await this.userRepository.findOne({ where: {email}});
        const isValid = await user.comparePassword(password);
        if (!isValid) {
            throw new UnauthorizedException('Invalid credential');
        }
        const payload = { username: user.username };
        const token = this.jwtService.sign(payload);

            return { user: {...user.toJSON(), token} };
     } catch (error) {
        throw new UnauthorizedException('Invalid credential');
    }
    }
}
