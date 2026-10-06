
const CONFIG={
  friendName:"[FRIEND'S NAME]",
  giftMessage:"You deserve a day full of cake, laughter, tiny happy moments and lots of love. 💕",
  memories:[
    {icon:"🌸",front:"A little moment",back:"Memory1.jpg"},
    {icon:"📸",front:"That one day",back:"Memory2.jpg"},
    {icon:"🐧",front:"A SYLLY memory",back:"Memory3.jpg"},
    {icon:"✨",front:"Something special",back:"Memory4.jpg"},
    {icon:"💗",front:"A favourite memory",back:"Memory5.jpg"},
    {icon:"🌷",front:"One of those days",back:"Memory6.jpg"},
    {icon:"🫶",front:"A tiny happy moment",back:"Memory7.jpg"},
    {icon:"🎀",front:"Just because",back:"Memory8.jpg"}
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
  const grid=document.querySelector("#memoryGrid");
  if(!grid)return;
  CONFIG.memories.forEach(m=>{
    const c=document.createElement("div");
    c.className="memory";c.tabIndex=0;
    c.innerHTML=`<div class="memory-inner"><div class="face front"><div class="icon">${m.icon}</div><strong>${m.front}</strong><small>tap to reveal</small></div><div class="face back"><img src="${m.back}" alt="${m.front}"></div></div>`;
    const flip=()=>c.classList.toggle("flipped");
    c.onclick=flip;c.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();flip()}};
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
