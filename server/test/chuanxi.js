const fs = require('fs')
const readline = require('readline')

const db = require('../db/dbConnection')
db.dbConnection();
const MagicBook = require('../db/models/magicBook')

let stream = fs.createReadStream(__dirname + '/chuanxi.json', {flags : "r", encoding : 'utf8'}); 

const read = readline.createInterface({
    input: stream,
    //output: process.stdout
})

let count = 0

stream.on("error", function() {
    console.log("Open file error!")
})

async function save2DB(all) {
    console.log("db 章数" + all.length)
    let delres = await MagicBook.deleteMany({bookName: '传习录'}).exec()
    console.log("Delete res: ", delres)

    let count = 0 ;
    for (c in all) {
        let fras = all[c].fras
        for (f in fras) {
            let book = new MagicBook({
                bookName: '传习录',
                author: '王阳明',
                seqNo: fras[f].seqNo,
                chapter: all[c].cs,
                caption:  all[c].csdesc,
                subHead: fras[f].head,
                content: fras[f].ptext,
                translate: fras[f].trans,
                comment: fras[f].answ
            })
            let res = await book.save()
            count++
            console.log(count + ": save db: ", res)
        }
    }

    console.log("SAVE DB complete!") 
    let total = await MagicBook.count({bookName: '传习录'}).exec()
    console.log(total, count)
}

stream.on("end", function() {
    console.log("Read file End!")
    console.log(count)
    console.log("章数" + all.length)
    let fcount = 0
    for (c in all) {
        console.log("cs: ", all[c].cs )
        console.log("csdesc: " , all[c].csdesc)
        let fras = all[c].fras
        for (f in fras) {
            console.log("seg: ", fras[f])
            fcount++
        }
    }
    console.log("Chapter count:", chapterCount, all.length)
    console.log("Yuandian count:", yuandianCount, fcount)

    let str = JSON.stringify(all, "", "\t")
    fs.writeFile(__dirname + '/chuanxinew.json', str, (err)=>{
        if (err) {
            console.log("Write error!", err)
        }
    })

    save2DB(all)
})

// stream.on('data', function(data){
//     count++
//     console.log(count + ":" + data)
// })
/*
all: [
    chapter: {
        cs : 第x章
        csdesc: xxx
        fras: [
            segment: {
                head: 1、
                seqNo: 1
                ptext: 原典 
                trans: 译文
                answ: 解读
            }
        ]
    },
    chapter: {

    }
]
*/
let all = []
let chapter = {cs:'', csdesc:''}
let fras = []
chapter.fras = fras
let lastTitle = ''
let stage = ''
let buff = ''
let segments = {
    head:'', seqNo:1,ptext:'',trans:'',answ:''
}
all.push(chapter)
fras.push(segments)
let chapterCount = 0, yuandianCount =0
read.on('line', (line) => {
    count++ 
    line = line.trim()
    if (line.length === 0) {
        return;
    }

    if (line.startsWith('第')) {
        if (chapter.cs !== undefined && chapter.cs.length > 0) {
            chapter = {cs:'', csdesc:''}
            fras = []
            chapter.fras = fras
            all.push(chapter)
        }
        chapterCount++
        chapter.cs = line
        stage = 'cs'
        return;
    }

    if (line.startsWith('<h3')) {
        var tmptitle = kickOffTags(line)
        if (tmptitle.length == 0) return;
        if (segments.head !== undefined && segments.head.length > 0) {
            segments = {head:'', seqNo:0,ptext:'',trans:'',answ:''}
            fras.push(segments)
        }
        segments.head = tmptitle
        stage = 'head'
        return;
    }
    if (line.startsWith('<strong')) {
        var tmptext = kickOffTags(line)
        if (tmptext.length === 0) return;
        if (tmptext === '原典') {
            if (stage !== 'head') {
                console.log("Error: ", count)
            }
            stage = 'ptext'
            yuandianCount++
            segments.seqNo = yuandianCount
        } else if (tmptext === '译文') {
            stage = 'trans'
        } else if (tmptext === '解读') {
            stage = 'answ'
        } else {
            console.log("error strong tag: " + line , count)
        }
        return;
    }
    var buff = kickOffTags(line)
    if (buff.length === 0) return;
    if (stage === 'cs') {
        if (chapter.csdesc.length === 0) {
            chapter.csdesc = buff;
        } else {
            chapter.csdesc += "\n" + buff;
        }
    } else if (stage === 'head' || stage === 'ptext') {
        if (segments.ptext.length === 0) {
            segments.ptext = buff;
        } else {
            segments.ptext += "\n" + buff;
        }
    } else if (stage === 'trans') {
        if (segments.trans.length === 0) {
            segments.trans = buff;
        } else {
            segments.trans += "\n" + buff;
        }
    } else if (stage === 'answ') {
        if (segments.answ.length === 0) {
            segments.answ = buff;
        } else {
            segments.answ += "\n" + buff;
        }
    } else {
        console.log("error stage: " + stage ,  buff)
    }
})

function kickOffTags(line) {
    let exist = true
    do {
        let t1 = line.indexOf('<')
        let t2 = line.indexOf('>')
        if (t1 === -1 || t2 === -1 || t1 > t2) {
            if (t1 > t2) {
                console.log("ERROR: t1 t2 " , line)
            }
            exist = false
        } else {
            if (t1 === 0) {
                line = line.slice(t2+1)
            } else {
                line = line.slice(0, t1) + line.slice(t2+1)
            }
        }
    } while(exist)

    // exits = true 
    // do {
    //     let t1 = line.indexOf("href")
    //     let t2 = line.indexOf('>')
    //     if (t1 === -1 || t2 === -1 || t1 > t2) {
    //         if (t1 > t2) {
    //             console.log("ERROR: t1 t2 " , line)
    //         }
    //         exist = false
    //     } else {
    //         if (t1 === 0) {
    //             line = line.slice(t2+1)
    //         } else {
    //             line = line.slice(0, t1) + line.slice(t2+1)
    //         }
    //     }
    // } while (exist)

    if (line.indexOf('>') >= 0 || line.indexOf('<') >=0 || line.indexOf('99') >=0  || (line.indexOf('s') >=0 && line.indexOf('class') < 0)) {
        console.log(count, line)
    }

    // console.log("KICKOFF:", line)
    return line;
}