import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { CoffeesController } from './coffess/coffeesController';

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        database: 'demo',
        username: 'root',
        password: 'password',
        synchronize: true,
    }), ],
    controllers: [AppController, CoffeesController],
    providers: [AppService],
})
export class AppModule {
}
