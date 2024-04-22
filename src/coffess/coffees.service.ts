import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from "./model/Coffee.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Connection, Repository } from "typeorm";
import { CreateCoffeeDto } from "./dto/create-coffee.dto";
import { UpdateCoffeeDto } from "./dto/update-coffee.dto";
import { Flavor } from './model/Flavor.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';

@Injectable()
export class CoffeesService {

    constructor(
        @InjectRepository(Coffee) private readonly coffeeRepository: Repository<Coffee>,
        @InjectRepository(Flavor) private readonly flavorRepository: Repository<Flavor>,
        private readonly connection: Connection,
    ) { }

    findAll(paginateQurey: PaginationQueryDto) {
        const { limit, offset } = paginateQurey;
        return this.coffeeRepository.find({
            relations: ['flavors'],
            skip: offset,
            take: limit
        });
    }

    async findOne(id: number) {

        const coffee = await this.coffeeRepository.findOne({ where: { id }, relations: ['flavors'] });

        if (!coffee) throw new NotFoundException("coffee not found");

        return coffee;
    }

    async create(createCoffeeDto: CreateCoffeeDto) {

        const flavors = await Promise.all(
            createCoffeeDto.flavors.map(name => this.PreloadFlavoersByName(name))
        );

        const coffee = this.coffeeRepository.create({ ...createCoffeeDto, flavors });

        return this.coffeeRepository.save(coffee);
    }

    async update(id: number, updateCoffeeDto: UpdateCoffeeDto) {

        const flavors = updateCoffeeDto.flavors && (await Promise.all(
            updateCoffeeDto.flavors.map(name => this.PreloadFlavoersByName(name)),
        ));

        const coffee = await this.coffeeRepository.preload({ id: +id, ...updateCoffeeDto, flavors });

        if (!coffee) throw new NotFoundException("coffee not found")

        return this.coffeeRepository.save(coffee);
    }


    async destroy(id: number) {

        const existing = await this.coffeeRepository.findOne({ where: { id } });

        return this.coffeeRepository.remove(existing);
    }

    async recommendCoffe(coffee: Coffee) {
        
        const queryRunner = this.connection.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            coffee.recommendation++;

            const recommendEvent = new Event();
            recommendEvent.name = "recommend_coffee";
            recommendEvent.type = 'coffe';
            recommendEvent.payload = { coffeeId: coffee.id };

            await queryRunner.manager.save(coffee);
            await queryRunner.manager.save(recommendEvent);

            await queryRunner.commitTransaction();
        } catch (e) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }


    }

    private async PreloadFlavoersByName(name: string): Promise<Flavor> {

        const existingFlavor = await this.flavorRepository.findOneBy({ name });

        if (existingFlavor) return existingFlavor;

        return this.flavorRepository.create({ name });
    }
}
