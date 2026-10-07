
const CONFIG={
  friendName:"Sylvia",
  giftMessage:"You deserve a day full of cake, laughter, tiny happy moments and lots of love. 💕",
  memories:[
    {icon:"🌸",front:"The first photo",back:"Memory1.jpg"},
    {icon:"📸",front:"That one dinner",back:"Memory3.jpg"},
    {icon:"🐧",front:"A SYLLY memory",back:"Memory2.jpg"},
    {icon:"✨",front:"That special friendship",back:"Memory4.jpg"},
    {icon:"💗",front:"A favourite memory 😜",back:"Memory5.jpg"},
    {icon:"🌷",front:"Last year's birthday",back:"Memory6.jpg"},
    {icon:"🫶",front:"A tiny happy moment with special people",back:"Memory7.jpg"},
    {icon:"🎀",front:"Just because you're qt",back:"Memory8.jpg"},
    {icon:"💛💛",front:"Tanmay's favv",back:"Memory9.jpg"},
    {icon:"🌻",front:"फूल's",back:"Memory10.jpg"}
]
};

function burstConfetti(count=100){
  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduced)return;
  const box=document.querySelector("#confetti");
  if(!box)return;
  const colors=["#f5a9c4","#8fcfee","#b9a0e8","#f8d98b","#a7d9b4","#fff"];
  for(let i=0;i<count;i++){
    const p=document.createElement("span");
    p.className="piece";
    p.style.left=Math.random()*100+"%";
    p.style.background=colors[Math.floor(Math.random()*colors.length)];
    p.style.setProperty("--drift",(Math.random()*240-120)+"px");
    p.style.setProperty("--fall",(2.4+Math.random()*2.4)+"s");
    p.style.animationDelay=Math.random()*.3+"s";
    box.appendChild(p);
    setTimeout(()=>p.remove(),5200);
  }
}

function setupName(){
  document.querySelectorAll(".friend-name,.data-name").forEach(x=>x.textContent=CONFIG.friendName);
  const final=document.querySelector("#finalName");
  if(final)final.textContent=`Happy Birthday, ${CONFIG.friendName}! ❤️`;
}
function setupMemoryCards(){

  const grid = document.querySelector("#memoryGrid");

  if(!grid) return;

  CONFIG.memories.forEach(m => {

    const c = document.createElement("div");

    c.className = "memory";
    c.tabIndex = 0;

    c.innerHTML = `
      <div class="memory-inner">
        <div class="face front">
          <div class="icon">${m.icon}</div>
          <strong>${m.front}</strong>
        
        </div>
      </div>
    `;

    c.onclick = () => openMemory(m.back);

    c.onkeydown = e => {
      if(e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openMemory(m.back);
      }
    };

    grid.appendChild(c);

  });
}
function setupGift(){
  const gift=document.querySelector("#gift");
  if(!gift)return;
  const open=()=>{
    if(gift.classList.contains("open"))return;
    gift.classList.add("open");
    document.querySelector("#giftMessage").classList.add("show");
    burstConfetti(55);
  };
  gift.onclick=open;gift.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();open()}};
}
setupName();setupMemoryCards();setupGift();
const memoryPopup = document.getElementById("memoryPopup");
const popupImage = document.getElementById("popupImage");
const popupClose = document.getElementById("popupClose");

function openMemory(image) {

    popupImage.src = image;

    memoryPopup.classList.add("active");
}

function closeMemory() {

    memoryPopup.classList.remove("active");

    popupImage.src = "";
}

popupClose.addEventListener("click", closeMemory);

memoryPopup.addEventListener("click", function(event) {

    if (event.target === memoryPopup) {
        closeMemory();
    }

});

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        closeMemory();
    }

});