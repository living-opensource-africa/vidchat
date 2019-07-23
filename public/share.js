var shareScreen = document.querySelector("#shareScreen")

async function shareMyScreen() {
    {
        try {
            let screenFeeds = await navigator.mediaDevices.getDisplayMedia({
                video: true
            })
            shareScreen.srcObject = screenFeeds;
            }
        catch( err ) {
                console.error('Error: '+ err);
            }
    }
}

function shareBtn() {
    shareMyScreen();
}

function stopSharing() {
    shareScreen.srcObject = null;
}