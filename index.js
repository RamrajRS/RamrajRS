let basePath = "https://api.thingspeak.com/channels/";
let channelKey = "1309022";
let endPoint = "/fields/";

let apiKey = "UMI9MSR1GY40LIEW";

let urls = {};

let apiData = {};

let fieldsData = {};

let selectedStove = 1;

for(i = 1; i <= 4; i ++){
    urls[i] = basePath + channelKey + endPoint + i+ ".json" + "?api_key=" + apiKey + "&results=";
}


window.onload = function(){
    // console.log('loaded');

    for(let [key, url] of Object.entries(urls)){
            $.get(url, function(data, status){
                apiData[key] = data;

                fieldsData[key] = apiData[key].feeds.pop()[`field${key}`];
                if(Object.keys(fieldsData).length == 4){
                    setHeatData(selectedStove);
                }
            })
    }

    

}

setTimeout(function(){
    setInterval(function(){ 
        for(let [key, url] of Object.entries(urls)){
            $.get(url, function(data, status){
                apiData[key] = data;
                // console.log("Latest data for field ", key, "  ", apiData[key].feeds.pop() )
                fieldsData[key] = apiData[key].feeds.pop()[`field${key}`];

                // console.log(fieldsData);

            })


        }

        setHeatData(selectedStove);



    }, 10000);


    
}, 3000);


let setHeatData = function(clickedStove){
    selectedStove = clickedStove;
    let val;
    if(fieldsData[selectedStove]){

        val = fieldsData[selectedStove];
    } else {
        val = 0;
    }

    $('.knob')
    .val(val)
    .trigger('change');
    
    
};

