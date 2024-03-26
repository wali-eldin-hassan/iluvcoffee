import {HttpException, Injectable} from '@nestjs/common';
import {Coffee} from "./model/Coffee.entity";

@Injectable()
export class CoffeesService {

    private coffess: Coffee[] = [
        {
            id: 1,
            name: 'lol',
            brand: 'lol 2',
            flavors: ['chocolate', 'orange'],
        }
    ];

    findAll() {
        return this.coffess;
    }

    findOne(id: number): Coffee | HttpException {

        const coffee = this.coffess.find(item => item.id === +id);

        if (!coffee) {
            return new HttpException(`coffee ${id} not found`, 404);
        }
        return coffee;
    }

    create(createCoffeeDto: any) {
        return this.coffess.push(createCoffeeDto)
    }

    update(id: number, updateCoffeeDto: any) {
        const existing = this.coffess.find(item => item.id === +id);
        if (existing) {

        }
    }

    destroy(id: number) {
        const existing = this.coffess.findIndex(item => item.id === +id);
        if (existing >= 0) {
            this.coffess.splice(existing, 1);
        }
    }
}
