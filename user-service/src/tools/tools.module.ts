import { Module } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { ToolsController } from './tools.controller';

@Module({
  controllers: [ToolsController],
  providers: [ToolsService],
  exports: [ToolsService] ,
})
export class ToolsModule {}
