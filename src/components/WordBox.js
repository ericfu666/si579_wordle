import React from 'react';
import './WordBox.css';

function Index({value, colorValue}){
    const styleMap = {
        success:{
            color:'white',
            background: 'green',
            border: '2px solid #e5e7eb'
        },
        error:{
            color:'white',
            background: 'grey',
            border: '2px solid #e5e7eb'
        },
        warning:{
            color:'white',
            background: 'orange',
            border: '2px solid #e5e7eb'
        }
    }
    return value?<div  className='value' style={styleMap[colorValue]}>
                        {value||''}
                   </div>
                : <div  className='no-value' >
                    {value||'A'}
                  </div>
}
export default Index;