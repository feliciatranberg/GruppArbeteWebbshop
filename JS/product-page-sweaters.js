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
let shirt1 = new shopItem("Hoodie","1:1","djurparken1","Grön Tröja","Small",199, "/images/sweaters/sweater-1.jpg","en tröja",true)
let shirt2 = new shopItem("Hoodie","1:2","ambivalens2","Lila Tröja","Small",199, "/images/sweaters/sweater-2.jpg","en tröja",true)
let shirt3 = new shopItem("tshirt","2:1","djurparken3","Svart Tröja","Small",100, "/images/sweaters/sweater-3.jpg","en tröja",true)
let shirt4 = new shopItem("tshirt","2:2","ambivalens4","Blå Hoodie","Small",100, "/images/sweaters/sweater-4.jpg","en tröja",true)
let shirt5 = new shopItem("tshirt","2:2","ambivalens4","Grön Tröja","Small",300, "/images/sweaters/sweater-5.jpg","en tröja",true)
let shirt6 = new shopItem("tshirt","2:2","ambivalens4","Blå Tröja","Small",500, "/images/sweaters/sweater-6.jpg","en tröja",true)
//localStorage.clear()
let tshirtProducter = [shirt1,shirt2,shirt3,shirt4,shirt5,shirt6]
//let checkoutArr = JSON.parse(localStorage.checkoutArr)
let checkoutArr = [];
//let priceArray = [];
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
                    localStorage.setItem("checkoutArr",JSON.stringify(checkoutArr));
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
                            //let priceArray =JSON.parse(localStorage.priceArray);
                            //priceArray.splice(i,1);
                            //localStorage.setItem("priceArray",JSON.stringify(priceArray));
                            checkoutArr.splice(i,1);
                            //console.log(checkoutArrFromLS);
                            //localStorage.clear();
                            localStorage.setItem("checkoutArr",JSON.stringify(checkoutArrFromLS));
                           // console.log(priceArray)
                            checkout.empty();
                            //($("#checkoutTotal")).empty();
                            checkoutCreator();
                            
                            totalCreator();
                            
                            
    
                                 
                                
                        })
                            
                           
                        
            });
          
    
    }

//skapar första gången ptag för prissumma, adderar/subtrarherar följande ggr från array o renderar
function totalCreator(item){
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