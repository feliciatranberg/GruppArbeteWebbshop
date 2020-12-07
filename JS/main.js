class shopItem {
    constructor(type, id, name, color, size, price,image) {
        this.type = type;
        this.id = id;
        this.name = name;
        this.color = color;
        this.size = size;
        this.price = price;
        this.image = image;
    }
}
let shirt1 = new shopItem("Hoodie","1:1","djurparken1","black","medium",199,"1.jpg")
let shirt2 = new shopItem("Hoodie","1:2","ambivalens2","black","medium","199","2.jpg")
let shirt3 = new shopItem("tshirt","2:1","djurparken3","black","medium","99","1.jpg")
let shirt4 = new shopItem("tshirt","2:2","ambivalens4","black","medium","99","2.jpg")

let demoProductArr = [shirt1,shirt2,shirt3,shirt4]
let checkoutArr = [];
let priceArray = [];
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

   let shoppingCartDiv = $("<div>")
        .addClass("hidden")
        .attr("id","shoppingCartDiv")
        .appendTo($("body"));

        ($("<div>"))
        .attr("id","shoppingCart")
        .appendTo(shoppingCartDiv);
        
     

    $("<button>")
        .html("Show cart")
        .appendTo($("body"))
        .on("click",()=>{
            
            shoppingCartDiv.toggleClass("hidden");
              
                
        });

   
   
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
                        console.log(checkoutArrFromLS);
                        localStorage.clear();
                        localStorage.setItem("checkoutArr",JSON.stringify(checkoutArrFromLS));
                        
                        checkout.empty();
                        checkoutCreator();
                        totalCreator();
                        

                             
                            
                    })
                        
                       
                    
        });
      

}

function totalCreator(item){
 
    if (priceArray == 0) {
    
    priceArray.push(item.price);
   // console.log(priceArray)
    let Varsum = priceArray.reduce((a, b) => a + b, 0);

    ($("<p>"))
    .attr("id","checkoutTotal")
    .html(Varsum)
    .appendTo($("#shoppingCartDiv"));
}
else
    {
        priceArray.push(item.price);
        let Varsum = priceArray.reduce((a, b) => a + b, 0);
        console.log(priceArray);
        ($("#checkoutTotal"))
        .html(Varsum)
        .appendTo($("#shoppingCartDiv"));
    }
}