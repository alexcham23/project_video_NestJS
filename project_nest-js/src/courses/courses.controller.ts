import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpException, ParseIntPipe, HttpStatus, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SlugPipe } from './pipes/slug.pipe';
//import { BrowserAgentGuard } from 'src/guards/browser-agent/browser-agent.guard';
import { JwtGuardGuard } from 'src/guards/jwt-guard/jwt-guard.guard';
import { Request } from 'express';
import { RolesGuardGuard } from 'src/guards/roles-guard/roles-guard.guard';
import { set } from 'mongoose';
import { Rol } from 'src/decorators/rol/rol.decorator';


@ApiTags('courses')
@Controller('courses')
@UseGuards(JwtGuardGuard,RolesGuardGuard)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post() //TODO post http://localhost:3000/v1/courses
  @HttpCode(201)
  @Rol(['admin'])
  create(@Req() _req:Request, @Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get() //TODO get http://localhost:3000/courses
  findAll() {
    return this.coursesService.findAll();
  }



  @Get(':title') //TODO get http://localhost:3000/courses/:title
  @Rol(['manager','admin'])
  getDetail(@Param('title',new SlugPipe()) title: string) {
    console.log('__title__',title);
    return this.coursesService.findOne(1);
  }

  @Get(':id') //TODO get http://localhost:3000/courses/:id
  
  getDatail(@Param('id',new ParseIntPipe({
    errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
  })) id: number) {
    return this.coursesService.findOne(+id);
  }

  @Patch(':id') //TODO patch http://localhost:3000/courses/:id
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(':id') //TODO delete http://localhost:3000/courses/:id
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
