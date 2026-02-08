import React from 'react';
import './GuessInput.css';


const GuessInput = ({ guess, onChange, onSubmit, disabled }) => (
  <form
    className="guess-input"
    onSubmit={(e) => {
      e.preventDefault(); 
      onSubmit();
    }}
  >
    <input
      type="number"
      value={guess}
      onChange={onChange}
      min="1"
      max="100"
      placeholder="Seu palpite"
      disabled={disabled}
    />
    <button type="submit" disabled={disabled}>
      Enviar
    </button>
  </form>
);

export default GuessInput;
