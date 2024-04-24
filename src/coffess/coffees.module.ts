import { Module } from '@nestjs/common';
import { CoffeesController } from "./coffeesController";
import { CoffeesService } from "./coffees.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Coffee } from "./model/Coffee.entity";
import { Flavor } from './model/Flavor.entity';

@Module(
    {
        imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
        controllers: [CoffeesController],
        providers: [CoffeesService]
    }
)
export class CoffeesModule {
}
