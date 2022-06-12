/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function (callback, timeout) {
    $(this).scroll(function () {
        var $this = $(this);
        if ($this.data('scrollTimeout')) {
            clearTimeout($this.data('scrollTimeout'));
        }
        $this.data('scrollTimeout', setTimeout(callback, timeout));
    });
};

/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider() {
    $("#rangoPrecio").ionRangeSlider({
        type: "double",
        grid: false,
        min: 0,
        max: 100000,
        from: 200,
        to: 80000,
        prefix: "$"
    });
}

/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll() {
    var ultimoScroll = 0,
        intervalRewind;
    var video = document.getElementById('vidFondo');
    $(window)
        .scroll((event) => {
            var scrollActual = $(window).scrollTop();
            if (scrollActual > ultimoScroll) {

            } else {
                //this.rewind(1.0, video, intervalRewind);
                video.play();
            }
            ultimoScroll = scrollActual;
        })
        .scrollEnd(() => {
            video.pause();
        }, 10)
}

function obtenerCiudades() {
    let ciudades = [];
    $.getJSON('/data-1.json', function (datos) {
        $.each(datos, function (key, elemento) {
            if (!(ciudades.includes(elemento.Ciudad))) {
                ciudades.push(elemento.Ciudad);
                $('#selectCiudad').append(`
                    <option value='${elemento.Ciudad}'> ${elemento.Ciudad}</option>
                `)
            }
        })
    });
}

function obtenerTipos() {
    let tipos = [];
    $.getJSON('/data-1.json', function (datos) {
        $.each(datos, function (key, elemento) {
            if (!(tipos.includes(elemento.Tipo))) {
                tipos.push(elemento.Tipo);
                $('#selectTipo').append(`
                    <option value='${elemento.Tipo}'> ${elemento.Tipo}</option>
                `)
            }
        })
    })
}

function obtenerBienesDisponibles() {
    var listado = '';
    var imagenUrl = '/img/home.jpg';
    var resultadosBusqueda = document.getElementById('resultadosBusqueda');
    let cont = 0;

    $.getJSON('./data-1.json', function (datos) {
        $.each(datos, function (key, dato) {
            listado += `
                <div class="lista">
                     <div class="contenedorImagen">
                        <img src="${imagenUrl}" alt="registroImagen">
                     </div>
                     <div class="contenedorDetalle">
                        <ul class="detalles">
                            <li>Dirección: <span>${dato.Direccion}</span></li>
                            <li>Cidudad: <span>${dato.Ciudad}</span></li>
                            <li>Teléfono: <span>${dato.Telefono}</span></li>
                            <li>Código postal: <span>${dato.Codigo_Postal}</span></li>
                            <li>Tipo: <span>${dato.Tipo}</span></li>
                            <li>Precio: <span>${dato.Precio}</span></li>
                        </ul>
                        
                        <div class="contenedorBotones">
                            <button class="botonVerde botonEliminar">
                                Eliminar
                            </button>
                            <button class="botonVerde botonEditar">
                                Guardar
                            </button>
                        </div>
                     </div>
                </div>
        `;
        })

        resultadosBusqueda.innerHTML = listado;
    });
}

inicializarSlider();
playVideoOnScroll();
obtenerCiudades();
obtenerTipos();
obtenerBienesDisponibles();