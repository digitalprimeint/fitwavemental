//var tiposprueba = ['Dominante','Influyente','Estable','Conciente'];
tiposprueba = ['','','',''];
var barChartData = {
    labels: tiposprueba,
    datasets: [{
        label: '',
        backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(92, 184, 92, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(92, 184, 92, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)'
        ],
        borderWidth: 1,
        data: [0,0,0,0]
    }]

};
var last = [];
var myBar={};
var preguntas=[];
var urlbase="";
var pila=[];
var idmental=0;
function mostrarinfomental(doc){
    var html='';
    var color='0';
    for (var i in doc){
        var aux=doc[i];
        if (i % 2==0){
            color='0';
        }else{
            color='1';
        }   
        html+='<div class="row vermental" varid="'+aux["_id"]+'"><div class="col-12 itemlist'+color+'">';
            html+='<h3><button><span class="fa fa-bar-chart"></span></button>Test Realizado '+fechasoloformateada(new Date(aux['stamp']))+'</h3>';
            html+='</div></div>';
    }
    $('div.listatests').html(html);
    $('.vermental').click(function(){
        idmental=$(this).attr('varid');
        cargaruno(idmental);
        $('.page').hide();
        $('.page.resultadoatleta').show();
        last.push('inicio');
    });
}
function cargaruno(idtest){
    for (var i in testcargadas){
        var auxprueba=testcargadas[i];
        if (JSON.stringify(auxprueba._id)==JSON.stringify(idtest)){
            $('div.informeperfil').html(auxprueba['textoperfil']);
            barChartData.datasets.forEach(function(dataset) {
                dataset.data = [auxprueba['D'],auxprueba['I'],auxprueba['S'],auxprueba['C']];
            });
            $('.actresultado').hide();
            myBar.update();
        }
    }
}
function cargarmental(){
    var token=localStorage.getItem('remember_me');
    $.ajax({
        url: urlbase+'/mental/list/' + token,
        dataType: 'json',
        type: 'GET',
        xhrFields: {
                withCredentials: true
        },
        success: function(doc) {
            testcargadas=doc;
            localStorage.setItem("testcargadas", JSON.stringify(testcargadas));
            mostrarinfomental(testcargadas);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            //alert('Cargando datos offline');
            testcargadas=JSON.parse(localStorage.getItem("testcargadas"));
            mostrarinfomental(testcargadas);
        }
    });
}
function fechasoloformateada(date){
    var auxfecha=date;
    var month=auxfecha.getMonth()+1;
    var fecha=auxfecha.getDate()+'/'+month+'/'+auxfecha.getFullYear();
    return fecha;
}
function fechaformateada(date){
    var auxfecha=date;
    var month=auxfecha.getMonth()+1;
    var fecha=auxfecha.getDate()+'/'+month+'/'+auxfecha.getFullYear()+' '+auxfecha.getHours()+':'+auxfecha.getMinutes();
    return fecha;
}
function sincronizarmental(){
    var pila=[];
    if (localStorage.getItem('pila')){
        pila=localStorage.getItem('pila');
        pila=JSON.parse(pila);
    }
    if (pila.length>0){
        var item=pila.shift();
        $.ajax({
            url: urlbase+item.url,
            dataType: 'json',
            type: item.type,
            data: 'json='+item.data,
            cache : false,
            processData: false,
            success: function(doc) {
                localStorage.setItem('pila',JSON.stringify(pila));
                $('.syncnumber'+item.number).remove();
                $('.divinfosync').html(' '+pila.length);
                sincronizarmental();
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                alert('No se puede sincronizar en este momento');
            }  
        });
    }else{
        cargarmental();
    }
}
function inicializarpreguntas(){
    var i;
    for (i = 0; i < 12; i++) {
        preguntas[i]={};
        preguntas[i]['D']={};
        preguntas[i]['D']['valor']=0;
        preguntas[i]['I']={};
        preguntas[i]['I']['valor']=0;
        preguntas[i]['S']={};
        preguntas[i]['S']['valor']=0;
        preguntas[i]['C']={};
        preguntas[i]['C']['valor']=0;
    };
    preguntas[0]['D']['nombre']='Enérgico';
    preguntas[1]['D']['nombre']='Agresivo';
    preguntas[2]['D']['nombre']='Directo';
    preguntas[3]['D']['nombre']='Tenaz';
    preguntas[4]['D']['nombre']='Atrevido';
    preguntas[5]['D']['nombre']='Competitivo';
    preguntas[6]['D']['nombre']='Arriesgado';
    preguntas[7]['D']['nombre']='Argumentador';
    preguntas[8]['D']['nombre']='Audaz';
    preguntas[9]['D']['nombre']='Dirigente';
    preguntas[10]['D']['nombre']='Decisivo';
    preguntas[11]['D']['nombre']='Independiente';
    preguntas[0]['I']['nombre']='Vivaz';
    preguntas[1]['I']['nombre']='Emotivo';
    preguntas[2]['I']['nombre']='Animoso';
    preguntas[3]['I']['nombre']='Compasivo';
    preguntas[4]['I']['nombre']='Impulsivo';
    preguntas[5]['I']['nombre']='Expresivo';
    preguntas[6]['I']['nombre']='Hablador';
    preguntas[7]['I']['nombre']='Divertido';
    preguntas[8]['I']['nombre']='Espontáneo';
    preguntas[9]['I']['nombre']='Optimista';
    preguntas[10]['I']['nombre']='Alegre';
    preguntas[11]['I']['nombre']='Entusiasta';
    preguntas[0]['S']['nombre']='Modesto';
    preguntas[1]['S']['nombre']='Complaciente';
    preguntas[2]['S']['nombre']='Agradable';
    preguntas[3]['S']['nombre']='Dócil';
    preguntas[4]['S']['nombre']='Amable';
    preguntas[5]['S']['nombre']='Sustentador';
    preguntas[6]['S']['nombre']='Relajado';
    preguntas[7]['S']['nombre']='Paciente';
    preguntas[8]['S']['nombre']='Estable';
    preguntas[9]['S']['nombre']='Apacible';
    preguntas[10]['S']['nombre']='Leal';
    preguntas[11]['S']['nombre']='Buen Oyente';
    preguntas[0]['C']['nombre']='Discreto';
    preguntas[1]['C']['nombre']='Constante';
    preguntas[2]['C']['nombre']='Acertado';
    preguntas[3]['C']['nombre']='Perfeccionista';
    preguntas[4]['C']['nombre']='Precavido';
    preguntas[5]['C']['nombre']='Preciso';
    preguntas[6]['C']['nombre']='Objetivo';
    preguntas[7]['C']['nombre']='Lógico';
    preguntas[8]['C']['nombre']='Organizado';
    preguntas[9]['C']['nombre']='Conciente';
    preguntas[10]['C']['nombre']='Serio';
    preguntas[11]['C']['nombre']='Alta Normas';
}
inicializarpreguntas();
var val=4;
var valor=[];
valor[4]=4;
valor[3]=1;
valor[2]=3;
valor[1]=2;
var index=0;
function cargarpregunta(i){
    if (i<12){
        val=4;
        cambiarinstruccion(val);
        preguntas[index]['D']['valor']=0;
        preguntas[index]['I']['valor']=0;
        preguntas[index]['S']['valor']=0;
        preguntas[index]['C']['valor']=0;
        $('button.listbutton.D').html(preguntas[i]['D']['nombre']);
        $('button.listbutton.I').html(preguntas[i]['I']['nombre']);
        $('button.listbutton.S').html(preguntas[i]['S']['nombre']);
        $('button.listbutton.C').html(preguntas[i]['C']['nombre']);
        $('button.listbutton.D').attr("disabled", false);
        $('button.listbutton.I').attr("disabled", false);
        $('button.listbutton.S').attr("disabled", false);
        $('button.listbutton.C').attr("disabled", false);
        $('button.listbutton.Reordenar').hide();
        $('button.listbutton.Siguiente').hide();
    }else{
        calcularresultados();
    }
}
var D=0;
var I=0;
var S=0;
var C=0;
var pila=[];
function calcularresultados(){
    //$('.informeperfil').html('');
    index=0;
    D=0;
    I=0;
    S=0;
    C=0;
    for (i = 0; i < 12; i++) {
        D=D+preguntas[i]['D']['valor'];
        I=I+preguntas[i]['I']['valor'];
        S=S+preguntas[i]['S']['valor'];
        C=C+preguntas[i]['C']['valor'];
    }
    var json=JSON.stringify(preguntas);
    var url='/mental/save';
    var type='POST';
    var data=json;
    var synccount=0;
    if (localStorage.getItem('synccount')) synccount=localStorage.getItem('synccount');
    synccount=Number(synccount)+1;
    localStorage.setItem('synccount',synccount);
    if (localStorage.getItem('pila')){
        pila=localStorage.getItem('pila');
        pila=JSON.parse(pila);
    }
    pila.push({url:url,type:type,data:data,number:synccount,zona:''});
    localStorage.setItem('pila',JSON.stringify(pila));
    $('.divinfosync').html(' '+pila.length);
    window.location.hash = "#results";
}

var rememberme='';

function getCookie(cname) {
    var allcookies = document.cookie;
    var arrayb = allcookies.split(";");
    for (item in arrayb) {
        var aux=arrayb[item];
        aux=aux.trim();
        if (aux.startsWith(cname+"=")){
            var c=aux.substr(12);
            return c;
        }
    }
}

function cambiarinstruccion(i){
    if (i==4){
        $('.instrucciones').html('Escoja la característica con la que <span class="white"><b>más se identifica</b></span>');
    }else if (i==3){
        $('.instrucciones').html('Escoja la característica con la que <span class="white"><b>menos se identifica</b><span>');
    }else if (i==2){
        $('.instrucciones').html('De las disponibles escoja la característica con la que <span class="white"><b>más se identifica</b></span>');
    }else if (i==1){
        $('.instrucciones').html('De las disponibles escoja la característica con la que <span class="white"><b>menos se identifica</b><span>'); 
    }else{
        $('.instrucciones').html('Escoja <span class="white"><b>"Siguiente"</b></span> para continuar o <span class="white"><b>"Reordenar"</b></span> para cambiar sus preferencias');
    }    
}