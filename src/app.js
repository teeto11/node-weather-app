const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const request = require('request')
const app = express()
const port = process.env.PORT || 3000
//define path for express config
const public = path.join(__dirname,'../public')
const views = path.join(__dirname,'../templates/views')
const partials = path.join(__dirname,'../templates/partials')
//setup handlebars engine and view location
app.set('view engine','hbs')
app.set('views',views)
hbs.registerPartials(partials)

//setup static directory to serve

app.use(express.static(public))

app.get('', (req,res)=>{
    const data = {
            title:'weather app',
            name:'Tee'
    }
    res.render('index',data)
})
app.get('/about',(req,res)=>{

    const data = {
       title:'about',
        name:'Tee'
}
    res.render('about',data)
})

app.get('/help',(req,res)=>{

    const data = {
       // title:'weather app',
        title:'help',
        help:"help page",
        name:'Tee'
}
res.render('help',data)
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        res.send({
            error:'error, no address provided'
        })
    }
     geocode(req.query.address, (error,{lat,long} = {}) =>{
        if(error){
             return res.send({error})
        } 
        forecast(lat,long,(error,forecastdata)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastdata, 
               // location:,
                address:req.query.address
            })   
        })

    }) 
    // const link = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?bbox=-77.083056,38.908611,-76.997778,38.959167&access_token=pk.eyJ1IjoidGVldG8xMSIsImEiOiJjazZrbWM5YXgwNWZ6M2dwYWc3eHJkYXFwIn0.izGShU2awnaSA09DMXuT9w'

    // request({url:link,json:true},(error,{body})=>{
    //     if(error){
    //         callback("error",undefined)
    //     }else if(body.features.length === 0){
    //         callback("no matching result",undefined)
    //     }else{
    //     callback(undefined,{"lat":body.features[0].center[1],
    //                       "long":+body.features[0].center[0]
    //                     })
       
    //     }
    // }) 
})

app.get('/help/*',(req,res)=>{
    const data = {
        error : 'help page not found',
        name:'Tee',
        title:'404',
    }
  res.render('error',data)
})

app.get('*',(req,res)=>{
    const data = {
        error : 'page not found',
        title:'404',
        name:'Tee'
    }
  res.render('error',data)
})


app.listen(port,()=> {
    console.log("started")
})