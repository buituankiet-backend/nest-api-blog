import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ProfileController } from './profile.controller';
import { UserEntity } from 'src/enities/user.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([UserEntity]), 
    PassportModule,
],
  providers: [UserService],
  controllers: [UserController, ProfileController]
})
export class UserModule {}
