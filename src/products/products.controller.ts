import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateProductRequest } from './dto/create-product.request';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { TokenPayload } from '../auth/token-payload.interface';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createProduct(
    @Body() request: CreateProductRequest,
    @CurrentUser() user: TokenPayload,
  ) {
    return this.productsService.createProduct(request, user.userId);
  }
}
