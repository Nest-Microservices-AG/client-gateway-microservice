import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from '../config';
import { PaginationDto } from '../common';
import { catchError } from 'rxjs';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.client.send({ cmd: 'createProduct' }, createProductDto);
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.client.send({ cmd: 'findAllProduct' }, paginationDto);
  }

  @Get(':id')
  async findOneProduct(@Param('id') id: string) {
    return this.client.send({ cmd: 'findAOneProduct' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.client.send({ cmd: 'deleteProduct' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Patch(':id')
  patchProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.client
      .send(
        { cmd: 'updateProduct' },
        {
          id,
          ...updateProductDto,
        },
      )
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }
}
