class shopItem {
  constructor(type, id, name, color, size, price, image, description, stockAvailable,quantity,duplicate) {
      this.type = type;
      this.id = id;
      this.name = name;
      this.color = color;
      this.size = size;
      this.price = price;
      this.image = image;
      this.description = description;
      this.stockAvailable = stockAvailable;  
      this.quantity = quantity;
      this.duplicate = duplicate;
  }
}


let shirt1 = new shopItem("T-shirt","1:1","BG Logo","Rosa","Small",300, "/images/t-shirts/t-shirt-1.jpg","BG Logo t-shirt",true,0,false)
let shirt2 = new shopItem("T-shirt","1:2","Supersize Me","Svart","Small",300, "/images/t-shirts/t-shirt-2.jpg","Supersize Me t-shirt",true,0,false)
let shirt3 = new shopItem("T-shirt","2:1","Chakra","Grå","Small",300, "/images/t-shirts/t-shirt-3.jpg","Chakra T-shirt",true,0,false)
let shirt4 = new shopItem("T-shirt","2:2","Supersize Me","Beige","Small",300, "/images/t-shirts/t-shirt-4.jpg","Supersize Me t-shirt",true,0,false)
let shirt5 = new shopItem("T-shirt","2:2","Subtle Tie Dye","Rosa","Small",300, "/images/t-shirts/t-shirt-5.jpg","Subtle Tie Dye t-shirt",true,0,false)
let shirt6 = new shopItem("T-shirt","2:2","Chakra","Vit/Svart","Small",300, "/images/t-shirts/t-shirt-6.jpg","Chakra T-shirt",true,0,false)

let tshirtProducter = [shirt1,shirt2,shirt3,shirt4,shirt5,shirt6]
let checkoutArr = [];
//let priceArray = [];
let totalCount = false;
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
                .html(item.name)
                .appendTo($(itemDiv));

                ($("<h2>"))
                .html(item.price + ":-")
                .appendTo($(itemDiv)); 
             })


            //Div för shoppingcart or elaterad saker
            let shoppingCartDiv = $("<div>")
            .addClass("hidden")
            .attr("id","shoppingCartDiv")
          
            .appendTo($("#shoppingcartExtend"));

            ($("<div>"))
            .attr("id","shoppingCart")
            .appendTo(shoppingCartDiv);

            ($("<button>"))
            .attr("id","goToCheckout")
            .html("Go to checkout")
            .on("click",()=>{
              window.location.href = "checkout.html";
            })
            .appendTo(shoppingCartDiv);


$("#shoppingcartButton")
   
   .on("click",()=>{
    
    if (window.matchMedia('(max-width: 767px)').matches) {
      window.location.href = "checkout.html";
    }
    else {
   
    shoppingCartDiv.toggleClass("hidden");

    
      
    ($("#shoppingCart")).empty();
    checkoutCreator();
    totalCreator(); 
    }
   });

     //onload           
    });


    function checkoutCreator(i,item){
      console.log("checkoutCreator körs")
      let checkout = ($("#shoppingCart"))
          let checkoutArrFromLS = JSON.parse(localStorage.checkoutArr);
        console.log(checkoutArrFromLS);
          
          $.each(checkoutArrFromLS,(i,item)=>{

             let shoppingCartItemDiv=($("<div>"))
                  .addClass("shoppingCartItemDiv")
                  .appendTo($(checkout));

              let shoppingCartImgDiv=($("<div>"))
                  .addClass("shoppingCartImgDiv")
                  .appendTo($(checkout));

                  ($("<img>"))
                  .attr("src",item.image)
                  .appendTo($(shoppingCartImgDiv));
                  
                  ($("<h5>"))
                      .html(item.name)
                      .appendTo($(shoppingCartItemDiv));
                  ($("<button>"))
                    .addClass("shoppingCartDeleteBtn")
                     .addClass("fas fa-times")
                      .appendTo($(shoppingCartItemDiv))
                      .on("click",()=>{
                          checkoutArrFromLS.splice(i,1);
                         
                          //checkoutArr.splice(i,1);
                        
                          localStorage.setItem("checkoutArr",JSON.stringify(checkoutArrFromLS));
                        
                          let priceArrayFromLS =JSON.parse(localStorage.priceArray);
                          priceArrayFromLS.splice(i,1);
                          localStorage.setItem("priceArray",JSON.stringify(priceArrayFromLS));
                          /*if (priceArrayFromLS.length == 0){
                            totalCount = false;
                            ($("#checkoutTotal")).html("");
                          }*/
                          checkout.empty();
                          //($("#checkoutTotal")).empty();
                          checkoutCreator();
                          
                          totalCreator();
                          
                          
    
                               
                              
                      })
                          
                         
                      
          });
        
    
    }
//skapar första gången ptag för prissumma, adderar/subtrarherar följande ggr från array o renderar
function totalCreator(specificProduct){
    console.log("jag klrs")
    let bitch = ($("#checkoutTotal"));
   
    if (totalCount == false) {
      console.log("Totalcount är false")
  
       console.log("hello")
       
  
      let priceArrayFromLS = JSON.parse(localStorage.priceArray)
    
   
    let arrSum = priceArrayFromLS.reduce((a, b) => a + b, 0);
    console.log(arrSum);
    if (arrSum==0){
        arrSum = "";
    }
    ($("<p>"))
    .attr("id","checkoutTotal")
    .html(arrSum)
    .appendTo($("#shoppingCartDiv"));
    totalCount = true;
  }
  /*else
    {
       if (priceArray == 0){
            bitch.addClass("hidden");
       }
       else {
           bitch.removeClass("hidden");
       }
        if (specificProduct != undefined) {
          let priceArray =JSON.parse(localStorage.priceArray);
        priceArray.push(specificProduct.price);
        localStorage.setItem("priceArray",JSON.stringify(priceArray));
        }
        let arrSum = priceArray.reduce((a, b) => a + b, 0);
        console.log(priceArray);
       
        ($("#checkoutTotal"))
        .html(arrSum)
        .appendTo($("#shoppingCartDiv"));
        
    }*/
  
    else {
      let priceArrayFromLS = JSON.parse(localStorage.priceArray)
      console.log("Totalcount e true")
      localStorage.setItem("priceArray",JSON.stringify(priceArrayFromLS));
      //console.log(priceArray);
    let arrSum = priceArrayFromLS.reduce((a, b) => a + b, 0);
    console.log(arrSum);
    ($("#checkoutTotal")).empty();
    ($("#checkoutTotal"))
    .html(arrSum)
    .appendTo($("#shoppingCartDiv"));
    if (priceArrayFromLS.length == 0 ){
      totalCount = false;
      ($("#checkoutTotal")).remove();
      console.log("HELT SLUT")
    }
    }
  }