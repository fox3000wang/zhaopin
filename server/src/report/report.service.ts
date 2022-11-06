
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
    
    const {position, income, city, area, exp, education, release_month, release_day, release_year} = data;
    const sql = `INSERT INTO jobs (position, income, city, area, exp, education, release_month, release_day, release_year) ` 
    + `VALUES ("${position}","${income}","${city}","${area}","${exp}","${education}",${release_month},${release_day},${release_year});`

    console.log(`[sql]: ${sql}`);
    this.connection.query(
      sql,
      function(err, results, fields) {
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
      }
    );
    
  }

}
