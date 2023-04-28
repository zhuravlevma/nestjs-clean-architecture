import { IsOptional, IsString } from 'class-validator';
import { UpdateAccountingOrderDto } from 'src/delivery/domain/accounting-order/services/update-order.service';

export class UpdateAccountingOrderNestDto implements UpdateAccountingOrderDto {
  @IsString()
  @IsOptional()
  description: string;
}
