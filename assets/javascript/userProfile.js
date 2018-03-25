$(document).ready(function () {
  //Testing to ensure javascript is linked properly//

//alert("this file is linked to the javascript file");
  var database = firebase.database();

  $("#userButton").on("click", function () {
    event.preventDefault();

    //var userId = uid;
    var firstName = $("#firstNameInput").val().trim();
    var lastName = $("#lastNameInput").val().trim();
    var email = $("#emailInput").val().trim();
    var weight = $("#weightInput").val().trim();
    var height = $("#heightInput").val().trim();
    var age = $("#ageInput").val().trim();
    var gender = $("#genderInput").val().trim();
    //console.log user profile to make sure it works
    console.log(firstName);

    //database.ref().push({
    database.ref().child(firstName+"_"+lastName).set({
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

    //clear the userInputForm
     // Clear form
  document.getElementById("userForm").reset();

  });

  database.ref().on("child_added", function (childSnapshot) {

    //var newRowContent = "<tr><td>" + childSnapshot.val().firstName + "</td><td>" + childSnapshot.val().lastName + "</td><td>" + childSnapshot.val().weight + "</td><td>" + childSnapshot.val().height + "</td><td>" + childSnapshot.val().dateAdded + "</td></tr>"
    var newRowContent = "<tr><td>" + '<input type="radio" value="" name="selectUser"/>' + "</td><td>" + childSnapshot.val().firstName + "</td><td>" + childSnapshot.val().lastName + "</td><td>" + childSnapshot.val().weight + "</td><td>" + childSnapshot.val().height + "</td><td>" + childSnapshot.val().gender + "</td><td>"+ childSnapshot.val().age + "</td><td>" 
    
    $(":radio").attr.val() = childSnapshot.val().firstName+"_"+childSnapshot.val().lastName;
    //append record into the user table
    $("#userTable tbody").append(newRowContent);   

    //$( "input[type=radio][name=baz]:checked" ).val();

  }, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

  $('#user a').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

});