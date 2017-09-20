const readline = require('readline');
const _ = require('lodash');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('welcome to the ygo vrains...');

const commands = [
  {
    commandName: 'draw',
    func: draw
  },
  {
    commandName: 'readdeck',
    func: readDeck
  },
  {
    commandName: 'draw-random',
    func: drawRandom
  },
  {
    commandName: 'shuffle',
    func: shuffle
  },
  {
    commandName: 'hand',
    func: hand
  }
]
let deck_p1;
let deck_p1_rt;
let hand_p1;
let grav_p1;
let deck_p2;
let deck_p2_rt;
let hand_p2;
let grav_p2;

const preStr='> ';

readDeck('EMmss')
shuffle()
draw(5)
hand()
repl()

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
    hand_p1=[];
    grav_p1=[];
  // });
}

function shuffle() {
  deck_p1_rt.main=_.shuffle(deck_p1_rt.main);
}

function hand() {
  console.log(preStr+'your hand cards : '+hand_p1.join(','));
}

function drawRandom(count) {
  if (!count) count = 5;
  console.log(preStr+'draw ' + count + ' cards');
  console.log(preStr+'result:'+_.map(_.times(count,x=>_.random(deck_p1_rt.main.length-1)),x=>deck_p1_rt.main[x]).join(','));
}

function draw(count) {
  if (!count) count = 1;
  console.log(preStr+'draw ' + count + ' cards');
  console.log(preStr+'result:'+_.times(count,drawOne).join(','));
}

function drawOne() {
  const card=_.head(deck_p1_rt.main);
  deck_p1_rt.main.shift();
  hand_p1.push(card);
  return card;
}

