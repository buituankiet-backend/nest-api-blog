import { UserEntity } from './../enities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateDto } from 'src/models/user.model';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    ) {}

    async findByUserName(username: string): Promise<UserEntity> {
        return this.userRepository.findOne( { where: {username}});
    } 

    async updateUser(username: string, data: UpdateDto) {
        await this.userRepository.update( { username}, data);
        return this.findByUserName(username);
    }
}
