showNotes();            // calling the function so that when the page loads the notes cards can be loaded first

var textArea = document.querySelector(".add-text");
var addBtn = document.querySelector(".add-btn");

var notesArr = [];

// function to add text are data to our local storage

// in this function first we got the data of notes key from our local storage and stored it in a variable
// called notesData then we checked if notesData is empty or not.If it is empty then we created a noteArr
// as an empty array and if not then we parsed our notesData(which is a string) to our notesArr

// After that we pushed the new value to the notesArr from the textArea where user entered the data then we
// stored the array as a string in localStorage and emptied our textArea.

addBtn.addEventListener("click", function (err) {
    
    var notesData = localStorage.getItem("notes");
    
    if (notesData == null) {
        notesArr = [];
    }
    else {
        notesArr = JSON.parse(notesData);
    }

    notesArr.push(textArea.value);
    if (textArea.value == "") {
        alert("Write something first.");
    }
    else {
        localStorage.setItem("notes", JSON.stringify(notesArr));
        textArea.value = "";
        console.log(notesArr);
        showNotes();
    }         // to display a new card of recently stored data
});

// in this function shownotes
//     a) got the data from local storage and checked if its empty or not
//     b) if empty then make notesArr empty else parse the local storage data to the notesArr
//     c)then created an empty string called html
//     d)loop through the notesArr and add in our html string html for new card where arr index is index and array element is element
//     e)if our bottom container is empty then show nothing inside else add bottom container inner html as html string


function showNotes() {
    
    var notesData = localStorage.getItem("notes");
    if (notesData == null) {
        notesArr = [];
    }
    else {
        notesArr = JSON.parse(notesData);
    }

    var html = "";

    notesArr.forEach(function (element, index) {
        html += `
                <div class="card">
                    <div class="card-detail">
                        <h3>Note ${index + 1}</h3>
                        <button type="button" id="${index}" onclick="deleteNote(this.id)" >Delete</button>
                    </div>
                    <div class="card-data">
                        <p>${element}</p>
                    </div>
                </div>
                `
    });

    var notesCard = document.querySelector(".bottom-container");
    if (notesArr.length != 0) {
        notesCard.innerHTML = html;
    }
    else {
        notesCard.innerHTML = "<h3>Nothing to show here! Add to note in above section.</h3>";
        notesCard.style.margin = "2rem";
    }
}

// in this function
//     a)again got data as string from local storage and checked if its null or not
//     b) if null then notesArr is empty arr else parse local storage data to our array
//     c) used.splice to delete the elements from the array
//     d)then set the new array values to the local storage
//     e)called the function show notes

function deleteNote(index) {
    
    var notesData = localStorage.getItem("notes");
    if (notesData == null) {
        notesArr = [];
    }
    else {
        notesArr = JSON.parse(notesData);
    }

    notesArr.splice(index, 1);      // deletes from index to no of values in array
    localStorage.setItem("notes", JSON.stringify(notesArr));
    showNotes();
}

