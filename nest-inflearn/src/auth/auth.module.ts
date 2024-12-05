import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './user.entity';
import { UserSchema } from './user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: User.name, schema: UserSchema}
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}