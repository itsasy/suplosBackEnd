function buscador() {
    $('#submitButton').click(function (e) {
        e.preventDefault();
        let listado = '';
        let imagenUrl = '/img/home.jpg';
        let contador = document.getElementById('contador');
        let resultadoBusqueda = document.getElementById('resultadosBusqueda');
        let rangoPrecios = $('#rangoPrecio').val();
        rangoPrecios = rangoPrecios.split(';');
        let ciudad = $('#selectCiudad').val();
        let tipo = $('#selectTipo').val();

        $.getJSON('/data-1.json', function (data) {
            let bienesFiltrados = data.filter(dato => {
                let precio = dato.Precio.replace('$', '');
                if (dato.Tipo === tipo && dato.Ciudad === ciudad && (precio >= rangoPrecios[0] && precio <= rangoPrecios[1])) {
                    resultadoBusqueda.innerHTML = '';
                    return listado += `
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
                }
            })

            resultadoBusqueda.innerHTML = listado;
            contador.innerHTML = bienesFiltrados.length;
        })
    })
}

buscador();
