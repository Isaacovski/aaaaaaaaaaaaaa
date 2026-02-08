export const checkGuess = async (guess) => {
  try {
    const response = await fetch('http://localhost:5258/jogo/palpite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ numero: guess }),
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    return { erro: 'Servidor indisponível. Verifique se a API está rodando.' };
  }
};

export const startGame = async () => {
  try {
    await fetch('http://localhost:5258/jogo', { method: 'POST' });
  } catch (error) {
    console.error('API indisponível. Não foi possível iniciar o jogo.');
  }
};
