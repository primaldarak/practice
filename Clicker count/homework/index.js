let clickMeButton = document.querySelector('.me');
let counter = 0;
let nicknameInput;
let bestScoreNickname;
const BEST_SCORE_ALL_TIME = 'bestScoreAllTime';
const bestScoreAllTime = JSON.stringify([]);
const timerTime = 5000;

if (localStorage.getItem(BEST_SCORE_ALL_TIME) === null) {
  localStorage.setItem(BEST_SCORE_ALL_TIME, bestScoreAllTime);
}

if (sessionStorage.getItem('bestScore') === null) {
  sessionStorage.setItem('bestScore', 0);
}

clickMeButton.addEventListener('click', counterIncrease);

function counterIncrease() {
  counter++;
}

function getNickname() {
  nicknameInput = document.getElementById('nickname').value;
  try {
    if (nicknameInput.length === 0) {
      throw 'Empty nickname';
    }
    const bestScoreAllTime = JSON.parse(
      localStorage.getItem(BEST_SCORE_ALL_TIME)
    );

    const userChecker = bestScoreAllTime.find(
      (user) => user.nickname === nicknameInput
    );

    if (!userChecker) {
      const userData = {
        nickname: nicknameInput,
        score: 0
      };
      bestScoreAllTime.push(userData);
      const bestScoreAllTimeString = JSON.stringify(bestScoreAllTime);
      localStorage.setItem(BEST_SCORE_ALL_TIME, bestScoreAllTimeString);
    }

    clickTimer();
  } catch (error) {
    alert(error);
  }
}

function clickTimer() {
  counter = 0;
  setTimeout(() => {
    alert(`You clicked ${counter} times`);
    if (counter > sessionStorage.getItem('bestScore')) {
      sessionStorage.setItem('bestScore', counter);

      const bestScoreAllTime = JSON.parse(
        localStorage.getItem(BEST_SCORE_ALL_TIME)
      );
      const curentUserIndex = bestScoreAllTime.findIndex(
        (user) => user.nickname === nicknameInput
      );
      const currentUserScore = bestScoreAllTime[curentUserIndex].score;

      if (counter > currentUserScore) {
        bestScoreAllTime[curentUserIndex].score = counter;
        const bestScoreAllTimeString = JSON.stringify(bestScoreAllTime);
        localStorage.setItem(BEST_SCORE_ALL_TIME, bestScoreAllTimeString);
      }
    }
  }, timerTime);
}

function bestResultEver() {
  const bestScoreAllTime = JSON.parse(
    localStorage.getItem(BEST_SCORE_ALL_TIME)
  );

  const {
    nickname,
    score
  } = bestScoreAllTime.reduce((prev, current) =>
    prev.score > current.score ? prev : current
  );

  alert(`Best result for the whole time is: ${score} by ${nickname}`);
}

let bestResultAllTimeMeButton = document.querySelector('.best-result-all-time');
bestResultAllTimeMeButton.addEventListener('click', bestResultEver);

let bestResultMeButton = document.querySelector('.best-result');
bestResultMeButton.addEventListener('click', () => {
  alert(`Best result is: ${sessionStorage.bestScore}`);
});

const clearBestResultAllTime = document.querySelector('.clear-best-result-all-time');
clearBestResultAllTime.addEventListener('click', () => {
  localStorage.setItem(BEST_SCORE_ALL_TIME, bestScoreAllTime);
});

const clearBestResult = document.querySelector('.clear-best-result');
clearBestResult.addEventListener('click', () => {
  sessionStorage.setItem('bestScore', 0);
});

const btnStart = document.querySelector('.start');
btnStart.addEventListener('click', getNickname);