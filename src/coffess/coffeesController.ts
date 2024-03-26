import {Body, Controller, Get, Param, Post, Patch, Delete, Query} from '@nestjs/common';
import {CoffeesService} from "./coffees.service";

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
    create(@Body() body) {
        return this.coffeesService.create(body);
    }

    @Patch(':id')
    update(@Body() body, @Param('id') id: number) {
        return this.coffeesService.update(id, body);
    }

    @Delete(':id')
    destroy(@Param('id') id: number) {
        return this.coffeesService.destroy(id);
    }
}
