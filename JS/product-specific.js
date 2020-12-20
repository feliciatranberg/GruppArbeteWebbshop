let checkoutArr = [];
//let checkoutCopyLS = JSON.parse(localStorage.checkoutArr)
let priceArray = [];
let totalCount = false;

$(function(){
  if (localStorage.getItem("itemObject") === null) {
      ($("body")).empty();
      orderConfirmed();
  }
  else{
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

    ($("<h2>"))
    .html(specificProduct.name)
    .appendTo($("#productTextBox"));

    ($("<p>"))
    .attr("id","description")
    .html(specificProduct.description)
    .appendTo($("#productTextBox"));

    //CARTEMPTYMESSAGE
    ($("<div>"))
    .attr("id","cartEmptyMessage")
    .addClass("hidden")
    .appendTo($("#shoppingcartExtend"));  
    ($("<em>"))
    .html("Det verkar som att din varukorg är tom")
    .appendTo($("#cartEmptyMessage"));
    

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
    ($("<h1>"))
    .attr("id","productPrize")
    .html(specificProduct.price + " KR")
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
      checkoutArrFromLS.push(specificProduct);
      
      ($("#cartNumberDisplay")).removeClass("hidden").html(checkoutArrFromLS.length);

      localStorage.setItem("checkoutArr",JSON.stringify(checkoutArrFromLS));

      if (localStorage.getItem("priceArray")==null){
        localStorage.setItem("priceArray",JSON.stringify(priceArray));
      }
      let priceArrayFromLS = JSON.parse(localStorage.priceArray)
    priceArrayFromLS.push(specificProduct.price);
    localStorage.setItem("priceArray",JSON.stringify(priceArrayFromLS));
      ($("#shoppingCart")).empty();

      if (window.matchMedia('(min-width: 767px)').matches) {
        shoppingCartDiv.removeClass("hidden");
      
      checkoutCreator();

      totalCreator(specificProduct);
      }
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
   .on("click",()=>{
    window.location.href = "checkout.html";
  })
   .appendTo(shoppingCartDiv);
  
   cartCounterDisplay();
   $("#shoppingcartButton")
   
   .on("click",()=>{
    
    if (window.matchMedia('(max-width: 767px)').matches) {
      if (JSON.parse(localStorage.checkoutArr).length === 0){
        ($("#cartEmptyMessage"))
         .toggleClass("hidden")
      }
      else {
      window.location.href = "checkout.html";
      }
    }
    else {
   
      shoppingCartDiv.toggleClass("hidden");
  
    
    cartCounterDisplay();
    ($("#shoppingCart")).empty();
    checkoutCreator();
    totalCreator(); 
    if (JSON.parse(localStorage.checkoutArr).length === 0) {
    ($("#cartEmptyMessage"))
    .toggleClass("hidden")
    }
    
    }
    cartCounterDisplay();
    
   });
  }
  // ($("#cartNumberDisplay")).removeClass("hidden").html(JSON.parse(localStorage.checkoutArr).length);
})

function checkoutCreator(i,item){
  let checkout = ($("#shoppingCart"))
      let checkoutArrFromLS = JSON.parse(localStorage.checkoutArr)
    
      
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
                      
                 
                      localStorage.setItem("checkoutArr",JSON.stringify(checkoutArrFromLS));
                      cartCounterDisplay();
                     // cartHideOnZero();
                      let priceArrayFromLS =JSON.parse(localStorage.priceArray);
                      priceArrayFromLS.splice(i,1);
                      localStorage.setItem("priceArray",JSON.stringify(priceArrayFromLS));
                      ////////////////
                    
                   /* ($("#cartNumberDisplay")).removeClass("hidden").html(checkoutArrFromLS.length);
                     if (checkoutArrFromLS.length ===0){
                      ($("#cartNumberDisplay")).addClass("hidden");
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


function cartCounterDisplay(){
  
  let checkoutArrFromLS = JSON.parse(localStorage.checkoutArr);
  ($("#cartNumberDisplay")).removeClass("hidden").html(checkoutArrFromLS.length);
  if (checkoutArrFromLS.length ===0){
   ($("#cartNumberDisplay")).addClass("hidden");
   ($(shoppingCartDiv)).addClass("hidden");
   
  }
  if (checkoutArrFromLS.length ===0 && ($("#cartNumberDisplay")).hasClass("hidden")){
    
    //($("#cartEmptyMessage")).removeClass("hidden");
}
  else {
    //($("#cartEmptyMessage")).addClass("hidden");
  }
}

function orderConfirmed() {
          let orderInputData = JSON.parse(localStorage.orderInputData)
          console.log(orderInputData);
          console.log(orderInputData.firstname);
          let date = new Date();
          let generator = Math.random()* Math.pow(10,10);
          let orderNumber = Math.round(generator);
          console.log(orderNumber);
          let priceArrayFromLS = JSON.parse(localStorage.priceArray);
          let arrSum = priceArrayFromLS.reduce((a, b) => a + b, 0);
          let shipping = 50;
          console.log(shipping);
          if (arrSum > 500) {
            shipping = 0;
          }
          let total = arrSum + shipping;
       
      
          let confirmPageContainer = ($("<div>")).attr("id","confirm-page-container").appendTo($("body"));
          ($("<div>")).attr("id","confirm-logo-banner").appendTo(confirmPageContainer);
          ($("<h2>")).html("<em>substans</em>").appendTo($("#confirm-logo-banner"));

          let orderInputTextDiv = ($("<div>")).attr("id","order-input-text-div").appendTo(confirmPageContainer);
          let cappedFirstName = firstLetterCapitalize(orderInputData.firstname);
          let cappedLastName = firstLetterCapitalize(orderInputData.lastname);
          let cappedAdress = firstLetterCapitalize(orderInputData.adress);
          
          

          ($("<h1>"))
              .html("Tack för din beställning, " + cappedFirstName + "!")
              .appendTo("#order-input-text-div");
          
          ($("<p>"))
              .html("Vi har tagit emot din beställning och packar snart dina varor. När din order lämnat vårt lager kommer du att få en leveransbekräftelse med spårningsnummer via e-post.")
              .appendTo("#order-input-text-div");
              ($("<p>"))
              .attr("id","p2")
              .html(" Vänliga hälsningar, substans")
              .appendTo("#order-input-text-div");


          let orderBoxDiv =($("<div>")).attr("id","order-box-div").appendTo(orderInputTextDiv);

          ($("<div>"))
          .attr("id","order-date-div")
          .appendTo(orderBoxDiv);
          
          ($("<p>"))
          .html("Orderdatum")
          .attr("id","p-order-date")
          .appendTo("#order-date-div");

          ($("<p>"))
          .html(date.toDateString())
          .appendTo("#order-date-div");

          ////////////////////////////

          ($("<div>"))
          .attr("id","order-number-div")
          .appendTo(orderBoxDiv);
          ($("<p>"))
          .html("Ordernummer")
          .attr("id","p-order-number")
          .appendTo("#order-number-div");
          ($("<p>"))
          .html(orderNumber + "XY")
          .appendTo("#order-number-div");

          let orderDeliveryDiv =($("<div>")).attr("id","order-delivery-div").appendTo(orderInputTextDiv);

          ($("<div>"))
          .attr("id","order-adress-div")
          .appendTo(orderDeliveryDiv);
          ($("<p>")).attr("id","p-delivery-adress").html("Leveransadress").appendTo($("#order-adress-div"));
          ($("<p>")).html(cappedFirstName +" " +cappedLastName).appendTo($("#order-adress-div"));
          ($("<p>")).html(cappedAdress).appendTo($("#order-adress-div"));
          ($("<p>")).html(orderInputData.city.toUpperCase()).appendTo($("#order-adress-div"));
          ($("<p>")).html(orderInputData.zipcode).appendTo($("#order-adress-div"));
          ($("<p>")).html(orderInputData.tel).appendTo($("#order-adress-div"));
          
          

          ($("<div>"))
          .attr("id","order-sum-div")
          .appendTo(orderDeliveryDiv);
          ($("<p>")).attr("id","p-delivery-sum").html("Summa").appendTo($("#order-sum-div"));
          ($("<p>")).html("Summa" + " " + arrSum + "kr").appendTo($("#order-sum-div"));
          ($("<p>")).html("Frakt" + " " + shipping + "kr").appendTo($("#order-sum-div"));
          ($("<p>")).html("Totalsumma" + " " + total + "kr").appendTo($("#order-sum-div"));
          
}             

function firstLetterCapitalize(incString){
  let stringToLower = incString;
  let loweredString = stringToLower.toLowerCase();
  let cappedString = (loweredString[0].toUpperCase()+loweredString.slice(1)); 
  return cappedString;

}



