const axios = require('axios');
const fs = require('fs');
const lodash = require('lodash');
const wordData = require('./wordList');
const existJson = fs.existsSync('./wordList.json');
if(existJson){
    fs.unlinkSync('./wordList.json');
}
let fd = fs.openSync('./wordList.json','w');
//同步写入文件
fs.writeFileSync(fd,'export default {');
let rightWordCount = 0;
// axios.get('https://cdn.jsdelivr.net/gh/lyc8503/baicizhan-word-meaning-API/data/list.json')
//     .then((res)=>{
//     for(let item of lodash.get(res,'data.list')){
    for(let item of Object.keys(wordData)){
        if(item.length===5&&/[a-zA-Z]{5}/.test(item)){
            if(rightWordCount!==0){
                fs.writeFileSync(fd,`,\r\n"${item}":true`);
            }else {
                fs.writeFileSync(fd, `\r\n"${item}":true`);
            }
            rightWordCount++;
        }
    }
    console.log("共有"+rightWordCount+"个合法单词");
    fs.writeFileSync(fd,'\r\n}');
    fs.close(fd);
    const readStream = fs.createReadStream('./wordList.json');
    const writeStream = fs.createWriteStream('./src/appWordData.js');
    readStream.pipe(writeStream);
// })