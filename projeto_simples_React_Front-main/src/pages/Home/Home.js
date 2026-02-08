import React, { useState, useEffect } from 'react';
import GuessInput from '../../Components/GuessInput/GuessInput';
import FeedbackMessage from '../../Components/FeedbackMessage/FeedbackMessage';
import './Home.css';
import { checkGuess, startGame } from '../../services/gameService';

const Home = () => {
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Inicia o jogo automaticamente ao carregar a tela
  useEffect(() => {
    startGame();
  }, []);

  const handleChange = (e) => {
    setGuess(e.target.value);
  };

  const handleSubmit = async () => {
    if (gameOver) return;

    const number = parseInt(guess, 10);
    if (isNaN(number) || number < 1 || number > 100) {
      setMessage('Por favor, insira um número entre 1 e 100.');
      return;
    }

    const response = await checkGuess(number);

    setAttempts((prev) => prev + 1);

    if (response.novoJogo) {
      setMessage(`🎉 Você acertou em ${attempts + 1} tentativa(s)! Novo jogo iniciado.`);
      setGameOver(true);
    } else if (response.resultado) {
      setMessage(response.resultado);
    } else {
      setMessage('Erro ao processar resposta.');
    }

    setGuess('');
  };

  const handleRestart = async () => {
    await startGame(); // reinicia no backend
    setGuess('');
    setMessage('');
    setAttempts(0);
    setGameOver(false);
  };

  return (
    <div className="home">
      <h1>Adivinhação do Número</h1>
      <p>Digite um número entre 1 e 100 para tentar adivinhar o número gerado pelo sistema.</p>
      
      <GuessInput 
        guess={guess} 
        onChange={handleChange} 
        onSubmit={handleSubmit} 
        disabled={gameOver} 
      />

      <FeedbackMessage message={message} />

      {gameOver && (
        <button onClick={handleRestart} className="button">
          Nova Rodada
        </button>
      )}

      <p>Você tentou {attempts} {attempts === 1 ? 'vez' : 'vezes'}.</p>
    </div>
  );
};

export default Home;
