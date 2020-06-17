const request = require('request')





const weatherReport = (location ,callback)=>{
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=59581b333449f8e58ae79acf49011302`

    request({url, json:true},(error,{body}= {} )=>{ //json true parses the json data // const data = JSON.parse(response.body)
                                                                                    
        if(error){
            callback('Unable to connect to weather service',undefined)
        
        }else if (body.cod === '404'){
            callback(body.message,undefined)
        
        }else{ 
            const location = (`---${body.name} weather update ---`)
            const report = (`The temperature is ${body.main.temp} degrees . Weather type is ${body.weather[0].description}`)
            callback(undefined,{location,report})
        }    
    })
}






module.exports = weatherReport

