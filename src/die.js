import React from 'react';
 
export default function Die(props){

let stylee={
    backgroundColor: props.holded ? 'green' : 'white',
    color : props.holded ? 'white' : 'black'
}
    return(
   <div className='die-face' style={stylee} onClick={()=>props.hold(props.id)}>
 <h2>{props.value}</h2>
   </div>
       

    )
}