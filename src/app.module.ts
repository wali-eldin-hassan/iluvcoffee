import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoffeesModule } from './coffess/coffees.module';
import { ConfigModule } from '@nestjs/config';
import * as joi from '@hapi/joi';

@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: joi.object({
                DATABASE_HOST: joi.required(),
                DATABASE_PORT : joi.number().default(5432),
            }),
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DATABASE_HOST,
            port: +process.env.DATABASE_PORT,
            database: process.env.DATABASE_NAME,
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            synchronize: true,
            autoLoadEntities: true,
        }),
        CoffeesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
