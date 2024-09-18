import React, {useEffect, useState} from 'react';
import _ from "lodash";
import style from './tape.module.css'

const Tape = ({setTapeIsDragged, tapeInLine, setTapeIsGlued}) => {
    const [info, setInfo] = useState({pos: {x: window.innerWidth / 2, y: -100}, isDragged: false})
    const [tapeState, setTapeState] = useState(style.tapeStatic)
    const [resized, setResized] = useState(0)
    useEffect(() => {
            setInfo(prev => {
                return {
                    ...prev, pos: {
                        x: _.random(0, window.innerWidth - 200),
                        y: _.random(0, window.innerHeight - 200)
                    }
                }
            })
        },
        [resized])

    return (
        <>
            <img src={'src/game/tape/src/images/tape.png'}
                 onAnimationStart={() => {
                     setResized(prev => prev + 1)
                 }}
                 className={`${tapeState} ${style.tape}`}
                 style={{
                     left: `${info.pos.x}px`,
                     top: `${info.pos.y}px`
                 }}
                 onMouseDown={(e) => {
                     setTapeIsDragged(true)
                     setTapeState(style.tapeDragged)
                     setInfo(prev => {
                         return {...prev, isDragged: true}
                     })
                 }}
                 onMouseMove={(e) => {
                     // console.log(e)
                     if (info.isDragged) {
                         // console.log(e)
                         setInfo(prev => {

                             return {...prev, pos: {x: e.clientX - 100, y: e.clientY - 70}}
                         })
                     }
                 }}
                 onMouseUp={(e) => {
                     setTapeIsDragged(false)
                     if (tapeInLine) {
                         setTapeState(style.tapeDropped)
                         setTapeIsGlued(prev => prev+1)

                     } else
                         setTapeState(style.tapeStatic)

                     setInfo(prev => {
                         return {...prev, isDragged: false}
                     })
                 }}

                 onTouchStart={(e) => {
                     setTapeIsDragged(true)

                     setTapeState(style.tapeDragged)
                     setInfo(prev => {
                         return {...prev, isDragged: true}
                     })
                 }}
                 onTouchMove={(e) => {
                     // console.log(e)
                     if (info.isDragged) {
                         console.log(e.touches)
                         setInfo(prev => {
                             return {...prev, pos: {x: e.touches[0].clientX, y: e.touches[0].clientY - 30}}
                         })
                     }
                 }}
                 onTouchEnd={(e) => {
                     setTapeIsDragged(false)
                     if (tapeInLine) {
                         setTapeState(style.tapeDropped)
                         setTapeIsGlued(prev => prev+1)
                     } else
                         setTapeState(style.tapeStatic)
                     setInfo(prev => {
                         return {...prev, isDragged: false}
                     })
                 }}
                 draggable={false}
            />
        </>
    );
};

export default Tape;