import { Body, Controller, Get, Ip, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() 
export class AppController {
  constructor(private readonly appService: AppService) {}
  private requestCount = new Map<string, number>();

  @Get() 
  getHello(): string {
    return this.appService.getHello();
  }
}