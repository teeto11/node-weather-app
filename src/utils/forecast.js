const request = require('request')

const forecast = (lat,long,callback) =>{
    
    const url = `https://api.darksky.net/forecast/1e4b6ab9ca81112c95ba033b76746597/${lat},${long}`
    request({url,json:true},(error,{body}={})=>{
         //const data = JSON.parse(response.body)
         if(error){
              callback("error",undefined)
           }else if(body.error){
              callback("no matching result",undefined)
            }else{
             callback(undefined,body.daily.data[0].summary+' it is currently '+body.currently.temperature+
              'degrees out.The high today is ' +body.daily.data[0].temperatureHigh+' with a low of '+ body.daily.data[0].temperatureLow+'. '+'There is a ' +body.currently.precipProbability+' %chance of rain.')
             }
        })
}
module.exports =  
    forecast

 

