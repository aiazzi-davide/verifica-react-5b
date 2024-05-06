import './App.css';
import {useEffect, useState} from 'react';

function App() {
  const [partita, setPartita] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [number, setNumber] = useState();

  const handleInput = (e) => {
    setNumber(e.target.value);
  };

  async function invia(e){
    const response = await fetch(`http://localhost:8080/partita/${partita.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        numero
    }),
    });

    const r = await response.json();
  }

  async function start(){
    setIsLoading(true);
    
    const response = await fetch('http://localhost:8080/partita', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const r = await response.json();
    setPartita(r);
    setIsLoading(false);
    setShowResult(true);
  }

  return (
    <div className="App">
      <h2>Indovina Numero</h2>
      <button onClick = {start}>Nuova partita</button> <br/>
      {showResult && 
      <div>
        <p>
          ID: {partita.id} <br />
          Tentativi: {partita.tentativi}
        </p>
        <p>Inserisci un numero da 1 a 100
          <input type='number' onChange = {handleInput} placeholder = 'inserisci un numero'></input>
          <button onClick = {invia}>invia</button>
        </p>
      </div>
      }
      

    </div>
  );
}

export default App;
