var currentState = 0;
var budget = 1000;
const grid_container = document.querySelector(".grid-container");

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

function makeGrid(rows, cols, boxSize) {
    grid_container.style.setProperty('--grid-rows', rows);
    grid_container.style.setProperty('--grid-cols', cols);
    for(c = 0; c < (rows * cols); c++) {
        let cell = document.createElement("div");
        cell.innerText = (c + 1);
        cell.style.padding = boxSize + "px";
        grid_container.appendChild(cell).className = "grid-item";
    }
}

makeGrid(69, 99, 2);