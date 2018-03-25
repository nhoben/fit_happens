//var database = firebase.database();

$(document).ready(function () {

    //alert("The fit happens get food javascript file has been added!");

    $("#radioBtn").click(function () {
        // Get the first td
        var firstName = $(this).closest('tr').children('td:eq(0)').text();
        var lastName = $(this).closest('tr').children('td:eq(1)').text();
        alert('userId:  ' + firstName+"_"+lastName);
    });

    $("#addFoodBtn").on("click", function (event) {
        event.preventDefault();
        //var food = $("#addFood").val().trim();
        //displays the name of the food that was added
        //alert(food);

        //searchValue = $(this).val();
        searchValue = $("#addFood").val().trim()

        //logs the name of the food entered
        console.log(searchValue);

        var apiKey = "c33c9593adf94c5e7fdc564c7cd0b1ff";
        var idAPI = "7cbf3fce";
        var webAddress = "https://trackapi.nutritionix.com/v2/search/instant?query=";
        
        console.log(webAddress+searchValue);
        
        //AJAX call to get food list from nutritionix API //

        $.ajax({
            //url: queryURL,
            url: webAddress + searchValue,
            method: "GET",
            dataType: "json",
            headers: {
                "x-app-id": idAPI,
                "x-app-key": apiKey,
                "x-remote-user-id": 0
            } 
        }).then(function (response) {
            console.log(response);
            



        }); //ends the response function


    });



}); //ends document dot ready