const weatherForm = document.querySelector('form')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    messageOne.innerHTML='loading...'
    messageTwo.innerHTML=''
    messageThree.innerHTML='' 

    fetch(`/weather?address=${e.target.elements.text.value}`).then((response) => {
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