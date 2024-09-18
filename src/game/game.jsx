import React, {useEffect, useState} from 'react';
import Box from "./box/box.jsx";
import Tapes from "./tape/tapes.jsx";
import GameFinished from "./gameFinished/gameFinished.jsx";
import Bg from "./bg/bg.jsx";

const Game = () => {
    const [boxIsFolded, setBoxIsFolded] = useState(false)
    const [tapeIsGlued, setTapeIsGlued] = useState(null)
    const [gameFinished, setGameFinished] = useState(false)

    const [gameIteration, setGameIteration] = useState(0)

    useEffect(()=>{
        if (boxIsFolded)
            setTimeout(()=>{
                setTapeIsGlued(0)
            }, 1000)
    }, [boxIsFolded])

    useEffect(()=>{
        setBoxIsFolded(false)
        setTapeIsGlued(null)
        setGameFinished(false)

    }, [gameIteration])

    useEffect(()=>{
        if (tapeIsGlued === 2){
            setTimeout(()=>{
                setGameFinished(true)
            }, 1000)
        }
    }, [tapeIsGlued])

    return (
        <div>
            <Bg/>
            <Box setBoxIsFolded={setBoxIsFolded} gameIteration={gameIteration}/>
            {
                tapeIsGlued !== null &&
                <>
                    <Tapes setTapeIsGlued={setTapeIsGlued}/>
                </>
            }
            {   gameFinished
                 &&
                <GameFinished SetGameIteration={setGameIteration}></GameFinished>
            }
        </div>
    );
};

export default Game;