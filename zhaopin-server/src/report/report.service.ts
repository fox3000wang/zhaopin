import { BaseService } from '../base/base.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportService extends BaseService {
  async postRecord(data: any) {
    if (!data) return 'data is null';
    console.log(`[postRecord]`, JSON.stringify(data));

    const {
      position,
      income,
      city,
      area,
      exp,
      education,
      release_month,
      release_day,
      release_year,
      job_detail,
      work_address,
      company_name,
      company_type,
      company_scale,
      company_trade,
      company_financing,
      source,
      url,
    } = data;

    const sql: string =
      `INSERT INTO jobs ` +
      `(position, income, city, area, exp, education,` +
      `release_month, release_day, release_year, job_detail,` +
      `work_address, company_name, company_type, company_scale,` +
      `company_trade, company_financing, source, url,` +
      `insert_date ` +
      `)VALUES(` +
      `'${position}','${income}','${city}','${area}','${exp}','${education}',` +
      `${release_month},${release_day},${release_year},'${job_detail}',` +
      `'${work_address}','${company_name}','${company_type}','${company_scale}',` +
      `'${company_trade}','${company_financing}', '${source}','${url}', now() ` +
      `)ON DUPLICATE KEY UPDATE ` +
      `position='${position}',` +
      `income='${income}',` +
      `city='${city}',` +
      `area='${area}',` +
      `exp='${exp}',` +
      `release_month=${release_month},` +
      `release_day=${release_day},` +
      `release_year=${release_year},` +
      `job_detail='${job_detail}',` +
      `work_address='${work_address}',` +
      `company_name='${company_name}',` +
      `company_type='${company_type}',` +
      `company_scale='${company_scale}',` +
      `company_trade='${company_trade}',` +
      `company_financing='${company_financing}',` +
      `source='${source}',` +
      `url='${url}',` +
      `update_date=now()` +
      `;`;

    return await this.query(sql);
  }
}
