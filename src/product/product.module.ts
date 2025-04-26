import { forwardRef, Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { SizeEntity } from 'src/size/entities/size.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, User, SizeEntity]),
forwardRef(() => SizeEntity)],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService, 
            TypeOrmModule
  ],
})
export class ProductModule {}
