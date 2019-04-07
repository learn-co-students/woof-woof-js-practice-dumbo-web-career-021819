window.addEventListener('DOMContentLoaded', (event) => {
//Creats a dogDisplayTag on page load
//now fetch all the Dogs from api
fetch('http://localhost:3000/pups').then((res) => {
	return res.json()
}).then((dogObj) => {
  

dogObj.forEach((object) => {
let dogDisplayTag = document.querySelector('#dog-bar')


dogDisplayTag.innerHTML += `<span class="allSpan"; data-id="${object.id}">${object.name}</span>`
dogDisplayTag.addEventListener('click', (event)=> {
	if (event.target.matches('span')) {
	
		
//fetch individual dog info
fetch(`http://localhost:3000/pups/${event.target.dataset.id}`).then((res)=>{
	return res.json()
}).then((dogObj) => {
	let dogInfoDiv = document.querySelector('#dog-info')
	let newButton = ""
	
	if (dogObj.isGoodDog) {newButton = "Good Dog!"}
		else {
			newButton = "Bad Dog!"
		}
	dogInfoDiv.innerHTML = `<img src=${dogObj.image}><h2>${dogObj.name}</h2><button data-id="${dogObj.id}">${newButton}</button>`
})

	}
})


})

})
//Build something for dogs info

let dogInfoDiv = document.querySelector('#dog-info')
dogInfoDiv.addEventListener('click', (event)=> {
	if (event.target.matches('button')){
		let dogId = event.target.dataset.id
		//now fetch from database and change data
		//event.target.innerText
		dogInfo = {}

		if (event.target.innerText == "Good Dog!"){
			dogInfo.isGoodDog = false
		}
		else {
			dogInfo.isGoodDog = true
		}

		fetch(`http://localhost:3000/pups/${dogId}`, { 
                  	method:'PATCH',
                  	 headers: {
        	          'Content-Type': 'application/json',
        	          'Accept': 'application/json'  },
        	                          body: JSON.stringify(dogInfo)
            
                                                      }).then((res)=> {
                                                      	return res.json()
                                                      }).then((object) =>{
                                                      	let newButton = ""
                                                      	if (object.isGoodDog) {newButton = "Good Dog!"}
		else {
			newButton = "Bad Dog!"
		}
                                                      	document.querySelector('#dog-info').innerHTML = `<img src=${object.image}><h2>${object.name}</h2><button data-id="${object.id}">${newButton}</button>`

                                                      })


	}
})

    console.log('DOM fully loaded and parsed');

});


