import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersModule: UsersService,
  ) {}

  public login(email: string, password: string): string {
    // Here you would typically validate the user credentials
    // For simplicity, we are returning a dummy token
    return `token-for-${email} ${password}`;
  }

  public register(email: string, password: string): string {
    // Here you would typically create a new user
    // For simplicity, we are returning a dummy success message
    return `User registered with email: ${email} password: ${password}`;
  }
}
