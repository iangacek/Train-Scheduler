var firebaseConfig = {
    apiKey: "AIzaSyDPAX_uoWpLowa1ELWl91UACOoB-fpcSXA",
    authDomain: "trainscheduler-c15a2.firebaseapp.com",
    databaseURL: "https://trainscheduler-c15a2.firebaseio.com",
    projectId: "trainscheduler-c15a2",
    storageBucket: "trainscheduler-c15a2.appspot.com",
    messagingSenderId: "662736465767",
    appId: "1:662736465767:web:40b8a3b55c7f3843"
  };

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#add-train-button").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var destinationName = $("#destination-name-input").val().trim();
    var firstTime = $("#first-train-time-input").val().trim();
    var trainFrequency = $("#train-frequency-input").val().trim();

    var createNewTrain = {
        name: trainName,
        destination: destinationName,
        startTime: firstTime,
        freq: trainFrequency,
        // minsAway: minsAway
    };

    database.ref().push(createNewTrain);

    console.log(createNewTrain.trainName);
    console.log(createNewTrain.destinationName);
    console.log(createNewTrain.firstTime);
    console.log(createNewTrain.trainFrequency);

    $("#train-name-input").val("");
    $("#destination-name-input").val("");
    $("#first-train-time-input").val("");
    $("#train-frequency-input").val("");
    $("#trainName").append(newRow);
});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var destinationName = childSnapshot.val().destination;
    var firstTime = childSnapshot.val().startTime;
    var trainFrequency = childSnapshot.val().freq;
    var trainDist = childSnapshot.val().dist;

    console.log(trainName);
    console.log(destinationName);
    console.log(firstTime);
    console.log(trainFrequency);

    // var emptyStartTime = moment.unix(empStart).format("HH:mm:ss");

    // var trainFreq = moment.unix(freq).format("HH:mm:ss");
    // console.log(trainFreq);

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destinationName),
        $("<td>").text(firstTime),
        $("<td>").text(trainFrequency),
        $("<td>").text(trainDist),
    );

    $("#trainTable").append(newRow);

});