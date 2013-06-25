// show/hide server error checkbox switcher
$(".genErr span").click( function() {
  if($('.genErr').hasClass("open"))
    $('.genErr').removeClass("open");   
  else
    $('.genErr').addClass("open");
});

// hide/unhide password input field text
$("#showPassword").change(function() {
  var $input = $(this);
  if ($input.is(':checked')){
    $("#password").attr("type", "text");
  }
  else {
    $("#password").attr("type", "password");
  }
}).change();



$('#login').submit(function() {
  
    // simple validation form for old browsers which didn't support HTML5
    var errors = 0;
    $("#login :input").map(function() {
      if( !$(this).val()) {
        $(this).parents('div').addClass('error');
        errors++;
      }
      else if ($(this).val()) {
        $(this).parents('div').removeClass('error');
      }
    });
    if(errors > 0){
      $("#form-message").removeClass("hidden");
      return false;
    }
    
    // user name and password validation, it should be odobo
    var badValue = 0;
    $("#login :input").map(function() {
      if($(this).val() !== "ksh") {
        $(this).parents('div').addClass('error');
        badValue++;
      }
      else if($(this).val() === "ksh") {
        $(this).parents('div').removeClass('error');
        badValue--;
      }
    });
    if(badValue > 0){
      return false;
    }
    

    // if server error checkbox is checked it generates 404 server error instead of 500 as it be should
    $("#make404").change(function() {
      var $input = $(this);
      if ($input.is(':checked')){
        var url = "thereisnosuchdomainurl.com";
      }
      else {
        var url = "";
      }

      $.ajax({  
        type: "POST",
        url: url,
        statusCode: {
        // 404 Not Found
        404: function() {
          $('.submitInfo').html("<div class='fail'></div>");
          $('.fail').html("<h2>For some reasons your form can't be sent.</h2>")
          .append("<p>Uncheck the error input and try again.</p>")
          .hide()
          .fadeIn(1500);
        },
        // 500 Internal Server Error
        500: function() {
          $('.submitInfo').html("<div class='fail'></div>");
          $('.fail').html("<h2>Internal Server Error 500 - it happend!</h2>")
          .append("<p>:(</p>")
          .hide()
          .fadeIn(1500);
        }
        // success message
      }, success: function() {
          $('#login').html("<div class='success'></div>");
          $('.success').html("<h2>Thank You!</h2>")
          .append("<p><a href='http'>Send some comment</a></p>")
          .hide()
          .fadeIn(1500);
        }
      });
    }).change();
    return false;
});


// hiding warning layer (on older browsers)
$(".warning").click(function(){
  $(this).addClass("hidden");
})

