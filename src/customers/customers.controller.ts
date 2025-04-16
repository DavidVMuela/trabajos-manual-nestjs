import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customers } from './interfaces/customers.interface';
import { CustomersDto } from './dto/customers.dto/customers.dto';



@Controller('customers')
export class CustomersController {
    constructor(private readonly customerService: CustomersService){}


    @Get('ruta-error-404')
        @HttpCode(HttpStatus.NOT_FOUND)
        rutaConError404(){
        return 'esto es un error 404!! no existe';
    }

    @Get('query')
    rutaQuery(@Query() query) {
        return `El dato query.x ha recibido el valor ${query.x}`;
    }


    @Get()
      getAllCustomers():Customers[] {
        return this.customerService.getAll();
      }
    
      @Get(':id')
      find(@Param('id') id: number) {
        return this.customerService.getId(id);
      }
    
      @Post()
      @HttpCode(HttpStatus.OK)
      createCustomer(
          @Body() customerDto: CustomersDto,
      ) {
          this.customerService.insert(customerDto);
          return { message: 'Agregado correctamente'};
      }
  

      @Put(':id')
      update(
        @Param('id') id: number, 
        @Body() body,
      ) {
        return this.customerService.update(id, body); //`User ${body.name} updated` 
      }
    
      @Delete(':id')
      @HttpCode(HttpStatus.NO_CONTENT)
      delete(@Param('id') id: number) {
        this.customerService.delete(id);
      }
    
}
