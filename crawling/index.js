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
        const $numwinP = $("div.num").children("p");
        console.log($numwinP.find('span').eq(0).text());
        console.log($numwinP.find('span').eq(1).text());
        console.log($numwinP.find('span').eq(2).text());
        console.log($numwinP.find('span').eq(3).text());
        console.log($numwinP.find('span').eq(4).text());
        console.log($numwinP.find('span').eq(5).text());

        // $numwinP.each(function (i, elem) {
        //     const span = $(this).find('.ball1').text()
        //     console.log('span',span);
        // });
        const $tbody = $("table.tbl_data tbody");
        const $firstTr = $tbody.find('tr').eq(0);
        const $secondTr = $tbody.find('tr').eq(1);
        const $ThirdTr = $tbody.find('tr').eq(2);
        const $fourthTr = $tbody.find('tr').eq(3);
        const $fifthTr = $tbody.find('tr').eq(4);

        console.log($fourthTr.find('td').eq(0).text());
        console.log($fourthTr.find('td').eq(1).text());
        console.log($fourthTr.find('td').eq(3).text());

        // $tbodyTr.each(function (i, elem) {
        //     const td = $(this).find('tr');
        //     ulList[i]={
        //         grade:anyToUtf8(td.eq(0).text()),
        //         gradeTotSellamnt:anyToUtf8(td.eq(1).text()),
        //         winamnt:anyToUtf8(td.eq(3).text())
        //     }
        //     // log('순위',anyToUtf8(td.eq(0).text()));
        //     // log('등위별 총 당첨금액',anyToUtf8(td.eq(1).text()));
        //     // log('당첨금액',anyToUtf8(td.eq(3).text()));
        // });
        // console.log(ulList);
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
