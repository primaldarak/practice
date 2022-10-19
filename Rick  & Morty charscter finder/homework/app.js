document.addEventListener('DOMContentLoaded', () => {
  const CHARACTERS_NAME = 'characters';

  (() => {
    const characters = localStorage.getItem(CHARACTERS_NAME)
    if (characters === null) {
      localStorage.setItem(CHARACTERS_NAME, JSON.stringify([]));
      return
    }
    const parsedCharacters = JSON.parse(characters)

    const cycleLength = parsedCharacters.length >= 5 ? 5 : parsedCharacters.length
    for (let i = 0; i < cycleLength; i++) {
      const element = parsedCharacters[i];

      createCard(element, true)
    }
  })()

  async function createStorage(inputValue) {
    await setCharacter(inputValue)
  }

  const searchBtn = document.getElementById('search-btn')
  searchBtn.addEventListener('click', getVal)

  function getVal() {
    const searchInput = document.getElementById('search-input')
    const inputValue = searchInput.value
    const characters = JSON.parse(localStorage.getItem(CHARACTERS_NAME))
    const isUnique = characters.find(item => item.id === inputValue)
    if (inputValue.match(/\D+/) || inputValue === '') {
      alert('Enter number')
    } else if (isUnique) {
      alert('Character is already in the list')
      clearF(searchInput)
    } else {
      clearF(searchInput)
      createStorage(inputValue)
    }
  }

  function clearF(searchInput) {
    if (searchInput.value !== '') {
      searchInput.value = '';
    }
  }

  function setCharacter(inputValue) {
    return fetch(`https://rickandmortyapi.com/api/character/${inputValue}`)
      .then(response => response.json())
      .then(({
        id,
        image,
        name,
        status,
        species
      }) => {
        const data = {
          id,
          image,
          name,
          status,
          species
        }
        if (!id) {
          return alert('Character not found')
        }
        const characters = JSON.parse(
          localStorage.getItem(CHARACTERS_NAME)
        );

        characters.unshift(data)

        const charactersString = JSON.stringify(characters);
        localStorage.setItem(CHARACTERS_NAME, charactersString);
        createCard(data)
      })
  }

  function createCard({
    id,
    image,
    name,
    status,
    species
  }, reverse) {
    const charactersWrap = document.getElementById('characters-wrap')
    const searchedDiv = document.createElement('div')
    const cardInfo = document.createElement('div')
    const cardImage = document.createElement('img')
    const cardTitle = document.createElement('p')
    const cardStatus = document.createElement('p')
    const delBtn = document.createElement('button')

    searchedDiv.classList.add('rick-and-morty-card')
    cardImage.classList.add('rick-and-morty-image')
    cardInfo.classList.add('rick-and-morty-info')
    cardTitle.classList.add('info-title')
    cardStatus.classList.add('info-status')
    delBtn.classList.add('delete-btn')
    delBtn.innerText = 'Delete'

    searchedDiv.setAttribute('id', id)
    cardImage.setAttribute('src', image)
    cardTitle.innerText = name
    cardStatus.innerText = `${status}-${species}`



    if (reverse) {
      charactersWrap.append(searchedDiv)
    } else {
      charactersWrap.prepend(searchedDiv)
    }
    searchedDiv.appendChild(cardImage)
    searchedDiv.appendChild(cardInfo)
    cardInfo.appendChild(cardTitle)
    cardInfo.appendChild(cardStatus)
    cardInfo.appendChild(delBtn)
    delBtn.addEventListener('click', () => confirm(deleteCard(id)))
  }


  function deleteCard(id) {
    const card = document.getElementById(id)
    let characters = JSON.parse(localStorage.getItem(CHARACTERS_NAME));
    characters = characters.filter(item => item.id !== id)
    localStorage.setItem(CHARACTERS_NAME, JSON.stringify(characters))

    card.remove()
  }
})