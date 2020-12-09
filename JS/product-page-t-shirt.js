//This is the same code I took from Felicias JS. I changed the photos and changed file names.
class shopItem {
  constructor(
    type,
    id,
    name,
    color,
    size,
    price,
    image,
    description,
    stockAvailable
  ) {
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

let shirt1 = new shopItem(
  "tshirt",
  "1:1",
  "djurparken1",
  "Rosa T-shirt",
  "Small",
  199,
  "/images/t-shirts/t-shirt-1.jpg",
  "en t-shirt",
  true
);
let shirt3 = new shopItem(
  "tshirt",
  "2:1",
  "djurparken3",
  "Rosa T-shirt",
  "Small",
  100,
  "/images/t-shirts/t-shirt-3.jpg",
  "en t-shirt",
  true
);
let shirt2 = new shopItem(
  "tshirt",
  "1:2",
  "ambivalens2",
  "Svart T-shirt",
  "Small",
  199,
  "/images/t-shirts/t-shirt-2.jpg",
  "en t-shirt",
  true
);
let shirt4 = new shopItem(
  "tshirt",
  "2:2",
  "ambivalens4",
  "Rosa T-shirt",
  "Small",
  100,
  "/images/t-shirts/t-shirt-4.jpg",
  "en t-shirt",
  true
);
let shirt5 = new shopItem(
  "tshirt",
  "2:2",
  "ambivalens4",
  "Blå T-shirt",
  "Small",
  300,
  "/images/t-shirts/t-shirt-5.jpg",
  "en t-shirt",
  true
);
let shirt6 = new shopItem(
  "tshirt",
  "2:2",
  "ambivalens4",
  "Stripped T-shirt",
  "Small",
  500,
  "/images/t-shirts/t-shirt-6.jpg",
  "en t-shirt",
  true
);

let tshirtProducter = [shirt1,shirt2,shirt3,shirt4,shirt5,shirt6]
let checkoutArr = [];
let priceArray = [];
let totalCount = 0;
//localStorage.clear();
$(function() {
    let wrapperProductPage = ($("<div>"))
        .addClass("wrapperProductPage")
        .appendTo($("body"));

    $.each(tshirtProducter,(i,item)=>{

    
          
     
                let itemDiv = ($("<div>"))
                .addClass("itemDiv")
                .on("click",{item:item},(e)=>{
                    window.location.href = "product-specific.html";
                    let itemObject = e.data.item;
                   // checkoutArr.push(itemObject)
                    localStorage.setItem("itemObject",JSON.stringify(itemObject));
                    console.log(checkoutArr)
                    //shoppingCartDiv.removeClass("hidden");
                    //localStorage.setItem("checkoutArr",JSON.stringify(checkoutArr));
                    ($("#shoppingCart")).empty();
                    checkoutCreator();
                    totalCreator(item);
                    
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


            //Div för shoppingcart or elaterad saker
            let shoppingCartDiv = $("<div>")
            .addClass("hidden")
            .attr("id","shoppingCartDiv")
            //.attr("position","absolute")
            .appendTo($("#shoppingcartExtend"));

            ($("<div>"))
            .attr("id","shoppingCart")
            .appendTo(shoppingCartDiv);

            ($("<button>"))
            .attr("id","goToCheckout")
            .html("Go to checkout")
            .appendTo(shoppingCartDiv);



            $("#shoppingcartButton")
   
            .on("click",()=>{
                
             shoppingCartDiv.toggleClass("hidden");
             ($("#shoppingCart")).empty();
              checkoutCreator();
              totalCreator();
                    
            });

     //onload           
    });


    function checkoutCreator(i,item){
        let checkout = ($("#shoppingCart"))
            let checkoutArrFromLS = JSON.parse(localStorage.checkoutArr)
          
            
            $.each(checkoutArrFromLS,(i,item)=>{
    
                    ($("<h5>"))
                        .html(item.name)
                        .appendTo($(checkout));
                    ($("<button>"))
                        .addClass("")
                        .html("X")
                        .appendTo($(checkout))
                        .on("click",()=>{
                            checkoutArrFromLS.splice(i,1);
                            priceArray.splice(i,1);
                            checkoutArr.splice(i,1);
                            //console.log(checkoutArrFromLS);
                            //localStorage.clear();
                            localStorage.setItem("checkoutArr",JSON.stringify(checkoutArrFromLS));
                            console.log(priceArray)
                            checkout.empty();
                            //($("#checkoutTotal")).empty();
                            checkoutCreator();
                            
                            totalCreator();
                            
                            
    
                                 
                                
                        })
                            
                           
                        
            });
          
    
    }

//skapar första gången ptag för prissumma, adderar/subtrarherar följande ggr från array o renderar
function totalCreator(item){
  console.log("ASdas")
    let bitch = ($("#checkoutTotal"));
    if (priceArray == 0 && totalCount == 0) {
       
    priceArray.push(item.price);
   
    let arrSum = priceArray.reduce((a, b) => a + b, 0);
    
    ($("<p>"))
    .attr("id","checkoutTotal")
    .html(arrSum)
    .appendTo($("#shoppingCartDiv"));
    totalCount = 1;
}
else
    {
       if (priceArray == 0){
            bitch.addClass("hidden");
       }
       else {
           bitch.removeClass("hidden");
       }
        if (item != undefined) {
        priceArray.push(item.price);
        }
        let arrSum = priceArray.reduce((a, b) => a + b, 0);
        console.log(priceArray);
       
        ($("#checkoutTotal"))
        .html(arrSum)
        .appendTo($("#shoppingCartDiv"));
        
    }
}