$(function() {

  let dialog = $("#dialog").dialog({
    autoOpen: false,
    modal: true,
    height: 400,
    width: 400
    
 
});
//Felicia modalfunktion
    // $.fn.serializeObject = function() {
    //     let $form = this.is("form") ? this : this.find("form"),
    //       obj = {};
        
    //     $.each($form.serializeArray(), function() {
          
    //       if (this.name in obj) {
    //         // Should be array
    //         if (!$.isArray(obj[this.name])) {
    //           obj[this.name] = [obj[this.name]];
    //         }
    //         // Push value
    //         obj[this.name].push(this.value);
    //       } else {
    //         // Set value
    //         obj[this.name] = this.value;
    //       }
    //     });
    //     return obj;
    //   };
      
    //   $("form").on('submit', function(e){
    //     dialog.dialog('open');
    //     let $form = $(this);
    //     e.preventDefault();
    //    (JSON.stringify($form.serializeObject()));
    //     console.log($form.serializeObject());
    //     // alert(JSON.stringify($form.serializeObject()));
      
   
    //   $("#dialog-content")
    //   $("<p>")
    //   .html(JSON.stringify($form.serializeObject()))
    //   .appendTo("#dialog-content");
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
            .html(item.size)
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







    
 