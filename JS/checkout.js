$(function() {

  $("button").on('click', function(){
    dialog.dialog('open');
    orderComfirm();

    
    let $inputs = $('#my-form input:text');

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

// $('button').on('click', function() {
//   let $inputs = $('#my-form :input:checked');

//   let values = {};
//   $inputs.each(function() {
//       values[this.name] = $(this).val();

//       ($("<p>"))
//       .html($(this).val())
//       .appendTo($("#dialog"));

//       console.log($(this).val());

      
//   });

// });



          
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
    let checkoutProductsDiv = ($("#dialog"));

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
  
              });
  };
  












    
 