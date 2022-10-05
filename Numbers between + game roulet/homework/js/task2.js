let casinoStart = confirm('Do you want to play a game?');
let maxRandom;
let gameNumber;
let userNumber;
let continueGame = true;
let restartGame = true;
let totalPrize = 0;
const minRandom = 0;
const maxRandomStart = 8;
const attempts = 3;
const addRandom = 4;
let maxWin = 100;
let nextMaxWin;
const winSlice = 2;
let i;
if (!casinoStart) {
  alert('You did not become a billionaire, but can.');
} else {
  while (restartGame) {
    totalPrize = 0;
    let j = 0;
    continueGame = true;
    while (continueGame) {
      maxRandom = maxRandomStart + addRandom * j;
      gameNumber = Math.floor(minRandom + Math.random() * (maxRandom + 1 - minRandom));
      nextMaxWin = maxWin * Math.pow(winSlice, j)
      for (i = 0; i < attempts; i++) {
        userNumber = Number(prompt(`Choose a roulette pocket number from ${minRandom} to ${maxRandom}
          Attempts left: ${attempts-i}
          Total prize: ${totalPrize}$
          Posiible prize on current attempt: ${nextMaxWin/ Math.pow(winSlice,i)}$`));
        if (userNumber === gameNumber) {
          totalPrize += nextMaxWin / Math.pow(winSlice, i);
          alert(`Congratulation, you won!   Your prize is: ${totalPrize}$.`);
          continueGame = confirm(`Do you want to continue?`);
          j++;
          break;
        }
        if (i === winSlice) {
          continueGame = false;
        }
      }
    }
    if (!continueGame) {
      alert(`Thank you for your participation. Your prize is: ${totalPrize}$`)
      restartGame = confirm(`Do you want to play again?`)
    }
  }
}