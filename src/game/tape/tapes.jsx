import React, {useEffect, useRef, useState} from 'react';
import style from './tape.module.css'
import Tape from "./tape.jsx";

const Line = ({mousePos, tapeIsDragged, setTapeInLine}) => {
    const [freeTapePositions, setFreeTapePositions] = useState([true, true])
    const [mouseInLine, setMouseInLine] = useState(false)
    const lineRef = useRef()
    useEffect(() => {
        const posLine = {
            x: lineRef.current.offsetLeft - lineRef.current.offsetWidth / 2,
            y: lineRef.current.offsetTop - lineRef.current.offsetHeight / 2,
            xEnd: lineRef.current.offsetLeft + lineRef.current.offsetWidth / 2,
            yEnd: lineRef.current.offsetTop + lineRef.current.offsetHeight / 2,
            width: lineRef.current.offsetWidth,
            height: lineRef.current.offsetHeight
        }

        if (mousePos.x > posLine.x && mousePos.x < posLine.xEnd &&
            mousePos.y > posLine.y && mousePos.y < posLine.yEnd) {
            // console.log(mousePos)
            setMouseInLine(true)
            if (tapeIsDragged){
                setTapeInLine(true)
            }


        } else {
            setTapeInLine(false)
            setMouseInLine(false)
        }
    }, [mousePos])

    return (
        <div ref={lineRef}
             className={`${tapeIsDragged ? style.lineLight : style.lineStatic} ${mouseInLine && tapeIsDragged && style.lineHovered}`}
        >
        </div>
    )
}

const Tapes = ({setTapeIsGlued}) => {
        const [tapeInLine, setTapeInLine] = useState(false)
        const [mousePos, setMousePos] = useState({x: null, y: null})
        const [tapeIsDragged, setTapeIsDragged] = useState(false)

        const positionSetter = (e) => {
            if (e.clientX)
                setMousePos({x: e.clientX, y: e.clientY})
            else
                setMousePos({x: e.touches[0].clientX, y: e.touches[0].clientY})

        }
        useEffect(() => {
            document.addEventListener('mousemove', positionSetter)
            document.addEventListener('touchmove', positionSetter)
            return () => {
                document.removeEventListener('mousemove', positionSetter)
                document.removeEventListener('touchmove', positionSetter)
            }
        }, [])

        return (
            <div>
                <Line tapeIsDragged={tapeIsDragged} mousePos={mousePos} setTapeInLine={setTapeInLine}/>
                <Tape setTapeIsGlued={setTapeIsGlued} setTapeIsDragged={setTapeIsDragged} tapeInLine={tapeInLine} />
                <Tape setTapeIsGlued={setTapeIsGlued} setTapeIsDragged={setTapeIsDragged} tapeInLine={tapeInLine}/>
            </div>
        );
    }
;

export default Tapes;