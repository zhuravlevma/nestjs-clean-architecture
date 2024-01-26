import { IsString } from 'class-validator';

export class UpdateRouteDto {
  @IsString()
  id: string;

  @IsString()
  courierId?: string;

  @IsString()
  orderId?: string;
}
