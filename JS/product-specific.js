

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
    
    ($("<p>"))
    .attr("id","productPrize")
    .html(specificProduct.price)
    .appendTo($("#productTextBox"));

})