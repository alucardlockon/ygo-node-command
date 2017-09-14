const readline = require('readline');
const _ = require('lodash');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('welcome to the ygo vrains...');

const commands = [{
    commandName: 'draw',
    func: draw
  },
  {
    commandName: 'readdeck',
    func: readDeck
  }
]
let deck_p1;
let deck_p1_rt;
let deck_p2;
let deck_p2_rt;
const preStr='> ';

readDeck('ABC')
draw()
repl();

function repl() {
  rl.question('input your command:\n', (command) => {
    if (command == 'exit') {
      rl.close();
      return;
    }
    let commandArr = command.split(' ');
    if (commandArr.length == 0 || commandArr[0] == "") {
      repl();
      return;
    }
    let comd = _.find(commands, {
      'commandName': commandArr[0]
    });
    if (comd) comd.func(commandArr[1], commandArr[2], commandArr[3], commandArr[4]);
    else console.log(preStr+'no cmd named "' + commandArr[0] + '" found')
    repl();
  });
}

function readDeck(deckName){
  if(!deckName){
    console.log('please set your deck name.')
    return;
  }
  let dir='deck/[Hui]'+deckName+'.json';
  // fs.openSync(dir, 'r', (err, fd) => {
  //   if (err) {
  //     if (err.code === 'ENOENT') {
  //       console.error(preStr+'file does not exist');
  //       return;
  //     }
  //     throw err;
  //   }
    deck_p1=JSON.parse(fs.readFileSync(dir,'utf8'));
    deck_p1_rt=deck_p1;
  // });
}

function draw(count) {
  if (!count) count = 5;
  console.log(preStr+'draw' + count + 'cards');
  console.log(preStr+'result:'+_.map(_.times(count,x=>_.random(deck_p1_rt.main.length-1)),x=>deck_p1_rt.main[x]).join(','));
}


