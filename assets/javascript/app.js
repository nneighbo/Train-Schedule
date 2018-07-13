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
    var minutesAway = 0;

    $("#new-train-submit").on("click", function (event) {
        event.preventDefault();
        trainName = $("#train-name").val();
        trainDestination = $("#train-destination").val();
        trainFrequency = $("#train-frequency").val();
        minutesAway = $("#minutes-away").val();
 
        database.ref().push({
            name: trainName,
            des: trainDestination,
            mins: minutesAway,
            fre: trainFrequency,
        });

    });

    database.ref().on("child_added", function (snapshot) {
        var body = $("<tbody>");
        var nameTd = $("<th>");
        nameTd.attr("scope", "row");
        var desTd = $("<td>");
        var freTd = $("<td>");
        var minsTd = $("<td>");
        var arrival = $("<td>");

        nameTd.text(snapshot.val().name);
        desTd.text(snapshot.val().des);
        minsTd.text(snapshot.val().mins);
        freTd.text(snapshot.val().fre);

        body.append(nameTd);
        body.append(desTd);
        body.append(freTd);
        body.append(arrival);
        body.append(minsTd);

        $("table").append(body);

    });

});