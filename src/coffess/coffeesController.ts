import {Body, Controller, Get, Param, Post, Patch, Delete, Query} from '@nestjs/common';
import {CoffeesService} from "./coffees.service";
import {CreateCoffeeDto} from "./dto/create-coffee.dto";
import {UpdateCoffeeDto} from "./dto/update-coffee.dto";

@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeesService: CoffeesService) {
    }

    @Get()
    findAll(@Query() paginateQurey) {
        return this.coffeesService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: number) {
        return this.coffeesService.findOne(id);
    }

    @Post()
    create(@Body() createCoffeeDto: CreateCoffeeDto) {
        return this.coffeesService.create(createCoffeeDto);
    }

    @Patch(':id')
    update(@Body() updateCoffeeDto: UpdateCoffeeDto, @Param('id') id: number) {
        return this.coffeesService.update(id, updateCoffeeDto);
    }

    @Delete(':id')
    destroy(@Param('id') id: number) {
        return this.coffeesService.destroy(id);
    }
}
