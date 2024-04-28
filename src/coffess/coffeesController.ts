import { Body, Controller, Get, Param, Post, Patch, Delete, Query, SetMetadata } from '@nestjs/common';
import { CoffeesService } from "./coffees.service";
import { CreateCoffeeDto } from "./dto/create-coffee.dto";
import { UpdateCoffeeDto } from "./dto/update-coffee.dto";
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeesService: CoffeesService) {
    }
    @Public()
    @Get()
    findAll(@Query() paginateQurey: PaginationQueryDto) {
        return this.coffeesService.findAll(paginateQurey);
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
