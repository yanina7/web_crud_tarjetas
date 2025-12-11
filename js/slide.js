$(document).ready(function(){
    // Inicializar slider
    $('.slider').slider({
        indicators: true,
        height: 400,
        transition: 500,
        interval: 6000
    });
    
    // Inicializar menú móvil
    $('.button-collapse').sideNav();
});