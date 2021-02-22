// URL end points for getting the data
let basePath = "https://api.thingspeak.com/channels/";
let channelKey = "1309022";
let endPoint = "/fields/";
let apiKey = "UMI9MSR1GY40LIEW";

// Defining required variables
let urls = {};
let apiData = {};
let fieldsData = {};
let selectedStove = 1;

// Constructing the urls
for(i = 1; i <= 4; i ++){
    urls[i] = basePath + channelKey + endPoint + i+ ".json" + "?api_key=" + apiKey + "&results=";
}

// First data fetch on load of the app
window.onload = function(){

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

// Setting up repetitive data fetch in intervals of seconds - can be changed
let repetitionInteval = 10;

setTimeout(function(){
    setInterval(function(){ 
        for(let [key, url] of Object.entries(urls)){
            $.get(url, function(data, status){
                apiData[key] = data;
                fieldsData[key] = apiData[key].feeds.pop()[`field${key}`];

            })
        }

        setHeatData(selectedStove);

    }, repetitionInteval*1000);

}, 3000);

// Setting the data from the api call to the ui, will show 0 if no data is returned for a particular stove
let setHeatData = function(clickedStove){
    selectedStove = clickedStove;
    let val;
    if(fieldsData[selectedStove]){

        val = fieldsData[selectedStove];
    } else {
        val = 0;
    }

    $('.knob').val(val).trigger('change');
        
};

