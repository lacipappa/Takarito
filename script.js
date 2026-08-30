const cache = {};
let currentLang = localStorage.getItem("tisztapont_lang") || "hu";

async function setLanguage(lang){
  try{
    if(!cache[lang]){
      const res = await fetch(`lang/${lang}.json`, {cache:"no-store"});
      cache[lang] = await res.json();
    }
    const t = cache[lang];
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(el=>{
      const key = el.dataset.i18n;
      if(t[key] !== undefined) el.textContent = t[key];
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el=>{
      const key = el.dataset.i18nPlaceholder;
      if(t[key] !== undefined) el.placeholder = t[key];
    });
    document.querySelectorAll("[data-lang]").forEach(b=>b.classList.toggle("active",b.dataset.lang===lang));
    localStorage.setItem("tisztapont_lang",lang);
    currentLang = lang;
  }catch(err){console.error(err);}
}

document.querySelectorAll("[data-lang]").forEach(btn=>btn.addEventListener("click",()=>setLanguage(btn.dataset.lang)));

document.getElementById("quoteForm").addEventListener("submit",e=>{
  e.preventDefault();
  const t=cache[currentLang]||{};
  alert(t.form_success || "Demo: az ajánlatkérés itt kerülne elküldésre.");
});

setLanguage(currentLang);
