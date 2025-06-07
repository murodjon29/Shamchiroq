import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { CheckRoles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum';
import { SelfGuard } from 'src/guards/self.guard';

@Controller('books')
@UseGuards(AuthGuard)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  create(@Body() createBookDto: CreateBookDto): Promise<object> {
    return this.booksService.create(createBookDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(Role.SUPERADMIN)
  @Get()
  findAll(): Promise<object> {
    return this.booksService.findAll();
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<object> {
    return this.booksService.findOne(+id);
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<object> {
    return this.booksService.update(+id, updateBookDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(Role.SUPERADMIN)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<object> {
    return this.booksService.remove(+id);
  }
}
