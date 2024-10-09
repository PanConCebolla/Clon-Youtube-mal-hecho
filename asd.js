const express = require('express'); // Permite crear el servidor
const http = require('http') // Permite trabajar en un entorno web
const socketIo = require ('socket.io') // Importa el modulo de socket.io

const app = express ();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));// permite trabajar con el front end

const users = new Map(); // Guardar usuarios activos.... Maps = array / vector (conceptualmente)

io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');

    socket.on('new user', (username) =>{
        users.set(socket.id, username);
        socket.broadcast.emit('user connected', username);
    });
   
    socket.on('chat message', (data) => {//data <- msg

        const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false });//los "[]" agarra la zona horaria de tu pc
        const messageData = {...data, time};

        if (data.to){
            const recipientSocketId = [...users.entries()].find(([id, name]) => name === data.to)?.[0];
                if(recipientSocketId){
                    socket.to(recipientSocketId).emit('chat message', messageData);
                }
        } else {
            io.emit('chat message', messageData);
        }      //io.emit('chat message', messageData)//messageData <- msg
    });//genera la conexion y desconexion, ademas de establecer el proceso de envio de mensaje

    socket.on('disconnect', () => {
        const username = users.get(socket.id);
        if (username){
            io.emit('user disconnected', username);
            users.delete(socket.id);
        }   //console.log('Un usuario se ha desconectado');
    });
});
//Fin lógica chat

//Inicio lógica servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

//Fin lógica servidor






/*
//Actividad 1
let n1 = 2;
let n2 = 4;
//determinar si el n1 es mayor o no
document.write(`Actividad 1<br/><br/>`);

if (n1 > n2){
    document.write(`el número ${n1} es más grande`);
} else if (n1 == n2){
    document.write(`los números son iguales`)
} else{
    document.write(`el número ${n2} es más grande`)
}

*/





/*
//Actividad 2
document.write(`<br/><br/><br/><br/>Actividad 2<br/>`);

let base = 3; //base
let altura = 5; //altura
let hipotenusa = 10; //hipotenusa
//las weas para sacar lo que pide la actividad
var area = base * altura;
var perimetro = base + altura + hipotenusa;

document.write(`<br/>la base del triángulo es: ${base}`)
document.write(`<br/>el perímetro del triángulo es: ${perimetro}`)
*/




/*
//Actividad 3
document.write(`<br/><br/><br/><br/>Actividad 3<br/>`);

var mes = 4;
switch (mes){
    case 1: document.write("Enero"); break;
    case 2: document.write("Febrero"); break;
    case 3: document.write("Marzo"); break;
    case 4: document.write("Abril"); break;
    case 5: document.write("Mayo"); break;
    case 6: document.write("Junio"); break;
    case 7: document.write("Julio"); break;
    case 8: document.write("Agosto"); break;
    case 9: document.write("Septiembre"); break;
    case 10: document.write("Octubre"); break;
    case 11: document.write("Noviembre"); break;
    case 12: document.write("Diciembre"); break;
}
*/





/*
//Leer un txt
const fs = require('fs');

//FS = FileSystem

fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error al leer el archivo:', err);
        return;
    }
    console.log('Contenido del archivo:', data);
});
*/



/*
//Escribir en un archivo txt
const fs = require('fs');

// Contenido que queremos escribir en el archivo
const contenido = 'Clase 04-09-2024 ';

// Usamos fs.writeFile para crear (o sobrescribir) un archivo
fs.writeFile('registroIFTS.txt', contenido, 'utf8', (err) => {
    if (err) {
        console.error('Error al crear o escribir en el archivo:', err);
        return;
    }
    console.log('Archivo creado y guardado exitosamente.');
});
*/