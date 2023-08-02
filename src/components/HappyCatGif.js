import { useEffect, useRef, useState } from 'react';
import './happyCatGif.css'
import { CSSTransition } from 'react-transition-group';
import WordBubble from './wordBubble/WordBubble';
import NextButton from './wordBubble/NextButton';




export default function HappyCatGif(props) {

    const [inProp, setInProp] = useState(false);
    const [showWordBubble, setShowWordBubble] = useState(false)

    useEffect(() => {
        props.isGameStarted && setInProp(true)
    }, [props.isGameStarted])


    const onEntered = () => {
        setShowWordBubble(true)
    }

    return (
        <div className='gif-container'>
            <WordBubble show={showWordBubble}></WordBubble>
            <CSSTransition
                // nodeRef={nodeRef}
                in={inProp}
                timeout={1000}
                classNames="happy-cat-gif"
                onEntered={onEntered}>

                <img src='happyCatGif1.gif' className='happy-cat-gif'></img>

            </CSSTransition>
            
        </div>

    )
}