import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Put, Query, ParseIntPipe } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';


@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProductDto: CreateProductDto) { 
    return this.productService.insert(createProductDto);
  }

  @Get('search')
  async searchProducts(@Query('search') search?: string) {
    return this.productService.findAll(search);
  }

  @Get('query')
  rutaQuery(@Query('name') name: string) {
    return this.productService.findByQuery(name);
  }

  @Get()
  getAll() {
    return this.productService.getAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(+id);
  }

  

  //@Put(':id')
  //async updateAll(
  //@Param('id') id: number,
  //@Body() updateProductDto: UpdateProductDto
  //) {
  //  return this.productService.update(id, updateProductDto);
  //}

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
