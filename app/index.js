const execSync = require('child_process').execSync
  , fs = require('fs')
  , express = require('express')
  , app = express()

app.set("view engine", "ejs")

app.get('/', function (req, res) {

  let result, q

  if (req.query.q) {

    q = req.query.q.replace(/\s+/, ' ').trim()

    const words = q.toLowerCase().split(' ')
    console.log(words)

    const splited_words = words.map(word => {

      while (word.match(/[^\s][^\s]/)) {
        word = word.replace(/([^\s])([^\s])/, () => RegExp.$1 + ' ' + RegExp.$2)
      }

      return word
    })

    const file = "./tmp/" + Date.now().toString() + ".txt"

    fs.writeFileSync(file, splited_words.join("\n"))


    const SLEARP_BIN = "./data/slearp_0.96_noParallel/slearp"
      ,
      MODEL_FILE = "./data/test.char_unit.align.ssmcw.ploss.C1000.b0.01.initVar1.trainNbest5.beam50.Context.Chain.11cngram.Joint.6jngram.sc0.8"
      ,
      RULE_FILE = "./data/test.char_unit.align.ssmcw.ploss.C1000.b0.01.initVar1.trainNbest5.beam50.Context.Chain.11cngram.Joint.6jngram.sc0.rule"


    result = execSync(`${SLEARP_BIN} -r ${MODEL_FILE} -rr ${RULE_FILE} -e ${file}`).toString('utf8');
    console.log(result)

    result = result
      .split(/\n/)
      .filter(res => !!res)
      .map(res => res.split(/\t/)[1].split(/\||\:/).join(''))
      .join(' ')

    fs.unlinkSync(file)
  }

  res.render("index.ejs", {result: result, q: q})
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))