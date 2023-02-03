import React from 'react';
import Die from './die';
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'
export default function App(){
const [dice,setDice] = React.useState(randomNumber())
const [tenzie,setTenzie]=React.useState(false)    


let count=0,count2=0
React.useEffect(()=>{
   
    for(let i=0;i<dice.length;i++){
        if(dice[i].isHold === true){
            count++;
        }
    }
    if(count===dice.length){
        for(let i=1;i<dice.length;i++){
            if(dice[i].value === dice[i-1].value){
                count2++;
            }
        }
    }
    if(count2===9){
        setTenzie(true)
        console.log('congratulations, you won!')
    }
},[dice])


function randomNumber(){
        let n=[]
    for(let i=0;i<10;i++){
        n.push({
            value: Math.floor(Math.random()*6)+1,
            isHold: false,
            id: nanoid()
        })
    }    
    return n;    
}

function rollDice(){
   if(tenzie){
    setDice(randomNumber())
    setTenzie(false)
   }else{
    setDice((dice)=>{
        return dice.map(dice=> dice.isHold === true ? dice : {...dice,id: nanoid(),value:Math.floor(Math.random()*6)+1})
        });
   }
    

}

function holdDice(id){
   
       setDice((dice)=>{
     return dice.map((dice)=>{
        return dice.id === id ? {...dice, isHold: !dice.isHold} :dice
      })
       })
    }

   

   const allDices= dice.map(dice=> (
   <Die key={dice.id} value={dice.value} holded={dice.isHold} hold={holdDice} id={dice.id}/>
   ))


   let s={
    height: tenzie===true? "60px":"40px"
   }

    return(
    <main >
        {tenzie && <Confetti/>}
    <div className='container'>
    {allDices}
    </div>
    <button onClick={rollDice} style={s}  className="roll-button">{tenzie===true ? "new game" : "roll"}</button>
    </main>
 )
}