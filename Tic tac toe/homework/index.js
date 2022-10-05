document.addEventListener('DOMContentLoaded', () => {

  const container = document.getElementsByClassName('container')
  const playerDisplay = document.querySelector('.display-player');
  const resetBtn = document.querySelector('#reset');
  const announcer = document.querySelector('.announcer');

  let gameBoard = ['', '', '', '', '', '', '', '', ''];
  let currentPlayer = 'X';
  let isGameActive = true;

  const PLAYERX_WON = 'PLAYERX_WON';
  const PLAYERO_WON = 'PLAYERO_WON';
  const TIE = 'TIE';

  for (let i = 0; i < 9; i++) {
    let div = document.createElement('div')
    div.className = 'tile'
    container[0].appendChild(div)
  }

  const tiles = Array.from(document.querySelectorAll('.tile'));

  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  function resultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
      const winCondition = winConditions[i]
      const a = gameBoard[winCondition[0]]
      const b = gameBoard[winCondition[1]]
      const c = gameBoard[winCondition[2]]

      if (a === '' || b === '' || c === '') {
        continue
      }
      if (a === b && b === c) {
        roundWon = true
        break
      }

    }
    if (roundWon) {
      changeWinner(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON)
      isGameActive = false
      return
    }
    if (!gameBoard.includes('')) {
      changeWinner(TIE)
    }
  }

  const changeWinner = (type) => {
    switch (type) {
      case PLAYERO_WON:
        announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
        break;
      case PLAYERX_WON:
        announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
        break;
      case TIE:
        announcer.innerText = 'Tie';
    }
    announcer.classList.remove('hide')
  }

  const isValidAction = (tile) => {
    if (tile.innerText === 'X' || tile.innerText === 'O') {
      return false
    }
    return true
  }

  const updateBoard = (index) => {
    gameBoard[index] = currentPlayer
  }

  const changePlayer = () => {
    playerDisplay.classList.remove(`player${currentPlayer}`)
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
    playerDisplay.innerText = currentPlayer
    playerDisplay.classList.add(`player${currentPlayer}`)
  }

  const userChoise = (tile, index) => {
    if (isValidAction(tile) && isGameActive) {
      tile.innerText = currentPlayer
      tile.classList.add(`player${currentPlayer}`);
      updateBoard(index);
      resultValidation();
      changePlayer();
    }
  }

  const resetBoard = () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true
    announcer.classList.add('hide')

    if (currentPlayer === 'O') {
      changePlayer()
    }

    tiles.forEach(tile => {
      tile.innerText = ''
      tile.classList.remove('playerX')
      tile.classList.remove('playerO')
    });
  }

  tiles.forEach((tile, index) => {
    tile.addEventListener('click', () => {
      userChoise(tile, index)
    })
  })

  resetBtn.addEventListener('click', resetBoard);

  const avatarContainer = document.querySelectorAll('.avatar-container')


  for (let i = 0; i < avatarContainer.length; i++) {
    avatarContainer[i].ondragover = allowDrop;
    avatarContainer[i].ondrop = drop;
  }

  function allowDrop(event) {
    event.preventDefault()
  }

  function denyDrop(event) {
    event.stopPropagation()
  }

  const avatarIcon = document.querySelectorAll('.avatar-icon')
  for (let i = 0; i < avatarIcon.length; i++) {
    avatarIcon[i].setAttribute('id', `${i+1}`)
    avatarIcon[i].ondragstart = drag;
  }

  function drag(event) {
    event.dataTransfer.setData('id', event.target.id)
  }

  function drop(event) {
    let itemId = event.dataTransfer.getData('id')
    event.target.append(document.getElementById(itemId))
    check()
  }

  function check() {
    for (let i = 0; i < avatarContainer.length; i++) {
      if (avatarContainer[i].childNodes.length === 1) {
        avatarContainer[i].ondragover = denyDrop;
      }
    }
  }

  let tileId = 0
  tiles[tileId].classList.add('active')

  document.addEventListener('keyup', (e) => {
    switch (e.key) {
      case 'ArrowLeft':
        if (tileId !== 0) {
          tiles[tileId].classList.remove('active')
          tiles[tileId - 1].classList.add('active')
          tileId--
        }
        break
      case 'ArrowRight':
        if (tileId < 8) {
          tiles[tileId].classList.remove('active')
          tiles[tileId + 1].classList.add('active')
          tileId++
        }
        break
      case 'Enter':
        userChoise(tiles[tileId], tileId)
        break
    }
  })
})