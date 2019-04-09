const dogInfoDiv = document.getElementById('dog-info');
const dogBarDiv = document.getElementById('dog-bar');
const goodBadDogButton = document.querySelector('button')


const createPup = (pup) => {
    return `<span data-id=${pup.id}> ${pup.name} </span>`
}

const createPupCardHTML = (pup) => {
    return ` <img src=${pup.image}>
    <h2>${pup.name}</h2>
    <button data-id=${pup.id} data-boolean=${pup.isGoodDog}>${isGoodPup(pup)}</button>`
}

const isGoodPup = (pup) => {
    if(pup.isGoodDog === true) {
        return "Good Dog!"
    } else {
        return "Bad Dog!"
    }
}

dogInfoDiv.addEventListener('click', (event) => {
    // const dogBoolean = (event.target.dataset.boolean === 'true')

    if(event.target.tagName === "BUTTON") {

        if(event.target.innerHTML === "Good Dog!") {
            event.target.innerHTML = "Bad Dog!"
            updatePup(event.target.dataset.id, false);

        } else {
            event.target.innerHTML = "Good Dog!";
            updatePup(event.target.dataset.id, true);

        }
        // updatePup(event.target.dataset.id, dogBoolean);
    }
})

fetch('http://localhost:3000/pups')
.then((resp) => {
    return resp.json()
}).then((pups) => {
    pups.forEach(pup => {
        dogBarDiv.innerHTML += createPup(pup);
    })
})

dogBarDiv.addEventListener('click', (event) => {
    if(event.target.tagName === "SPAN") {
        fetch(`http://localhost:3000/pups/${event.target.dataset.id}`)
        .then((response) => {
            return response.json()
        }).then((pupInfo) => {
            dogInfoDiv.innerHTML = createPupCardHTML(pupInfo)
        })
    }
})

const updatePup = (id, newBooleanValue) => {
    return fetch(`http://localhost:3000/pups/${id}`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        "isGoodDog": newBooleanValue
    })
    }).then((resp) => {
        return resp.json();
    })
}
