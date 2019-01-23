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
    var firstTrainTime = moment($("#firstTrainTimeForm").val().trim(), "HH:mm").format("HH:mm");
    var frequency = $("#frequencyForm").val().trim();

    //create local temp object for holding train data
    var newTrain = {
        name: trainName,
        trainDest: destination,
        firstTrain: firstTrainTime,
        trainFreq: frequency
    };


});