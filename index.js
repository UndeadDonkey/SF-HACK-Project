// hardcoded some functions for now
function display_product_information(product, i) {
    // ideally whenever a button is clicked we called the load json data function and then display the image
    // price and name additionally we could add extra functionality by adding a price budget
    // ex: show products below $300 dollars
    console.log(`Product Name: ${product[i].name} | Price: $${product[i].price} | URL: ${product[i].url}`)

    var img = document.createElement('img');
    var text = document.createElement('P');
    text.innerText = `PRODUCER: ${product[i].name}      | PRICE: $${product[i].price}       | URL: `;
    var link = document.createElement("a");
    link.innerText = product[i].url;
    link.href = product[i].url;
    text.appendChild(link);
    img.src = product[i].img;
    document.querySelector(".product-container").appendChild(img);
    document.querySelector(".product-container").appendChild(text);
}

function load_json_bed_data() {
    clear_data();
    $.getJSON("bed.json", function(data) {
        for(var i = 0; i < data.bed.length; i++) {
            display_product_information(data.bed, i)
        }
    })
}

function load_json_bookcases_data() {
    clear_data();
    $.getJSON("bookcase.json", function(data) {
        for(var i = 0; i < data.bookcase.length; i++) {
            display_product_information(data.bookcase, i)
        }
    })
}

function load_json_chair_data() {
    clear_data();
    $.getJSON("chair.json", function(data) {
        for(var i = 0; i < data.chair.length; i++) {
            display_product_information(data.chair, i)
        }
    })
}

function load_json_desk_data() {
    clear_data();
    $.getJSON("desk.json", function(data) {
        for(var i = 0; i < data.desk.length; i++) {
            display_product_information(data.desk, i)
        }
    })
}

function load_json_dresser_data() {
    clear_data();
    $.getJSON("dresser.json", function(data) {
        for(var i = 0; i < data.dresser.length; i++) {
            display_product_information(data.dresser, i)
        }
    })
}

//load_json_dresser_data()

// here we want to have functions to show json data when a button is pressed

function clear_data(){
    document.querySelector(".product-container").innerHTML = "";
}
