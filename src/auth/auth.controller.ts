import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/login.dto';
import { Public } from './decorators/public.decorator';
import { AcesstokenGuard } from './guards/Accesstokenguard';
import { RefreshTokenGuard } from './guards/RefreshTokenGuard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ResetPasswordDto } from './dto/restpassworddto';
import { PasswordResetRequestDto } from './dto/resetRequestDto';

export interface RequestWithUser extends Request {
  user: {
    sub: number;
    email: string;
    refreshToken: string;
  };
}
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  async login(@Body() body: CreateAuthDto) {
    return this.authService.login(body);
  }

  @UseGuards(AcesstokenGuard)
  @Get('signout/:id')
  signOut(@Param('id') id: number) {
    return this.authService.signOut(id);
  }

  // /auth/refresh?id=1
  @Public()
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(
    @Query('id', ParseIntPipe) id: number,
    @Req() req: RequestWithUser,
  ) {
    const user = req.user;
    if (user.sub !== id) {
      throw new UnauthorizedException('Invalid user');
    }
    return this.authService.refreshTokens(id, user.refreshToken);
  }

  @Public()
  @Post('password-reset-request')
  @ApiOperation({ summary: 'Request password reset email with OTP' })
  public async requestEmailReset(@Body() body: PasswordResetRequestDto) {
    console.log('this is the requestEmail ', { body });
    return this.authService.sendEmailResetOtp(body);
  }

  @Public()
  @Post('password-reset')
  @ApiOperation({ summary: 'Reset password using OTP' })
  async resetPassword(@Body() body: ResetPasswordDto) {
    return this.authService.resetPassword(body);
  }
}
