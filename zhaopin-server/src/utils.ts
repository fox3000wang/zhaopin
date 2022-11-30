
export function toInt(str){
    return str ? parseInt(str.replace(/,/g,'')) : '';
}

// '2021-10-01,2021-10-10' => '10.01-10.10'
export function toDate(str){
  return str ? str.replace(/202\d-/g,'').replace(/-/g,'.').replace(/,/g,'-') : '';
}