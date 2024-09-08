import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private readonly productModel: typeof Product,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { name, price, category, rating } = createProductDto;
    return this.productModel.create({ name, price, category, rating });
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.findAll();
  }

  async findOne(id: string): Promise<Product> {
    return this.productModel.findOne({
      where: { id },
    });
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    if (product) {
      await product.destroy();
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    if (product) {
      await product.update(updateProductDto);
      return product;
    }
    throw new Error('Product not found');
  }
}

