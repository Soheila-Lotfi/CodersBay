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
var highBidder= "no one:("

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
  
})





