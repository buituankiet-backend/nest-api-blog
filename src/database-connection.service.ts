import { Injectable } from "@nestjs/common";
import {  TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";


@Injectable()
export class DatabaseConnectionService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DB,
      synchronize: true,
      dropSchema: false,
      logging: true,
      entities: ['dist/**/*.entity.js'],
    };
  }
}