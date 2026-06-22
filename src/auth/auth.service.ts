import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

export class LoginDto {
  email!: string;
  password!: string;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(data: LoginDto) {
    const user = await this.userService.findByEmail(data.email);
    if (!user) throw new UnauthorizedException('Credenciales invalidas');

    const match = await bcrypt.compare(data.password, user.password);
    if (!match) throw new UnauthorizedException('Credenciales invalidas');

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      user: { id: user.id, name: user.name },
    };
  }
}
