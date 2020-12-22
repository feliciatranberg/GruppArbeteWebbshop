let requiredCounter = 0;
let alerted = false;
$(function() {
localStorage.removeItem("itemObject")
    $("#confirm-order-button").on('click', ()=>{
      
     
     

    let inputData = {}; 
    $("#my-form :text, #my-form :checked").each(function() {
        inputData[this.name] = $(this).val();
  
        ($("<p>"))
        .addClass("input-text")
        .html($(this).val())
        .appendTo($("#dialog"));
  
     
        
      localStorage.setItem("orderInputData",JSON.stringify(inputData));
      });

      let attrArray = Object.values(inputData);
      let checkoutArrFromLS = JSON.parse(localStorage.checkoutArr);

      $.each(attrArray,(i,event)=>{
        if (attrArray[i]==""){
          requiredCounter++;
        }
        
      });
    if (checkoutArrFromLS.length ===0){
      alert("Det verkar som att din varukorg är tom!")
      alerted = true;
    }
     if (checkoutArrFromLS.length != 0 && requiredCounter === 0 ){
      fauxPayment();
      }
      else{
        if (alerted == false){
        alert("Vänligen fyll i samtliga fält");
        }
      requiredCounter = 0;
      }
    
  });

          
    finalCheckoutList();
      });

  function finalCheckoutList(){

    let checkoutArrFromLS = JSON.parse(localStorage.checkoutArr);
    let checkoutProductsDiv = ($(".checkout-products"));
    let priceArrayFromLS = JSON.parse(localStorage.priceArray);
    let arrSum = priceArrayFromLS.reduce((a, b) => a + b, 0);
    let shipping = 50;

  
    if (arrSum > 500 || checkoutArrFromLS.length == 0) {
      shipping = 0;
    }
    let total = arrSum + shipping;

      $.each(checkoutArrFromLS,(i,item)=>{

    let productDiv = ($("<div>"))
            .addClass("product-Div")
            .appendTo(checkoutProductsDiv);

            ($("<img>"))
            .attr("src",item.image)
            .addClass("productImage")
            .appendTo($(productDiv));

    let productTextDiv = ($("<div>"))
            .addClass("product-text-div")
            .appendTo($(productDiv));

            ($("<h5>"))
            .html(item.name)
            .appendTo($(productTextDiv));
            
            ($("<h1>"))
            .html(item.price + " KR")
            .appendTo($(productTextDiv));

            ($("<span>"))
            .html(item.size + " ")
            .appendTo($(productTextDiv));
    
            ($("<button>"))
            
            .html("X")
            .appendTo($(productTextDiv))
            .on("click",()=>{

                checkoutArrFromLS.splice(i,1);
                localStorage.setItem("checkoutArr",JSON.stringify(checkoutArrFromLS));
              
                let priceArrayFromLS =JSON.parse(localStorage.priceArray);
                priceArrayFromLS.splice(i,1);
                localStorage.setItem("priceArray",JSON.stringify(priceArrayFromLS)); 

                checkoutProductsDiv.empty();
                finalCheckoutList();
              });
                
    });

    
    
    
    let totalDisplayDiv = $("<div>")
                          .attr("id","total-display-row-div")
                          .appendTo(checkoutProductsDiv);
                          $("<div>")
                          .attr("id","total-display-inner-div")
                          .appendTo(totalDisplayDiv);

                          ($("<h2>"))
                          .attr("id","total-display-number")
                          .html("Summa")
                          .appendTo($("#total-display-inner-div"));
                         
                          ($("<p>")).html("Summa" + " " + arrSum + "kr").appendTo($("#total-display-inner-div"));
                          ($("<p>")).html("Frakt" + " " + shipping + "kr").appendTo($("#total-display-inner-div"));
                          ($("<p>")).html("Totalsumma" + " " + total + "kr").appendTo($("#total-display-inner-div"));

  if (arrSum == 0) { 
      (totalDisplayDiv).detach();
    }
                        

  };


function fauxPayment() {
  setTimeout(()=>{
    window.location.href = "product-specific.html";
 
}, 3000);
 
 ($(".container-checkout-form")).empty();
 ($(".nav-bar-container")).empty();
 ($("footer")).detach();
 
 ($("<div>"))
    .attr("id","loading-screen")
    
    .appendTo($(".nav-bar-container"));
   
  ($("<p>"))
    .attr("id","loading-screen-p-tag")
    .html("Behandlar din beställning")
    .appendTo($("#loading-screen"));

  ($("<p>"))
  .addClass("dots")
  .html(".")
  .appendTo($("#loading-screen"));

  ($("<div>"))
    .attr("id","loading-screen-bar")
    
    .appendTo($("#loading-screen"));
  ($("<div>"))
    .attr("id","loading-bar-box")
    .appendTo($("#loading-screen-bar"));
}











    
 