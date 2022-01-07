function mute(){
    //https://stackoverflow.com/questions/14044761/how-to-mute-all-sound-in-a-page-with-js
    var elems = document.querySelectorAll("video, audio");
    [].forEach.call(elems, function(elem) { muteMe(elem); });

    alert("Testing mute, has not been tested with audio on page")
}

function settings(){
    alert("Look at what a settings page is like for pokemon showdown")
}

function profile(){
    alert("Link to profile page, if signed in show stats, if not log in. Change to have log in button showing when there is no account linked")
}

//https://code.tutsplus.com/tutorials/how-to-create-a-simple-web-based-chat-application--net-5931
function send(){
    var s = document.getElementById("chatinput").value;
    document.getElementById("chatinput").value = ""; //resets the chat box text

    const d = new Date();
    var half = "am";
    if(d.getHours() > 11){half = "pm";}
    
    var mins = d.getMinutes();
    if(mins < 10){mins = "0" + mins}
    time = "" + (d.getHours() % 12) + ':' + mins +" " + half;
    //time += " - " + (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear()
     
    document.getElementById("chatoutput").innerHTML += "\n" + s + " - " + time; //newline does not work as expected
    //find way to make timestamp dynamic, if it from same day, only list the time not the date
}