import {useEffect, useState, useRef} from "react";
import KeyButton from './components/KeyButton';
import WordBox from "./components/WordBox";
import wordListData from "./appWordData";
import wordListDataSmall from "./appWordDataSmall";
import {Alert, Button, Modal} from 'antd';
import LeftTime from './components/LeftTime';
import { useHover } from 'ahooks';
import './App.css';
// const wordList = Object.keys(wordListData);
const wordListSmall = Object.keys(wordListDataSmall);

let word = '';
function getRandomChar(){
    const str = 'QWERTYUIOPASDFGHJKLZXCVBNM';
    return str.charAt(parseInt(str.length*Math.random()));
}
function getKey(word){
    let key = '';
    for(let i=0;i<9;i++){
        key+=getRandomChar();
        if(i===2){
            key+=word;
        }
    }
    return key;
}
function App() {
      const lineOne = 'QWERTYUIOP';
      const lineTwo = 'ASDFGHJKL';
      const lineThree = 'ZXCVBNM';
      const ref = useRef(null);
      const isHovering = useHover(ref);
      const [obj, setObj] = useState({});
      const [errorMassage, setErrorMassage] = useState('');
      const [globalColorObj, setGlobalColorObj] = useState({});
      const [gameMessage, setGameMessage] = useState({});
      const [colorObj, setColorObj] = useState({});
      const [startGame, setStartGame] = useState(false);
      const [gameOver, setGameOver] = useState(false);
      const [position, setPosition] = useState({x:0,y:0});
      const [secretKey, setScretKey] = useState('');
      useEffect(()=>{
          setScretKey(getKey(word))
      },[word])
      const add = (value)=>{
          setErrorMassage('');
          if(position.x===5) return;
          obj[position.y+','+position.x] = value;
          position.x = position.x +1;
          setPosition({...position});
          setObj({...obj});
      }
      const handleDelete = ()=>{
          setErrorMassage('');
          if(position.x===0) return;
          position.x = position.x -1;
          obj[position.y+','+position.x] = undefined;
          setObj({...obj});
      }
      const submit=()=>{
          setErrorMassage('');
          if(position.x!==5){
              setErrorMassage('Please input the complete word!')
              return;
          }

          let wordCheck = '';
          for(let x=0;x<5;x++){
              wordCheck += obj[position.y+','+x];
          }
          if(!wordListData[wordCheck.toLowerCase()]){
              setErrorMassage('This is not a valid word!')
              return;
          }
          let successCount = 0;
          for(let x=0;x<5;x++){
              if(word.includes(obj[position.y+','+x])){
                  if(word.charAt(x)===obj[position.y+','+x]){
                      colorObj[position.y+','+x]  = 'success';
                      globalColorObj[obj[position.y+','+x]] =  'success';
                      successCount ++;
                  }else{
                      colorObj[position.y+','+x]  = 'warning';
                      globalColorObj[obj[position.y+','+x]] =  'warning';
                  }
              }else{
                  colorObj[position.y+','+x]  = 'error';
                  globalColorObj[obj[position.y+','+x]] =  'error';
              }
          }
          if(successCount===5){
              setGameOver(true);
              setGameMessage({
                  status: 'success',
                  message:'Congratulations! You just spent '+(position.y+1)+' times to find the word!'
              })
              return;
          }
          position.x = 0;
          position.y = position.y+1;
          setPosition({...position});
          setColorObj({...colorObj});
          setGlobalColorObj({...globalColorObj})
          if(position.y===6) {
              setGameOver(true);
              setGameMessage({
                  status: 'fail',
                  message:'Oops! Your have reached maximum guess attempts! The answer is ' + word +'!'
              })
          }
      }
      const start=()=>{
          setStartGame(false);
          setObj({});
          setGameMessage({});
          setColorObj({});
          setStartGame(false);
          setGameOver(false);
          setPosition({x:0,y:0})
          setGlobalColorObj({});
          setTimeout(()=> {
              word = wordListSmall[parseInt(wordListSmall.length * Math.random())].toUpperCase();
              debugger
              if(!wordListData[word.toLowerCase()]){
                  start();
                  return;
              }
              setStartGame(true);
          },100);
      }
      if(!startGame){
          return <div className="App">
              <Button
                  type='primary'
                  onClick={()=>{start()}}
                  style={{marginTop:300,width: 150,height:80,fontSize:18,fontWeight:'bolder'}}
              >
                  Start Game
              </Button>
          </div>
      }
      return (
        <div className="App">
         {errorMassage&&<Alert
            message="Error Info"
            description={errorMassage}
            type="error"
            closable
        />}
        <Modal title="GAME RESULT"
               visible={gameOver}
               onOk={()=>start()}
               onCancel={()=>setStartGame(false)}
               okText='Play Again'
               cancelText='Exit'
        >
            <div style={{fontWeight:'bolder',fontSize:16}}>
                <Alert
                    message={gameMessage.status==='success'?"Win the game":"Lost the game"}
                    description={gameMessage.message}
                    type={gameMessage.status==='success'?"success":'error'}
                    showIcon
                />
            </div>
        </Modal>
          <LeftTime
              setGameOver={setGameOver}
              gameOver={gameOver}
              setGameMessage={setGameMessage}
              word={word}
          />
          <div>
              {Array.from({length:6}).map((item,y)=>{
                  return <div style={{marginTop:5}}>
                      {Array.from({length:5}).map((item,x)=>{
                         return <WordBox value={obj[y+','+x]} colorValue={colorObj[y+','+x]}/>
                      })}
                  </div>
              })}
          </div>
          <div className='keyboard'>
              <div >
                  {lineOne.split('').map(value=><KeyButton colorValue={globalColorObj[value]} onClick={()=>{add(value)}} value={value} />)}
              </div>
              <div>
                  {lineTwo.split('').map(value=><KeyButton colorValue={globalColorObj[value]}  onClick={()=>{add(value)}} value={value}/>)}
              </div>
              <div>
                  {lineThree.split('').map(value=><KeyButton colorValue={globalColorObj[value]} onClick={()=>{add(value)}} value={value}/>)}
                  <KeyButton   onClick={()=>{handleDelete()}} value={'Delete'} width={60}/>
              </div>
              <div>
                  <KeyButton onClick={()=>{submit()}} value={'Submit'} width={120}/>
              </div>
              <div ref={ref}>
                  secret key:{isHovering&&secretKey}
              </div>
          </div>
        </div>
      );
}

export default App;
