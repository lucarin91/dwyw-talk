//Ugly globals...
var socket = null;
var myUuid = uuid.v4();
var myUsername = uuid.v4();
// la lista degli utenti attivi...
var users = {};

var mouse;
var canvas;
var context;

function appendCanvas(id, currentDrawing) {

    var div = document.createElement('div');
    div.id = "div_" + id;

    var canv = document.createElement('canvas');
    canv.id = 'drawing_'+id;
    canv.classList.add('canvas');
    document.body.appendChild(canv);
    canv.setAttribute('width', '400'); // clears the canvas
    canv.setAttribute('height', '400'); // clears the canvas

    div.appendChild(canv);

    var drawingWord = document.createElement('input');
    drawingWord.type = "text";
    drawingWord.id = "word_" + id;
    div.appendChild(drawingWord);

    if (currentDrawing) {
        var sendButton = document.createElement('input');
        sendButton.value = "Finisci disegno";
        sendButton.type = "button";
        sendButton.onclick = function () {
            socket.emit('finish_drawing',
                {
                    uuid: id,
                    is_finished: true,
                    author: myUsername,
                    word: drawingWord.value
                }
            );

            //deregistro gli handler
            canv.onmousemove = null;
            canv.onmousedown = null;
            canv.onmouseup = null;

            //nascondo controlli non più necessari
            drawingWord.classList.add('im-the-invisible-man');
            sendButton.classList.add('im-the-invisible-man');

            //aggiungo un nuovo canvas per il disegno
            myUuid = uuid.v4(); 
            appendCanvas(myUuid, true);
        };

        div.appendChild(sendButton);
        document.body.insertBefore(div, document.body.childNodes[2]);
        initializeCanvasForDrawing();
    }
    else
    {

        canv.classList.add('not-so-visible');

        var guessButton = document.createElement('input');
        guessButton.value = "Indovina";
        guessButton.type = "button";
        guessButton.onclick = function () {
            socket.emit('guess_drawing',
                {
                    uuid: id,
                    username: myUsername,
                    word: drawingWord.value
                }
            );
        };

        div.appendChild(guessButton);
        document.body.appendChild(div);
    }
}

function appendUsers(users)
{
    var usersListContainer = document.getElementById('users-list');
    usersListContainer.innerHTML = "";

    for (var key in users) {
        var user = users[key];
        var userDiv = document.createElement('div');
        userDiv.innerHTML = '<p>User: '+user.username+' Points: '+user.points+'</p>';
        usersListContainer.appendChild(userDiv);
    }
}

function initializeCanvasForDrawing()
{
    mouse = {
        click: false,
        move: false,
        pos: { x: 0, y: 0 },
        pos_prev: false
    };

    // get canvas element and create context
    canvas = document.getElementById('drawing_'+myUuid);
    context = canvas.getContext('2d');

    // register mouse event handlers
    canvas.onmousedown = function (e) { mouse.click = true; };
    canvas.onmouseup = function (e) { mouse.click = false; };
    canvas.onmousemove = function (e) {
        //http://stackoverflow.com/questions/1114465/getting-mouse-location-in-canvas
        mouse.pos.x = (e.clientX - (canvas.offsetLeft - window.pageXOffset)) / canvas.width;
        mouse.pos.y = (e.clientY - (canvas.offsetTop - window.pageYOffset)) / canvas.height;
        mouse.move = true;
    }
}

document.addEventListener("DOMContentLoaded", function () {

    document.getElementById('myUsername').innerHTML = myUsername;
    appendCanvas(myUuid, true);

    //connessione al server
    socket = io.connect();

    socket.emit('login', { username: myUsername, avatar: 'beer', avatar_color: '#ccc' })

    // draw line received from server
    socket.on('draw_line', function (data) {
        var theUuid = data.uuid;
        var line = data.line;

        if (document.getElementById('drawing_'+theUuid) === null)
            appendCanvas(theUuid);

        var theCanvas = document.getElementById('drawing_'+theUuid);
        var theContext = theCanvas.getContext('2d');
        var width = theCanvas.width;
        var height = theCanvas.height;

        theContext.beginPath();
        theContext.moveTo(line[0].x * width, line[0].y * height);
        theContext.lineTo(line[1].x * width, line[1].y * height);

        theContext.strokeStyle = "red";
        theContext.stroke();
    });

    socket.on('remove_drawing', function (data) {
        document.body.removeChild(document.getElementById("div_" + data.uuid));
    });

    socket.on('finished_drawing', function(data){
        var d = document.getElementById('drawing_'+data.uuid);
        d.classList.remove('not-so-visible');
    });

    socket.on('guessed_drawing', function(data) {
        var d = document.getElementById('drawing_'+data.uuid);
        d.classList.add('guessed');
    });

    socket.on('users_list', function(data) {
        appendUsers(data); //data = usersList...
        console.log("received users_list", data);
    });

    // main loop, running every 25ms
    function mainLoop() {
        // check if the user is drawing
        if (mouse.click && mouse.move && mouse.pos_prev) {
            // send line to to the server
            socket.emit('draw_line', { line: [mouse.pos, mouse.pos_prev], uuid: myUuid, author: myUsername});
            mouse.move = false;
        }
        mouse.pos_prev = { x: mouse.pos.x, y: mouse.pos.y };
        setTimeout(mainLoop, 25);
    }

    mainLoop();
});