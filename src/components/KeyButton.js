import React from 'react';
import {Button} from 'antd';
import './KeyButton.css';

function Index({value, onClick, width, colorValue}){
    const styleMap = {
        success:{
            color:'white',
            background: 'green'
        },
        error:{
            color:'white',
            background: 'grey'
        },
        warning:{
            color:'white',
            background: 'orange'
        }
    }
    return <span><Button type="primary"
                         className='button'
                         onClick={onClick}
                         style={{marginLeft:3,width:width||35,...(styleMap[colorValue]||{})}} >
        {value}
    </Button></span>
}
export default Index;