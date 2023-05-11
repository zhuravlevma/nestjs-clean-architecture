import { Module } from '@nestjs/common';
import { UpdateReportInteractor } from './domain/interactors/update-report.interactor';
import { UpdatePositionUseCase } from './domain/ports/in/update-report.use-case';
import { FindReportByIdInteractor } from './domain/interactors/find-report-by-id.interactor';
import { FindReportByIdUseCase } from './domain/ports/in/find-report-by-id.use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillOfLadingPositionOrmEntity } from 'src/accounting-order/dal/orm-entities/bill-of-lading-position.orm-entity';
import { AccountingOrdersController } from './web/accounting-orders.controller';
import { BillOfLadingRepository } from './dal/bill-of-lading.repository';
import { FindReportByIdPort } from './domain/ports/out/find-report-by-id.port';
import { FindPositionByIdPort } from './domain/ports/out/find-position-by-id.port';
import { SaveReportPort } from './domain/ports/out/save-report.port';
import { BillOfLadingReportOrmEntity } from './dal/orm-entities/bill-of-lading-report.orm-entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BillOfLadingReportOrmEntity,
      BillOfLadingPositionOrmEntity,
    ]),
  ],
  controllers: [AccountingOrdersController],
  providers: [
    {
      provide: FindReportByIdUseCase,
      useClass: FindReportByIdInteractor,
    },
    {
      provide: UpdatePositionUseCase,
      useClass: UpdateReportInteractor,
    },

    {
      provide: FindReportByIdPort,
      useClass: BillOfLadingRepository,
    },
    {
      provide: FindPositionByIdPort,
      useClass: BillOfLadingRepository,
    },
    {
      provide: SaveReportPort,
      useClass: BillOfLadingRepository,
    },
  ],
})
export class AccountingOrderModule {}
