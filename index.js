const express = require('express');
const bodyParser = require('body-parser');
const requestify = require('requestify');
const app = express() 
app.use(bodyParser.json()) 
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));


app.post('/weatherincity', (req, res) => 
{
		  console.log(req.body);
		  
		  var city = req.body.nlp.entities.location[0].raw;
		 
		  var distext = '';
		  
		  var v_url = "https://api.openweathermap.org/data/2.5/weather?appid=cbabb75bf7b81a74a62ff59e543b6b10";
		  if(city)
		   {
							v_url = v_url + '&q=' + city;
		   }
		 
		   //-----------------------------------------------------------------------------------
		
		
		requestify.request(v_url,{
				method: 'GET',
				headers : {
					 	 'Content-Type': 'application/json'
						
					},
				dataType: 'json'
		}).then(function(response)
		{
		
            var result = JSON.parse(response.body);
           	var weather_data = result.weather[0].description;
	          var temp =  1.8*(result.main.temp - 273) +32 ;
	          distext = "Now the weather in "+ city + " is "+ weather_data+" , The temperature is "+ temp+" F " ;
                    
            var reply = [{
						type: 'text',
						content: distext
					}];   
       
						res.status(200).json({
						replies: reply
						
					});
				}, function(error) 
				{
						//Try to provide a proper error response
						
						var reply = [{
							type: 'text',
							content: "I'm sorry! Something went wrong with the call. Try asking a different question."
						}];

						res.status(200).json({
							replies: reply
							
						});			
				});
});

