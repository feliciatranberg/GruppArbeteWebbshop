class shopItem {
    constructor(type, id, name, color, size, price) {
        this.type = type;
        this.id = id;
        this.name = name;
        this.color = color;
        this.size = size;
        this.price = price;
    }
}

let shirt1 = new shopItem("Hoodie","1:1","djurparken1","black","medium","199")
let shirt2 = new shopItem("Hoodie","1:2","ambivalens2","black","medium","199")
let shirt3 = new shopItem("tshirt","2:1","djurparken3","black","medium","99")
let shirt4 = new shopItem("tshirt","2:2","ambivalens4","black","medium","99")

let demoProductArr = [shirt1,shirt2,shirt3,shirt4]
let checkoutArr = [];

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




function checkoutCreator(){
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
                        checkoutArr.splice(i,1);
                        console.log(checkoutArrFromLS);
                        localStorage.clear();
                        localStorage.setItem("checkoutArr",JSON.stringify(checkoutArrFromLS));
                        
                        checkout.empty();
                        checkoutCreator();


                             
                            
                    })
                        
                       
                    
        });
        

}
