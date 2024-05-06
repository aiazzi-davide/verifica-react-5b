import './App.css';
import {useEffect, useState} from 'react';

function App() {
  const [partita, setPartita] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [number, setNumber] = useState();
  const [result, setResult] = useState([]);
  const [name, setName] = useState();

  const handleInput = (e) => {
    setNumber(e.target.value);
  };

  const nome = (e) => {
    setName(e.target.value);
  }

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
    setResult(r);
  }

  async function start(){
    setIsLoading(true);
    
    const response = await fetch('http://localhost:8080/partita', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome: name,
      }),
    });

    const r = await response.json();
    setPartita(r);
    setIsLoading(false);
    setShowForm(true);
  }

  return (
    <div className="App">
      <h2>Indovina Numero</h2>
      <input type='text' onChange={nome} placeholder='inserrisci il nome'/>
      <button onClick = {start}>Nuova partita</button> <br/>
      {showForm &&
      <div>
        <p>
          ID: {partita.id} <br />
          Nome: {partita.nome} <br />
          Tentativi: {result.tentativi || partita.tentativi}
        </p>
        <p>Inserisci un numero da 1 a 100
          <input type='number' onChange = {handleInput} placeholder = 'inserisci un numero'></input>
          <button onClick = {invia}>invia</button>
        </p>
      </div>
      }
      {result.risultato === 0 &&
        <p>Hai indovinato in {result.tentativi}</p> 
      }

      {result.risultato === 1 &&
        <p>Troppo Grande</p>
      }

      {result.risultato === -1 &&
        <p>Troppo Piccolo</p>
      }

    </div>
  );
}

export default App;
