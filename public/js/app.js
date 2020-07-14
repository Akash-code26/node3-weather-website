const weatherForm = document.querySelector('form')
const weatherFormInput = weatherForm.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const searchButton = document.querySelector('#search')
const locationButton = document.querySelector('#location')


weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    
    searchButton.setAttribute('disabled','disabled')

    messageOne.innerHTML='loading...'
    messageTwo.innerHTML=''
    messageThree.innerHTML='' 


    fetch(`/weather?address=${weatherFormInput.value}`).then((response) => {
    response.json().then((data) => {
        searchButton.removeAttribute('disabled')
        if (data.error){
            messageOne.textContent = data.error
        }else{
            messageOne.textContent = data.location 
            messageTwo.textContent = data.report
            messageThree.textContent = data.temps
            }
            weatherFormInput.focus()
        })
    })
        
})

locationButton.addEventListener('click', (e) => {
    messageOne.innerHTML='loading...'
    messageTwo.innerHTML=''
    messageThree.innerHTML='' 

    //disable button
    
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser')
    }

    navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude
            const longitude = position.coords.longitude
        fetch(`/weather?address=${latitude},${longitude}`).then((response) => {
            response.json().then((data) => {
               
                if (data.error){
                    messageOne.textContent = data.error
                }else{
                    messageOne.textContent = data.location 
                    messageTwo.textContent = data.report
                    messageThree.textContent = data.temps
                    }
                })
            })
    })
})