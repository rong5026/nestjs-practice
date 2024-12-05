import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { DatabaseModule } from './orm/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, CatsModule, DatabaseModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
      .apply(LoggerMiddleware)
      .forRoutes('cats');
  }
}
