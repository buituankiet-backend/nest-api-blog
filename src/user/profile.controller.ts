import { UserService } from './user.service';
import { Controller, Get, NotAcceptableException, Param } from '@nestjs/common';

@Controller('profiles')
export class ProfileController {
    constructor(
        private userService: UserService,
    ) {}

    @Get('/:username')
    async findProfile(@Param('username') username: string) {
        const user = await this.userService.findByUserName(username);

        if(!user) {
            throw new NotAcceptableException();
        }

        return { Profile: user}
    }

}
