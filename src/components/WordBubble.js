import './wordBubble.css'

export default function WordBubble(props) {
    return (

        props.show && 
        <div className="word-bubble">
            {props.text}
            <div className="arrow"></div>
        </div>

    );
};

