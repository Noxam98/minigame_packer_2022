import React, {useEffect, useRef, useState} from 'react';
import style from './box.module.css'
import _ from 'lodash'

const Box = ({setBoxIsFolded, gameIteration}) => {
    const [edgesStates, setEdgesStates] = useState([false, false, false, false])
    const [edgesStatesChangeTime, setEdgesStatesChangeTime] = useState(new Date())
    const [checkIsFolded, setCheckIsFolded] = useState(false)
    const boxIsClosed = () => {
        return edgesStates.every(edgesState => edgesState)
    }

    const delay = async (ms) => await new Promise(resolve => setTimeout(resolve, ms));

    useEffect(() => {
        setEdgesStatesChangeTime(new Date())
        if (boxIsClosed){
            setTimeout(()=>{
                setCheckIsFolded(true)
            }, 1200)
        }

    }, [edgesStates])

    useEffect(()=>{
        if(checkIsFolded){
            setCheckIsFolded(false)
            if (boxIsClosed()){
                if (new Date() - edgesStatesChangeTime > 1000)
                    setBoxIsFolded(true)
            }
        }
    }, [checkIsFolded])

    useEffect(() => {
        setEdgesStates([false, false, false, false])
    }, [gameIteration])

    return (
        <>
            {
                edgesStates.every(edge => edge) &&
                <div style={{
                    position: "fixed",
                    top: '0',
                    left: '0',
                    height: '100vh',
                    width: '100vw',
                    zIndex: '3'
                }}/>
            }
            <div className={style.wrapper}>

                <div className={style.box}>

                    <div className={edgesStates[3] ? style.boxLeftClosed : style.boxLeftOpen}
                         onClick={() => {

                             setEdgesStates(prev => {
                                 return [prev[0], prev[1], prev[2], !prev[3]]
                             })

                             if (edgesStates[0] || edgesStates[2]) {
                                 setTimeout(() => {
                                     setEdgesStates(prev => {
                                         return [prev[0], prev[1], prev[2], !prev[3]]
                                     })
                                 }, 100)
                             }
                         }

                         }
                    />
                    <div className={edgesStates[1] ? style.boxRightClosed : style.boxRightOpen}
                         onClick={() => {

                             setEdgesStates(prev => {
                                 return [prev[0], !prev[1], prev[2], prev[3]]
                             })

                             if (edgesStates[0] || edgesStates[2]) {
                                 setTimeout(() => {
                                     setEdgesStates(prev => {
                                         return [prev[0], !prev[1], prev[2], prev[3]]
                                     })
                                 }, 100)
                             }
                         }

                         }
                    />
                    <div className={edgesStates[0] ? style.boxTopClosed : style.boxTopOpen}
                         onClick={() => {
                             setEdgesStates(prev => [!prev[0], prev[1], prev[2], prev[3]])
                         }}
                    />
                    <div className={edgesStates[2] ? style.boxDownClosed : style.boxDownOpen}
                         onClick={() => {
                             setEdgesStates(prev => [prev[0], prev[1], !prev[2], prev[3]])
                         }}
                    />

                </div>
            </div>
        </>
    );
};

export default Box;
