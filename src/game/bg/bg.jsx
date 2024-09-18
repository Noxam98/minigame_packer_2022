import React from 'react';
import bigText from './src/1.svg'
import box from './src/2.svg'
import pack from './src/3.svg'
const Bg = () => {
    return (
        <div style={{
            position: "absolute",
            left: '50%',
            transform: 'translateX(-50%)',
            top:'10px',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center'
        }}>
            <img style={{width: '300px',}} src={pack}/>
            <img  style={{width: '200px',marginTop:'-25px',}} src={box}/>
            <img style={{width: '250px',marginTop:'20px'}}  src={bigText}/>
        </div>
    );
};

export default Bg;