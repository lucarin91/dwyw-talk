// var express = require('express');
// var http = require('http');
// var socketIo = require('socket.io');
// var app = express();

// // facciamo partire il server sulla porta 8080
// var server = http.createServer(app);
// var io = socketIo.listen(server);
// server.listen(8080);

// // TODO: rimuovimi
// //app.use(express.static(__dirname + '/public'));

// console.log("Server running on 127.0.0.1:8080");
// var drawings = [];
// var users = {};

// function emitNewDrawing(socket, drawing) {
//     socket.emit('new_drawing', drawing);
// }

// // event-handler for new incoming connections
// io.on('connection', function (socket) {

//     //Un utente si è appena collegato e ci comunica il suo username
//     socket.on('login', function (data) {

//         //Aggiungo un nuovo utente alla lista degli utenti...

//         if(users[data.username] === undefined)
//         {
//             users[data.username] = {
//                 username: data.username,
//                 points: 0,
//                 avatar: data.avatar,
//                 avatar_color: data.avatar_color
//             };

//             console.log("Nuovo utente connesso: " + data.username);
            
//             socket.emit('login_success', users[data.username]);

//             //invio la lista degli utenti
//             io.emit('users_list', users);

//             //Quando un utente si collega per la prima volta invio tutti i disegni
//             for (var key in drawings) {
//                 var drawing = drawings[key];
            
//                if(drawing.is_guessed)
//                     continue;

//                 emitNewDrawing(socket, drawing);

//                 for (var i in drawing.line_history) {
//                     socket.emit('draw_line', { line: drawing.line_history[i], uuid: drawing.uuid });
//                 }
//             }
//         }
//         else
//             socket.emit('username_already_taken');

//     });
 
//     //L'utente ha disegnato una linea, memorizziamola e mandiamola a tutti
//     socket.on('draw_line', function (data) {
        
//         console.log("draw_line data: ", data);
//         //memorizziamola
//         var d = drawings[data.uuid];
//         if (d === undefined) {
//             d = {
//                 uuid: data.uuid,
//                 line_history: [],
//                 guessed_by: null,
//                 is_finished: false,
//                 is_guessed: false,
//                 author: data.author
//             };

//             emitNewDrawing(io, d);
//         }
//         d.line_history.push(data.line);

//         //invio a tutti i client collegati la nuova linearaw
//         io.emit('draw_line', { line: data.line, uuid: data.uuid });
//         drawings[data.uuid] = d;
//     });

//     //L'utente ha finito un disegno
//     socket.on('finish_drawing', function (data) {
//         drawings[data.uuid].is_finished = true;
//         drawings[data.uuid].word = data.word;

//         //comunico che il disegno è stato completato
//         io.emit('finished_drawing', data);
//     });

//     socket.on('guess_drawing', function (data) {
//         var drawing = drawings[data.uuid];

//         console.log("guess_drawing", data);

//         //controlli di sicurezza ;)
//         if (drawing.is_finished &&
//             drawing.guessed_by == null &&
//             drawing.word.toUpperCase() == data.word.toUpperCase() && 
//             drawing.author != data.username ) {
            
//             drawing.guessed_by = data.username;

//             // assegno 1 punto per ogni lettera al giocatore che indovina,
//             // 2 punti ogni lettera al giocatore che ha proposto il disegno
//             users[data.username].points += 1 * data.word.length;
//             users[drawing.author].points += 2 * data.word.length;

//             console.log("users[data.username].points", users[data.username].points);
//             console.log("users[drawing.author].points",users[drawing.author].points);

//             //invio la nuova lista di utenti, è una demo...
//             io.emit('users_list', users);

//             io.emit('guessed_drawing', {
//                 uuid: data.uuid,
//                 guessed_by: data.username,
//                 word: data.word
//             });
//         }
//     });
// });