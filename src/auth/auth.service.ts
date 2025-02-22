import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}
  async verifyUser(email: string, password: string) {
    try {
      const user = await this.userService.getUser({ email });
      const authenticathed = await bcrypt.compare(password, user.password);
      if (!authenticathed) throw new UnauthorizedException();
      return user;
    } catch (err) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
  }
}
