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
  },
  {
    commandName: 'field',
    func: showfield
  },
  {
    commandName: 'set',
    func: set
  },
  {
    commandName: 'find',
    func: find
  },
  {
    commandName: 'grav',
    func: showgrav
  }
]
let deck_p1;
let deck_p1_rt;
let hand_p1;
let grav_p1;
let rid_p1;
let deck_p2;
let deck_p2_rt;
let hand_p2;
let grav_p2;
let rid_p2;
let field = {
  ex1:null,
  ex2:null,
  fm1:null,
  fm2:null,
  mo1_1:null,
  mo1_2:null,
  mo1_3:null,
  mo1_4:null,
  mo1_5:null,
  ma1_1:null,
  ma1_2:null,
  ma1_3:null,
  ma1_4:null,
  ma1_5:null,
  mo2_1:null,
  mo2_2:null,
  mo2_3:null,
  mo2_4:null,
  mo2_5:null,
  ma2_1:null,
  ma2_2:null,
  ma2_3:null,
  ma2_4:null,
  ma2_5:null,
}

const preStr='> ';

readDeck('EMmss')
shuffle()
draw(5)
hand()
showfield()
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

function showfield() {
  console.log(preStr+'field : ' + getFieldStr());
}

function showgrav() {
  console.log(preStr+'grav : ' + grav_p1.join(','));
}

function getFieldStr(){
  let str='';
  for(let a in field){
    if(a=='ex1'||a=='fm1'||a=='ma1_1'||a=='mo1_1'||a=='ma2_1'||a=='mo2_1') str+='\n'
    str+= a+":"+field[a]+" ";
  }
  return str;
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

function set(pos,pos2) {
  if(!pos||!pos2){
    console.log('need param');
    return;
  }
  let from,to;
  if(pos.startsWith('h')){
    const index=_.toNumber(pos.slice(1))-1;
    from=hand_p1[index]
    hand_p1.splice(index,1)
  }else{
    from=field[pos]
    field[pos]=null
  }
  if(pos2.startsWith('h')){
    const index=_.toNumber(pos2.slice(1))-1;
    to=hand_p1[index]
    hand_p1[index]=from
  }else if(pos2.startsWith('g')){
    grav_p1.push(from)
  }else{
    to=field[pos2]
    field[pos2]=from
  }
  console.log(preStr+' set '+from+' => '+to)
  hand();
  showfield();
}

function find(name){
  const index=_.indexOf(deck_p1_rt.main,name);
  hand_p1.push(deck_p1_rt.main[index])
  deck_p1_rt.main.splice(index,1);
  shuffle();
  hand();
}

