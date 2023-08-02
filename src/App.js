import { useRef, useState } from 'react';
import './App.css';
import StartButton from './components/StartButton';
import HappyCatGif from './components/HappyCatGif';
import WordBubble from './components/WordBubble';


function App() {

  const [isGameStarted, setIsGameStarted] = useState(false)

  return (

    <div className="App">

      <HappyCatGif isGameStarted={isGameStarted}></HappyCatGif>
      <StartButton setIsGameStarted={setIsGameStarted}></StartButton>
    </div>
  );
}

export default App;
