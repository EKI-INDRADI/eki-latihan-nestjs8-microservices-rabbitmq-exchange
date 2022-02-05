import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';

@Controller('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Post()
  create(@Body() createToolDto: CreateToolDto) {
    return this.toolsService.create(createToolDto);
  }

  @Get()
  findAll() {
    return this.toolsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toolsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateToolDto: UpdateToolDto) {
    return this.toolsService.update(+id, updateToolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.toolsService.remove(+id);
  }
}
