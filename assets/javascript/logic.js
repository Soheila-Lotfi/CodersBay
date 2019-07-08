var config={

    apiKey: "AIzaSyABDsPf7aAg7aldCSC9S64jTNPt2SNgiXM",
    authDomain: "uoft-46394.firebaseapp.com",
    databaseURL: "https://uoft-46394.firebaseio.com",
    projectId: "uoft-46394",
    storageBucket: "uoft-46394.appspot.com",
    messagingSenderId: "59547803136",
    appId: "1:59547803136:web:89a23612e065ea87"
}


firebase.initializeApp(config);

var database=firebase.database();

var highPrice=0;
var highBidder= "no one:(";

// Whenever a user clicks the submit-bid button

$("#submit-bid").click(function(event){
  
    event.preventDefault();

    var bidderName=$("#bidder-name").val().trim();
    var bidderPrice=$("#bidder-price").val().trim();

    if (bidderPrice>highPrice){
        
        alert("You are now the highest bidder.");
        highPrice=parseInt(bidderPrice);
        highBidder=bidderName;

        database.ref('/data').set({

            highprice:highPrice,
            highbidder: highBidder
        });
    }
    else{
        alert("Sorry that bid is too low. Try again.");

    }
});

// At the page load and subsequent value changes, get a snapshot of the local data.
// This function allows you to update your page in real-time when the values within the firebase node bidderData changes

database.ref('/data').on("value", function(snapshot){

    if (snapshot.child("highbidder").exists() && snapshot.child("highprice").exists()){

        highPrice=parseInt(snapshot.val().highprice);
        highBidder=snapshot.val().highbidder;

        $("#highest-bidder").text(snapshot.val().highbidder);
        $("#highest-price").text(parseInt(snapshot.val().highprice));
    }
    else{
        $("#highest-bidder").text(highBidder);
        $("#highest-price").text(highPrice);
    }
  
});

// track how many people are connected through firbase 

// connectionsRef references a specific location in our database.
// All of our connections will be stored in this directory.

var connectionsRef = database.ref("/connections");

// '.info/connected' is a special location provided by Firebase that is updated
// every time the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
var connectedRef = database.ref(".info/connected");

// When the client's connection state changes...
connectedRef.on("value", function(snap) {

  // If they are connected..
  if (snap.val()) {

    // Add user to the connections list.
    var con = connectionsRef.push(true);
    // Remove user from the connection list when they disconnect.
    con.onDisconnect().remove();
  }
});

// When first loaded or when the connections list changes...
connectionsRef.on("value", function(snap) {

  // Display the viewer count in the html.
  // The number of online users is the number of children in the connections list.
  $("#connected-viewers").text(snap.numChildren());
});





