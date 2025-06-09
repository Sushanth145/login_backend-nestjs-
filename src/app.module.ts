/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity'; // create this entity soon


@Module({
  imports: [AuthModule, UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '9441984210',
      database: 'auth_db',
      entities: [User],  // Your entities here
      synchronize: true, // Auto create tables - disable in prod
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
