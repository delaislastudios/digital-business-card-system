/************************************************************
 * Lirio Events — shared demo behavior
 ************************************************************/

var WA_NUMBER = "17870000001";
var LANG_KEY = "wedding-event-coordinator-lang";

function currentLang(){
  return document.documentElement.classList.contains("lang-en") ? "en" : "es";
}

function labelFor(el, lang){
  return el.getAttribute("data-label-" + lang) || el.textContent.trim();
}

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
      field.setAttribute("placeholder", lang === "en" ? field.getAttribute("data-ph-en") : field.getAttribute("data-ph-es"));
    });
  }

  function updateGalleryAlt(lang){
    document.querySelectorAll("[data-alt-es]").forEach(function(img){
      img.setAttribute("alt", lang === "en" ? img.getAttribute("data-alt-en") : img.getAttribute("data-alt-es"));
    });
  }

  function updateOptionLabels(lang){
    document.querySelectorAll("option[data-label-es]").forEach(function(option){
      option.text = labelFor(option, lang);
    });
  }

  function setLang(lang){
    root.classList.remove("lang-es", "lang-en");
    root.classList.add("lang-" + lang);
    root.setAttribute("lang", lang);
    bEs.setAttribute("aria-pressed", String(lang === "es"));
    bEn.setAttribute("aria-pressed", String(lang === "en"));

    try{
      window.localStorage.setItem(LANG_KEY, lang);
    }catch(e){}

    updateWhatsAppLinks(lang);
    updatePlaceholders(lang);
    updateGalleryAlt(lang);
    updateOptionLabels(lang);
  }

  bEs.addEventListener("click", function(){ setLang("es"); });
  bEn.addEventListener("click", function(){ setLang("en"); });

  try{
    var saved = window.localStorage.getItem(LANG_KEY);
    setLang(saved === "en" ? "en" : "es");
  }catch(e){
    setLang("es");
  }
})();

(function(){
  var bar = document.getElementById("stickyBar");
  var top = document.querySelector(".top-marker");
  var finalCta = document.getElementById("pageEnd");
  if(!bar || !top || !finalCta || !("IntersectionObserver" in window)){ return; }

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
  });
  finalObserver.observe(finalCta);
})();

(function(){
  document.querySelectorAll("[data-exclusive-group]").forEach(function(group){
    group.addEventListener("change", function(e){
      var changed = e.target;
      if(!changed.matches('input[type="checkbox"]')){ return; }

      var boxes = Array.prototype.slice.call(group.querySelectorAll('input[type="checkbox"]'));
      var exclusive = changed.getAttribute("data-exclusive") === "true";

      if(changed.checked && exclusive){
        boxes.forEach(function(box){
          if(box !== changed){ box.checked = false; }
        });
      } else if(changed.checked){
        boxes.forEach(function(box){
          if(box.getAttribute("data-exclusive") === "true"){ box.checked = false; }
        });
      }
    });
  });
})();

(function(){
  var radios = document.querySelectorAll('input[name="same_location"]');
  var ceremony = document.getElementById("ceremonyField");
  var reception = document.getElementById("receptionField");
  if(!radios.length || !ceremony || !reception){ return; }

  function updateLocationFields(){
    var selected = document.querySelector('input[name="same_location"]:checked');
    var show = selected && selected.value === "no";
    [ceremony, reception].forEach(function(field){
      var input = field.querySelector("input");
      field.hidden = !show;
      if(input){
        input.required = show;
        if(!show){ input.value = ""; }
      }
    });
  }

  radios.forEach(function(radio){
    radio.addEventListener("change", updateLocationFields);
  });
  updateLocationFields();
})();

(function(){
  var form = document.getElementById("quoteForm");
  var status = document.getElementById("formStatus");
  if(!form){ return; }

  function checkedLabels(name, lang){
    return Array.prototype.slice.call(document.querySelectorAll('input[name="' + name + '"]:checked')).map(function(input){
      return labelFor(input, lang);
    });
  }

  function selectLabel(id, lang){
    var select = document.getElementById(id);
    if(!select || !select.value){ return ""; }
    return labelFor(select.options[select.selectedIndex], lang);
  }

  function radioLabel(name, lang){
    var radio = document.querySelector('input[name="' + name + '"]:checked');
    return radio ? labelFor(radio, lang) : "";
  }

  function value(id){
    var field = document.getElementById(id);
    return field ? field.value.trim() : "";
  }

  function validateCheckboxGroup(name, lang){
    var labels = checkedLabels(name, lang);
    if(labels.length){ return true; }
    var first = document.querySelector('input[name="' + name + '"]');
    if(status){
      status.textContent = lang === "en"
        ? "Please select at least one option in each vendor section."
        : "Selecciona al menos una opción en cada sección de proveedores.";
    }
    if(first){ first.focus(); }
    return false;
  }

  function addLine(lines, label, val){
    if(val){ lines.push("- " + label + ": " + val); }
  }

  form.addEventListener("submit", function(e){
    e.preventDefault();
    var lang = currentLang();

    if(!form.reportValidity()){ return; }
    if(!validateCheckboxGroup("vendors_booked", lang) || !validateCheckboxGroup("vendors_needed", lang)){ return; }

    var booked = checkedLabels("vendors_booked", lang).join(", ");
    var needed = checkedLabels("vendors_needed", lang).join(", ");
    var sameLocation = radioLabel("same_location", lang);
    var lines;

    if(lang === "en"){
      lines = [
        "Hi, I'd like to request a consultation with Lirio Events.",
        "",
        "Contact"
      ];
      addLine(lines, "Name", value("f-name"));
      addLine(lines, "Preferred contact method", selectLabel("f-contact", lang));
      lines.push("", "Event");
      addLine(lines, "Event date", value("f-date"));
      addLine(lines, "Event type", selectLabel("f-event-type", lang));
      addLine(lines, "Region", selectLabel("f-region", lang));
      addLine(lines, "Venue or location name", value("f-venue"));
      addLine(lines, "Estimated guest count", value("f-guests"));
      lines.push("", "Planning Stage");
      addLine(lines, "Current planning stage", selectLabel("f-stage", lang));
      addLine(lines, "Support believed needed", selectLabel("f-support", lang));
      lines.push("", "Vendors");
      addLine(lines, "Vendors already booked", booked);
      addLine(lines, "Vendors still needed", needed);
      lines.push("", "Locations");
      addLine(lines, "Same ceremony and reception location?", sameLocation);
      addLine(lines, "Ceremony location", value("f-ceremony-location"));
      addLine(lines, "Reception location", value("f-reception-location"));
      if(value("f-challenges")){
        lines.push("", "Planning Challenges");
        addLine(lines, "Details", value("f-challenges"));
      }
      if(value("f-notes")){
        lines.push("", "Additional Notes");
        addLine(lines, "Notes", value("f-notes"));
      }
    } else {
      lines = [
        "Hola, quisiera solicitar una consulta con Lirio Events.",
        "",
        "Contacto"
      ];
      addLine(lines, "Nombre", value("f-name"));
      addLine(lines, "Método de contacto preferido", selectLabel("f-contact", lang));
      lines.push("", "Evento");
      addLine(lines, "Fecha del evento", value("f-date"));
      addLine(lines, "Tipo de evento", selectLabel("f-event-type", lang));
      addLine(lines, "Región", selectLabel("f-region", lang));
      addLine(lines, "Nombre del lugar, hacienda o venue", value("f-venue"));
      addLine(lines, "Cantidad estimada de invitados", value("f-guests"));
      lines.push("", "Etapa de planificación");
      addLine(lines, "Etapa actual", selectLabel("f-stage", lang));
      addLine(lines, "Apoyo que creen necesitar", selectLabel("f-support", lang));
      lines.push("", "Proveedores");
      addLine(lines, "Proveedores ya contratados", booked);
      addLine(lines, "Proveedores que aún necesitan", needed);
      lines.push("", "Lugares");
      addLine(lines, "¿Ceremonia y recepción en el mismo lugar?", sameLocation);
      addLine(lines, "Lugar de la ceremonia", value("f-ceremony-location"));
      addLine(lines, "Lugar de la recepción", value("f-reception-location"));
      if(value("f-challenges")){
        lines.push("", "Retos de planificación");
        addLine(lines, "Detalles", value("f-challenges"));
      }
      if(value("f-notes")){
        lines.push("", "Notas adicionales");
        addLine(lines, "Notas", value("f-notes"));
      }
    }

    if(status){
      status.textContent = lang === "en"
        ? "Opening WhatsApp with your consultation details."
        : "Abriendo WhatsApp con los detalles de tu consulta.";
    }

    window.open("https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(lines.join("\n")), "_blank");
  });
})();
