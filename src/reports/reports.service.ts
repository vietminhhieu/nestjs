import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportEntity } from './report.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(ReportEntity)
    private reportRepo: Repository<ReportEntity>,
  ) {}

  create(body: CreateReportDto) {
    const report = this.reportRepo.create(body);

    return this.reportRepo.save(report);
  }
}
