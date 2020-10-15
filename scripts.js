
contacto = 'Sin datos';
array_corroborar = [];
contador_corroborar = 0;

$("#boton_capas").click(function () {
    $("#panel_capas").toggle();
});

$("#logo").click(function () {
    $("#panel_alcaldia").toggle();
});

$("#relevar").click(function () {
    $("#relevamiento_intro").toggle();
});


$(".button_modificar").click(function () {
    $("#relevamiento_intro").show();
    $(".button_modificar").hide();
});

$("#boton_contacto").click(function (e) {
    e.preventDefault();
    var valor_contacto = $("#contacto").val();
    var value_contacto = {
        "contacto": valor_contacto
    };

    contacto = valor_contacto;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://alcaldia-bici-salta-be48b.firebaseio.com/talleres.json", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(
        value_contacto
    ));
});

relevar = function relevar() {
    $("#relevamiento").show();
    $("#relevamiento_intro").hide();
    $("#relevamiento_respuesta").hide();
};

$("#myButton").click(function (e) {
    e.preventDefault();
    var nombre = $("#nombre").val();
    var bicicletero = $("#bicicletero").val();
    var direccion = $("#direccion").val();
    var barrio = $("#barrio").val();
    var venta = $("#venta").attr('checked');
    if ($('#venta').is(":checked")) { var venta = true; } else { venta = false; }
    if ($('#taller').is(":checked")) { var taller = true; } else { taller = false; }
    if ($('#gomeria').is(":checked")) { var gomeria = true; } else { gomeria = false; }
    if ($('#playa_estacionamiento').is(":checked")) { var playa_estacionamiento = true; } else { playa_estacionamiento = false; }
    if ($('#alquiler').is(":checked")) { var alquiler = true; } else { alquiler = false; }
    var horario_lav = $("#horario_lav").val();
    var horario_s = $("#horario_s").val();
    var horario_d = $("#horario_d").val();
    var telefono = $("#telefono").val();
    var email = $("#email").val();
    var web = $("#web").val();
    var redes_ig = $("#redes_ig").val();
    var redes_fb = $("#redes_fb").val();
    var redes_tw = $("#redes_tw").val();

    var value = {
        "alquiler": alquiler,
        "nombre": nombre,
        "bicicletero": bicicletero,
        "direccion": direccion,
        "barrio": barrio,
        "contacto": contacto,
        "email": email,
        "taller": taller,
        "gomeria": gomeria,
        "playa_estacionamiento": playa_estacionamiento,
        "horario_lav": horario_lav,
        "horario_s": horario_s,
        "horario_d": horario_d,
        "redes_ig": redes_ig,
        "redes_fb": redes_fb,
        "redes_tw": redes_tw,
        "telefono": telefono,
        "venta": venta,
        "web": web,
    };

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://alcaldia-bici-salta-be48b.firebaseio.com/talleres.json", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(
        value
    ));

    $("#relevamiento").hide();
    $("#relevamiento_respuesta").show();
});


mapboxgl.accessToken = 'pk.eyJ1IjoiaGNhc3RlbGxhcm8iLCJhIjoiY2lrazJvZHFrMDl1eXYwa202Z2Njczk1eiJ9.fIBpy-XcIN0kKSuIx6oReA';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [-65.40964, -24.789], // starting position [lng, lat]
    zoom: 11 // starting zoom
});
map.addControl(new mapboxgl.NavigationControl());
map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    })
);

map.on('load', function () {
    var url = './data/ciclovias.geojson';
    map.addSource('ciclovia', { type: 'geojson', data: url });

    var url2 = './data/locales_bicicleta.geojson';
    map.addSource('locales_bicicleta', { type: 'geojson', data: url2 });

    var url3 = './data/eess.geojson';
    map.addSource('eess_geojson', { type: 'geojson', data: url3 });

    var url4 = './data/estacionamiento_publico.geojson';
    map.addSource('estacionamiento_geojson', { type: 'geojson', data: url4 });

    var url5 = './data/playa_estacionamiento.geojson';
    map.addSource('playa_estacionamiento_geojson', { type: 'geojson', data: url5 });

    var url6 = './data/banio_publico.geojson';
    map.addSource('banio_publico_geojson', { type: 'geojson', data: url6 });

    map.loadImage(
        './image/taller.png',
        function (error, image) {
            if (error) throw error;
            map.addImage('cat', image);

            map.addLayer({
                'id': 'taller',
                'type': 'symbol',
                'source': 'locales_bicicleta',
                'layout': {
                    'icon-image': 'cat',
                    'icon-allow-overlap': true,
                    'icon-size': 0.7,
                    'visibility': 'visible'
                },
                'filter': ['==', 'taller', 1]
            });
        }
    );

    map.loadImage(
        './image/gomeria.png',
        function (error, image) {
            if (error) throw error;
            map.addImage('gomeria', image);

            map.addLayer({
                'id': 'gomeria',
                'type': 'symbol',
                'source': 'locales_bicicleta',
                'layout': {
                    'icon-image': 'gomeria',
                    'icon-allow-overlap': true,
                    'icon-size': 0.7,
                    'visibility': 'none'
                },
                'filter': ['==', 'gomeria', '1']
            });
        }
    );

    map.loadImage(
        './image/venta_bicicleta.png',
        function (error, image) {
            if (error) throw error;
            map.addImage('venta_bicicleta', image);

            map.addLayer({
                'id': 'venta_bicicleta',
                'type': 'symbol',
                'source': 'locales_bicicleta',
                'layout': {
                    'icon-image': 'venta_bicicleta',
                    'icon-allow-overlap': true,
                    'icon-size': 0.7,
                    'visibility': 'none'
                },
                'filter': ['==', 'venta', 1]
            });
        }
    );

    map.loadImage(
        './image/alquiler.png',
        function (error, image) {
            if (error) throw error;
            map.addImage('alquiler_bicicleta', image);

            map.addLayer({
                'id': 'alquiler_bicicleta',
                'type': 'symbol',
                'source': 'locales_bicicleta',
                'layout': {
                    'icon-image': 'alquiler_bicicleta',
                    'icon-allow-overlap': true,
                    'icon-size': 0.7,
                    'visibility': 'none'
                },
                'filter': ['==', 'alquiler', 1]
            });
        }
    );

    map.loadImage(
        './image/estacionamiento.png',
        function (error, image) {
            if (error) throw error;
            map.addImage('cat3', image);

            map.addLayer({
                'id': 'estacionamiento',
                'type': 'symbol',
                'source': 'estacionamiento_geojson',
                'layout': {
                    'icon-image': 'cat3',
                    'icon-allow-overlap': true,
                    'icon-size': 0.7,
                    'visibility': 'none'
                }
            });
        }
    );

    map.loadImage(
        './image/playa_estacionamiento.png',
        function (error, image) {
            if (error) throw error;
            map.addImage('playa_estacionamiento', image);

            map.addLayer({
                'id': 'playa_estacionamiento',
                'type': 'symbol',
                'source': 'playa_estacionamiento_geojson',
                'layout': {
                    'icon-image': 'playa_estacionamiento',
                    'icon-allow-overlap': true,
                    'icon-size': 0.7,
                    'visibility': 'none'
                }
            });
        }
    );

    map.loadImage(
        './image/estacion_de_servicio.png',
        function (error, image) {
            if (error) throw error;
            map.addImage('cat2', image);

            map.addLayer({
                'id': 'estacion_de_servicio',
                'type': 'symbol',
                'source': 'eess_geojson',
                'layout': {
                    'icon-image': 'cat2',
                    'icon-allow-overlap': true,
                    'icon-size': 0.7,
                    'visibility': 'none'
                }
            });
        }
    );

    map.loadImage(
        './image/banio_publico.png',
        function (error, image) {
            if (error) throw error;
            map.addImage('banio_publico', image);

            map.addLayer({
                'id': 'banio_publico',
                'type': 'symbol',
                'source': 'banio_publico_geojson',
                'layout': {
                    'icon-image': 'banio_publico',
                    'icon-allow-overlap': true,
                    'icon-size': 0.7,
                    'visibility': 'none'
                }
            });
        }
    );




    // map.addLayer({
    //     'id': 'estacion_de_servicio',
    //     'source': 'eess_geojson',
    //     'type': 'circle',
    //     'paint': {
    //         'circle-radius': 5,
    //         'circle-color': '#007cbf'
    //     },
    //     'layout': {
    //         'visibility': 'none'
    //     }
    // });


    map.addLayer({
        'id': 'ciclovia',
        'type': 'line',
        'source': 'ciclovia',
        'layout': {
            'visibility': 'visible',
            'line-cap': 'round',
            'line-join': 'round',
        },
        'paint': {
            'line-color': 'seagreen',
            'line-width': 4,
        }
    });

    //Chequear horarios



    //5 numbers specify year, month, day, hour, and minute:
    var ahora = new Date();
    //var ahora = new Date(2020, 9, 13, 10, 34);
    // d.getHours();

    console.log(ahora);

    map.on('click', 'taller', function (e) {
        var horarios_hoy = true;

        if (ahora.getDay() == 0) {
            var desde1 = e.features[0].properties.dom_desde1;
            var hasta1 = e.features[0].properties.dom_hasta1;
            var desde2 = e.features[0].properties.dom_desde2;
            var hasta2 = e.features[0].properties.dom_hasta2;
            if (desde1 == 'null') { horarios_hoy = false; }

        } else if (ahora.getDay() == 6) {
            var desde1 = e.features[0].properties.sab_desde1;
            var hasta1 = e.features[0].properties.sab_hasta1;
            var desde2 = e.features[0].properties.dom_desde2;
            var hasta2 = e.features[0].properties.dom_hasta2;
            if (desde1 == 'null') { horarios_hoy = false; }
        } else {
            var desde1 = e.features[0].properties.lav_desde1;
            var hasta1 = e.features[0].properties.lav_hasta1;
            var desde2 = e.features[0].properties.lav_desde2;
            var hasta2 = e.features[0].properties.lav_hasta2;
            if (desde1 == 'null') { horarios_hoy = false; }
        }

        desde1 = desde1.toString();
        hasta1 = hasta1.toString();
        desde2 = desde2.toString();
        hasta2 = hasta2.toString();

        if (desde1.indexOf(":") == -1) { desde1_min = 0 } else {
            desde1 = desde1.substring(0, desde1.indexOf(":"));
            desde1_min = desde1.substring(desde1.indexOf(":") + 1, desde1.indexOf(":") + 3);
        }

        if (hasta1.indexOf(":") == -1) { hasta1_min = 0 } else {
            hasta1 = hasta1.substring(0, hasta1.indexOf(":"));
            hasta1_min = hasta1.substring(hasta1.indexOf(":") + 1, hasta1.indexOf(":") + 3);
        }

        if (desde2.indexOf(":") == -1) { desde2_min = 0 } else {
            desde2 = desde2.substring(0, desde2.indexOf(":"));
            desde2_min = desde2.substring(desde2.indexOf(":") + 1, desde2.indexOf(":") + 3);
        }

        if (hasta2.indexOf(":") == -1) { hasta2_min = 0 } else {
            hasta2 = hasta2.substring(0, hasta2.indexOf(":"));
            hasta2_min = hasta2.substring(hasta1.indexOf(":") + 1, hasta2.indexOf(":") + 3);
        }

        var abre1 = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), desde1, desde1_min);
        var cierra1 = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), hasta1, hasta1_min);
        var abre2 = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), desde2, desde2_min);
        var cierra2 = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), hasta2, hasta2_min);

        if (abre1 != 'invalid date' && ahora >= abre1 && ahora <= cierra1) {
            mensaje_horario = 'Abierto ahora';
            tipo_pill = 'success'
        } else if (abre2 != 'invalid date' && ahora >= abre2 && ahora <= cierra2) {
            console
            mensaje_horario = 'Abierto ahora';
            tipo_pill = 'success'
        } else {
            mensaje_horario = 'Cerrado en este momento';
            tipo_pill = 'secondary';
        }

        innerPopup = '<div><h5 style="color:crimson;">Taller / Reparación de bicicletas <img src="./image/taller.png" /> </h5> ';
        var nombre_bicicleteria = e.features[0].properties.nombre;
        if (nombre_bicicleteria != 'null') {
            innerPopup = innerPopup + '<b>Nombre: ' + nombre_bicicleteria + '</b><br>';
        }
        var responsable = e.features[0].properties.responsable;
        if (responsable != 'null') {
            innerPopup = innerPopup + '<b>Nombre de bicicletero/a: </b>' + responsable + '<br>';
        }
        var direccion = e.features[0].properties.direccion;
        if (direccion != 'null') {
            innerPopup = innerPopup + '<b>Dirección: </b>' + direccion + '<br>';
        }
        var barrio = e.features[0].properties.barrio;
        if (barrio != 'null') {
            innerPopup = innerPopup + '<b>Barrio: </b>' + barrio + '<br>';
        }
        var localidad = e.features[0].properties.localidad;
        if (localidad != 'null') {
            innerPopup = innerPopup + '<b>Localidad: </b>' + localidad + '<br>';
        }

        var horario_lav = e.features[0].properties.lav_desde1;
        if (horario_lav != 'null') {
            innerPopup = innerPopup + '<br><b>Horarios </b><span class="badge badge-pill badge-' + tipo_pill + '">' + mensaje_horario + '</span>';
            innerPopup = innerPopup + '<br><b>Lunes a viernes: </b>de ' +
                e.features[0].properties.lav_desde1 + ' a ' + e.features[0].properties.lav_hasta1;
            if (e.features[0].properties.lav_desde2 != 'null') {
                innerPopup = innerPopup + ' y de ' + e.features[0].properties.lav_desde2 + ' a ' + e.features[0].properties.lav_hasta2;
            }
            innerPopup = innerPopup + ' hs.<br>';
        }
        var horario_sab = e.features[0].properties.sab_desde1;
        if (horario_sab != 'null') {
            innerPopup = innerPopup + '<b>Sábados: </b>de ' +
                e.features[0].properties.sab_desde1 + ' a ' + e.features[0].properties.sab_hasta1;
            if (e.features[0].properties.sab_desde2 != 'null') {
                innerPopup = innerPopup + ' y de ' + e.features[0].properties.sab_desde2 + ' a ' + e.features[0].properties.sab_hasta2;
            }
            innerPopup = innerPopup + ' hs.<br>';
        }
        var horario_dom = e.features[0].properties.dom_desde1;
        console.log(horario_dom + 'Horario domingo');
        if (horario_dom != 'null') {
            innerPopup = innerPopup + '<b>Domingos: </b>de ' +
                e.features[0].properties.dom_desde1 + ' a ' + e.features[0].properties.dom_hasta1;
            if (e.features[0].properties.dom_desde2 != 'null') {
                innerPopup = innerPopup + ' y de ' + e.features[0].properties.dom_desde2 + ' a ' + e.features[0].properties.dom_hasta2;
            }
            innerPopup = innerPopup + ' hs.<br>';
        }

        var telefono = e.features[0].properties.telefono;
        var web = e.features[0].properties.web;
        var email = e.features[0].properties.email;
        var facebook = e.features[0].properties.facebook;
        var instagram = e.features[0].properties.instagram;
        var twitter = e.features[0].properties.twitter;

        if (telefono != 'null' || facebook != 'null' || instagram != 'null') {
            innerPopup = innerPopup + '<br><b>Contacto</b><br>';
            if (telefono != 'null') {
                innerPopup = innerPopup + '<b>Teléfono: </b>' + telefono + '<br>';
            }
            if (web != 'null') {
                innerPopup = innerPopup + '<b>Página Web: </b><a href="' + web + '" target="_blank">' + web + '</a><br>';
            }
            if (email != 'null') {
                innerPopup = innerPopup + '<b>Email: </b><a href="mailto:' + email + '" target="_blank">' + email + '</a><br>';
            }
            if (facebook != 'null') {
                innerPopup = innerPopup + '<b>Facebook: </b><a href="' + facebook + '" target="_blank">' + facebook + '</a><br>';
            }
            if (instagram != 'null') {
                innerPopup = innerPopup + '<b>Instagram: </b><a href="' + instagram + '" target="_blank">' + instagram + '</a><br>';
            }
            if (twitter != 'null') {
                innerPopup = innerPopup + '<b>Instagram: </b><a href="' + twitter + '" target="_blank">' + twitter + '</a><br>';
            }
        }
        var id = e.features[0].properties.id;
        innerPopup = innerPopup + '<br><button class="btn btn-success btn-sm" onclick="corroborar(\'Taller de reparación\',\'' + direccion + '\',\'' + id + '\')"> Modificar o validar información</button></div>';

        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(innerPopup)
            .addTo(map);
    });



    map.on('click', 'gomeria', function (e) {
        var horarios_hoy = true;

        if (ahora.getDay() == 0) {
            var desde1 = e.features[0].properties.dom_desde1;
            var hasta1 = e.features[0].properties.dom_hasta1;
            var desde2 = e.features[0].properties.dom_desde2;
            var hasta2 = e.features[0].properties.dom_hasta2;
            if (desde1 == 'null') { horarios_hoy = false; }

        } else if (ahora.getDay() == 6) {
            var desde1 = e.features[0].properties.sab_desde1;
            var hasta1 = e.features[0].properties.sab_hasta1;
            var desde2 = e.features[0].properties.dom_desde2;
            var hasta2 = e.features[0].properties.dom_hasta2;
            if (desde1 == 'null') { horarios_hoy = false; }
        } else {
            var desde1 = e.features[0].properties.lav_desde1;
            var hasta1 = e.features[0].properties.lav_hasta1;
            var desde2 = e.features[0].properties.lav_desde2;
            var hasta2 = e.features[0].properties.lav_hasta2;
            if (desde1 == 'null') { horarios_hoy = false; }
        }

        desde1 = desde1.toString();
        hasta1 = hasta1.toString();
        desde2 = desde2.toString();
        hasta2 = hasta2.toString();

        if (desde1.indexOf(":") == -1) { desde1_min = 0 } else {
            desde1 = desde1.substring(0, desde1.indexOf(":"));
            desde1_min = desde1.substring(desde1.indexOf(":") + 1, desde1.indexOf(":") + 3);
        }

        if (hasta1.indexOf(":") == -1) { hasta1_min = 0 } else {
            hasta1 = hasta1.substring(0, hasta1.indexOf(":"));
            hasta1_min = hasta1.substring(hasta1.indexOf(":") + 1, hasta1.indexOf(":") + 3);
        }

        if (desde2.indexOf(":") == -1) { desde2_min = 0 } else {
            desde2 = desde2.substring(0, desde2.indexOf(":"));
            desde2_min = desde2.substring(desde2.indexOf(":") + 1, desde2.indexOf(":") + 3);
        }

        if (hasta2.indexOf(":") == -1) { hasta2_min = 0 } else {
            hasta2 = hasta2.substring(0, hasta2.indexOf(":"));
            hasta2_min = hasta2.substring(hasta1.indexOf(":") + 1, hasta2.indexOf(":") + 3);
        }

        var abre1 = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), desde1, desde1_min);
        var cierra1 = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), hasta1, hasta1_min);
        var abre2 = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), desde2, desde2_min);
        var cierra2 = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), hasta2, hasta2_min);

        if (abre1 != 'invalid date' && ahora >= abre1 && ahora <= cierra1) {
            mensaje_horario = 'Abierto ahora';
            tipo_pill = 'success'
        } else if (abre2 != 'invalid date' && ahora >= abre2 && ahora <= cierra2) {
            console
            mensaje_horario = 'Abierto ahora';
            tipo_pill = 'success'
        } else {
            mensaje_horario = 'Cerrado en este momento';
            tipo_pill = 'secondary';
        }

        innerPopup = '<div><h5 style="color:#aa0044;">Gomería <img src="./image/gomeria.png" /> </h5> ';
        var nombre_bicicleteria = e.features[0].properties.nombre;
        if (nombre_bicicleteria != 'null') {
            innerPopup = innerPopup + '<b>Nombre: ' + nombre_bicicleteria + '</b><br>';
        }
        var responsable = e.features[0].properties.responsable;
        if (responsable != 'null') {
            innerPopup = innerPopup + '<b>Nombre de bicicletero/a: </b>' + responsable + '<br>';
        }
        var direccion = e.features[0].properties.direccion;
        if (direccion != 'null') {
            innerPopup = innerPopup + '<b>Dirección: </b>' + direccion + '<br>';
        }
        var barrio = e.features[0].properties.barrio;
        if (barrio != 'null') {
            innerPopup = innerPopup + '<b>Barrio: </b>' + barrio + '<br>';
        }
        var localidad = e.features[0].properties.localidad;
        if (localidad != 'null') {
            innerPopup = innerPopup + '<b>Localidad: </b>' + localidad + '<br>';
        }

        var horario_lav = e.features[0].properties.lav_desde1;
        if (horario_lav != 'null') {
            innerPopup = innerPopup + '<br><b>Horarios </b><span class="badge badge-pill badge-' + tipo_pill + '">' + mensaje_horario + '</span>';
            innerPopup = innerPopup + '<br><b>Lunes a viernes: </b>de ' +
                e.features[0].properties.lav_desde1 + ' a ' + e.features[0].properties.lav_hasta1;
            if (e.features[0].properties.lav_desde2 != 'null') {
                innerPopup = innerPopup + ' y de ' + e.features[0].properties.lav_desde2 + ' a ' + e.features[0].properties.lav_hasta2;
            }
            innerPopup = innerPopup + ' hs.<br>';
        }
        var horario_sab = e.features[0].properties.sab_desde1;
        if (horario_sab != 'null') {
            innerPopup = innerPopup + '<b>Sábados: </b>de ' +
                e.features[0].properties.sab_desde1 + ' a ' + e.features[0].properties.sab_hasta1;
            if (e.features[0].properties.sab_desde2 != 'null') {
                innerPopup = innerPopup + ' y de ' + e.features[0].properties.sab_desde2 + ' a ' + e.features[0].properties.sab_hasta2;
            }
            innerPopup = innerPopup + ' hs.<br>';
        }
        var horario_dom = e.features[0].properties.dom_desde1;

        if (horario_dom != 'null') {
            innerPopup = innerPopup + '<b>Domingos: </b>de ' +
                e.features[0].properties.dom_desde1 + ' a ' + e.features[0].properties.dom_hasta1;
            if (e.features[0].properties.dom_desde2 != 'null') {
                innerPopup = innerPopup + ' y de ' + e.features[0].properties.dom_desde2 + ' a ' + e.features[0].properties.dom_hasta2;
            }
            innerPopup = innerPopup + ' hs.<br>';
        }

        var telefono = e.features[0].properties.telefono;
        var web = e.features[0].properties.web;
        var email = e.features[0].properties.email;
        var facebook = e.features[0].properties.facebook;
        var instagram = e.features[0].properties.instagram;
        var twitter = e.features[0].properties.twitter;

        if (telefono != 'null' || facebook != 'null' || instagram != 'null') {
            innerPopup = innerPopup + '<br><b>Contacto</b><br>';
            if (telefono != 'null') {
                innerPopup = innerPopup + '<b>Teléfono: </b>' + telefono + '<br>';
            }
            if (web != 'null') {
                innerPopup = innerPopup + '<b>Página Web: </b><a href="' + web + '" target="_blank">' + web + '</a><br>';
            }
            if (email != 'null') {
                innerPopup = innerPopup + '<b>Email: </b><a href="mailto:' + email + '" target="_blank">' + email + '</a><br>';
            }
            if (facebook != 'null') {
                innerPopup = innerPopup + '<b>Facebook: </b><a href="' + facebook + '" target="_blank">' + facebook + '</a><br>';
            }
            if (instagram != 'null') {
                innerPopup = innerPopup + '<b>Instagram: </b><a href="' + instagram + '" target="_blank">' + instagram + '</a><br>';
            }
            if (twitter != 'null') {
                innerPopup = innerPopup + '<b>Instagram: </b><a href="' + twitter + '" target="_blank">' + twitter + '</a><br>';
            }
        }
        var id = e.features[0].properties.id;
        innerPopup = innerPopup + '<br><button class="btn btn-success btn-sm" onclick="corroborar(\'Gomería\',\'' + direccion + '\',\'' + id + '\')">Modificar o validar información</button></div>';

        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(innerPopup)
            .addTo(map);
    });

    map.on('click', 'venta_bicicleta', function (e) {
        var horarios_hoy = true;

        if (ahora.getDay() == 0) {
            var desde1 = e.features[0].properties.dom_desde1;
            var hasta1 = e.features[0].properties.dom_hasta1;
            var desde2 = e.features[0].properties.dom_desde2;
            var hasta2 = e.features[0].properties.dom_hasta2;
            if (desde1 == 'null') { horarios_hoy = false; }

        } else if (ahora.getDay() == 6) {
            var desde1 = e.features[0].properties.sab_desde1;
            var hasta1 = e.features[0].properties.sab_hasta1;
            var desde2 = e.features[0].properties.dom_desde2;
            var hasta2 = e.features[0].properties.dom_hasta2;
            if (desde1 == 'null') { horarios_hoy = false; }
        } else {
            var desde1 = e.features[0].properties.lav_desde1;
            var hasta1 = e.features[0].properties.lav_hasta1;
            var desde2 = e.features[0].properties.lav_desde2;
            var hasta2 = e.features[0].properties.lav_hasta2;
            if (desde1 == 'null') { horarios_hoy = false; }
        }

        desde1 = desde1.toString();
        hasta1 = hasta1.toString();
        desde2 = desde2.toString();
        hasta2 = hasta2.toString();

        if (desde1.indexOf(":") == -1) { desde1_min = 0 } else {
            desde1 = desde1.substring(0, desde1.indexOf(":"));
            desde1_min = desde1.substring(desde1.indexOf(":") + 1, desde1.indexOf(":") + 3);
        }

        if (hasta1.indexOf(":") == -1) { hasta1_min = 0 } else {
            hasta1 = hasta1.substring(0, hasta1.indexOf(":"));
            hasta1_min = hasta1.substring(hasta1.indexOf(":") + 1, hasta1.indexOf(":") + 3);
        }

        if (desde2.indexOf(":") == -1) { desde2_min = 0 } else {
            desde2 = desde2.substring(0, desde2.indexOf(":"));
            desde2_min = desde2.substring(desde2.indexOf(":") + 1, desde2.indexOf(":") + 3);
        }

        if (hasta2.indexOf(":") == -1) { hasta2_min = 0 } else {
            hasta2 = hasta2.substring(0, hasta2.indexOf(":"));
            hasta2_min = hasta2.substring(hasta1.indexOf(":") + 1, hasta2.indexOf(":") + 3);
        }

        var abre1 = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), desde1, desde1_min);
        var cierra1 = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), hasta1, hasta1_min);
        var abre2 = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), desde2, desde2_min);
        var cierra2 = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), hasta2, hasta2_min);

        if (abre1 != 'invalid date' && ahora >= abre1 && ahora <= cierra1) {
            mensaje_horario = 'Abierto ahora';
            tipo_pill = 'success'
        } else if (abre2 != 'invalid date' && ahora >= abre2 && ahora <= cierra2) {
            console
            mensaje_horario = 'Abierto ahora';
            tipo_pill = 'success'
        } else {
            mensaje_horario = 'Cerrado en este momento';
            tipo_pill = 'secondary';
        }

        innerPopup = '<div><h5 style="color:#891389;">Venta de bicicletas y repuestos <img src="./image/venta_bicicleta.png" /> </h5> ';
        var nombre_bicicleteria = e.features[0].properties.nombre;
        if (nombre_bicicleteria != 'null') {
            innerPopup = innerPopup + '<b>Nombre: ' + nombre_bicicleteria + '</b><br>';
        }
        var responsable = e.features[0].properties.responsable;
        if (responsable != 'null') {
            innerPopup = innerPopup + '<b>Nombre de bicicletero/a: </b>' + responsable + '<br>';
        }
        var direccion = e.features[0].properties.direccion;
        if (direccion != 'null') {
            innerPopup = innerPopup + '<b>Dirección: </b>' + direccion + '<br>';
        }
        var barrio = e.features[0].properties.barrio;
        if (barrio != 'null') {
            innerPopup = innerPopup + '<b>Barrio: </b>' + barrio + '<br>';
        }
        var localidad = e.features[0].properties.localidad;
        if (localidad != 'null') {
            innerPopup = innerPopup + '<b>Localidad: </b>' + localidad + '<br>';
        }

        var horario_lav = e.features[0].properties.lav_desde1;
        if (horario_lav != 'null') {
            innerPopup = innerPopup + '<br><b>Horarios </b><span class="badge badge-pill badge-' + tipo_pill + '">' + mensaje_horario + '</span>';
            innerPopup = innerPopup + '<br><b>Lunes a viernes: </b>de ' +
                e.features[0].properties.lav_desde1 + ' a ' + e.features[0].properties.lav_hasta1;
            if (e.features[0].properties.lav_desde2 != 'null') {
                innerPopup = innerPopup + ' y de ' + e.features[0].properties.lav_desde2 + ' a ' + e.features[0].properties.lav_hasta2;
            }
            innerPopup = innerPopup + ' hs.<br>';
        }
        var horario_sab = e.features[0].properties.sab_desde1;
        if (horario_sab != 'null') {
            innerPopup = innerPopup + '<b>Sábados: </b>de ' +
                e.features[0].properties.sab_desde1 + ' a ' + e.features[0].properties.sab_hasta1;
            if (e.features[0].properties.sab_desde2 != 'null') {
                innerPopup = innerPopup + ' y de ' + e.features[0].properties.sab_desde2 + ' a ' + e.features[0].properties.sab_hasta2;
            }
            innerPopup = innerPopup + ' hs.<br>';
        }
        var horario_dom = e.features[0].properties.dom_desde1;

        if (horario_dom != 'null') {
            innerPopup = innerPopup + '<b>Domingos: </b>de ' +
                e.features[0].properties.dom_desde1 + ' a ' + e.features[0].properties.dom_hasta1;
            if (e.features[0].properties.dom_desde2 != 'null') {
                innerPopup = innerPopup + ' y de ' + e.features[0].properties.dom_desde2 + ' a ' + e.features[0].properties.dom_hasta2;
            }
            innerPopup = innerPopup + ' hs.<br>';
        }

        var telefono = e.features[0].properties.telefono;
        var web = e.features[0].properties.web;
        var email = e.features[0].properties.email;
        var facebook = e.features[0].properties.facebook;
        var instagram = e.features[0].properties.instagram;
        var twitter = e.features[0].properties.twitter;

        if (telefono != 'null' || facebook != 'null' || instagram != 'null') {
            innerPopup = innerPopup + '<br><b>Contacto</b><br>';
            if (telefono != 'null') {
                innerPopup = innerPopup + '<b>Teléfono: </b>' + telefono + '<br>';
            }
            if (web != 'null') {
                innerPopup = innerPopup + '<b>Página Web: </b><a href="' + web + '" target="_blank">' + web + '</a><br>';
            }
            if (email != 'null') {
                innerPopup = innerPopup + '<b>Email: </b><a href="mailto:' + email + '" target="_blank">' + email + '</a><br>';
            }
            if (facebook != 'null') {
                innerPopup = innerPopup + '<b>Facebook: </b><a href="' + facebook + '" target="_blank">' + facebook + '</a><br>';
            }
            if (instagram != 'null') {
                innerPopup = innerPopup + '<b>Instagram: </b><a href="' + instagram + '" target="_blank">' + instagram + '</a><br>';
            }
            if (twitter != 'null') {
                innerPopup = innerPopup + '<b>Instagram: </b><a href="' + twitter + '" target="_blank">' + twitter + '</a><br>';
            }
        }
        var id = e.features[0].properties.id;
        innerPopup = innerPopup + '<br><button class="btn btn-success btn-sm" onclick="corroborar(\'Venta de bicicletas y repuestos\',\'' + direccion + '\',\'' + id + '\')">Modificar o validar información</button></div>';

        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(innerPopup)
            .addTo(map);
    });

    map.on('click', 'alquiler_bicicleta', function (e) {
        var horarios_hoy = true;

        if (ahora.getDay() == 0) {
            var desde1 = e.features[0].properties.dom_desde1;
            var hasta1 = e.features[0].properties.dom_hasta1;
            var desde2 = e.features[0].properties.dom_desde2;
            var hasta2 = e.features[0].properties.dom_hasta2;
            if (desde1 == 'null') { horarios_hoy = false; }

        } else if (ahora.getDay() == 6) {
            var desde1 = e.features[0].properties.sab_desde1;
            var hasta1 = e.features[0].properties.sab_hasta1;
            var desde2 = e.features[0].properties.dom_desde2;
            var hasta2 = e.features[0].properties.dom_hasta2;
            if (desde1 == 'null') { horarios_hoy = false; }
        } else {
            var desde1 = e.features[0].properties.lav_desde1;
            var hasta1 = e.features[0].properties.lav_hasta1;
            var desde2 = e.features[0].properties.lav_desde2;
            var hasta2 = e.features[0].properties.lav_hasta2;
            if (desde1 == 'null') { horarios_hoy = false; }
        }

        desde1 = desde1.toString();
        hasta1 = hasta1.toString();
        desde2 = desde2.toString();
        hasta2 = hasta2.toString();

        if (desde1.indexOf(":") == -1) { desde1_min = 0 } else {
            desde1 = desde1.substring(0, desde1.indexOf(":"));
            desde1_min = desde1.substring(desde1.indexOf(":") + 1, desde1.indexOf(":") + 3);
        }

        if (hasta1.indexOf(":") == -1) { hasta1_min = 0 } else {
            hasta1 = hasta1.substring(0, hasta1.indexOf(":"));
            hasta1_min = hasta1.substring(hasta1.indexOf(":") + 1, hasta1.indexOf(":") + 3);
        }

        if (desde2.indexOf(":") == -1) { desde2_min = 0 } else {
            desde2 = desde2.substring(0, desde2.indexOf(":"));
            desde2_min = desde2.substring(desde2.indexOf(":") + 1, desde2.indexOf(":") + 3);
        }

        if (hasta2.indexOf(":") == -1) { hasta2_min = 0 } else {
            hasta2 = hasta2.substring(0, hasta2.indexOf(":"));
            hasta2_min = hasta2.substring(hasta1.indexOf(":") + 1, hasta2.indexOf(":") + 3);
        }

        var abre1 = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), desde1, desde1_min);
        var cierra1 = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), hasta1, hasta1_min);
        var abre2 = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), desde2, desde2_min);
        var cierra2 = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), hasta2, hasta2_min);

        if (abre1 != 'invalid date' && ahora >= abre1 && ahora <= cierra1) {
            mensaje_horario = 'Abierto ahora';
            tipo_pill = 'success'
        } else if (abre2 != 'invalid date' && ahora >= abre2 && ahora <= cierra2) {
            console
            mensaje_horario = 'Abierto ahora';
            tipo_pill = 'success'
        } else {
            mensaje_horario = 'Cerrado en este momento';
            tipo_pill = 'secondary';
        }

        innerPopup = '<div><h5 style="color:#69bb33;">Alquiler de bicicletas <img src="./image/alquiler.png" /> </h5> ';
        var nombre_bicicleteria = e.features[0].properties.nombre;
        if (nombre_bicicleteria != 'null') {
            innerPopup = innerPopup + '<b>Nombre: ' + nombre_bicicleteria + '</b><br>';
        }
        var responsable = e.features[0].properties.responsable;
        if (responsable != 'null') {
            innerPopup = innerPopup + '<b>Nombre de bicicletero/a: </b>' + responsable + '<br>';
        }
        var direccion = e.features[0].properties.direccion;
        if (direccion != 'null') {
            innerPopup = innerPopup + '<b>Dirección: </b>' + direccion + '<br>';
        }
        var barrio = e.features[0].properties.barrio;
        if (barrio != 'null') {
            innerPopup = innerPopup + '<b>Barrio: </b>' + barrio + '<br>';
        }
        var localidad = e.features[0].properties.localidad;
        if (localidad != 'null') {
            innerPopup = innerPopup + '<b>Localidad: </b>' + localidad + '<br>';
        }

        var horario_lav = e.features[0].properties.lav_desde1;
        if (horario_lav != 'null') {
            innerPopup = innerPopup + '<br><b>Horarios </b><span class="badge badge-pill badge-' + tipo_pill + '">' + mensaje_horario + '</span>';
            innerPopup = innerPopup + '<br><b>Lunes a viernes: </b>de ' +
                e.features[0].properties.lav_desde1 + ' a ' + e.features[0].properties.lav_hasta1;
            if (e.features[0].properties.lav_desde2 != 'null') {
                innerPopup = innerPopup + ' y de ' + e.features[0].properties.lav_desde2 + ' a ' + e.features[0].properties.lav_hasta2;
            }
            innerPopup = innerPopup + ' hs.<br>';
        }
        var horario_sab = e.features[0].properties.sab_desde1;
        if (horario_sab != 'null') {
            innerPopup = innerPopup + '<b>Sábados: </b>de ' +
                e.features[0].properties.sab_desde1 + ' a ' + e.features[0].properties.sab_hasta1;
            if (e.features[0].properties.sab_desde2 != 'null') {
                innerPopup = innerPopup + ' y de ' + e.features[0].properties.sab_desde2 + ' a ' + e.features[0].properties.sab_hasta2;
            }
            innerPopup = innerPopup + ' hs.<br>';
        }
        var horario_dom = e.features[0].properties.dom_desde1;

        if (horario_dom != 'null') {
            innerPopup = innerPopup + '<b>Domingos: </b>de ' +
                e.features[0].properties.dom_desde1 + ' a ' + e.features[0].properties.dom_hasta1;
            if (e.features[0].properties.dom_desde2 != 'null') {
                innerPopup = innerPopup + ' y de ' + e.features[0].properties.dom_desde2 + ' a ' + e.features[0].properties.dom_hasta2;
            }
            innerPopup = innerPopup + ' hs.<br>';
        }

        var telefono = e.features[0].properties.telefono;
        var web = e.features[0].properties.web;
        var email = e.features[0].properties.email;
        var facebook = e.features[0].properties.facebook;
        var instagram = e.features[0].properties.instagram;
        var twitter = e.features[0].properties.twitter;

        if (telefono != 'null' || facebook != 'null' || instagram != 'null') {
            innerPopup = innerPopup + '<br><b>Contacto</b><br>';
            if (telefono != 'null') {
                innerPopup = innerPopup + '<b>Teléfono: </b>' + telefono + '<br>';
            }
            if (web != 'null') {
                innerPopup = innerPopup + '<b>Página Web: </b><a href="' + web + '" target="_blank">' + web + '</a><br>';
            }
            if (email != 'null') {
                innerPopup = innerPopup + '<b>Email: </b><a href="mailto:' + email + '" target="_blank">' + email + '</a><br>';
            }
            if (facebook != 'null') {
                innerPopup = innerPopup + '<b>Facebook: </b><a href="' + facebook + '" target="_blank">' + facebook + '</a><br>';
            }
            if (instagram != 'null') {
                innerPopup = innerPopup + '<b>Instagram: </b><a href="' + instagram + '" target="_blank">' + instagram + '</a><br>';
            }
            if (twitter != 'null') {
                innerPopup = innerPopup + '<b>Instagram: </b><a href="' + twitter + '" target="_blank">' + twitter + '</a><br>';
            }
        }
        var id = e.features[0].properties.id;
        innerPopup = innerPopup + '<br><button class="btn btn-success btn-sm" onclick="corroborar(\'Alquiler de bicicletas\',\'' + nombre_bicicleteria + '\',\'' + id + '\')">Modificar o validar información</button></div>';

        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(innerPopup)
            .addTo(map);
    });

    map.on('click', 'estacionamiento', function (e) {
        innerPopup = '<div><h5 style="color: #2a7fff;">Estacionamiento público <img src="./image/estacionamiento.png" /> </h5> ';
        var direccion = e.features[0].properties.direccion;
        if (direccion != 'null') {
            innerPopup = innerPopup + '<b>Dirección: </b>' + direccion + ' <span class="badge badge-pill badge-success">Sin novedades reportadas</span><br>';
        }
        var id = e.features[0].properties.id;
        innerPopup = innerPopup + '<br><button class="btn btn-success btn-sm" onclick="corroborar(\'Estacionamiento público\',\'' + direccion + '\',\'' + id + '\')">Modificar o validar información</button></div>';

        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(innerPopup)
            .addTo(map);
    });


    map.on('click', 'playa_estacionamiento', function (e) {
        var horarios_hoy = true;

        if (ahora.getDay() == 0) {
            var desde1 = e.features[0].properties.dom_desde1;
            var hasta1 = e.features[0].properties.dom_hasta1;
            var desde2 = e.features[0].properties.dom_desde2;
            var hasta2 = e.features[0].properties.dom_hasta2;
            if (desde1 == 'null') { horarios_hoy = false; }

        } else if (ahora.getDay() == 6) {
            var desde1 = e.features[0].properties.sab_desde1;
            var hasta1 = e.features[0].properties.sab_hasta1;
            var desde2 = e.features[0].properties.dom_desde2;
            var hasta2 = e.features[0].properties.dom_hasta2;
            if (desde1 == 'null') { horarios_hoy = false; }
        } else {
            var desde1 = e.features[0].properties.lav_desde1;
            var hasta1 = e.features[0].properties.lav_hasta1;
            var desde2 = e.features[0].properties.lav_desde2;
            var hasta2 = e.features[0].properties.lav_hasta2;
            if (desde1 == 'null') { horarios_hoy = false; }
        }

        desde1 = desde1.toString();
        hasta1 = hasta1.toString();
        desde2 = desde2.toString();
        hasta2 = hasta2.toString();

        if (desde1.indexOf(":") == -1) { desde1_min = 0 } else {
            desde1 = desde1.substring(0, desde1.indexOf(":"));
            desde1_min = desde1.substring(desde1.indexOf(":") + 1, desde1.indexOf(":") + 3);
        }

        if (hasta1.indexOf(":") == -1) { hasta1_min = 0 } else {
            hasta1 = hasta1.substring(0, hasta1.indexOf(":"));
            hasta1_min = hasta1.substring(hasta1.indexOf(":") + 1, hasta1.indexOf(":") + 3);
        }

        if (desde2.indexOf(":") == -1) { desde2_min = 0 } else {
            desde2 = desde2.substring(0, desde2.indexOf(":"));
            desde2_min = desde2.substring(desde2.indexOf(":") + 1, desde2.indexOf(":") + 3);
        }

        if (hasta2.indexOf(":") == -1) { hasta2_min = 0 } else {
            hasta2 = hasta2.substring(0, hasta2.indexOf(":"));
            hasta2_min = hasta2.substring(hasta1.indexOf(":") + 1, hasta2.indexOf(":") + 3);
        }

        var abre1 = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), desde1, desde1_min);
        var cierra1 = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), hasta1, hasta1_min);
        var abre2 = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), desde2, desde2_min);
        var cierra2 = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), hasta2, hasta2_min);

        if (abre1 != 'invalid date' && ahora >= abre1 && ahora <= cierra1) {
            mensaje_horario = 'Abierto ahora';
            tipo_pill = 'success'
        } else if (abre2 != 'invalid date' && ahora >= abre2 && ahora <= cierra2) {
            console
            mensaje_horario = 'Abierto ahora';
            tipo_pill = 'success'
        } else {
            mensaje_horario = 'Cerrado en este momento';
            tipo_pill = 'secondary';
        }

        innerPopup = '<div><h5 style="color:#2a7fff;">Playa de estacionamiento <img src="./image/playa_estacionamiento.png" /> </h5> ';
        var nombre_bicicleteria = e.features[0].properties.nombre;
        if (nombre_bicicleteria != 'null') {
            innerPopup = innerPopup + '<b>Nombre: ' + nombre_bicicleteria + '</b><br>';
        }

        var direccion = e.features[0].properties.direccion;
        if (direccion != 'null') {
            innerPopup = innerPopup + '<b>Dirección: </b>' + direccion + '<br>';
        }
        var barrio = e.features[0].properties.barrio;
        if (barrio != 'null') {
            innerPopup = innerPopup + '<b>Barrio: </b>' + barrio + '<br>';
        }
        var localidad = e.features[0].properties.localidad;
        if (localidad != 'null') {
            innerPopup = innerPopup + '<b>Localidad: </b>' + localidad + '<br>';
        }

        var horario_lav = e.features[0].properties.lav_desde1;
        if (horario_lav != 'null') {
            innerPopup = innerPopup + '<br><b>Horarios </b><span class="badge badge-pill badge-' + tipo_pill + '">' + mensaje_horario + '</span>';
            innerPopup = innerPopup + '<br><b>Lunes a viernes: </b>de ' +
                e.features[0].properties.lav_desde1 + ' a ' + e.features[0].properties.lav_hasta1;
            if (e.features[0].properties.lav_desde2 != 'null') {
                innerPopup = innerPopup + ' y de ' + e.features[0].properties.lav_desde2 + ' a ' + e.features[0].properties.lav_hasta2;
            }
            innerPopup = innerPopup + ' hs.<br>';
        }
        var horario_sab = e.features[0].properties.sab_desde1;
        if (horario_sab != 'null') {
            innerPopup = innerPopup + '<b>Sábados: </b>de ' +
                e.features[0].properties.sab_desde1 + ' a ' + e.features[0].properties.sab_hasta1;
            if (e.features[0].properties.sab_desde2 != 'null') {
                innerPopup = innerPopup + ' y de ' + e.features[0].properties.sab_desde2 + ' a ' + e.features[0].properties.sab_hasta2;
            }
            innerPopup = innerPopup + ' hs.<br>';
        }
        var horario_dom = e.features[0].properties.dom_desde1;

        if (horario_dom != 'null') {
            innerPopup = innerPopup + '<b>Domingos: </b>de ' +
                e.features[0].properties.dom_desde1 + ' a ' + e.features[0].properties.dom_hasta1;
            if (e.features[0].properties.dom_desde2 != 'null') {
                innerPopup = innerPopup + ' y de ' + e.features[0].properties.dom_desde2 + ' a ' + e.features[0].properties.dom_hasta2;
            }
            innerPopup = innerPopup + ' hs.<br>';
        }

        var telefono = e.features[0].properties.telefono;
        var web = e.features[0].properties.web;
        var email = e.features[0].properties.email;
        var facebook = e.features[0].properties.facebook;
        var instagram = e.features[0].properties.instagram;
        var twitter = e.features[0].properties.twitter;

        if (telefono != 'null' || facebook != 'null' || instagram != 'null') {
            innerPopup = innerPopup + '<br><b>Contacto</b><br>';
            if (telefono != 'null') {
                innerPopup = innerPopup + '<b>Teléfono: </b>' + telefono + '<br>';
            }
            if (web != 'null') {
                innerPopup = innerPopup + '<b>Página Web: </b><a href="' + web + '" target="_blank">' + web + '</a><br>';
            }
            if (email != 'null') {
                innerPopup = innerPopup + '<b>Email: </b><a href="mailto:' + email + '" target="_blank">' + email + '</a><br>';
            }
            if (facebook != 'null') {
                innerPopup = innerPopup + '<b>Facebook: </b><a href="' + facebook + '" target="_blank">' + facebook + '</a><br>';
            }
            if (instagram != 'null') {
                innerPopup = innerPopup + '<b>Instagram: </b><a href="' + instagram + '" target="_blank">' + instagram + '</a><br>';
            }
            if (twitter != 'null') {
                innerPopup = innerPopup + '<b>Instagram: </b><a href="' + twitter + '" target="_blank">' + twitter + '</a><br>';
            }
        }
        var id = e.features[0].properties.id;
        innerPopup = innerPopup + '<br><button class="btn btn-success btn-sm" onclick="corroborar(\'Playa de estacionamiento\',\'' + direccion + '\',\'' + id + '\')">Modificar o validar información</button></div>';

        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(innerPopup)
            .addTo(map);
    });

    map.on('click', 'ciclovia', function (e) {
        innerPopup = '<div><h5 style="color:seagreen;">Ciclovía <i class="fas fa-road"></i> </h5> ';
        var nombre = e.features[0].properties.NOMBRE;
        var observaciones = e.features[0].properties.observaciones;
        if (observaciones == 'Sin novedades reportadas') {badge = 'badge-success'} else {badge = 'badge-warning'}
        if (nombre != 'null') {
            innerPopup = innerPopup + '<b>Nombre: </b>' + nombre + ' <span class="badge badge-pill ' + badge + '">'+ observaciones +'</span><br>';
        }
        var id = e.features[0].properties.id;
        innerPopup = innerPopup + '<br><button class="btn btn-success btn-sm" onclick="corroborar(\'Ciclovías\',\'' + nombre + '\',\'' + id + '\')">Modificar o validar información</button></div>';

        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(innerPopup)
            .addTo(map);
    });

    map.on('click', 'estacion_de_servicio', function (e) {
        innerPopup = '<div><h5 style="color:orangered;">Estación de Servicio <i class="fas fa-gas-pump"></i> </h5> ';
        var nombre = e.features[0].properties.operator;
        if (nombre != 'null') {
            innerPopup = innerPopup + '<b>Nombre: </b>' + nombre + ' <br>';
        }
        var brand = e.features[0].properties.brand;
        if (brand != 'null') {
            innerPopup = innerPopup + '<b>Bandera: </b>' + brand + '<br>';
        }
        var id = e.features[0].properties.id;
        innerPopup = innerPopup + '<br><button class="btn btn-success btn-sm" onclick="corroborar(\'Estación de servicio\',\'' + brand + '\',\'' + id + '\')">Modificar o validar información</button></div>';

        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(innerPopup)
            .addTo(map);
    });

    map.on('click', 'banio_publico', function (e) {
        var horarios_hoy = true;

        if (ahora.getDay() == 0) {
            var desde1 = e.features[0].properties.dom_desde1;
            var hasta1 = e.features[0].properties.dom_hasta1;
            var desde2 = e.features[0].properties.dom_desde2;
            var hasta2 = e.features[0].properties.dom_hasta2;
            if (desde1 == 'null') { horarios_hoy = false; }

        } else if (ahora.getDay() == 6) {
            var desde1 = e.features[0].properties.sab_desde1;
            var hasta1 = e.features[0].properties.sab_hasta1;
            var desde2 = e.features[0].properties.dom_desde2;
            var hasta2 = e.features[0].properties.dom_hasta2;
            if (desde1 == 'null') { horarios_hoy = false; }
        } else {
            var desde1 = e.features[0].properties.lav_desde1;
            var hasta1 = e.features[0].properties.lav_hasta1;
            var desde2 = e.features[0].properties.lav_desde2;
            var hasta2 = e.features[0].properties.lav_hasta2;
            if (desde1 == 'null') { horarios_hoy = false; }
        }

        desde1 = desde1.toString();
        hasta1 = hasta1.toString();
        desde2 = desde2.toString();
        hasta2 = hasta2.toString();

        if (desde1.indexOf(":") == -1) { desde1_min = 0 } else {
            desde1 = desde1.substring(0, desde1.indexOf(":"));
            desde1_min = desde1.substring(desde1.indexOf(":") + 1, desde1.indexOf(":") + 3);
        }

        if (hasta1.indexOf(":") == -1) { hasta1_min = 0 } else {
            hasta1 = hasta1.substring(0, hasta1.indexOf(":"));
            hasta1_min = hasta1.substring(hasta1.indexOf(":") + 1, hasta1.indexOf(":") + 3);
        }

        if (desde2.indexOf(":") == -1) { desde2_min = 0 } else {
            desde2 = desde2.substring(0, desde2.indexOf(":"));
            desde2_min = desde2.substring(desde2.indexOf(":") + 1, desde2.indexOf(":") + 3);
        }

        if (hasta2.indexOf(":") == -1) { hasta2_min = 0 } else {
            hasta2 = hasta2.substring(0, hasta2.indexOf(":"));
            hasta2_min = hasta2.substring(hasta1.indexOf(":") + 1, hasta2.indexOf(":") + 3);
        }

        var abre1 = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), desde1, desde1_min);
        var cierra1 = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), hasta1, hasta1_min);
        var abre2 = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), desde2, desde2_min);
        var cierra2 = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), hasta2, hasta2_min);

        if (abre1 != 'invalid date' && ahora >= abre1 && ahora <= cierra1) {
            mensaje_horario = 'Abierto ahora';
            tipo_pill = 'success'
        } else if (abre2 != 'invalid date' && ahora >= abre2 && ahora <= cierra2) {
            console
            mensaje_horario = 'Abierto ahora';
            tipo_pill = 'success'
        } else {
            mensaje_horario = 'Cerrado en este momento';
            tipo_pill = 'secondary';
        }

        innerPopup = '<div><h5 style="color:#2a7fff;">Baño público <img src="./image/banio_publico.png" /> </h5> ';
        var nombre_bicicleteria = e.features[0].properties.nombre;
        if (nombre_bicicleteria != 'null') {
            innerPopup = innerPopup + '<b>Nombre: ' + nombre_bicicleteria + '</b><br>';
        }

        var direccion = e.features[0].properties.direccion;
        if (direccion != 'null') {
            innerPopup = innerPopup + '<b>Dirección: </b>' + direccion + '<br>';
        }
        var barrio = e.features[0].properties.barrio;
        if (barrio != 'null') {
            innerPopup = innerPopup + '<b>Barrio: </b>' + barrio + '<br>';
        }
        var localidad = e.features[0].properties.localidad;
        if (localidad != 'null') {
            innerPopup = innerPopup + '<b>Localidad: </b>' + localidad + '<br>';
        }

        var horario_lav = e.features[0].properties.lav_desde1;
        if (horario_lav != 'null') {
            innerPopup = innerPopup + '<br><b>Horarios </b><span class="badge badge-pill badge-' + tipo_pill + '">' + mensaje_horario + '</span>';
            innerPopup = innerPopup + '<br><b>Lunes a viernes: </b>de ' +
                e.features[0].properties.lav_desde1 + ' a ' + e.features[0].properties.lav_hasta1;
            if (e.features[0].properties.lav_desde2 != 'null') {
                innerPopup = innerPopup + ' y de ' + e.features[0].properties.lav_desde2 + ' a ' + e.features[0].properties.lav_hasta2;
            }
            innerPopup = innerPopup + ' hs.<br>';
        }
        var horario_sab = e.features[0].properties.sab_desde1;
        if (horario_sab != 'null') {
            innerPopup = innerPopup + '<b>Sábados: </b>de ' +
                e.features[0].properties.sab_desde1 + ' a ' + e.features[0].properties.sab_hasta1;
            if (e.features[0].properties.sab_desde2 != 'null') {
                innerPopup = innerPopup + ' y de ' + e.features[0].properties.sab_desde2 + ' a ' + e.features[0].properties.sab_hasta2;
            }
            innerPopup = innerPopup + ' hs.<br>';
        }
        var horario_dom = e.features[0].properties.dom_desde1;

        if (horario_dom != 'null') {
            innerPopup = innerPopup + '<b>Domingos: </b>de ' +
                e.features[0].properties.dom_desde1 + ' a ' + e.features[0].properties.dom_hasta1;
            if (e.features[0].properties.dom_desde2 != 'null') {
                innerPopup = innerPopup + ' y de ' + e.features[0].properties.dom_desde2 + ' a ' + e.features[0].properties.dom_hasta2;
            }
            innerPopup = innerPopup + ' hs.<br>';
        }

        var id = e.features[0].properties.id;
        innerPopup = innerPopup + '<br><button class="btn btn-success btn-sm" onclick="corroborar(\'Baño público\',\'' + direccion + '\',\'' + id + '\')">Modificar o validar información</button></div>';

        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(innerPopup)
            .addTo(map);
    });

    // Change the cursor to a pointer when the mouse is over the states layer.
    map.on('mouseenter', 'taller', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'taller', function () {
        map.getCanvas().style.cursor = '';
    });

    // Change the cursor to a pointer when the mouse is over the states layer.
    map.on('mouseenter', 'gomeria', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'gomeria', function () {
        map.getCanvas().style.cursor = '';
    });

    // Change the cursor to a pointer when the mouse is over the states layer.
    map.on('mouseenter', 'venta_bicicleta', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'venta_bicicleta', function () {
        map.getCanvas().style.cursor = '';
    });

    // Change the cursor to a pointer when the mouse is over the states layer.
    map.on('mouseenter', 'alquiler_bicicleta', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'alquiler_bicicleta', function () {
        map.getCanvas().style.cursor = '';
    });

    // Change the cursor to a pointer when the mouse is over the states layer.
    map.on('mouseenter', 'estacionamiento', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'estacionamiento', function () {
        map.getCanvas().style.cursor = '';
    });

    // Change the cursor to a pointer when the mouse is over the states layer.
    map.on('mouseenter', 'playa_estacionamiento', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'playa_estacionamiento', function () {
        map.getCanvas().style.cursor = '';
    });

    // Change the cursor to a pointer when the mouse is over the states layer.
    map.on('mouseenter', 'ciclovia', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'ciclovia', function () {
        map.getCanvas().style.cursor = '';
    });

    // Change the cursor to a pointer when the mouse is over the states layer.
    map.on('mouseenter', 'estacion_de_servicio', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'estacion_de_servicio', function () {
        map.getCanvas().style.cursor = '';
    });

    // Change the cursor to a pointer when the mouse is over the states layer.
    map.on('mouseenter', 'banio_publico', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'banio_publico', function () {
        map.getCanvas().style.cursor = '';
    });

    encendido = function encendido(x) {

        y = document.getElementById('icono_' + x);

        $(y).toggle();

        var visibility = map.getLayoutProperty(x, 'visibility');

        // toggle layer visibility by changing the layout object's visibility property
        if (visibility === 'visible') {
            map.setLayoutProperty(x, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(x, 'visibility', 'visible');
        }
    };
    abrir_tooltip = function abrir_tooltip() {
        $("#boton_capas").tooltip({ title: "Clic para encender capas", placement: "right", delay: { show: 1500, hide: 200 } });
        $("#relevar").tooltip({ title: "Sumá datos al mapa", placement: "right", delay: { show: 1500, hide: 200 } });

        prender_tooltip = function prender_tooltip() {
            $("#boton_capas").tooltip('show');
            $("#relevar").tooltip('show');
        };

        setTimeout(prender_tooltip, 2000);

        apagar_tooltip = function apagar_tooltip() {
            $("#boton_capas").tooltip('hide');
            $("#relevar").tooltip('hide');
        };

        setTimeout(apagar_tooltip, 10000);


    };

    abrir_tooltip();


    corroborar = function corroborar(x, y, z) {

        array_corroborar.push([x, y, z]);
        $("#capa_corroborar").text(x);
        $("#elemento_corroborar").text(y);
        $("#relevamiento_corroborar").show();
        contador_corroborar = contador_corroborar + 1;
    }

    relevar_corroborar = function relevar_corroborar() {

        var contacto_corroborar = $("#contacto_corroborar").val();
        var contenido_corroborar = $("#contenido_corroborar").val();
        var n = contador_corroborar - 1;
        
        $("#contacto_corroborar").empty();
        $("#contenido_corroborar").empty();
        $("#relevamiento_corroborar").hide();
        var value = {
            "capa_corroborar": array_corroborar[n][0],
            "identificador_corroborar": array_corroborar[n][1],
            "id_corroborar": array_corroborar[n][2],            
            "contenido_corroborar": contenido_corroborar,
            "contacto_corroborar": contacto_corroborar,
        };

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://alcaldia-bici-salta-be48b.firebaseio.com/talleres.json", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(
            value
        ));

        $("#relevamiento_respuesta").show();
    }

});