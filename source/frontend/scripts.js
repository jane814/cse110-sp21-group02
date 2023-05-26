// When the user clicks on the button, toggle between hiding and showing the dropdown content 
function dropDown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

//Generates results onClick
function generate() {
    let image = document.getElementById("display-img");
    image.src = "./images/image1.svg";

    let meaning = document.getElementById("meaning");
    meaning.classList.toggle("show");

    let saveButton = document.getElementById("save");
    saveButton.classList.toggle("show");

    let retryButton = document.getElementById("retry");
    retryButton.classList.toggle("show");

    let dropdownButton = document.querySelector(".dropbtn");
    dropdownButton.style.display = "none";
}