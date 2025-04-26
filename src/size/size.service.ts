import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { SizeEntity } from './entities/size.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class SizeService {
  constructor(
    @InjectRepository(SizeEntity)
    private sizeRepository: Repository<SizeEntity>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createSizeDto: CreateSizeDto): Promise<SizeEntity> {
    const existing = await this.sizeRepository.findOne({
      where: { size: createSizeDto.size },
    });

    if (existing) {
      throw new BadRequestException('Ya existe una talla con ese nombre');
    }

    const size = this.sizeRepository.create(createSizeDto);
    return await this.sizeRepository.save(size);
  }

  async findAll(): Promise<SizeEntity[]> {
      //return this.sizeRepository.find({ relations: ['products'] });
  const size = await this.sizeRepository.find({ relations: ['products'] });
  if (!size || size.length === 0) {
    throw new NotFoundException('No hay tallas registradas');
  }
  return size;
  }

  async findOne(id: number): Promise<SizeEntity> {
    const size = await this.sizeRepository.findOne({
      where: { id },
      relations: ['products'],
    });

    if (!size) {
      throw new NotFoundException(`Size with ID ${id} not found`);
    }

    return size;
  }

  async update(id: number, updateSizeDto: UpdateSizeDto): Promise<SizeEntity> {
    await this.sizeRepository.update(id, updateSizeDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const size = await this.findOne(id);
    await this.sizeRepository.delete(size);
  }
}
