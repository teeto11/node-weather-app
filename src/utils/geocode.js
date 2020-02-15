const request = require('request')

const geocode = (address,callback) => {

    const link = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?bbox=-77.083056,38.908611,-76.997778,38.959167&access_token=pk.eyJ1IjoidGVldG8xMSIsImEiOiJjazZrbWM5YXgwNWZ6M2dwYWc3eHJkYXFwIn0.izGShU2awnaSA09DMXuT9w'

    request({url:link,json:true},(error,{body} = {} )=>{
        if(error){
            callback("invalid address",undefined)
        }else if(body.features.length === 0){
            callback("no matching result",undefined)
        }else{
        callback(undefined,{"lat":body.features[0].center[1],
                          "long":+body.features[0].center[0]
                        })
       
        }
    })
}
module.exports = geocode