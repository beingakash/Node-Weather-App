const request =require('request')

const geocode=function(address,callback){

    const urlGeo='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoia3Jha2FzaCIsImEiOiJjazd3OGNwMmswMDl5M2Rta2c5d2dvYmxmIn0.C7UNsg43-liFj_Hfzgxufg'
    
    request({url:urlGeo ,json:true},(error,response)=>{
               
        if (error) {
           
            callback('Unable')
            
        } else if(response.body.features.length === 0){
            
            callback('Unable To Search')
        }
        else{              
            callback(undefined,{
                latitude:response.body.features[0].center[0],
                longitude:response.body.features[0].center[1],
                location:response.body.features[0].place_name
            })

        }

    }  
    
    )
}

module.exports=geocode