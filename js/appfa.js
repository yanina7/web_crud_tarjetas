
$(document).ready(function(){

    $('#signout').click(function(){
		 	      
          // Sign-out successful.
		  window.location.href = 'register.html';
   });

   $('#scroll-to-post').click(function(e) {
    e.preventDefault(); // Previene el comportamiento predeterminado del enlace
    $('html, body').animate({
        scrollTop: $('#posttext').offset().top
    }, 'slow');
   });

		
});