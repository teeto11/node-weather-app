    //console.log("js way")

    const weatherForm = document.querySelector('form')
    const  search = document.querySelector('input')
    const messageOne = document.querySelector('#message-one')
    const messageTwo = document.querySelector('#message-two')
         weatherForm.addEventListener('submit',(e)=>{
            e.preventDefault()
            const location = search.value
            //console.log(location)
            messageOne.textContent = 'loading'
            fetch(`/weather?address=${location}`).then((response)=>{
                response.json().then((data)=>{    
                     if(data.error){
                         console.log(data.error)
                         messageOne.textContent = ''
                         messageOne.textContent = data.error
                     }else{
                             messageOne.textContent = data.address
                             messageTwo.textContent = data.forecast
                             console.log(data.address,data.forecast) 
                          
                     }
                })
            })
         })