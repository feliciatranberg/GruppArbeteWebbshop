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


let shirt1 = new shopItem("Sweater","1:1","Fierce Fleece","Grön","Small",600, "/images/sweaters/sweater-1.jpg","Fierce Fleece tröja",true,0,false)
let shirt2 = new shopItem("Sweater","1:2","Watchtower","Lila","Small",600, "/images/sweaters/sweater-2.jpg","Watchtower tröja",true,0,false)
let shirt3 = new shopItem("Sweater","2:1","Classic Pure","Svart","Small",600, "/images/sweaters/sweater-3.jpg","Classic Pure tröja",true,0,false)
let shirt4 = new shopItem("Hoodie","2:2","Sweet Big Loose","Blå","Small",600, "/images/sweaters/sweater-4.jpg","Sweet Big Loose hoodie",true,0,false)
let shirt5 = new shopItem("Sweater","2:2","Fierce Fleece","Grön","Small",600, "/images/sweaters/sweater-5.jpg","Fierce Fleece tröja",true,0,false)
let shirt6 = new shopItem("Sweater","2:2","Multiverse","Blå","Small",600, "/images/sweaters/sweater-6.jpg","Multiverse tröja",true,0,false)

let tshirtProducter = [shirt1,shirt2,shirt3,shirt4,shirt5,shirt6]
//let checkoutArr = [];
//let priceArray = [];
let totalCount = false;


$(function() {
      let wrapperProductPage = ($("<div>"))
            .addClass("wrapperProductPage")
            .appendTo($("body"));
 //Meddelande som visas när varukorg är tom
      $("<div>")
            .attr("id", "cartEmptyMessage")
            .addClass("hidden")
            .appendTo($("#shoppingcartExtend"));
       $("<em>")
            .html("Det verkar som att din varukorg är tom...")
            .appendTo($("#cartEmptyMessage"));

//Loop för att rendera produkter på skärm. När man klickar på en produkt sparas produkt i ls, och man skickas till till htmlsida för 
//specifik produkt
    $.each(tshirtProducter,(i,item)=>{
        let itemDiv = ($("<div>"))
                .addClass("itemDiv")
                .on("click",()=>{

                    window.location.href = "product-specific.html";
        
                    localStorage.setItem("itemObject",JSON.stringify(item));
                
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

                ($("<p>"))
                .html(item.description)
                .appendTo($(itemDiv));

                ($("<h2>"))
                .html(item.price + " KR")
                .appendTo($(itemDiv)); 
             })


//För checkout
            let shoppingCartDiv = $("<div>")
                  .addClass("hidden")
                  .attr("id","shoppingCartDiv")
                  .appendTo($("#shoppingcartExtend"));

            ($("<div>"))
                   .attr("id","shoppingCart")
                   .appendTo(shoppingCartDiv);

            ($("<button>"))
                  .attr("id","goToCheckout")
                  .html("Gå till kassan")
                  .on("click",()=>{
                       window.location.href = "checkout.html";
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
                                 window.location.href = "/HTML/checkout.html";
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

              $("<img>").attr("src", item.image).appendTo($(shoppingCartImgDiv));

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
          .html(arrSum)
          .appendTo($("#shoppingCartDiv"));
          totalCount = true;
  } 
  else {
      let priceArrayFromLS = JSON.parse(localStorage.priceArray);
       localStorage.setItem("priceArray", JSON.stringify(priceArrayFromLS));

      let arrSum = priceArrayFromLS.reduce((a, b) => a + b, 0);
    
       $("#checkoutTotal").empty();
       $("#checkoutTotal").html(arrSum).appendTo($("#shoppingCartDiv"));

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
