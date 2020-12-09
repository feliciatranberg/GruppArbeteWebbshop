$(function() {

    $.fn.serializeObject = function() {
        let $form = this.is("form") ? this : this.find("form"),
          obj = {};
        
        $.each($form.serializeArray(), function() {
          
          if (this.name in obj) {
            // Should be array
            if (!$.isArray(obj[this.name])) {
              obj[this.name] = [obj[this.name]];
            }
            // Push value
            obj[this.name].push(this.value);
          } else {
            // Set value
            obj[this.name] = this.value;
          }
        });
        return obj;
      };
      
      $("form").submit(function(e){
        let $form = $(this);
        e.preventDefault();
       (JSON.stringify($form.serializeObject()));
        console.log($form.serializeObject());
      });
    });