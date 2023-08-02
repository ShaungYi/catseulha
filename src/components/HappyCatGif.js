import { useEffect, useRef, useState } from 'react';
import './happyCatGif.css'
import { CSSTransition } from 'react-transition-group';
import WordBubble from './WordBubble';




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
        <div>
            <WordBubble show={showWordBubble} text = {`Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos 
sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
recusandae alias error harum maxime adipisci amet laborum. Perspiciatis 
minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit`}></WordBubble>
            <CSSTransition
                // nodeRef={nodeRef}
                in={inProp}
                timeout={4000}
                classNames="happy-cat-gif"
                onEntered={onEntered}>

                <img src='happyCatGif1.gif' className='happy-cat-gif'></img>

            </CSSTransition>
        </div>

    )
}