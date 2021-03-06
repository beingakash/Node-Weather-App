const request=require('request')
const forecast =function(lang,lati,callback){
    const url = 'https://api.darksky.net/forecast/8851d7748304c69c7003b996fbf43e24/'+ encodeURIComponent(lang) +','+encodeURIComponent(lati)+''

    request({ url, json:true},(error,response) =>{
    
        
        if(error){
           callback('Unable to connect to weather service!',undefined)
        }
        else if(response.body.error){
            callback('Unable to find location', undefined)
        }
        else{
            callback(undefined,'Currently The Temperature Is '+response.body.currently.temperature +
            '.\n It will be mostly '+response.body.hourly.summary+'.\nChance of '+response.body.daily.summary+'.' )
           }    
      })  
    }
    module.exports = forecast