function alertTest(){
    alert("Testing alert!")
}

function mute(){
    alert("Testing mute")
}

function settings(){
    alert("Testing settings")
}

function profile(){
    alert("Testing profile")
}

//https://code.tutsplus.com/tutorials/how-to-create-a-simple-web-based-chat-application--net-5931
function send(){
    var s = document.getElementById("chatinput").value;
    document.getElementById("chatinput").value = ""; //resets the chat box text

    const d = new Date();
    var half = "am";
    if(d.getHours() > 11){
        half = "pm";
    }
    time = "" + (d.getHours() % 12) + ':' + d.getMinutes() +" " + half;
    //time += " - " + (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear()
     
    document.getElementById("chatoutput").innerHTML += "\n" + s + " - " + time; //newline does not work as expected
    //find way to make timestamp dynamic, if it from same day, only list the time not the date
}