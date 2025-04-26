import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ILike, In, Like, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { SizeEntity } from 'src/size/entities/size.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(SizeEntity)
    private sizeRepository: Repository<SizeEntity>,
  ){}


  async insert(createProductDto: CreateProductDto): Promise<Product> {
    const user = await this.userRepository.findOne({
      where: { id: createProductDto.userId },
    });
  
    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }
  
    const size = await this.sizeRepository.findBy({
      id: In(createProductDto.sizeId || []),
    });
  
    const product = this.productRepository.create({
      ...createProductDto,
      size,
      user,
      created_at: new Date(),
      updated_at: new Date(),
    });
  
    return await this.productRepository.save(product);
  }

  async getAll(): Promise<Product[]> {
    return this.productRepository.find({
      relations: ['user', 'size'],
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['size', 'user'],
    });
  
    if (!product) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
  
    return product;
  }

  async findByNameLike(name: string): Promise<Product[]> {
    return await this.productRepository.find({
      where: { name: Like(`%${name}%`) },
      relations: ['user', 'size'],
    });
  }

  async findAll(search?: string): Promise<Product[]> {
    if (search) {
      return this.productRepository.find({
        where: [
          { name:ILike(`%${search}%`) },
          { description: ILike(`%${search}%`) },
        ],
        relations: ['user', 'size'],
      });
    }
    return this.productRepository.find({ relations: ['user', 'size'] });
  }

  async findByQuery(query: any): Promise<Product[]> {
    const { name } = query;
    const where: any = {};

    if (name) {
      where.name = Like(`%${name}%`);
    }
    return await this.productRepository.find({
      where,
      relations: ['user', 'size'],
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
  
    if (updateProductDto.name && updateProductDto.name !== product.name) {
      const existingProduct = await this.productRepository.findOne({
        where: { name: updateProductDto.name },
      });
  
      if (existingProduct && existingProduct.id !== id) {
        throw new BadRequestException('El nombre ya está en uso por otro producto');
      }
    }
  

    if (updateProductDto.sizeId) {
      const size = await this.sizeRepository.findBy({
        id: In(updateProductDto.sizeId),
      });
      product.size = size;
    }
  
    Object.assign(product, updateProductDto);
    product.updated_at = new Date();
  
    return await this.productRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }
}
