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

document.addEventListener("DOMContentLoaded", () => {
  tickClock();
  setInterval(tickClock, 250);
});
