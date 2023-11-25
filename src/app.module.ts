import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: `${process.env.DATABASE_HOST}`,
    //   port: 26876,
    //   username: `${process.env.DATABASE_USERNAME}`,
    //   password: `${process.env.DATABASE_PASSWORD}`,
    //   database: `${process.env.DATABASE_NAME}`,
    //   ssl: `${process.env.SSL_MODE}`,
    //   entities: [User],
    //   synchronize: true,
    // }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: `mysql://${process.env.DATABASE_USERNAME}:${
        process.env.DATABASE_PASSWORD
      }@${process.env.DATABASE_HOST}:${parseInt(process.env.DATABASE_PORT)}/${
        process.env.DATABASE_NAME
      }?ssl-mode=${process.env.SSL_MODE}`,
      entities: [User],
      synchronize: true,
    }),

    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
