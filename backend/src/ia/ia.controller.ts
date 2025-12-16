import { Body, Controller, Ip, Post } from '@nestjs/common';
import { IaService } from './ia.service';

@Controller('ia')
export class IaController {
  constructor(private readonly iaService: IaService) {}
  private requestCount = new Map<string, number>();

  @Post('recomendar')
  async recomendar(@Body('pregunta') pregunta: string, @Ip() ip: string) {
    const count = this.requestCount.get(ip) || 0;
    if (count >= 10) {
      throw new Error('Límite diario alcanzado. Intenta mañana.');
    }
    this.requestCount.set(ip, count + 1);
    
    const respuesta = await this.iaService.recomendarIA(pregunta);
    return {respuesta};
  }
}
