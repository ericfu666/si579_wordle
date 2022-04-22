import {useEffect, useState} from "react";
// import {Statistic} from 'antd';
import './LeftTime.css';

// const { Countdown } = Statistic;
let startTime = new Date().getTime();
let deadline = '';
let timer = null;
export default function Index(props){
    const {setGameOver, setGameMessage, word, gameOver} = props;
    const [obj, setObj] = useState();
    const currentTime = new Date().getTime();
    const second = parseInt(1200-(currentTime-startTime)/1000);
    if(!second&&!gameOver){
        setGameOver(true);
        setGameMessage({
            status: 'fail',
            message:'Oops! Your time runs out! The answer is ' + word +'!'
        })
        clearInterval(timer);
    }
    useEffect(()=>{
         startTime = new Date().getTime();
         deadline = Date.now() + 1000 * 60 * 20;
         timer = setInterval(()=>{
            setObj({});
        },1000)
    },[])
    if(gameOver) {
        return null;
    }
    return  <div  className='time'>
        {/*<Countdown title="Left Time" value={deadline} format='HH:ss' />*/}
        <span className="title">Left Time:</span>
        <span className="time-child">{parseInt(second/60)<10?
            '0'+parseInt(second/60):parseInt(second/60)}</span>
        <span style={{color:'#000'}}>:</span>
        <span className="time-child">{
            parseInt(second%60)<10?
            '0'+parseInt(second%60):parseInt(second%60)}</span>
    </div>
}