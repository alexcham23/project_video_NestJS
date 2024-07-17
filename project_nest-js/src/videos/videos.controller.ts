import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseInterceptors, Logger, UploadedFile } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoggerInterceptor } from 'src/utils/logger/logger.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/utils/mediaHandle';

@ApiTags('videos')
@UseInterceptors(LoggerInterceptor)
@Controller('videos') //TODO http://localhost:3000/videos
//@UsePipes(new ValidationPipe()) //TODO ValidationPipe
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post() //TODO post http://localhost:3000/videos
  create(@Body() createVideoDto: CreateVideoDto) {
    console.log(createVideoDto);
    return this.videosService.create(createVideoDto);
  }

  @Post('upload') //TODO post http://localhost:3000/v1/videos/upload
  @UseInterceptors(FileInterceptor('avatar',{storage})) //TODO FileInterceptor
  handleUpload(@UploadedFile() file: Express.Multer.File) {
    console.log(file)
  }

  @Get() //TODO get http://localhost:3000/videos
  findAll() {
    return this.videosService.findAll();
  }

  @Get(':id') //TODO get http://localhost:3000/videos/:id
  findOne(@Param('id') id: string) {
    return this.videosService.findOne(+id);
  }

  @Patch(':id') //TODO patch http://localhost:3000/videos/:id
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(+id, updateVideoDto);
  }

  @Delete(':id') //TODO delete http://localhost:3000/videos/:id
  remove(@Param('id') id: string) {
    return this.videosService.remove(+id);
  }
}
