
import { Injectable } from '@nestjs/common';
import {} from 'mysql2';
@Injectable()
export class ReportService {

  connection:any = null;  

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
    //console.log(`[postRecord] config`,JSON.stringify(data.config));
    const {txt} = data;

    console.log(`INSERT INTO jobs (title) VALUES (${txt})`);
    this.connection.query(
      // 'SELECT * FROM jobs; ',
      `INSERT INTO jobs (title) VALUES ("${txt}")`,
      function(err, results, fields) {
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
      }
    );
    
  }

}
