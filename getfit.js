// jQuery var we will use insted of the literal string inside 
// the ajax call 

// application id: 7cbf3fce
// application key: c33c9593adf94c5e7fdc564c7cd0b1ff

$(document).ready(function () {

var database = firebase.database();

var apiKey = "c33c9593adf94c5e7fdc564c7cd0b1ff";
var idAPI = "7cbf3fce";

var userInput;
// EVENT LISTENER
// alert("this worked!");

// The on click event that gets the users input 
$("a[data-food-name]").on("click", function (event) {
    $("#caloriesshow").text("");
    // console.log("test");
    event.preventDefault();
    // Get the value associated with the image the user picked
    // REVIEW THIS 
    userInput = $(this).attr("data-food-name");
    console.log(userInput);

    //search url for common food 
    var queryURL = "https://trackapi.nutritionix.com/v2/search/instant?query=" + userInput;
    //nutrients url 
    var queryURL1 = "https://trackapi.nutritionix.com/v2/natural/nutrients";
    //exercise url
    var exerciseURL = "https://trackapi.nutritionix.com/v2/natural/exercise";
    // asynchronous HTTP request

    $.ajax({
        url: queryURL,
        method: "GET",
        dataType: "json",
        headers: {
            "x-app-id": idAPI,
            "x-app-key": apiKey,
            "x-remote-user-id": 0
        }

        //After the data comes back from the API
    }).then(function (response) {
        console.log(response);
        // console.log(response.branded[0].food_name);
        // console.log(response.branded[0].nf_calories);

        // creates var for storing response 
        var food_name = response.common[0].food_name;
        var img = response.common[0].photo.thumb;
        var servingQty = response.common[0].serving_qty;
        var servingUnit = response.common[0].serving_unit;
        console.log("food =" + food_name, "img =" + img, "servingQty =" + servingQty, "servingUnit =" + servingUnit);

        $.ajax({
            url: queryURL1,
            data: {
                "query": food_name,
                "num_servings": 1,
                "aggregate": food_name,
                "line_delimited": false,
                "use_raw_foods": true,
            },
            method: "POST",
            ContentType: "application/json",
            headers: {
                "x-app-id": idAPI,
                "x-app-key": apiKey,
                "x-remote-user-id": 0
            }

        }).then(function (nutrition) {
            console.log(nutrition);
    
            // var tBody = $("tbody");
            // var tRow = $("<tr>");

            //create variable for calories
            var calories = nutrition.foods[0].nf_calories;
            console.log(calories);

            // var publicCal = $("<td>").text(food_name + ": " + calories);

            // //append the newly created table data to table
            // tRow.append(publicCal);
            // //append table row to table body
            // tBody.append(tRow);
        
            $("#caloriesshow").append("Calories of your food " + calories);
            

        });
    
        // AJAX call to get exercise for low, medium, high intensity 
        // need to get user id, gender, weight, height, age from db

        $.ajax({
            url: exerciseURL,
            data: {
                "query": "walking jogging jogging running",
                "gender": "female",
                "weight_kg": 72.5,
                "height_cm": 167.64,
                "age": 30
            },
            method: "POST",
            headers: {
                "x-app-id": idAPI,
                "x-app-key": apiKey,
                contentType: "application/json"
                //"x-remote-user-id": 0  
            }

        }).then(function (response) {
            console.log(response);

            // save exercise in variable 
            var exercise = response.exercises


        });


    });//then response function 




}); //closing on click function



});// closing tags 

//DO WE NEED TO ADD ERROR HANDLER 

// });