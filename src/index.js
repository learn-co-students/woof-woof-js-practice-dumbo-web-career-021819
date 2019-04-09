const dogBarDiv = document.getElementById('dog-bar');
const dogInfoDivTag = document.querySelector('div#dog-info');

const createPup = (pup) => {
  return `<span data-id="${pup.id}">${pup.name}</span>`
}

const getDogData = () => {
  return fetch('http://localhost:3000/pups')
  .then(response => {
    return response.json();
  })
}

getDogData().then(dogData => {
  dogData.forEach(pup => {
    dogBarDiv.innerHTML += createPup(pup);
  })
})

const goodDog = (isGoodDog) => {
  if (isGoodDog === true) {
    return "Good Dog!";
  } else {
    return "Bad Dog!"
  }
}

dogBarDiv.addEventListener('click', event => {
  if (event.target.tagName === 'SPAN') {
    let currentID = event.target.dataset.id;

    fetch(`http://localhost:3000/pups/${currentID}`)
      .then(response => {
        return response.json()
      })
      .then(dogDataObj => {
        dogInfoDivTag.innerHTML = `<img src=${dogDataObj.image}> <h2>${dogDataObj.name}</h2> <button data-id="${dogDataObj.id}">${goodDog(dogDataObj.isGoodDog)}</button>`
      })
  }
})

dogInfoDivTag.addEventListener('click', event => {
  if (event.target.tagName === 'BUTTON') {
    let targetId = event.target.dataset.id

    fetch(`http://localhost:3000/pups/${targetId}`)
      .then(response => {
        return response.json();
      })
      .then(dogDataObj => {
        updateDog(dogDataObj);
      })
      .then(() => {
        if (event.target.innerHTML === "Good Dog!") {
        event.target.innerHTML = "Bad Dog!"
      } else if (event.target.innerHTML === "Bad Dog!") {
        event.target.innerHTML = "Good Dog!"
      }
    })

  }
})

const updateDog = (dogDataObj) => {
  fetch(`http://localhost:3000/pups/${dogDataObj.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      "isGoodDog": !dogDataObj.isGoodDog
    })
  })
}
