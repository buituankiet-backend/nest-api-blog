import { UserEntity } from './../enities/user.entity';
import { RegisterDto, LoginDto } from './../models/user.dto';
import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor( 
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    ) {}

    async register(credentials: RegisterDto) {
        try {
            const user = await this.userRepository.create(credentials);
            const result = await user.save();
            return result;
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
            return user;

     } catch (error) {
        throw new UnauthorizedException('Invalid credential');
    }
    }
}
