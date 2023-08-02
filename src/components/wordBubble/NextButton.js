import { useDispatch, useSelector } from 'react-redux'
import './nextButton.css'
import { contentSliceActions } from '../../redux/store'


export default function NextButton(){

    const isLastContent = useSelector(state => state.content.index === state.content.contents.length - 1)

    const dispatch = useDispatch()

    const onclick = () => {
        

        isLastContent ? window.location.reload():
        dispatch(contentSliceActions.incrementIndex())
        setTimeout(() => {
            dispatch(contentSliceActions.setNextContent())
        }, 200);
    }

    return (
        <button className='next-button' onClick={onclick}>
            {isLastContent ? "Restart" : "Next"}
        </button>
    )
}