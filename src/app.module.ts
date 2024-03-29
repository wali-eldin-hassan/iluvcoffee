import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CoffeesModule} from './coffess/coffees.module';

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        database: 'postgres',
        username: 'postgres',
        password: 'pass123',
        synchronize: true,
        autoLoadEntities:true,
    }), CoffeesModule,],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
