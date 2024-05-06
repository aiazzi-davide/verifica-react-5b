import './App.css';
import {useEffect, useState} from 'react';

function App() {
  const [partita, setPartita] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [number, setNumber] = useState()

  async function start(){
    setIsLoading(true);

    const handleInput = (e) => {
      setNumber(e.target.value);
    };

    const response = await fetch('http://localhost:8080/partita', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const r = await response.json();
    setPartita(r);
    setIsLoading(false);
    setShowResult(true)
  }

  return (
    <div className="App">
      <h2>Indovina Numero</h2>
      <button onClick = {start}>Nuova partita</button> <br/>
      {showResult && 
      <div>
        <p>ID: {partita.id}</p>
        <p>Tentativi: {partita.tentativi}</p>

        <input type='text' onChange = {handleInput} placeholder = 'inserisci un numero'></input>
      </div>
      }
      

    </div>
  );
}

export default App;
