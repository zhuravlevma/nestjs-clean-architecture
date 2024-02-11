import { ReportReadModel } from '../../read-models/report.read-model';

export interface FindReportWithPositionsParams {
  id: string;
}
export abstract class FindReportWithPositionsByIdInPort {
  abstract execute(
    findReportWithPositionsParams: FindReportWithPositionsParams,
  ): Promise<ReportReadModel>;
}
