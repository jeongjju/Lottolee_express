const axios = require('axios');
const cheerio = require('cheerio');
const { Iconv } = require("iconv");
const jschardet = require('jschardet');
const log = console.log;




const getHtml= async () => {
        try {
            return await axios.get("https://dhlottery.co.kr/gameResult.do?method=byWin&wiselog=H_C_1_1");
        } catch (error) {
            console.error(error);
        }
    };

getHtml()
    .then(html => {
        let ulList = [];
        const $ = cheerio.load(html.data);
        const $bodyList = $("table.tbl_data tbody").children("tr");
        $bodyList.each(function (i, elem) {
            const td = $(this).find('td');
            ulList[i]={
                grade:anyToUtf8(td.eq(0).text()),
                gradeTotSellamnt:anyToUtf8(td.eq(1).text()),
                winamnt:anyToUtf8(td.eq(3).text())
            }
            // log('순위',anyToUtf8(td.eq(0).text()));
            // log('등위별 총 당첨금액',anyToUtf8(td.eq(1).text()));
            // log('당첨금액',anyToUtf8(td.eq(3).text()));
        });
        console.log(ulList);
    });



function anyToUtf8(str) {
    const {encoding} = jschardet.detect(str);
    // console.log("source encoding = " + encoding);
    const iconv = new Iconv(encoding, 'utf-8//translit//ignore');
    return iconv.convert(str).toString();
}

function lastStrRemove(str){
    return str.slice(0,-1);
}

function getNumString(str) {
    var rtn = parseFloat(str.replace(/,/gi, ""));
    if (isNaN(rtn)) {
        return 0;
    }
    else {
        return rtn;
    }
}
