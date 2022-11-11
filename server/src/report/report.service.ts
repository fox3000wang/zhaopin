
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportService {

  connection:any;  

  constructor(){
    const mysql = require('mysql2');    
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'user',
      password:'user',
      database: 'zhaopin',
      charset:'utf8',
    });
  }

  postRecord(data:any): any {
    if(!data) return 'data is null';
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

    const sql:string =
      `INSERT INTO jobs `+
      `(position, income, city, area, exp, education,` +
      `release_month, release_day, release_year, job_detail,` +
      `work_address, company_name, company_type, company_scale,` +
      `company_trade, company_financing, source, url` +
      `)VALUES(` +
      `'${position}','${income}','${city}','${area}','${exp}','${education}',` +
      `${release_month},${release_day},${release_year},'${job_detail}',` +
      `'${work_address}','${company_name}','${company_type}','${company_scale}',` +
      `'${company_trade}','${company_financing}', '${source}','${url}')` +
      `ON DUPLICATE KEY UPDATE ` +
      `position='${position}',`+ 
      `income='${income}',`+ 
      `city='${city}',`+ 
      `area='${area}',`+ 
      `exp='${exp}',`+ 
      `release_month=${release_month},`+ 
      `release_day=${release_day},`+ 
      `release_year=${release_year},`+ 
      `job_detail='${job_detail}',`+ 
      `work_address='${work_address}',`+ 
      `company_name='${company_name}',`+ 
      `company_type='${company_type}',`+ 
      `company_scale='${company_scale}',`+ 
      `company_trade='${company_trade}',`+ 
      `company_financing='${company_financing}',`+ 
      `source='${source}',`+ 
      `url='${url}'`+ 
      `;`;

    console.log(`[sql]: ${sql}`);
    
    this.connection.query(
      sql,
      function(err, results, fields) {
        console.log(results); // results contains rows returned by server
        err && console.log(err);
      }
    );
    
  }

}
