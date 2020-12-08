class shopItem {
    constructor(type, id, name, color, size, price, image, description, stockAvailable) {
        this.type = type;
        this.id = id;
        this.name = name;
        this.color = color;
        this.size = size;
        this.price = price;
        this.image = image;
        this.description = description;
        this.stockAvailable = stockAvailable;  
    }
}

let shirt1 = new shopItem("Hoodie","1:1","djurparken1","Grön Tröja","medium","199:-", "/images/sweaters/sweater-1.jpg")
let shirt2 = new shopItem("Hoodie","1:2","ambivalens2","Lila Tröja","medium","199:-", "/images/sweaters/sweater-2.jpg")
let shirt3 = new shopItem("tshirt","2:1","djurparken3","Svart Tröja","medium","99:-", "/images/sweaters/sweater-3.jpg")
let shirt4 = new shopItem("tshirt","2:2","ambivalens4","Blå Hoodie","medium","99:-", "/images/sweaters/sweater-4.jpg")
let shirt5 = new shopItem("tshirt","2:2","ambivalens4","Grön Tröja","medium","99:-", "/images/sweaters/sweater-5.jpg")
let shirt6 = new shopItem("tshirt","2:2","ambivalens4","Blå Tröja","medium","99:-", "/images/sweaters/sweater-6.jpg")

let tshirtProducter = [shirt1,shirt2,shirt3,shirt4,shirt5,shirt6]

$(function() {
    let wrapperProductPage = ($("<div>"))
        .addClass("wrapperProductPage")
        .appendTo($("body"));

    $.each(tshirtProducter,(i,item)=>{

    
          
     
                let itemDiv = ($("<div>"))
                .addClass("itemDiv")
                .on("click",()=>{
                    window.location.href = "product-specific.html";
                })
                .appendTo($(wrapperProductPage));
                

                ($("<img>"))
                .attr("src",item.image)
                .addClass("productImage")
                .appendTo($(itemDiv));
           
                ($("<h3>"))
                .html(item.color)
                .appendTo($(itemDiv));

                ($("<h2>"))
                .html(item.price)
                .appendTo($(itemDiv));
             })
            
                
    })


