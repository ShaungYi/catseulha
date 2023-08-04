import { CSSTransition } from 'react-transition-group'
import './fadeAnimation.css'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


export default function FadeAnimation(props) {

    const [inProp, setInProp] = useState(false);


    useEffect(() => {
        setInProp(!inProp)
    }, [props.trigger])

    const onExited = () => {
        setInProp(true)
        props.onExited && props.onExited()
    }



    return (
        <CSSTransition
            in={inProp}
            timeout={200}
            classNames="fade-element"
            unmountOnExit
            onExited={onExited}
            onExiting={props.onExiting}>

            {props.children}

        </CSSTransition>
    )
}