import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersController } from './customers/customers.controller';
import { UsersController } from './controllers/users/users.controller';
import { CustomersService } from './customers/customers.service';
import { TagsModule } from './tags/tags.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProductModule } from './product/product.module';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { Product } from './product/entities/product.entity';
import { User } from './users/entities/user.entity';
import { SizeController } from './size/size.controller';
import { SizeModule } from './size/size.module';
import { SizeEntity } from './size/entities/size.entity';

@Module({
  imports: [ProductModule, UsersModule, SizeModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '12345',
    database: 'trabajos',
    entities: [Product, User, SizeEntity],
    retryDelay: 3000,
    autoLoadEntities: true,
    synchronize: true,
    logging: true,
    }), 
  ],
  controllers: [AppController, ProductController, CustomersController, UsersController, SizeController],
  providers: [AppService, CustomersService],
})
export class AppModule {}
