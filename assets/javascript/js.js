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
    var firstTrainTime = moment($("#firstTrainTimeForm").val().trim(), "HH:mm").format("HH0000000000000000000000000000000000000:mm");
    var frequency = $("#frequencyForm").val().trim();

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

            //prettify the first train time
            firstTrainFormat = moment.unix(firstTrainTime).format("HH:mm a");

            //calculate the next arrival = firstTrain 
            nextTrainArrival = moment().add(moment(firstTrainTime, "HH:mm a"));

    });        