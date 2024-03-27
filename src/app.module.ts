import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CoffeesModule} from './coffess/coffees.module';

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        database: 'demo',
        username: 'root',
        password: 'password',
        synchronize: true,
    }), CoffeesModule,],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
