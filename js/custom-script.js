$(document).ready(function(){

    //CARGO LOS DATOS DESDE EL TXT

    $.ajax({
        url : "resources/datos_Persona.txt",
        dataType: "text",
        success : function (data) {

            var personas = data.split(/\n/g);


            // ELIMINO ENCABEZADOS
            personas.shift();

            // SEPARO SEXO Y ALTURA

            var hombres = [];
            var mujeres = [];

            for (i = 0; i < personas.length; i++) {

                var aux = personas[i].split(';');
                var altura = (aux[2] / 100) + 1;

                if(aux[1] == 'men'){
                    hombres.push(altura);
                }else {
                    mujeres.push(altura);
                }
            }

            // PREPARO DATOS HISTOGRAMA

            var hT1 = {
                x: hombres,
                type: 'histogram',
                name: 'Hombres',
                opacity: 0.75,
                marker: {
                    color: 'blue',
                    line: {
                        color: 'grey',
                        width: 0
                    },
                    opacity: 0.75
                }
            };
            var hT2 = {
                x: mujeres,
                type: 'histogram',
                name: 'Mujeres',
                opacity: 0.75,
                marker: {
                    color: 'fuchsia',
                    line: {
                        color: 'grey',
                        width: 0
                    },
                    opacity: 0.75
                }
            };
            var datosHistograma = [hT1, hT2];

            // PREPARO DATOS BOX-PLOT

            var bT1 = {
                y: hombres,
                name: 'Hombres',
                type: 'box',
                marker: {
                    color: 'blue',
                    line: {
                        color: 'grey',
                        width: 0
                    }
                }
            };
            var bT2 = {
                y: mujeres,
                name: 'Mujeres',
                type: 'box',
                marker: {
                    color: 'fuchsia',
                    line: {
                        color: 'grey',
                        width: 0
                    }
                }
            };
            var datosBoxplot = [bT1, bT2];

            // CONFIGURO ESTILO HISTOGRAMA
            var layout = {
                title: 'Altura/Sexo',
                xaxis: {title: 'Altura'},
                yaxis: {title: 'Nº Personas'},
                barmode: 'overlay',
                bargap: 0.25,
                bargroupgap: 0.3
            };

            //DIBUJO GRAFICAS
            Plotly.newPlot('histograma', datosHistograma, layout);
            Plotly.newPlot('boxplot', datosBoxplot);

        }
    });

});