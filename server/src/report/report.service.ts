import fs =  require('fs');
import path =  require('path');
import { Injectable } from '@nestjs/common';
import { toDate, toInt } from 'src/utils';
const XlsxTemplate = require('xlsx-template');

@Injectable()
export class ReportService {

  postRecord(data:any): any {
    if(!data) return 'data is null';
    console.log(`[postRecord]`, JSON.stringify(data));
    //console.log(`[postRecord] config`,JSON.stringify(data.config));

  }

}
