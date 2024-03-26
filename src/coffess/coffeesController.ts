import {Body, Controller, Get, HttpCode, Param, Post,HttpStatus} from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
    @Get()
    findAll() {
        return 'this is actions to find all coffees';
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return `this is actions to find coffees by #${id} coffee`;
    }

    @Post()
    @HttpCode(HttpStatus.GONE)
    create(@Body() body) {
        return body;
    }
}
