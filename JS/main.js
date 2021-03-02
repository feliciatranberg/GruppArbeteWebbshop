//let checkoutArr = [];
let totalCount = false;
let priceArray = [];


$(function () {

 //Meddelande som visas när varukorg är tom
    $("<div>")
      .attr("id", "cartEmptyMessage")
      .addClass("hidden")
      .appendTo($("#shoppingcartExtend"));
    $("<em>")
      .html("Det verkar som att din varukorg är tom...")
      .appendTo($("#cartEmptyMessage"));
      
  //Div för shoppingcart or elaterad saker
    let shoppingCartDiv = $("<div>")
      .addClass("hidden")
      .attr("id", "shoppingCartDiv")
      .appendTo($("#shoppingcartExtend"));
      $("<div>").attr("id", "shoppingCart").appendTo(shoppingCartDiv);

    $("<button>")
      .attr("id", "goToCheckout")
      .html("Gå till kassan")
      .on("click", () => {
            window.location.href = "./checkout.html";
          })
      .appendTo(shoppingCartDiv);

  //Varukorg i nav-bar. Bestämmer om den ska visa varukorg eller meddelande för varukorg
  //samt om den ska visa varukorg eller gå till checkout-sida beroende på mobil eller desktop
   $("#shoppingcartButton")
      .on("click", () => {

      if (window.matchMedia("(max-width: 767px)").matches) {

                if (JSON.parse(localStorage.checkoutArr).length === 0) {
                      $("#cartEmptyMessage").toggleClass("hidden");
                 } 
                else {
                      window.location.href = "../html/checkout.html";
                 }
        } 
      else {
               shoppingCartDiv.toggleClass("hidden");
               cartCounterDisplay();
               $("#shoppingCart").empty();
               checkoutCreator();
               totalCreator();
     
             if (JSON.parse(localStorage.checkoutArr).length === 0) {

                 $("#cartEmptyMessage").toggleClass("hidden");
      }
    }
  });
  
  cartCounterDisplay();
  //onload
});

//Funktion för varukorg. Hämtar värden från ls. 
function checkoutCreator(i, item) {
  
  let checkout = $("#shoppingCart");
  let checkoutArrFromLS = JSON.parse(localStorage.checkoutArr);
  let priceArrayFromLS = JSON.parse(localStorage.priceArray);

      $.each(checkoutArrFromLS, (i, item) => {

           let shoppingCartItemDiv = $("<div>")
              .addClass("shoppingCartItemDiv")
              .appendTo($(checkout));

           let shoppingCartImgDiv = $("<div>")
              .addClass("shoppingCartImgDiv")
              .appendTo($(checkout));

              $("<img>").attr("src","../images"+ item.path+ item.image).appendTo($(shoppingCartImgDiv));

              $("<h3>").html(item.size).appendTo($(shoppingCartImgDiv));

              $("<h3>").html(item.price + " KR").appendTo($(shoppingCartImgDiv));

              $("<h2>").html(item.name).appendTo($(shoppingCartItemDiv));

           $("<button>")

              .addClass("shoppingCartDeleteBtn")
              .addClass("fas fa-times")
              .appendTo($(shoppingCartItemDiv))
              .on("click", () => {

                  checkoutArrFromLS.splice(i, 1);
                  localStorage.setItem("checkoutArr", JSON.stringify(checkoutArrFromLS));

                  cartCounterDisplay();
        
                  priceArrayFromLS.splice(i, 1);
                  localStorage.setItem("priceArray", JSON.stringify(priceArrayFromLS));
  
                   checkout.empty();
                   checkoutCreator();
                   totalCreator();
      });
  });
}

//Skapar ptag för prissumma om den inte redan existerar, då ändrar den bara värdet. Tar bort
//Om summan inte finns
function totalCreator(specificProduct) {
 

  if (totalCount == false) {
      let priceArrayFromLS = JSON.parse(localStorage.priceArray);
      
      let arrSum = priceArrayFromLS.reduce((a, b) => a + b, 0);
      
      if (arrSum == 0) {
          arrSum = "";
      }

      $("<p>")
          .attr("id", "checkoutTotal")
          .html("Totalt: " + arrSum + " KR")
          .appendTo($("#shoppingCartDiv"));
          totalCount = true;
  } 
  else {
      let priceArrayFromLS = JSON.parse(localStorage.priceArray);
       localStorage.setItem("priceArray", JSON.stringify(priceArrayFromLS));

      let arrSum = priceArrayFromLS.reduce((a, b) => a + b, 0);
    
       $("#checkoutTotal").empty();
       $("#checkoutTotal").html("Totalt: " + arrSum + " KR").appendTo($("#shoppingCartDiv"));

      if (priceArrayFromLS.length == 0) {

           totalCount = false;
          $("#checkoutTotal").remove();
  
    }
  }
}

//Visar antal objekt i varukorgen.
function cartCounterDisplay() {

  let checkoutArrFromLS = JSON.parse(localStorage.checkoutArr);
   $("#cartNumberDisplay").removeClass("hidden").html(checkoutArrFromLS.length);

  if (checkoutArrFromLS.length === 0) {

    $("#cartNumberDisplay").addClass("hidden");
    $(shoppingCartDiv).addClass("hidden");
  
  }
}
