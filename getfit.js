$(document).ready(function () {
  // Initialize Firebase
  var config = {
      apiKey: "AIzaSyAiEVXlgKH6F0J0duzmVdODqy7xMajM_zE",
      authDomain: "fithappens-bb1e1.firebaseapp.com",
      databaseURL: "https://fithappens-bb1e1.firebaseio.com",
      projectId: "fithappens-bb1e1",
      storageBucket: "fithappens-bb1e1.appspot.com",
      messagingSenderId: "139108385488"

  };
  //console.log(config);
  firebase.initializeApp(config);  
  
  //Testing to ensure javascript is linked properly//
     database = firebase.database();
    
     var firstName;
     var lastName;
     var email;
     var weight;
     var height;
     var age;
     var gender;
     
    
     $(".btn-info").on("click", function () {
      event.preventDefault();
      firstName = $("#firstNameInput").val().trim();
      lastName = $("#lastNameInput").val().trim();
      email = $("#emailInput").val().trim();
      weight = $("#weightInput").val().trim();
      height = $("#heightInput").val().trim();
      age = $("#ageInput").val().trim();
      gender = $("#genderInput").val().trim();

        //For Female
      //bmr = 10 * weight + 6.25 * height - 5 * age - 161;//

      //console.log user profile to make sure it works
      console.log(firstName);
      console.log(bmr);
      database.ref().push({
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
    });
    database.ref().on("child_added", function (childSnapshot) {
       var newRowContent = "<tr> <td>" + childSnapshot.val().firstName + "</td> <td>" + childSnapshot.val().lastName + "</td> <td>" + childSnapshot.val().weight + "</td> <td>" + childSnapshot.val().height + "</td> <td>" + childSnapshot.val().gender + "</td> <td>" + childSnapshot.val().age + "</td></tr>";
       console.log(newRowContent);
      $("#userTable").append(newRowContent);
    }, function (errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

    $('#user a').click(function (e) {
      e.preventDefault()
      $(this).tab('show')
    })
  });
  
  
  //Add commentcollapse// 
  