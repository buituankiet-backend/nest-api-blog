import { UserEntity } from './../enities/user.entity';
import { UserService } from './user.service';
import { Body, Controller, Get, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { User } from 'src/auth/user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UpdateDto } from 'src/models/user.model';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
    ) {}

    @Get()
    @UseGuards(AuthGuard())
    findByUserName(@User() username: string) {
        return this.userService.findByUserName(username);
    }

    @Put()
    @UseGuards(AuthGuard())
    update(@User() { username }: UserEntity, @Body( new ValidationPipe( {
        transform: true, whitelist: true
    })) data: UpdateDto) {
        return this.userService.updateUser(username, data);
    }
}
