var name;
var connectedUser;

var connection = new WebSocket('wss://127.0.0.1:8443');

connection.onopen = () => {
    console.log('Successfully connected to signaling server');
}

connection.onmessage = (msg) => {
    console.log('Got message: ', msg.data);
    var data = JSON.parse(msg.data);

    switch(data.type) {
        
        case 'login':
        handleLogin(data.success);
        break;

        //handling offscreenBuffering, when someone wants to call
        case 'offer':
        handleOffer(data.offer, data.name);
        break;

        //Handling answer, when we want to answer
        case 'answer':
        handleAnswer(data.answer);
        break;

        //REmote peer sending an ICE candidate
        case 'candidate':
        handleCandidate(data.candidate);
        break;

        //Cancelling a call
        case 'leave':
        handleLeave();
        break;

        //Default action, when all else fails
        default:
        break;
    }

}

    //When something doent work out
    connection.onerror = (err) => {
        console.log('Ooops!, got error ', err);
    }

    //When connection to server closes
    connection.onclose = (evt) => {
        console.log('WebSocket is now closed!')
    }

    //Function used for sending JSON encoded messages

    function send(message) {
        //Start by attaching the other user to our peer connection
        if (connectedUser) {
            message.name = connectedUser;
        }
        connection.send(JSON.stringify(message));
    }

/* 
UI Selector
*/

var loginPage = document.querySelector('#loginPage');
var usernameInput = document.querySelector('#usernameInput');
var loginBtn = document.querySelector('#loginBtn');
var callPage = document.querySelector('#callPage');
var callToUsernameInput = document.querySelector('#callToUsernameInput');
var callBtn = document.querySelector('#callBtn');
var hangUpBtn = document.querySelector('#hangUpBtn');
var localVideo = document.querySelector('#localVideo');
var remoteVideo = document.querySelector('#remoteVideo');
var stream;
var yourConn;

//Hide callPage by default

callPage.style.display = 'none';

//Attempt login when user clisk login ntn
loginBtn.addEventListener('click', (evt) => {
    var name = usernameInput.value;
    if (name.length > 0) {
        send({
            type: 'login',
            name: name
        });
    }
});

function handleLogin(success) {
    if (success === false) {
        alert("Please try a different user name. That one is taken.");
    }
    else {
        loginPage.style.display = 'none';
        callPage.style.display = 'block';

        //Establishing a peer connection
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then(
            (vidStream) => {
                stream  = vidStream;
                //Push the stream data to the video link
                localVideo.srcObject=stream;
    
                //Configuration to use google STUN Servers
                var configuration = {
                    "iceServers": [{ "url": "stun:stun2.1.google.com:19302" }]
                }
    
                yourConn = new RTCPeerConnection(configuration)
    
                //Setup a stream for peers to connect to
                yourConn.addStream(stream)
    
                //When a remote user adds their stream to ours, we display it
                yourConn.onaddstream = (evt) => {
                    remoteVideo.srcObject=e.stream;
                }
    
                //Setup ice handling
                yourConn.onicecandidate = (e) => {
                    if (e.candidate) {
                        send({
                            type: 'candidate',
                            candidate: e.candidate
                        })
                    }
                }
    
            }
        ).catch(
            console.error
        );
    }
}


callBtn.addEventListener('click', () => {
    var callToUsername = callToUsernameInput.value;

    if (callToUsername.length > 0) {
        connectedUser = callToUsername;
        
        //Create an offer
        yourConn.createOffer((offer) => {
            send({
                type: 'offer',
                type: offer
            });

            yourConn.setLocalDescription(offer);
        }, (error) => {
            console.log('Oops!, something went wrong: ', error);
        })
    }
});


//When somebody sends an offer
function handleOffer(offer, name) {
    connectedUser = name;

    yourConn.setRemoteDescription(new RTCSessionDescription(offer));

    //Create an answer to an offer
    yourConn.createAnswer((answer) => {
        yourConn.setLocalDescription(answer);
        send({
            type: 'answer',
            answer: answer
        });   
    }, (error) => {
        console.log('My bad, ', error);
    })
}

//How to handle an answer from a remote peer
function handleAnswer(answer) {
    yourConn.setRemoteDescription(new RTCSessionDescription(answer));
}

//Handle a peer when we got ICE
function handleCandidate(candidate) {
    yourConn.addIceCandidate(new RTCIceCandidate(candidate));
}

hangUpBtn.addEventListener('click', () => {
    send({
        type: 'leave'
    })

    handleLeave();
})

function handleLeave() {
    connectedUser = null;
    remoteVideo.srcObject = null;
    yourConn.close();
    yourConn.onicecandidate = null;
    yourConn.onaddstream = null;
}

