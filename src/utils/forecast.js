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
             callback(undefined,body.currently.temperature)
             }
        })
}
module.exports =  
    forecast



