import {Module} from '@nestjs/common';
import {CoffeesController} from "../coffess/coffeesController";
import {CoffeesService} from "../coffess/coffees.service";

@Module({controllers: [CoffeesController], providers: [CoffeesService]})
export class CoffeesModule {
}
