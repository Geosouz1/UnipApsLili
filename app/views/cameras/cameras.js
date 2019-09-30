

const controls = document.querySelector('.controls');
const cameraOptions = document.querySelector('.video-options>select');
const video = document.querySelector('video');
const canvas = document.querySelector('canvas');
const screenshotImage = document.querySelector('img');
const buttons = [...controls.querySelectorAll('button')];
let streamStarted = false;
const socket = io();

const [play, pause, screenshot] = buttons;


const constraints = {
    audio: false,
    video: {
        width: {
            min: 600,
            ideal: 720,
            max: 1024,
        },
        height: {
            min: 800,
            ideal: 1024,
            max: 2048
        },
        facingMode: {
            exact: 'user'
        }
    }
};


const getCameraSelection = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(device => device.kind === 'videoinput');
    const options = videoDevices.map(videoDevice => {
        return `<option value="${videoDevice.deviceId}">${videoDevice.label}</option>`;
    });
    cameraOptions.innerHTML = options.join('');
};

play.onclick = () => {
    if (streamStarted) {
        video.play();
        play.classList.add('d-none');
        pause.classList.remove('d-none');
        return;
    }

    if ('mediaDevices' in navigator && navigator.mediaDevices.getUserMedia) {
        const updatedConstraints = {
            ...constraints,
            deviceId: {
                exact: cameraOptions.value
            }
        };
        startStream(updatedConstraints);
    }
};

const startStream = async (constraints) => {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleStream(stream);
};

const handleStream = (stream) => {
    video.srcObject = stream;
    play.classList.add('d-none');
    pause.classList.remove('d-none');
    screenshot.classList.remove('d-none');
    streamStarted = true;
};

getCameraSelection();

cameraOptions.onchange = () => {
    const updatedConstraints = {
        ...constraints,
        deviceId: {
            exact: cameraOptions.value
        }
    };
    startStream(updatedConstraints);
};

const pauseStream = () => {
    video.pause();
    play.classList.remove('d-none');
    pause.classList.add('d-none');
};

setInterval(() => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
     screenshotImage.src = canvas.toDataURL('image/webp');
     socket.emit('stream',canvas.toDataURL('image/webp'));
    screenshotImage.classList.remove('d-none');
},0.0001);
// const doScreenshot = () => {
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     canvas.getContext('2d').drawImage(video, 600, 400);
//      screenshotImage.src = canvas.toDataURL('image/webp');
//      socket.emit('stream',canvas.toDataURL('image/webp'));
//     screenshotImage.classList.remove('d-none');
// };

const videIo = () =>{
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 600, 400);
    socket.emit('stream',canvas.toDataURL('image/webp'));
}


pause.onclick = pauseStream;
screenshot.onclick = doScreenshot;


    setInterval(function(){ doScreenshot }, 110);
 