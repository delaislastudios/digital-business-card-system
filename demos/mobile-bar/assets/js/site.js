/************************************************************
 * Isla Bar Co. — shared site behavior
 * Loaded on every page. Each block checks for the elements
 * it needs before doing anything, so one file safely covers
 * the hub and every sub-page.
 ************************************************************/

var WA_NUMBER = "17870000000";

var ACTIVITY_LABELS = {
  es: {
    placeholder:"Selecciona una opción",
    boda:"Boda",
    cumpleanos:"Cumpleaños",
    corporativo:"Corporativo",
    graduacion:"Graduación",
    babyshower:"Baby shower / Gender reveal",
    otro:"Otro"
  },
  en: {
    placeholder:"Select an option",
    boda:"Wedding",
    cumpleanos:"Birthday",
    corporativo:"Corporate",
    graduacion:"Graduation",
    babyshower:"Baby shower / Gender reveal",
    otro:"Other"
  }
};

function currentLang(){
  return document.documentElement.classList.contains("lang-en") ? "en" : "es";
}

// language toggle — .lang-es / .lang-en on <html>, defaults to Spanish, no reload
(function(){
  var root = document.documentElement;
  var bEs = document.getElementById("btn-es");
  var bEn = document.getElementById("btn-en");
  if(!bEs || !bEn){ return; }

  function updateWhatsAppLinks(lang){
    document.querySelectorAll(".wa-link").forEach(function(link){
      var msg = lang === "en" ? link.getAttribute("data-msg-en") : link.getAttribute("data-msg-es");
      link.setAttribute("href", "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(msg));
    });
  }

  function updatePlaceholders(lang){
    document.querySelectorAll("[data-ph-es]").forEach(function(field){
      var ph = lang === "en" ? field.getAttribute("data-ph-en") : field.getAttribute("data-ph-es");
      field.setAttribute("placeholder", ph);
    });
  }

  function updateGalleryAlt(lang){
    document.querySelectorAll("[data-alt-es]").forEach(function(img){
      var alt = lang === "en" ? img.getAttribute("data-alt-en") : img.getAttribute("data-alt-es");
      img.setAttribute("alt", alt);
    });
  }

  function updateActivityOptions(lang){
    var select = document.getElementById("f-tipo");
    if(!select){ return; }
    var labels = ACTIVITY_LABELS[lang];

    Array.prototype.forEach.call(select.options, function(option){
      if(option.value === ""){
        option.text = labels.placeholder;
      } else if(labels[option.value]){
        option.text = labels[option.value];
      }
    });
  }

  function setLang(lang){
    root.classList.remove("lang-es", "lang-en");
    root.classList.add("lang-" + lang);
    root.setAttribute("lang", lang);
    bEs.setAttribute("aria-pressed", String(lang === "es"));
    bEn.setAttribute("aria-pressed", String(lang === "en"));

    try{
      window.localStorage.setItem("islabar-card-lang", lang);
    }catch(e){}

    updateWhatsAppLinks(lang);
    updatePlaceholders(lang);
    updateActivityOptions(lang);
    updateGalleryAlt(lang);
  }

  bEs.addEventListener("click", function(){ setLang("es"); });
  bEn.addEventListener("click", function(){ setLang("en"); });

  try{
    var saved = window.localStorage.getItem("islabar-card-lang");
    setLang(saved === "en" ? "en" : "es");
  }catch(e){
    setLang("es");
  }
})();

// sticky bar: hidden while the page's top marker or the footer is in view
(function(){
  var bar = document.getElementById("stickyBar");
  var top = document.querySelector(".top-marker");
  var finalCta = document.getElementById("pageEnd");
  if(!bar || !top || !finalCta){ return; }

  var topVisible = true;
  var finalVisible = false;

  function update(){
    bar.classList.toggle("visible", !topVisible && !finalVisible);
  }

  var topObserver = new IntersectionObserver(function(entries){
    topVisible = entries[0].isIntersecting;
    update();
  });
  topObserver.observe(top);

  var finalObserver = new IntersectionObserver(function(entries){
    finalVisible = entries[0].isIntersecting;
    update();
  }, { rootMargin: "0px" });
  finalObserver.observe(finalCta);
})();

// availability form (cotizacion.html only): builds a language-aware WhatsApp message
(function(){
  var form = document.getElementById("quoteForm");
  var status = document.getElementById("formStatus");
  if(!form){ return; }

  form.addEventListener("submit", function(e){
    e.preventDefault();

    var lang = currentLang();

    var nombre = document.getElementById("f-nombre").value.trim();
    var fecha = document.getElementById("f-fecha").value;
    var lugar = document.getElementById("f-lugar").value.trim();
    var hora = document.getElementById("f-hora").value;
    var invitados = document.getElementById("f-invitados").value;
    var tipoSelect = document.getElementById("f-tipo");
    var tipo = tipoSelect.options[tipoSelect.selectedIndex].text;
    var comentarios = document.getElementById("f-comentarios").value.trim();

    var lines;

    if(lang === "en"){
      lines = [
        "Hi, I'd like to request availability for my event with Isla Bar Co.",
        "",
        "Name: " + nombre,
        "Event date: " + fecha,
        "Event location: " + lugar,
        "Event time: " + hora,
        "Guest count: " + invitados,
        "Type of event: " + tipo
      ];
      if(comentarios){
        lines.push("Additional notes: " + comentarios);
      }
    } else {
      lines = [
        "Hola, quisiera solicitar disponibilidad para mi evento con Isla Bar Co.",
        "",
        "Nombre: " + nombre,
        "Fecha del evento: " + fecha,
        "Lugar del evento: " + lugar,
        "Hora del evento: " + hora,
        "Cantidad de invitados: " + invitados,
        "Tipo de actividad: " + tipo
      ];
      if(comentarios){
        lines.push("Comentarios adicionales: " + comentarios);
      }
    }

    var message = encodeURIComponent(lines.join("\n"));
    var url = "https://wa.me/" + WA_NUMBER + "?text=" + message;

    status.textContent = lang === "en"
      ? "Great — opening WhatsApp with your event details."
      : "Perfecto — abriendo WhatsApp con los detalles de tu evento.";

    window.open(url, "_blank");
  });
})();
