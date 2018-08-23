// This function remove element from an array
function removeElement(array, element) {
    let index = array.indexOf(element);
    if (index > -1) {
        array.splice(index, 1);
    }
}

// This function counts element occurances in an array
function countElement(array, element) {
    let counts = {};
    for (var i = 0; i < array.length; i++) {
        if (!counts.hasOwnProperty(array[i])) {
            counts[array[i]] = 1;
        }
        else {
            counts[array[i]]++;
        }
    }
    return counts[element];
}

// This function finds index of duplicate elements in an array
function findDuplicateElement(array, element) {
    let duplicates = {};
    for (var i = 0; i < array.length; i++) {
        if (duplicates.hasOwnProperty(array[i])) {
            duplicates[array[i]].push(i);
        }
        else if (array.lastIndexOf(array[i]) !== i) {
            duplicates[array[i]] = [i];
        }
    }
    return duplicates[element];
}

// main program

$(document).ready(function () {

    var letters = ["A", "B", "C", "D"];

    for (var i = 0; i < letters.length; i++) {

        var letterBtn = $("<button>");
        letterBtn.addClass("letter-button letter letter-button-color");
        letterBtn.attr("data-letter", letters[i]);
        letterBtn.text(letters[i]);
        $("#buttons").append(letterBtn);
    }

    $(".letter-button").on("click", function () {
        var fridgeMagnet = $("<div>");
        fridgeMagnet.addClass("letter fridge-color");
        fridgeMagnet.text($(this).attr("data-letter"));
        $("#display").append(fridgeMagnet);

    });

    $("#clear").on("click", function () {
        $("#display").empty();
    });

});