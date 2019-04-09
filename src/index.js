document.addEventListener('DOMContentLoaded', () => {
    getDogsFromDb()
    .then(dogs => makeDogBar(dogs));
    showInfoListener();
    // helperClick();
    filterListener();
});

function getDogsFromDb() {
    return fetch('http://localhost:3000/pups')
    .then(r => r.json())
    .then(dogObjArray => dogObjArray)
};

function getDogFromDb(id) {
    return fetch(`http://localhost:3000/pups/${id}`)
    .then(r => r.json())
    .then(dogObj => dogObj)
};

const makeDogBar = (dogs) => {
    document.getElementById('dog-bar').innerHTML = ''
    const dogBar = document.getElementById('dog-bar');
    dogs.forEach (dog => dogBar.innerHTML += dogSpanTag(dog))
}

function dogSpanTag(dog) {
    return `
    <span data-id="${dog.id}">${dog.name}</span>
`};


function showInfoListener() {
    document.getElementById('dog-bar').addEventListener('click', e => {
        if (e.target.tagName === 'SPAN') {
            getDogFromDb(e.target.dataset.id)
            .then(dogObj => showDogInfo(dogObj))
            goodBadListener();
        }
    })
}

function showDogInfo(dogObj) {
    const dogInfoTag = document.getElementById('dog-info')
    dogInfoTag.innerHTML = `
    <div data-dog-id="${dogObj.id}">
    <img src="${dogObj.image}">
    <h2>${dogObj.name}</h2>
    <button>${(dogObj.isGoodDog) ? "Good Dog!" : "Bad Dog"}</button>
    </div>
    `
    goodBadListener()
    // debugger
}

const helperClick = () => document.addEventListener('click', e => console.log(e.target.tagName))

function goodBadListener() {
    document.getElementById('dog-info').addEventListener('click', e => {
        if (e.target.tagName === 'BUTTON') {
            const dogId = e.target.parentElement.dataset.dogId
            let dogIsGood = e.target.innerText
            if (dogIsGood === "Good Dog!") {
                dogIsGood = false
            }else {
                dogIsGood = true
            }
            // debugger
            fetch(`http://localhost:3000/pups/${dogId}`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({isGoodDog: dogIsGood})
            })
            .then(r => r.json())
            .then(dogObj => showDogInfo(dogObj))
            // console.log(e.target.innerText);
            // (e.target.innerText === "Good Dog!") ? console.log(1) : console.log(2)
        }
    })
}

function filterListener() {
    document.getElementById('filter-div').addEventListener('click', e => {
        if (e.target.innerText === 'Filter good dogs: OFF') {
            e.target.innerText = e.target.innerText.replace('OFF', 'ON')
            getDogsFromDb()
            .then(dogObjArray => dogObjArray.filter(dog => dog.isGoodDog))
            .then(goodDogs => { 

                makeDogBar(goodDogs)
                // document.getElementById('dog-bar').innerHTML = '';
                // goodDogs.forEach (dog => {
                //     document.getElementById('dog-bar').innerHTML += dogSpanTag(dog)
                })
        }else{
            e.target.innerText = e.target.innerText.replace('ON', 'OFF')
            getDogsFromDb()
            .then(dogs => makeDogBar(dogs));
        }
    })
}