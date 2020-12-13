let checkoutArr = [];
//let checkoutCopyLS = JSON.parse(localStorage.checkoutArr)
let priceArray = [];
let totalCount = false;

$(function(){

    let specificProduct = JSON.parse(localStorage.itemObject)
    let sizeArr = ["Medium","Large","Extra Large"];
    console.log(specificProduct);

    ($("<div>"))
    .attr("id","specificProductContentwrap")
    .appendTo($("body"));

    let sPCW = ("#specificProductContentwrap");
    ($("<img>"))
    .attr("src",specificProduct.image)
    .appendTo(sPCW);

    ($("<div>"))
    .attr("id","productTextBox")
    .appendTo(sPCW);

    ($("<h1>"))
    .html(specificProduct.name)
    .appendTo($("#productTextBox"));

    ($("<p>"))
    .attr("id","description")
    .html(specificProduct.description)
    .appendTo($("#productTextBox"));

    //Dropdown base
    ($("<ul>"))
    .attr("id","dropDownMenu")
    .appendTo($("#productTextBox"));
    ($("<li>"))
    .attr("id","startSize")
    .html(specificProduct.size)
    .on("click",()=>{
        specificProduct.size = "Small";
        ($("#startSize")).html(specificProduct.size);
        ($(".sizeOption")).slideToggle(200);
        ($(".sizeOption")).toggleClass("hidden");
        console.log(specificProduct)
        })
    .appendTo($("#dropDownMenu"));
    //Dropdown loop
    $.each(sizeArr,(i,size)=>{
        ($("<li>"))
        .html(size)
        .addClass("sizeOption")
        .addClass("hidden")
        .on("click",()=>{
          
            ($("#startSize")).html(size);
           
            specificProduct.size = size;
            console.log(specificProduct.size);
            ($(".sizeOption")).slideToggle(200);
        })
       
        .appendTo($("#dropDownMenu"));
    });
    //Dropdown 
    ($("<p>"))
    .attr("id","productPrize")
    .html(specificProduct.price)
    .appendTo($("#productTextBox"));


    //add to cart
    ($("<button>"))
    .attr("type","button")
    .attr("id","addToCartButton")
    .html("Lägg till i varukorg")
    .on("click",()=>{
      //Om CheckoutArr inte ännu finns definierad (dvs första gången man besöker sidan) definiears den
      if (localStorage.getItem("checkoutArr")==null){
        localStorage.setItem("checkoutArr",JSON.stringify(checkoutArr));
      }
      let checkoutArrFromLS = JSON.parse(localStorage.checkoutArr);
      checkoutArrFromLS.push(specificProduct)
      shoppingCartDiv.removeClass("hidden");
      localStorage.setItem("checkoutArr",JSON.stringify(checkoutArrFromLS));

      if (localStorage.getItem("priceArray")==null){
        localStorage.setItem("priceArray",JSON.stringify(priceArray));
      }
      let priceArrayFromLS = JSON.parse(localStorage.priceArray)
    priceArrayFromLS.push(specificProduct.price);
    localStorage.setItem("priceArray",JSON.stringify(priceArrayFromLS));
      ($("#shoppingCart")).empty();
      checkoutCreator();

      totalCreator(specificProduct);
     
    })
    .appendTo($("#productTextBox"));
    
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
})

function checkoutCreator(i,item){
  let checkout = ($("#shoppingCart"))
      let checkoutArrFromLS = JSON.parse(localStorage.checkoutArr)
    
      
      $.each(checkoutArrFromLS,(i,item)=>{

              ($("<h5>"))
                  .html(item.name)
                  .appendTo($(checkout));
              ($("<button>"))
                  //.addClass("")
                  .html("X")
                  .appendTo($(checkout))
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
  
    console.log(priceArray);
  let arrSum = priceArrayFromLS.reduce((a, b) => a + b, 0);
  console.log(arrSum);
  
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
    console.log(priceArray);
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