import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/orm/database.module';
import { UserProviders } from './user.providers';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './security/passport.jwt.strategy';

@Module({
  imports: [DatabaseModule,
    JwtModule.register({
      secret: 'SECRET_KEY',
      signOptions: {expiresIn: '300s'},
    }),
    PassportModule
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, ...UserProviders, JwtStrategy]
})
export class AuthModule {}

  