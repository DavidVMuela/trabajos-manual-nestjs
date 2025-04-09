import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { Product } from './interfaces/product.interface';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

  constructor(private readonly productsService: ProductsService) { }

  @Get()
  getAllProducts(): Product[] {
    return this.productsService.getAll();
  }

  @Get(':id')
  find(@Param('id') id: number) {
    return this.productsService.getId(id);
  }

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  createProduct(
    @Body() body,
  ) {
    this.productsService.insert(body);
  }

  @Put(':id')
  update(
    @Param('id') id: number, 
    @Body() body,
  ) {
    return this.productsService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: number) {
    this.productsService.delete(id);
  }
    
   @Get()
   getHelloInProducts(): string {
      return 'We are in products!';
   }

   //Get('hot')
   //etSpecialProducts(): string {
   //   return 'We will show you the hottest products!';
   //}

    
    //@Get(':id')
    //find(@Param() params){
    //    return `You are viewing the product ${params.id}`;
    //}
    
    //@Get(':id/:size')
    //findWithSize(@Param() params){
    //    return `In this route we obtain the product ${params.id}, but in its size ${params.size}`;
    //}

  //@Get(':id')
  //find(@Param('id') id:number){
  //    return `Product page ${id}`;
  //}

  //@Get(':id/:size')
  //findWithSize(@Param('id') id:number, @Param('size') size:string){
  //    return `Detail page of the product ${id}, in size ${size}`;
  //}

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

   // @Post()
   // createProduct(
   //     @Body('name') name: string,
   //     @Body('description') description: string
   // ){
   //     return `Create a product ${name}, with description ${description}`;
   // }

    //@Post()
    //@HttpCode(204)
    //createProduct(@Body() body){
    //    return body;
    //}

    //@Post()
    //@HttpCode(HttpStatus.NO_CONTENT)
    //createProduct(@Body() body){
    //    return body;
    //}

    @Get('ruta-error-404')
    @HttpCode(HttpStatus.NOT_FOUND)
    rutaConError404(){
        return 'This is an error 404!'
    }

  // @Get(':id')
  // find(@Res() response, @Param('id') id:number){
  //     if(id<100) {
  //         return response.status(HttpStatus.OK).send(`Product page ${id}`);
  //     }else{
  //         return response.status(HttpStatus.NOT_FOUND).send(`Product not found`);
  //     }
  // }

  // @Put(':id')
  // update(@Param('id') id:number, @Body() body){
  //     return `You are performing an update operation on the resource ${id}, with name ${body.name}, and description ${body.description}`;
  // }

   // @Patch(':id')
   // partialUpdate(@Param('id') id: number, @Body() body) {
   //   return `Partial update of item ${id}`;
   // }

   // @Delete(':id')
   // @HttpCode(HttpStatus.NO_CONTENT)
   // delete(@Param('id') id:number) {
   //     return `We have delted the product ${id}`;
   // }

    @Get('query')
    rutaQuery(@Query() query) {
        return `El dato query.x ha recibido el valor ${query.x}`;
    }

    @Get('cars')
    carsQuery(@Query('count', ParseIntPipe) carCount: number) {
      return carCount;
    }

    
}