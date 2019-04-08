
window.addEventListener('DOMContentLoaded', () => {
  const dogBarTag = document.querySelector("#dog-bar");
  const dogInfoTag = document.querySelector("#dog-info");
  let displayPup = "";

  const displayPupInfo = (pup) => {
    return `<img src="${pup.image}"/>
      <h2>${pup.name}</h2>
      <button data-id="${pup.id}">Good Dog!</button>`
  };

//fetch data on pageload
  fetch("http://localhost:3000/pups")
    .then((response) => {
      return response.json();
    }).then((pups) => {
      //Adds spans inside the div
      pups.forEach((pup) => {
        dogBarTag.innerHTML += `<span>${pup.name}</span>`;
      })
    });

    //display pup info on span click
  dogBarTag.addEventListener('click', (event) => {
    if (event.target.tagName == "SPAN") {
      dogInfoTag.innerHTML = "";
      fetch("http://localhost:3000/pups")
      .then((response) => {
        return response.json();
      }).then((pups) =>{
        displayPup = pups.find(function(pup) {
          return pup.name === event.target.innerText
        })
        dogInfoTag.innerHTML += displayPupInfo(displayPup)
      })
      }
    }
  );

  //Toggle Good Dog and Bad Dog
  dogInfoTag.addEventListener('click', (event) => {
    if (event.target.tagName == 'BUTTON') {
      if (event.target.innerText == "Good Dog!") {
        fetch(`http://localhost:3000/pups/${event.target.dataset.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Accept: "application/json"
          }, body: JSON.stringify({
            "isGoodDog": true
          })
        }).then(() => {
          event.target.innerText = "Bad Dog!"
        });
      } else {
        fetch(`http://localhost:3000/pups/${event.target.dataset.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Accept: "application/json"
          }, body: JSON.stringify({
            "isGoodDog": false
          })
        }).then(() => {
          event.target.innerText = "Good Dog!"
        });
      }
    }
  });

  //Good dog Filter
  document.querySelector('#good-dog-filter').addEventListener('click', (event) => {
    if (event.target.innerText == "Filter good dogs: OFF") {
      dogBarTag.innerHTML = "";
      fetch("http://localhost:3000/pups")
      .then((response) => {
        return response.json();
      }).then((pups) =>{
        pups.forEach((pup) => {
          if (pup.isGoodDog == true) {
            dogBarTag.innerHTML += `<span>${pup.name}</span>`;
      }
    })
  }).then(() => {
    event.target.innerText = "Filter good dogs: ON"
      })
    } else {
      dogBarTag.innerHTML = "";
      fetch("http://localhost:3000/pups")
        .then((response) => {
          return response.json();
        }).then((pups) =>{
          pups.forEach((pup) => {
            dogBarTag.innerHTML += `<span>${pup.name}</span>`;
          })
        }).then(() => {
          event.target.innerText = "Filter good dogs: OFF"
        })
      }
});

  //end of contentloaded
})
