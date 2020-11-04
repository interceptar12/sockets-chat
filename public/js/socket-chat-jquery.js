let socket = io();

let params = new URLSearchParams(window.location.search);
let nombre = params.get('nombre');
let sala = params.get('sala');

// Referencias
let divUsuarios = document.getElementById('divUsuarios');
let formEnviar = document.getElementById('formEnviar');
let txtMensaje = document.getElementById('txtMensaje');
let divChatbox = document.getElementById('divChatbox');
let titulo = document.getElementById('titulo');

// Funciones para renderizar ususarios
function renderizarUsuarios(personas) {
    console.log(personas);

    let html = '';

    html += `<li>`;
    html += `    <a href="javascript:void(0)" class="active"> Chat de <span> ${params.get('sala')}</span></a>`;
    html += `</li>`;

    for (let i = 0; i < personas.length; i++) {
        html += `<li>`
        html += `    <a id='aPersonas' data-id="${personas[i].id}" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>${personas[i].nombre} <small class="text-success">online</small></span></a>`
        html += `</li>`
    }

    divUsuarios.innerHTML = html;
    titulo.innerHTML =`Sala de <small> ${params.get('sala')} </small>`;
}

function renderizarMensajes(mensaje, yo) {

    let html = '';
    let fecha = new Date(mensaje.fecha);
    let hora = fecha.getHours() + ':' + fecha.getMinutes();

    let adminClass = 'info';
    if (mensaje.nombre === 'Administrador') {
        adminClass = 'danger';
    }

    if (yo) {
        html += `<li class="reverse">`;
        html += `    <div class="chat-content">`;
        html += `        <h5>${mensaje.nombre}</h5>`;
        html += `        <div class="box bg-light-inverse">${mensaje.mensaje}</div>`;
        html += `    </div>`;
        html += `    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" />`;
        html += `    </div>`;
        html += `    <div class="chat-time">${hora}</div>`;
        html += `</li>`;
    } else {
        html += `<li class="animated fadeIn">`;
        if (mensaje.nombre !== 'Administrador') {
            html += `    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" />`;
        }
        html += `    </div>`;
        html += `    <div class="chat-content">`;
        html += `        <h5>${mensaje.nombre}</h5>`;
        html += `        <div class="box bg-light-${adminClass}">${mensaje.mensaje}</div>`;
        html += `    </div>`;
        html += `    <div class="chat-time">${hora}</div>`;
        html += `</li>`;
    }



    // Metodo para que se vaya insertando el contenido después de lo que hay
    divChatbox.insertAdjacentHTML("beforeend", html);
}

// Función para que al llegar un nuevo mensaje, se vaya hasta abajo y no se quede arriba el scroll
function scrollBottom(nombrePadre, nombreHijo) {

    let padre = $(`#${nombrePadre}`); //
    let totalHeight = 0;
    // console.log(padre.find(nombreHijo).length)
    padre.find(nombreHijo).each(function () {
        //console.log(`totalHeight: ${totalHeight} - $(this).outerHeight(): ${$(this).outerHeight()}`)
        totalHeight += $(this).outerHeight();
    });

    // padre.scrollTop(totalHeight); //el scroll siempre lleva al final del div

    $(`#${nombrePadre}`).animate({
        scrollTop: totalHeight
    }, 500); //animacion!

}


// Listeners
document.body.addEventListener('click', function (event) {

    if (event.target.id == 'aPersonas') {
        let id = event.target.attributes[1].value;
        if (id) {
            console.log(id);
        }
    }
});

formEnviar.addEventListener('submit', (e) => {
    e.preventDefault();
    if (txtMensaje.value.trim().length === 0) {
        return;
    }

    // Enviar información
    socket.emit('crearMensaje', {
        nombre: nombre,
        mensaje: txtMensaje.value
    }, function (mensaje) {
        txtMensaje.value = '';
        // El .focus() es para que el cursor se quedé ahí, en la caja de texto que deseamos
        txtMensaje.focus();
        renderizarMensajes(mensaje, true);
        scrollBottom('divChatbox', 'li');
    });
})
