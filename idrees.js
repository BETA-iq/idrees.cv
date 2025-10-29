const vid = document.getElementById('bgvid');
const img = document.getElementById('bgimg');
document.getElementById("anon-msg").addEventListener("click", async (e) => {
  e.preventDefault();
  const msg = prompt("type your message:");

  if (!msg || msg.trim() === "") return alert("لم يتم إرسال الرسالة.");

  try {
    const ipData = await fetch("https://ipapi.co/json/").then(res => res.json());
    const sessionId = crypto.randomUUID();
    const userAgent = navigator.userAgent;
    const time = new Date().toLocaleString();

    const embed = {
      username: "idrees.cv",
      avatar_url: "https://cdn.discordapp.com/avatars/1070343642667028560/6b2addb441c0e30929a9259322ed1f00.png?size=1024",
      embeds: [{
        title: "📩",
        color: 0x5865F2,
        fields: [
          { name: "الرسالة", value: msg },
          { name: "الجلسة", value: sessionId },
          { name: "البلد", value: ipData.country_name || "غير معروف", inline: true },
          { name: "المدينة", value: ipData.city || "غير معروف", inline: true },
          { name: "IP", value: ipData.ip || "غير معروف" },
          { name: "المتصفح", value: userAgent },
          { name: "التاريخ", value: time }
        ],
        footer: { text: "📡 Idrees.cv" },
        timestamp: new Date().toISOString()
      }]
    };

    await fetch("https://discord.com/api/webhooks/1433211232025972747/GXNHyjTspFK0LUFUCv6IGe0W8F0lOXg16wKEIN64mlZ6vvHzmT751ehybNDc6o5xNWNz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(embed)
    });

    alert("done sent <3");
  } catch (err) {
    console.error(err);
    alert("error");
  }
});

function useImageFallback() {
  if (vid) vid.remove();
  img.style.display = 'block';
}

vid?.addEventListener('error', useImageFallback);

(async () => {
  try {
    await vid?.play?.();
  } catch {
    useImageFallback();
  }
})();

const audio = document.getElementById('bg-audio');
const btn = document.getElementById('btn-audio');
const vol = document.getElementById('vol');
const volWrap = document.getElementById('vol-wrap');
const gate = document.getElementById('gate');
const savedVol = localStorage.getItem('vol') ?? '0.6';

audio.volume = parseFloat(savedVol);
vol.value = savedVol;

const start = async () => {
  try {
    await audio.play();
    btn.classList.add('on');
    volWrap.style.display = 'flex';
  } catch {
    btn.classList.add('pulse');
  }

  gate.style.opacity = '0';
  gate.style.pointerEvents = 'none';

  setTimeout(() => gate.remove(), 250);

  const card = document.querySelector('.card');
  card.classList.add('neon-soft');
};

['click', 'touchstart'].forEach(evt =>
  gate.addEventListener(evt, (e) => {
    e.preventDefault();
    start();
  }, { once: true })
);

gate.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    start();
  }
});

btn.addEventListener('click', async () => {
  try {
    if (audio.paused) {
      await audio.play();
      btn.classList.add('on');
      btn.classList.remove('pulse');
      volWrap.style.display = 'flex';
    } else {
      audio.pause();
      btn.classList.remove('on');
      volWrap.style.display = 'none';
    }
  } catch {}
});

vol.addEventListener('input', e => {
  const v = parseFloat(e.target.value);
  audio.volume = v;
  localStorage.setItem('vol', String(v));
});

document.addEventListener("mousemove", (e) => {
  for (let i = 0; i < 2; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    particle.style.left = `${e.clientX}px`;
    particle.style.top = `${e.clientY}px`;

    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 25 + 10;
    const dx = Math.cos(angle) * distance + "px";
    const dy = Math.sin(angle) * distance + "px";

    particle.style.setProperty("--dx", dx);
    particle.style.setProperty("--dy", dy);

    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 700);
  }
});

const v = document.getElementById('v-num');
let n = parseInt(v.textContent, 10) || 0;

setInterval(() => {
  if (Math.random() < .5) return;
  v.textContent = (++n);
}, 3500);

const badgesMini = document.getElementById('badges-mini');

["nitro.png","boost.png","bug.png"].forEach(src => {
  const i = document.createElement('img');
  i.src = `/badges/${src}`;
  i.alt = '';
  badgesMini.appendChild(i);
});
const typeEl = document.getElementById('type');
let pi = 0;
let ci = 0;
let typing = true;

(function typeLoop() {
  const txt = ["7/28", "discord: 8.w", "From Karbala"][pi];

  if (typing) {
    typeEl.textContent = txt.slice(0, ++ci);

    if (ci === txt.length) {
      typing = false;
      return setTimeout(typeLoop, 1100);
    }

    setTimeout(typeLoop, 95);
  } else {
    typeEl.textContent = txt.slice(0, --ci);

    if (ci === 0) {
      typing = true;
      pi = (pi + 1) % ["7/28", "discord: 8.w", "From Karbala"].length;
      return setTimeout(typeLoop, 420);
    }

    setTimeout(typeLoop, 55);
  }
})();
