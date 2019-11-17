let { route, view } = plugdo;

$(document).ready(function () {

    var hash = window.location.hash.replace("#", "");
    if(hash != "") {
        window.location = "/";
    }

    route.load({
        el: '#container',
        notFoundMessage: `<div class="row" id="bt24-notfound">
        <div class="col-md-12">
            <div class="error-template">
                <h1 class="text-dark">Oops!</h1>
                <h2 class="text-info">404 Not Found</h2>
                <div class="error-details">
                    Sorry, an error has occured, Requested page not found!
                </div>
                <div class="error-actions">
                    <a href="#" class="btn btn-dark btn-lg">
                        <span class="glyphicon glyphicon-home"></span> Take Me Home
                    </a>
                </div>
            </div>
        </div>
    </div>`,
        defaultPage: { name: "home", page: "/pages/index.html", postLoad: function () {
            $('.Biniciartest').click(function() {
                window.location.hash = "#questions";
            });
        }}
    });

    route.register({ name: "questions", page: "/pages/questions.html", postLoad: function () {
        cargarpregunta(index);
        last.push('inicio');

        $(".page").show();

        $('button.listbutton.D').click(function(){
            $('button.listbutton.D').html(preguntas[index]['D']['nombre']+' +'+valor[val]);
            $('button.listbutton.D').attr("disabled", true);
            preguntas[index]['D']['valor']=valor[val];
            val--;
            cambiarinstruccion(val);
            if (val==0){
                $('button.listbutton.Reordenar').show();
                $('button.listbutton.Siguiente').show();
            }
        });
        $('button.listbutton.I').click(function(){
            $('button.listbutton.I').html(preguntas[index]['I']['nombre']+' +'+valor[val]);
            $('button.listbutton.I').attr("disabled", true);
            preguntas[index]['I']['valor']=valor[val];
            val--;
            cambiarinstruccion(val);
            if (val==0){
                $('button.listbutton.Reordenar').show();
                $('button.listbutton.Siguiente').show();
            }
        });
        $('button.listbutton.S').click(function(){
            $('button.listbutton.S').html(preguntas[index]['S']['nombre']+' +'+valor[val]);
            $('button.listbutton.S').attr("disabled", true);
            preguntas[index]['S']['valor']=valor[val];
            val--;
            cambiarinstruccion(val);
            if (val==0){
                $('button.listbutton.Reordenar').show();
                $('button.listbutton.Siguiente').show();
            }
        }); 
        $('button.listbutton.C').click(function(){
            $('button.listbutton.C').html(preguntas[index]['C']['nombre']+' +'+valor[val]);
            $('button.listbutton.C').attr("disabled", true);
            preguntas[index]['C']['valor']=valor[val];
            val--;
            cambiarinstruccion(val);
            if (val==0){
                $('button.listbutton.Reordenar').show();
                $('button.listbutton.Siguiente').show();
            }
        });
        $('button.listbutton.Reordenar').click(function(){
            cargarpregunta(index);
        });
        $('button.listbutton.Siguiente').click(function(){
            index++;
            cargarpregunta(index);
        });
    }});

    route.register({ name: "results", page: "/pages/results.html", postLoad: function() {
        var ctx = document.getElementById('canvas').getContext('2d');
        Chart.defaults.global.defaultFontColor = '#CECECE';
        myBar = new Chart(ctx, {
            type: 'bar',
            data: barChartData,
            options: {
                scales:{
                    yAxes:[{
                        ticks:{
                            max:48,
                            min:0
                        }
                    }]
                },
                responsive: true,
                legend: {
                    display: false,
                },
                title: {
                    display: false
                }
            }
        });

        /*D = 48;
        I = 12;
        S = 36;
        C = 24;*/

        barChartData.datasets.forEach(function(dataset) {
            dataset.data = [D,I,S,C];
        });

        myBar.update();
        $('.actresultado').show();
        $('.page.resultadoatleta').show();

        $('.Batrasinicio').click(function(){
            window.location = "/";
        });

        var data_dominant = {
            text: "Dominant",
            bg: "bg-danger",
            percentage: (D * 100) / 50,
            maximum: 50,
            value: D
        };

        var data_influencer = {
            text: "Influencer",
            bg: "bg-success",
            percentage: (I * 100) / 50,
            maximum: 50,
            value: I
        };

        var data_serene = {
            text: "Serene",
            bg: "bg-warning",
            percentage: (S * 100) / 50,
            maximum: 50,
            value: S
        };

        var data_conscious = {
            text: "Conscious",
            bg: "bg-info",
            percentage: (C * 100) / 50,
            maximum: 50,
            value: C
        };

        view.setInitialData("plugdo-report", "dominant-result", data_dominant);
        view.setInitialData("plugdo-report", "influencer-result", data_influencer);
        view.setInitialData("plugdo-report", "serene-result", data_serene);
        view.setInitialData("plugdo-report", "conscious-result", data_conscious);
        view.load();
    }});
});