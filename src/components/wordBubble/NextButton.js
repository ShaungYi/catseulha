import { useDispatch, useSelector } from 'react-redux'
import './nextButton.css'
import { contentSliceActions } from '../../redux/store'


export default function NextButton() {


    const dispatch = useDispatch()

    const resetBubbleWidth = () => {
        const bubble = document.getElementById('word-bubble')
        bubble.style.width = 'auto'
    }

    const onclick = () => {
        dispatch(contentSliceActions.incrementIndex())
        setTimeout(() => { 
            dispatch(contentSliceActions.setIsShowImages(false)) 
            resetBubbleWidth()
        }, 200)


    }

    return (
        <button className='next-button' onClick={onclick}>
            Next
        </button>
    )
}