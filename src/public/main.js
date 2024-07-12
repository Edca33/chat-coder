console.log('Js del cliente')
const title = document.querySelector('#title-welcome');
const chatBox = document.querySelector('#send');
const socket = io();
let user = '';

Swal.fire({
    title:'Ingrese un nombre',
    input: 'text',
    text: 'Para ingresar al chat identificarse',
    allowOutsideClick: false,
    inputValidator: (value) => {
        return !value && 'No ingresas al chat sin nombre😡'
    }
}).then((result)=>{
    console.log(result.value) 
    user = result.value
    title.innerText = 'Te has unido al chat ' + user
    Toastify({
        text: "Se ha unido el usuario " + user,
        position: 'right',
        duration: 3000
        }).showToast();
    socket.emit('newUsers',{ user });
})


chatBox.addEventListener('keyup',(event) => {
    if(event.key === 'Enter'){
        console.log('HOLA')
        socket.emit('mensaje',{ user, mensaje: event.target.value })
        chatBox.value = ''
    }
})

socket.on('conversacion',(data) => {
    const contenedorChat = document.querySelector('#contenedor-chat');
    contenedorChat.innerHTML = ''
    data.forEach(chat => {
        const div = document.createElement('div');
        const nombre = document.createElement('p');
        const mensaje = document.createElement('p');
        nombre.innerText = chat.user + ': ';
        nombre.classList.add('bold_name');
        mensaje.innerText = chat.mensaje;
        div.appendChild(nombre);
        div.appendChild(mensaje);
        contenedorChat.appendChild(div);
    })     
})
