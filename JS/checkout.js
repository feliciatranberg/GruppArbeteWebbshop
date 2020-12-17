$(function() {

  $("button").on('click', function(){
    dialog.dialog('open');
    orderComfirm();

    
    let $inputs = $('#my-form :input');

    let values = {};
    $inputs.each(function() {
        values[this.name] = $(this).val();
  
        ($("<p>"))
        .html($(this).val())
        .appendTo($("#dialog"));
  
        console.log($(this).val()); 
      });
  });

  let dialog = $("#dialog").dialog({
    autoOpen: false,
    modal: true,
    width: 'auto', 
    maxWidth: 600,
    height: 'auto',
    fluid: true, 
    resizable: false
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
  












    
 