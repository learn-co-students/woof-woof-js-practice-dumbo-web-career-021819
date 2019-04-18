



window.addEventListener('DOMContentLoaded', (event) => {

  const dogUrl = "http://localhost:3000/pups"
  const dogBarDiv = document.getElementById('dog-bar')
  fetchDogs(dogUrl, dogBarDiv)

  const dogInfoDiv = document.getElementById("dog-info")
  dogInfoHandler(dogBarDiv, dogInfoDiv)

  goodDogToggle(dogInfoDiv)

});



// When the page loads, I want to make a GET fetch and then manipulate the DOM by rendering the dog names to the dog bar

const dogSpan = (dog) => {
  return `<span data-id=${dog.id}>${dog.name}</span>`
}

const fetchDogs = (dogUrl, dogBarDiv) => {
  return fetch(dogUrl).then((response) => {
    return response.json()
  }).then((dogs) => {
    dogs.forEach((dog) => {
      dogBarDiv.innerHTML += dogSpan(dog)
    })
  })
}


// When click happens on span, I want to make a GET fetch and then manipulate the DOM by rendering the dog info to the page


const dogInfoHandler = (dogBarDiv, dogInfoDiv) => {
  dogBarDiv.addEventListener('click', (event) => {
    if (event.target.tagName === 'SPAN') {
      // debugger;
      let dogId = event.target.dataset.id
      dogInfoFetch(dogId, dogInfoDiv)

    }
  })
}


const dogInfoFetch = (dogId, dogInfoDiv) => {
  return fetch(`http://localhost:3000/pups/${dogId}`).then((response) => {
    return response.json()
  }).then((dog) => {
      dogInfoDiv.innerHTML =
        `<img src=${dog.image}>
        <h2>${dog.name}</h2>
        <button data-id="${dog.id}" data-isGoodDog="${dog.isGoodDog}">${dog.isGoodDog}</button>`
  })
}



// When click happens on good dog button, I want to make a PATCH request to update the isGoodDog value and then manipulate the DOM by changing the text of the button

const goodDogToggle = (dogInfoDiv) => {
  dogInfoDiv.addEventListener('click', (event) => {
    if(event.target.tagName === 'BUTTON') {
      let dogId = event.target.dataset.id
      // let button = event.target
      let dogStatus = event.target.innerText
      // let newStatus;
      // debugger;
      // debugger;
      if (dogStatus == "true") {
        event.target.innerText = "false"
      } else if (dogStatus == "false") {
        event.target.innerText = "true"
      }
      goodDogPatch(dogId, dogStatus)
    }
  })
}


// function onGoodDogButtonClick(e){
//   let newValue;
//   if (e.target.innerText.includes("Good")){
//     e.target.innerText = "Bad Dog"
//     newValue = false
//   } else {
//     e.target.innerText = "Good Dog"
//     newValue = true
//   }
//   toggleGoodDog(e.target.dataset.id, newValue).then(updateDogBar)
// }







const goodDogPatch = (dogId, dogStatus) => {
  fetch(`http://localhost:3000/pups/${dogId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({isGoodDog: dogStatus})

  }).then((response) => {
    return response.json()
  }).then((dog) => {
    dog.isGoodDog = dogStatus
  })
}











// When <some event> happens, I want to make a <what kind of> fetch and then manipulate the DOM <in what way?>
