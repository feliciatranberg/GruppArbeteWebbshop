let checkoutArr = [];
//let checkoutCopyLS = JSON.parse(localStorage.checkoutArr)
let priceArray = [];
let totalCount = false;

$(function(){

       //CARTEMPTYMESSAGE
    ($("<div>"))
    .attr("id","cartEmptyMessage")
    .addClass("hidden")
    .appendTo($("#shoppingcartExtend"));  
    ($("<em>"))
    .html("Det verkar som att din varukorg är tom...")
    .appendTo($("#cartEmptyMessage"));
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
        if (JSON.parse(localStorage.checkoutArr).length === 0){
          ($("#cartEmptyMessage"))
           .toggleClass("hidden")
        }
        else {
        window.location.href = "/HTML/checkout.html";
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
     });
     //($("#cartNumberDisplay")).removeClass("hidden").html(JSON.parse(localStorage.checkoutArr).length);
     cartCounterDisplay();
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
                        cartCounterDisplay();
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

  function cartCounterDisplay(){
    let checkoutArrFromLS = JSON.parse(localStorage.checkoutArr);
    ($("#cartNumberDisplay")).removeClass("hidden").html(checkoutArrFromLS.length);
    if (checkoutArrFromLS.length ===0){
     ($("#cartNumberDisplay")).addClass("hidden");
     ($(shoppingCartDiv)).addClass("hidden");
     console.log("korgen en tom jao")
    }
    
  }