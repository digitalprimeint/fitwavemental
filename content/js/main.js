$(document).ready(function() {
    // Iniciar Sockets
    var dirbase='/';
    // Cargo pruebas
    cargarpregunta(index);

    $('.actresultado').hide();
    $('.actresultado').click(function(){
        sincronizarmental();
        $('.page').hide();
        $('.page.inicio').show();
    });

    $('.topbar img').click(function(){
        $('.page').hide();
        window.location.href="index.html";
    });

    if (localStorage.getItem('pila')){
        pila=localStorage.getItem('pila');
        pila=JSON.parse(pila);
        $('.divinfosync').html(' '+pila.length);
    }

    $('.Bsincronizar').click(function(){
        sincronizarmental();
    });

    /*$('.Batrasinicio').click(function(){
        $('.page').hide();
        $('.page.inicio').show();
    });*/

    $('.btnlogout').click(function(){
        $.ajax({
            url: urlbase+'/json/logout',
            dataType: 'json',
            type: 'GET',
            cache : false,
            processData: false,
            success: function(doc) {
                if (doc.result){
                    localStorage.removeItem('pila');
                    localStorage.removeItem('remember_me');
                    localStorage.removeItem('synccount');
                    localStorage.removeItem('pruebascargadas');
                    localStorage.removeItem('testcargadas');
                    window.location.href='/login.html';
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                alert('No se puede sincronizar en este momento');
            }  
        });
    });
});