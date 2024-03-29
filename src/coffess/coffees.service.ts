import { Injectable, NotFoundException} from '@nestjs/common';
import {Coffee} from "./model/Coffee.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateCoffeeDto} from "./dto/create-coffee.dto";
import {UpdateCoffeeDto} from "./dto/update-coffee.dto";

@Injectable()
export class CoffeesService {

    constructor(@InjectRepository(Coffee)
                private readonly coffeeRepository: Repository<Coffee>) {
    }

    findAll() {
        return this.coffeeRepository.find();
    }

    async findOne(id: number) {

        const coffee = await this.coffeeRepository.findOne({ where: { id } });

        if (!coffee) {
            throw new NotFoundException("coffee not found");
        }
        return coffee;
    }

    create(createCoffeeDto: CreateCoffeeDto) {
        const coffee = this.coffeeRepository.create(createCoffeeDto);

        return this.coffeeRepository.save(coffee);
    }

    async update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
        const existing = await this.coffeeRepository.preload({
            id: +id,
            ...updateCoffeeDto
        });

        if (!existing) {
            throw new NotFoundException("coffee not found")
        }
        return this.coffeeRepository.save(existing);
    }


    async destroy(id: number) {

        const existing = await this.coffeeRepository.findOne({ where: { id } });

        return this.coffeeRepository.remove(existing);
    }
}
