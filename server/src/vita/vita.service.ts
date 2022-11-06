import fs =  require('fs');
import path =  require('path');
import { Injectable } from '@nestjs/common';

@Injectable()
export class VitaService {
  
  getRecord():any{
    const fileParh = path.join(__dirname, `../../dict/dict.json`);
    const data = fs.readFileSync(fileParh);
    const dict = JSON.parse(data.toString())
    return {dict};
  }

  postRecord(dict:Object): any {
    if(!dict){
      return 'dict is null'
    }
    console.log(dict); 
    const fileParh:string = path.join(__dirname, `../../dict/dict.json`);

    function closeFile(err, fd) {
      err && console.error(err);
      fs.close(fd, () => console.log('done'));
    }
    
    fs.open(fileParh, 'w', (err, fd) => {
      err && console.error(err);
      fs.write(fd, JSON.stringify(dict), closeFile);
    });

  }

}
