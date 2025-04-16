import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Customers } from './interfaces/customers.interface';


@Injectable()
export class CustomersService {
    private customers : Customers[] =[
           { 
               id:0,
               name:"Miguel",
               age:31,
               birth:new Date('1984-05-03')
           }
    
    ];
    getAll(){
            return this.customers;
        }
    getId(id: number): Customers {
        const customers = this.customers.find( (item: Customers) => item.id == id);
        if(customers){
            return customers;
        }else{
            throw new NotFoundException(`We cannot find the customer ${id}`);
        }   
      }

    insert(body: any) {
            this.customers = [
              ...this.customers,
              {
               id: this.lastId() + 1,
               name: body.name,
               age: body.age,
               birth: body.birth
              }
            ];
          }

    private lastId(): number {
      return this.customers[this.customers.length - 1].id;
          }

    update(id: number, body: any) {
      let customers: Customers = {
        id,
        name: body.name,
        age: body.age,
        birth: body.birth
      }
      this.customers = this.customers.map( (item: Customers) => {
        console.log(item, id, item.id == id);
        return item.id == id ? customers : item;
      });
    }
          
    delete(id: number) {
        const Customers = this.customers.find((item: Customers) => item.id == id);
        if(Customers) {
          this.customers = this.customers.filter( (item: Customers) => item.id != id );
        } else {
          throw new HttpException(`No existe el Customers ${id}`, HttpStatus.NOT_FOUND);
        }
      }
}
