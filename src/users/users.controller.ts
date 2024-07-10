import { Body, Controller, Get, Param, Patch, Post, Query, Req, Session } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { Serialize } from 'src/interceptors/serialize.intercepter';
import { AuthService } from 'src/auth/auth.service';
@Controller('auth')
@Serialize(UserDto)
export class UsersController {
    constructor(private usersService: UsersService, private authService: AuthService) {}

    
    @Post('signup')
    createUser(@Body () body:CreateUserDto) {
        return this.authService.signUp(body.email, body.password);
    }

    @Post('signin')
    async signIn(@Body('email') email: string, @Body('password') password: string,@Session() session: Record<string, any>) {
        session.data=await this.authService.signIn(email, password)
        session.is_paid=true;
    }
    @Post('delete')
    removeUser(@Body('id') id: string) {
        return this.usersService.remove(parseInt(id));
    }
    @Get('/:id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(parseInt(id));
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.usersService.find(email);
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return  this.usersService.update(parseInt(id), body);
    }
}
