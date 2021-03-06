// //test
// var rate = 30;
// var time = "16:55";
// var start = moment(time, "HH:mm").format("hh:mm A");

// console.log("First Time: " + start);

// //123 var pretty= moment(start).format("hh:mm A")
// //123 console.log("First Time pretty: " + pretty);

// var diff = moment().diff(moment(start, "hh:mm"), "minutes");
// console.log("Difference in time: " + diff);

// var remainder = diff % rate;
// console.log("Remainder: " + remainder);

// var minAway = rate - remainder;
// console.log("Minutes Away: " + minAway + " minutes");

// //123 var nextTrain = moment().add(minAway, "minutes");
// //123 console.log("Next Arrival: " + moment(nextTrain).format("hh:mm A"));

// var nextTrain = moment().add(minAway, "minutes").format("hh:mm A");
// console.log("Next Arrival: " + nextTrain);

//123 nextArrival = moment(nextTrain).format("hh:mm A");
//123 console.log("Next Arrival: " + nextArrival);


// Initialize Firebase
var config = {
    apiKey: "AIzaSyCuaAUbIPEquvPkwfFin3SAJiLjFk9aegU",
    authDomain: "trainscheduler-12287.firebaseapp.com",
    databaseURL: "https://trainscheduler-12287.firebaseio.com",
    storageBucket: "trainscheduler-12287.appspot.com"
};

firebase.initializeApp(config);

var database = firebase.database();

//button for adding a new train
$("#submitButton").on('click', function (event) {
    event.preventDefault();

    //grabs user input
    var trainName = $("#trainNameForm").val().trim();
    var destination = $("#trainDestinationForm").val().trim();
    var firstTrainTime = moment($("#firstTrainTimeForm").val().trim(), "HH:mm").format("hh:mm A");
    var frequency = $("#frequencyForm").val().trim();

    console.log("First train time: " + firstTrainTime);

    //create local temp object for holding train data
    var newTrain = {
        name: trainName,
        trainDest: destination,
        firstTrain: firstTrainTime,
        trainFreq: frequency
    };

    // Uploads train data to the database
    database.ref().push(newTrain);


    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.trainDest);
    console.log(newTrain.firstTrain);
    console.log(newTrain.trainFreq);

    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#trainNameForm").val("");
    $("#trainDestinationForm").val("");
    $("#firstTrainTimeForm").val("");
    $("#frequencyForm").val("");

});

// 3. Create Firebase event for adding train data to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().trainDest;
    var firstTrainTime = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().trainFreq;

    // Train Info
    console.log(trainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);


    //calculate the difference of the first train time to current time in minutes
    var diff = moment().diff(moment(firstTrainTime, "hh:mm"), "minutes");
    console.log("Difference in time: " + diff);

    //calculate the remainder 
    var timeRemainder = diff % frequency;
    console.log("Remainder: " + timeRemainder);

    //calculate minutes away
    var minAway = frequency - timeRemainder;
    console.log("Minutes Away: " + minAway + " minutes");

    //calculate next arrival time
    var nextArrival = moment().add(minAway, "minutes").format("hh:mm A");
    console.log("Next Arrival: " + nextArrival);


    //create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency + " min"),
        $("<td>").text(nextArrival),
        $("<td>").text(minAway + " min")
    );



    //Append the new row to the table
    $('#table > tbody').append(newRow);


});