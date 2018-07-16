var config = {
    apiKey: "AIzaSyBeztNIfNwKYohBAyr7uejr-KWGJONpZu8",
    authDomain: "sandbox-project-dba4e.firebaseapp.com",
    databaseURL: "https://sandbox-project-dba4e.firebaseio.com",
    projectId: "sandbox-project-dba4e",
    storageBucket: "sandbox-project-dba4e.appspot.com",
    messagingSenderId: "162911379742"
  };
  firebase.initializeApp(config);

$(document).ready(function () {
    // Initialize Firebase

    var database = firebase.database();
    var trainName = "";
    var trainDestination = "";
    var trainFrequency = 0;
    var nextArrival = 0;

    $("#new-train-submit").on("click", function (event) {
        event.preventDefault();
        trainName = $("#train-name").val();
        trainDestination = $("#train-destination").val();
        trainFrequency = $("#train-frequency").val();
 
        database.ref().push({
            name: trainName,
            des: trainDestination,
            fre: trainFrequency,
        });

    });

    database.ref().on("child_added", function (snapshot) {
        var trainFreq = snapshot.val().fre
        var body = $("<tbody>");
        var nameTd = $("<th>");
        nameTd.attr("scope", "row");
        var desTd = $("<td>");
        var freTd = $("<td>");
        var nameTd = nameTd.text(snapshot.val().name);
        var desTd = desTd.text(snapshot.val().des);
        var freTd = freTd.text(snapshot.val().fre);
        var currentTime = moment();
        var firstTimeConverted = moment(currentTime, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted)
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log(diffTime)
        var tRemainder = diffTime % trainFreq;
        console.log(tRemainder)
        var tMinutesTillTrain = trainFreq - tRemainder;
        console.log(tMinutesTillTrain)
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        var arrival = moment(nextTrain).format("hh:mm");

        body.append(nameTd);
        body.append(desTd);
        body.append(freTd);
        body.append("<td>" + arrival + "</td>");
        body.append("<td>" + tMinutesTillTrain + "</td>");

        $("table").append(body);

    });

});