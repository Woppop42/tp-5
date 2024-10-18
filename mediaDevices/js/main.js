const liste = document.getElementById("mediaD");
const videoDisplay = document.getElementById('videoElement');
const screenshot = document.getElementById('screenshot');
const btn = document.getElementById('btnSc');

const constraints = {
  audio: false,
  video: true,
};

navigator.mediaDevices
    .enumerateDevices()
    .then((devices) => {
      devices.forEach((device) => {
        const option = document.createElement("option");
        option.value = device.label;
        option.textContent = device.label;
        liste.appendChild(option);
        console.log(`${device.kind}: ${device.label} id = ${device.deviceId}`);
      });
    })
    .catch((err) => {
      console.error(`${err.name}: ${err.message}`);
    });

liste.addEventListener('change', async () => {
    const flux = await navigator.mediaDevices.getUserMedia(constraints);
    console.log(flux);
    videoDisplay.srcObject = flux;
    btn.disabled = false;    
})
function captureEcran()
{
    const stream = videoDisplay.srcObject;
    const track = stream.getVideoTracks()[0];
    const snap = new ImageCapture(track);
    snap.takePhoto()
    .then((blob => {
            const url = URL.createObjectURL(blob);
            screenshot.disabled = false;
            screenshot.src = url;
    }))
    .catch((err) => {
        console.log(err);
    })
}

btn.addEventListener('click', captureEcran());



