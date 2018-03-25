// jQuery var we will use insted of the literal string inside 
// the ajax call 

// application id: 7cbf3fce
// application key: c33c9593adf94c5e7fdc564c7cd0b1ff

$(document).ready(function () {

            var apiKey = "c33c9593adf94c5e7fdc564c7cd0b1ff";
            var idAPI = "7cbf3fce";

            var userInput;
            // EVENT LISTENER

            // The on click event that gets the users input 
            $(".image").on("click", function () {
                event.preventDefault();
                // Get the value associated with the image the user picked
                // REVIEW THIS 
                userInput = $(this).attr("name");
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
                console.log("food ="+ food_name,"img ="+img, "servingQty ="+servingQty, "servingUnit ="+ servingUnit);

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

                    //WE NEED TO CONSOLE LOG CALORIES HERE 
                    //save variable for calories
                    var calories = nutrition.foods[0].nf_calories;
                    console.log(calories);

                // push info of food, calories into firebase 
                database.ref().push(food_name);
                database.ref().push(img);
                database.ref().push(servingQty);            
                database.ref().push(servingUnit);
                database.ref().push(calories);

                });

                // AJAX call to get exercise for low, medium, high intensity 
                // need to get user id, gender, weight, height, age from db

                $.ajax({
                    url: exerciseURL, 
                    data:{
                        "query": "walking jogging jogging running",
                        "gender": "female",
                        "weight_kg": 72.5,
                        "height_cm":167.64,
                        "age": 30
                    },
                    method: "POST",
                    headers: {
                        "x-app-id": idAPI,
                        "x-app-key": apiKey,
                        contentType:"application/json"
                        //"x-remote-user-id": 0  
                    }

                }).then(function(response){
                    console.log(response);

                // save exercise in variable 
                var exercise = response.exercises
                });

        });


            });

            //DO WE NEED TO ADD ERROR HANDLER 

    });