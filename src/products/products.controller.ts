import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('products')
export class ProductsController {
    @Get()
    getHelloInProducts(): string {
        return 'We are in products!';
    }

    @Get('hot')
    getSpecialProducts(): string {
        return 'We will show you the hottest products!';
    }

    
    //@Get(':id')
    //find(@Param() params){
    //    return `You are viewing the product ${params.id}`;
    //}
    
    //@Get(':id/:size')
    //findWithSize(@Param() params){
    //    return `In this route we obtain the product ${params.id}, but in its size ${params.size}`;
    //}

    @Get(':id')
    find(@Param('id') id:number){
        return `Product page ${id}`;
    }

    @Get(':id/:size')
    findWithSize(@Param('id') id:number, @Param('size') size:string){
        return `Detail page of the product ${id}, in size ${size}`;
    }

    //@Post()
    //createProduct(){
    //    return 'We are atending a POST request!';
    //}    

    //@Post()
    //createProduct(@Body() body){
    //    return `Create a product ${body.name}, with description ${body.description}`;
    //}

    //@Post()
    //createProduct(@Body() body){
    //    return body
    //}

    @Post()
    createProduct(
        @Body('name') name: string,
        @Body('description') description: string
    ){
        return `Create a product ${name}, with description ${description}`;
    }
}