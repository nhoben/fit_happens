$(document).ready(function () {
  //Testing to ensure javascript is linked properly//

  //alert("this file is linked to the javascript file");
  var database = firebase.database();
  var userId

  $("#userButton").on("click", function () {
    event.preventDefault();

    var firstName = $("#firstNameInput").val().trim();
    var lastName = $("#lastNameInput").val().trim();
    var email = $("#emailInput").val().trim();
    var weight = $("#weightInput").val().trim();
    var height = $("#heightInput").val().trim();
    var age = $("#ageInput").val().trim();
    var gender = $("#genderInput").val().trim();
    
    //console.log user profile to make sure it works
    //console.log(firstName);

    var user = database.ref().push({
      //database.ref().child(firstName+"_"+lastName).set({
      firstName: firstName,
      lastName: lastName,
      email: email,
      weight: weight,
      height: height,
      gender: gender,
      age: age,
      dateAdded: firebase.database.ServerValue.TIMESTAMP,
    });

    alert("New User has been added!");
    userId = user.key;
    console.log(userId);
  });//closes the submit event

    database.ref().on("child_added", function (childSnapshot) {

      //$("<td dataKey= '" + k + "' class = 'text-center'>").html('<i class="text-danger fas fa-trash-alt"></i>')
      //var newRowContent = "<tr><td>" + childSnapshot.val().firstName + "</td><td>" + childSnapshot.val().lastName + "</td><td>" + childSnapshot.val().weight + "</td><td>" + childSnapshot.val().height + "</td><td>" + childSnapshot.val().dateAdded + "</td></tr>"
      var newRowContent = "<tr><td>" + '<input type="radio" name="selectUser"/>' + "</td><td>" + childSnapshot.val().firstName + "</td><td>" + childSnapshot.val().lastName + "</td><td>" + childSnapshot.val().email + "</td><td>" + childSnapshot.val().weight + "</td><td>" + childSnapshot.val().height + "</td><td>" + childSnapshot.val().gender + "</td></tr>" + childSnapshot.val().age + "</td></tr>"
      
      //writes data to table
      $("#userTable tbody").append(newRowContent);
  
    }, function (errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });


  });//closes the document dot ready