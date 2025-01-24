import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  //UsePipes,
  //ValidationPipe
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { ApiTags, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { LoggerInterceptor } from '../utils/logger/logger.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from '../utils/mediaHandle';
import { RolesGuardGuard } from '../guards/roles-guard/roles-guard.guard';
import { JwtGuardGuard } from '../guards/jwt-guard/jwt-guard.guard';
import { Rol } from '../decorators/rol/rol.decorator';
@ApiTags('videos')
@ApiBearerAuth()
@UseGuards(JwtGuardGuard, RolesGuardGuard)
@UseInterceptors(LoggerInterceptor)
@Controller('videos') //TODO http://localhost:3000/videos
//@UsePipes(new ValidationPipe()) //TODO ValidationPipe
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post() //TODO post http://localhost:3000/videos
  @Rol(['admin'])
  create(@Body() createVideoDto: CreateVideoDto) {
    console.log(createVideoDto);
    return this.videosService.create(createVideoDto);
  }

  @Post('upload/:id') //TODO post http://localhost:3000/v1/videos/upload/:id
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Rol(['admin'])
  @UseInterceptors(FileInterceptor('file', { storage })) //TODO FileInterceptor
  upload(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.videosService.addVideo(id, file.filename);
  }

  @Get() //TODO get http://localhost:3000/videos
  @Rol(['admin', 'manager', 'user'])
  findAll() {
    return this.videosService.findAll();
  }

  @Get(':id') //TODO get http://localhost:3000/videos/:id
  @Rol(['admin', 'manager', 'user'])
  findOne(@Param('id') id: string) {
    return this.videosService.findOne(id);
  }

  @Patch(':id') //TODO patch http://localhost:3000/videos/:id
  @Rol(['admin'])
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(id, updateVideoDto);
  }

  @Delete(':id') //TODO delete http://localhost:3000/videos/:id
  @Rol(['admin'])
  remove(@Param('id') id: string) {
    return this.videosService.remove(id);
  }
}
