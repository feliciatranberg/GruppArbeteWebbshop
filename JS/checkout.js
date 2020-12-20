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
  
        console.log(inputData[this.name]); 
        
        localStorage.setItem("orderInputData",JSON.stringify(inputData));
      });
      
     /* if (inputData != null){
      fauxPayment();
      }
      else {console.log("undefedsadsds")}*/
  });

          
    finalCheckoutList();
      });

  function finalCheckoutList(){

    let checkoutArrFromLS = JSON.parse(localStorage.checkoutArr);
    let checkoutProductsDiv = ($(".checkout-products"));

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
            .html(item.price + ":-")
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

  };


  function orderComfirm() {

    let checkoutArrFromLS = JSON.parse(localStorage.checkoutArr);
    let checkoutProductsDivForm = ($("#dialog"));

      $.each(checkoutArrFromLS,(i,item)=>{
    let productDivForm = ($("<div>"))
            .addClass("product-div-form")
            .appendTo(checkoutProductsDivForm);

            ($("<img>"))
            .attr("src",item.image)
            .addClass("product-image-form")
            .appendTo($(productDivForm));

    let productTextDivForm = ($("<div>"))
            .addClass("product-text-div")
            .appendTo($(productDivForm));

            ($("<h5>"))
            .html(item.name)
            .appendTo($(productTextDivForm));

            ($("<span>"))
            .html(item.size + " ")
            .appendTo($(productTextDivForm));
            
            ($("<h2>"))
            .html(item.price + ":-")
            .appendTo($(productTextDivForm));

           
  
              });
  };
  
function fauxPayment() {
  setTimeout(()=>{
    window.location.href = "product-specific.html";
 
  }, 3000);
 
 ($(".container-checkout-form")).empty();
 ($(".nav-bar-container")).empty();
 
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











    
 