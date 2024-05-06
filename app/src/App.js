import './App.css';
import {useEffect, useState} from 'react';

function App() {
  const [partita, setPartita] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [number, setNumber] = useState();
  const [risultato, setRisultato] = useState([]);

  const handleInput = (e) => {
    setNumber(e.target.value);
  };

  async function invia(){
    const response = await fetch(`http://localhost:8080/partita/${partita.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        numero: number,
      }),
    });

    const r = await response.json();
    setRisultato(r);
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
    setShowForm(true);
  }

  function result(){
    console.log(risultato.risultato)
    switch (risultato.risultato) {
      case 0:
        return <p>Hai indovinato in {risultato.tentativi}</p> 
      case 1:
        return <p>Troppo Grande</p>
      case -1: 
        return <p>Troppo Piccolo</p>
      default:
        return
    }
  }

  return (
    <div className="App">
      <h2>Indovina Numero</h2>
      <button onClick = {start}>Nuova partita</button> <br/>
      {showForm && 
      <div>
        <p>
          ID: {partita.id} <br />
          Tentativi: {risultato.tentativi || partita.tentativi}
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
