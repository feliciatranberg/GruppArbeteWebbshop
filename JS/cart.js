class shopItem {
    constructor(type, id, name, color, size, price,image,description,stockAvailable) {
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
let shirt1 = new shopItem("Hoodie","1:1","djurparken1","black","Small",199,"1.jpg","En tröja",true)
let shirt2 = new shopItem("Hoodie","1:2","ambivalens2","black","Small",199,"2.jpg")
let shirt3 = new shopItem("tshirt","2:1","djurparken3","black","Small",99,"1.jpg")
let shirt4 = new shopItem("tshirt","2:2","ambivalens4","black","Small",99,"2.jpg")


let demoProductArr = [shirt1,shirt2,shirt3,shirt4]
let checkoutArr = [];
let priceArray = [];
let totalCount = 0;
//onload, rendera product arr när man klickar på add to cart skicka det item till ls och kör checkoutCreator & totalCreator
$(function(){

   ($("<button>"))
    .html("clear LS")
    .on("click",()=>{
        localStorage.clear();
    })
    .appendTo($("body"));

    $.each(demoProductArr,(i,item)=>{
            let itemDiv = ($("<div>"))
                .addClass("itemDiv")
                .appendTo($("body"));

            ($("<h3>"))
                .html(item.name)
                .appendTo($(itemDiv));
            
            ($("<img>"))
                .attr("src",item.image)
                .addClass("productImage")
                .appendTo($(itemDiv));
            ($("<p>"))
                .html(item.type)
                .appendTo($(itemDiv));

            ($("<button>"))
                .html("large")
                .on("click",()=>{
                    console.log(item.size)
                    item.size = "large"
                    console.log(item.size)
                   
                })
                .appendTo($(itemDiv));

                ($("<button>"))
                .html("Add to cart")
                .appendTo($(itemDiv))
                .on("click",{item:item},(e)=>{
                   
                    let itemObject = e.data.item;
                    checkoutArr.push(itemObject)
                  
                    shoppingCartDiv.removeClass("hidden");
                    localStorage.setItem("checkoutArr",JSON.stringify(checkoutArr));
                    ($("#shoppingCart")).empty();
                    checkoutCreator();
                    totalCreator(item);
                    
                })
                

         
                
    })
//Div för shoppingcart or elaterad saker
   let shoppingCartDiv = $("<div>")
        .addClass("hidden")
        .attr("id","shoppingCartDiv")
        .appendTo($("body"));

        ($("<div>"))
        .attr("id","shoppingCart")
        .appendTo(shoppingCartDiv);

        ($("<button>"))
        .attr("id","goToCheckout")
        .html("Go to checkout")
        .appendTo(shoppingCartDiv);
     

    $("<button>")
        .html("Show cart")
        .appendTo($("body"))
        .on("click",()=>{
            
            shoppingCartDiv.toggleClass("hidden");
              
                
        });

   
   
}); 



//rendera namn & addera pris - också borttagning tar då bort från lister och kör funktioner som behövs
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
                        localStorage.clear();
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
    let bitch = ($("#checkoutTotal"));
    if (priceArray == 0 && totalCount == 0) {
       
    priceArray.push(item.price +);
   
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
