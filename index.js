import {Floor, Wall, Bed, Bookcase, Chair, Desk, Dresser} from "./furniture.js";

var currentState = 0;
var budget = 1000;
const grid_container = document.querySelector(".grid-container");

document.querySelector(".bed").addEventListener("click", load_json_bed_data, false);
document.querySelector(".bookcase").addEventListener("click", load_json_bookcases_data, false);
document.querySelector(".chair").addEventListener("click", load_json_chair_data, false);
document.querySelector(".desk").addEventListener("click", load_json_desk_data, false);
document.querySelector(".dresser").addEventListener("click", load_json_dresser_data, false);

$(".budget-container").submit(function(e) {
    budget = parseInt(document.querySelector('#budget').value);

    // added currentState to reload the data after a budget has been set
    if(currentState == 1) {
        load_json_bed_data();
    } else if(currentState == 2) {
        load_json_bookcases_data();
    } else if(currentState == 3) {
        load_json_chair_data();
    } else if(currentState == 4) {
        load_json_desk_data();
    } else if(currentState == 5) {
        load_json_dresser_data();
    }
});

function display_product_information(product, i) {
    // ideally whenever a button is clicked we called the load json data function and then display the image
    // price and name additionally we could add extra functionality by adding a price budget
    // ex: show products below $300 dollars
    if(product[i].price <= budget) {
        console.log(`Product Name: ${product[i].name} | Price: $${product[i].price} | URL: ${product[i].url}`)
        var mainDiv = document.createElement("div");
        mainDiv.className = "product";
        var innerDiv = document.createElement("div");
        var img = document.createElement('img');
        img.className = "furniture-img";
        var name = document.createElement('P');
        name.innerText = `PRODUCER: ${product[i].name}`;
        var price = document.createElement('P');
        price.innerText = `PRICE: $${product[i].price}`;
        var link = document.createElement("a");
        link.innerText = "Click here to visit the Ikea page";
        link.href = product[i].url;
        img.src = product[i].img;
        mainDiv.appendChild(img);
        innerDiv.appendChild(name);
        innerDiv.appendChild(price);
        innerDiv.appendChild(link);
        mainDiv.appendChild(innerDiv);
        document.querySelector(".product-container").appendChild(mainDiv);
    }
}

function load_json_bed_data() {
    clear_data();
    $.getJSON("bed.json", function(data) {
        for(var i = 0; i < data.bed.length; i++) {
            display_product_information(data.bed, i);
        }
    });
    currentState = 1;
    document.querySelector(".furniture-type").innerText = "bed";
}

function load_json_bookcases_data() {
    clear_data();
    $.getJSON("bookcase.json", function(data) {
        for(var i = 0; i < data.bookcase.length; i++) {
            display_product_information(data.bookcase, i);
        }
    });
    currentState = 2;
    document.querySelector(".furniture-type").innerText = "bookcase";
}

function load_json_chair_data() {
    clear_data();
    $.getJSON("chair.json", function(data) {
        for(var i = 0; i < data.chair.length; i++) {
            display_product_information(data.chair, i);
        }
    });
    currentState = 3;
    document.querySelector(".furniture-type").innerText = "chair";
}

function load_json_desk_data() {
    clear_data();
    $.getJSON("desk.json", function(data) {
        for(var i = 0; i < data.desk.length; i++) {
            display_product_information(data.desk, i);
        }
    });
    currentState = 4;
    document.querySelector(".furniture-type").innerText = "desk";
}

function load_json_dresser_data() {
    clear_data();
    $.getJSON("dresser.json", function(data) {
        for(var i = 0; i < data.dresser.length; i++) {
            display_product_information(data.dresser, i);
        }
    });
    currentState = 5;
    document.querySelector(".furniture-type").innerText = "dresser";
}

function clear_data(){
    document.querySelector(".product-container").innerHTML = "";
}


var rows = 14;
var cols = 40;

// this function makes the CSS/HTML GRID
function makeGrid(rows, cols, boxSize) {
    grid_container.style.setProperty('--grid-rows', rows);
    grid_container.style.setProperty('--grid-cols', cols);
    var xPos = 0;
    for(let c = 0; c < (rows * cols); c++) {
        if(c % 40 == 0 && c > 0) {
            xPos++;
        }
        let cell = document.createElement("div");
        cell.innerText = "F";
        cell.setAttribute('id', `Position#${xPos}-${c % 40}`);
        cell.style.padding = boxSize + "px";
        cell.addEventListener("click", (e) => {placeFurniture(e.target.id)});
        grid_container.appendChild(cell).className = "grid-item";
    }
}


let grid_array = Array(rows).fill().map(() => Array(cols));
initalizeGridArray();
makeGrid(rows, cols, 5);

// this function actually makes a 2D array to hold furniture objects
function initalizeGridArray() {
    for(var i = 0; i < rows; i++) {
        for(var j = 0; j < cols; j++) {
            grid_array[i][j] = new Floor(i, j, "Floor");
        }
    }
}

function printGrid() {
    for(var i = 0; i < grid_array.length; i++) {
        for(var j = 0; j < grid_array[i].length; j++) {
            console.log(grid_array[i][j].getName());
        }
    }
}

// these eventListeners change it so when we click on grid we place that furniture type onto the grid
document.querySelector(".clear-grid-button").addEventListener("click", clearGrid, false);
document.querySelector(".place-wall-button").addEventListener("click", () => {currentPlacer = 1}, false);
document.querySelector(".place-bed-button").addEventListener("click", () => {currentPlacer = 2}, false);
document.querySelector(".place-bookcase-button").addEventListener("click", () => {currentPlacer = 3}, false);
document.querySelector(".place-desk-button").addEventListener("click", () => {currentPlacer = 4}, false);
document.querySelector(".place-chair-button").addEventListener("click", () => {currentPlacer = 5}, false);
document.querySelector(".place-dresser-button").addEventListener("click", () => {currentPlacer = 6}, false);
document.querySelector(".place-floor-button").addEventListener("click", () => {currentPlacer = 7}, false)
// this button is for temporary use please delete later
document.querySelector(".print-grid").addEventListener("click", printGrid, false);

// create a function that checks if the furniture item fits
function isValidPlacement(x, y) {
    if((currentPlacer == 1 || currentPlacer == 5) && grid_array[x][y].getClassName() == "Floor") {
        return true;
    }  
    return false;
}

var currentPlacer = 0;

function placeFurniture(position) {
    
    var xCoord = position.substring(position.indexOf("#") + 1, position.indexOf("-"));
    var yCoord = position.substring(position.indexOf("-") + 1);

    
    if(currentPlacer == 1 && isValidPlacement(xCoord, yCoord)) {
        console.log(`PLACED WALL AT (${xCoord}, ${yCoord})`);
        document.getElementById(position).style.backgroundColor = "red";
        document.getElementById(position).innerText = "W";
        grid_array[xCoord][yCoord] = new Wall(xCoord, yCoord);
    } else if(currentPlacer == 2) {
        console.log(`PLACED BED AT (${xCoord}, ${yCoord})`);
    } else if(currentPlacer == 3) {
        console.log(`PLACED BOOKCASE AT (${xCoord}, ${yCoord})`);
    } else if(currentPlacer == 4) {
        console.log(`PLACED DESK AT (${xCoord}, ${yCoord})`);
    } else if(currentPlacer == 5 && isValidPlacement(xCoord, yCoord)) {
        console.log(`PLACED CHAIR AT (${xCoord}, ${yCoord})`);
        document.getElementById(position).style.backgroundColor = "blue";
        document.getElementById(position).innerText = "C";
        grid_array[xCoord][yCoord] = new Chair(xCoord, yCoord);
    } else if(currentPlacer == 6) {
        console.log(`PLACED DRESSER AT (${xCoord}, ${yCoord})`);
    } else if(currentPlacer == 7) {
        document.getElementById(position).style.backgroundColor = "white";
        document.getElementById(position).innerText = "F";
        grid_array[xCoord][yCoord] = new Floor(xCoord, yCoord, "Floor");
    }
}

function clearGrid() {
    initalizeGridArray();
    //printGrid();
    currentPlacer = 0;
}

