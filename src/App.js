import { useRef, useState } from 'react';
import './App.css';
import StartButton from './components/StartButton';
import HappyCatGif from './components/HappyCatGif';


function App() {

  return (

    <div className="App">

      <HappyCatGif></HappyCatGif>
      <StartButton></StartButton>
    </div>
  );
}

export default App;
