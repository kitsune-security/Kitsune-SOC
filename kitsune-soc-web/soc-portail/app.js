function pad2(n){ return String(n).padStart(2, "0"); }

function formatFRDate(d){
  // ex: vendredi 16 janvier 2026
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit"
  }).format(d);
}

function tickClock(){
  const elTime = document.querySelector("[data-clock-time]");
  const elDate = document.querySelector("[data-clock-date]");
  if(!elTime || !elDate) return;

  const now = new Date();
  const hh = pad2(now.getHours());
  const mm = pad2(now.getMinutes());
  const ss = pad2(now.getSeconds());

  elTime.textContent = `${hh}:${mm}:${ss}`;
  elDate.textContent = formatFRDate(now);
}

/* =========================
   AUTH (client-side)
   ========================= */
const AUTH_KEY = "kitsune.soc.auth.v1";

// Identifiants par défaut (comme demandé)
const DEFAULT_USER = "demo";
const DEFAULT_PASS = "demo1234";

// Durée de session (ms) : 12h (modifie si tu veux)
const AUTH_TTL_MS = 12 * 60 * 60 * 1000;

function getAuthState(){
  try{
    const raw = localStorage.getItem(AUTH_KEY);
    if(!raw) return { ok:false };
    const data = JSON.parse(raw);
    if(!data || !data.ts) return { ok:false };
    if(Date.now() - data.ts > AUTH_TTL_MS) return { ok:false, expired:true };
    return { ok:true };
  }catch(e){
    return { ok:false };
  }
}

function setAuthed(){
  localStorage.setItem(AUTH_KEY, JSON.stringify({ ts: Date.now() }));
}

function clearAuthed(){
  localStorage.removeItem(AUTH_KEY);
}

function lockUI(){
  document.body.classList.add("is-locked");
  const overlay = document.querySelector("[data-auth-overlay]");
  if(overlay) overlay.classList.remove("is-hidden");

  // focus sur le champ user
  const u = document.getElementById("authUser");
  if(u) setTimeout(() => u.focus(), 0);
}

function unlockUI(){
  document.body.classList.remove("is-locked");
  const overlay = document.querySelector("[data-auth-overlay]");
  if(overlay) overlay.classList.add("is-hidden");

  // focus sur le 1er lien
  const first = document.querySelector(".pill");
  if(first) setTimeout(() => first.focus(), 0);
}

function setAuthError(msg){
  const el = document.querySelector("[data-auth-error]");
  if(!el) return;
  el.textContent = msg || "";
  el.style.display = msg ? "block" : "none";
}

document.addEventListener("DOMContentLoaded", () => {
  // Horloge
  tickClock();
  setInterval(tickClock, 250);

  // Auth init
  const form = document.querySelector("[data-auth-form]");
  const btnLogout = document.querySelector("[data-logout]");
  const userEl = document.getElementById("authUser");
  const passEl = document.getElementById("authPass");

  const st = getAuthState();
  if(st.ok){
    unlockUI();
  }else{
    if(st.expired) setAuthError("Session expirée. Merci de vous reconnecter.");
    lockUI();
  }

  if(form){
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      setAuthError("");

      const u = (userEl?.value || "").trim();
      const p = (passEl?.value || "");

      if(u === DEFAULT_USER && p === DEFAULT_PASS){
        setAuthed();
        if(passEl) passEl.value = "";
        unlockUI();
      }else{
        setAuthError("Identifiant ou mot de passe incorrect.");
        if(passEl) passEl.value = "";
        if(passEl) passEl.focus();
      }
    });
  }

  if(btnLogout){
    btnLogout.addEventListener("click", () => {
      clearAuthed();
      setAuthError("");
      lockUI();
    });
  }
});
