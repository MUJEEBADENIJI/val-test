// --- element references ---
const loader = document.querySelector(".loader");
const questionContainer = document.getElementById("questionContainer");
const valVideo = document.getElementById("valVideo");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const videoContainer = document.getElementById("videoContainer");

let noCount = 0;
const noTexts = [
  "Are you sure?",
  "But I love you babe",
  "Please say yes",
  "baby pls 😢",
  "my love 💖",
  "you won't dare"
];

const scaleClasses = ["big-1","big-2","big-3","big-4","big-5","big-6"];

// --- loader functions ---
function hideLoader() {
  loader.style.transition = "opacity 0.5s ease";
  loader.style.opacity = 0;
  setTimeout(() => loader.classList.add("hidden"), 500);
}

function waitForMedia(imageEl, videoEl, callback) {
  let loaded = 0;
  function checkDone() {
    loaded++;
    if (loaded === 2) callback();
  }
  imageEl.onload = checkDone;
  imageEl.onerror = checkDone;
  videoEl.onloadeddata = checkDone;
  videoEl.onerror = checkDone;
}

// wait for image + video AND ensure minimum 7s loader
function initLoader() {
  if (!window.valData) return;
  const img = document.getElementById("val-img");
  const startTime = Date.now();

  img.src = window.valData.imageUrl;
  valVideo.src = window.valData.valVid;
  valVideo.pause(); // video won't autoplay

  waitForMedia(img, valVideo, () => {
    const elapsed = Date.now() - startTime;
    const remaining = 7000 - elapsed; // 7s minimum
    setTimeout(() => {
      hideLoader();
      questionContainer.classList.remove("hidden");
    }, remaining > 0 ? remaining : 0);
  });
}

// poll for valData
const loaderInterval = setInterval(() => {
  if (window.valData) {
    clearInterval(loaderInterval);
    initLoader();
  }
}, 200);

// --- yes/no button logic ---
noBtn.addEventListener("click", () => {
  if(noCount < noTexts.length){
    noCount++;
    scaleClasses.forEach(c => yesBtn.classList.remove(c));
    const scaleClass = scaleClasses[noCount-1] || scaleClasses[scaleClasses.length-1];
    yesBtn.classList.add(scaleClass);
    noBtn.textContent = noTexts[noCount-1];
  }
});

yesBtn.addEventListener("click", () => {
  if(window.valData && window.valData.valVid){
    questionContainer.classList.add("hidden");
    videoContainer.classList.remove("hidden");
    valVideo.play(); // play video only when yes is clicked
  } else {
    alert("Video not loaded yet.");
  }
});
