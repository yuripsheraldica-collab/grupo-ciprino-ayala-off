(function () {
  const WHATSAPP = "5515998589225";

  // ─── RD STATION ────────────────────────────────────────────────────────────
  // Token público do RD Station Marketing — Grupo Cipriano Ayala
  const RD_API_KEY = "89ca4966e0480018e3ee9aed5b1b6e92";

  /**
   * Envia lead para o RD Station Marketing via endpoint oficial de conversões.
   * POST https://api.rd.services/platform/conversions?api_key=...
   * Docs: https://developers.rdstation.com/reference/conversao
   */
  function sendToRDStation(data, source) {
    var payload = {
      event_type: "CONVERSION",
      event_family: "CDP",
      payload: {
        conversion_identifier: "Site GCA - " + (source || "Formulário"),
        name:           data.nome,
        email:          data.email,
        mobile_phone:   data.telefone,
        company_name:   data.razao,
        cf_cnpj:        data.cnpj,
        traffic_source: source || "Site",
      },
    };

    return fetch(
      "https://api.rd.services/platform/conversions?api_key=" + RD_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    )
      .then(function (res) {
        if (!res.ok) {
          res.text().then(function (t) {
            console.warn("[RD Station] erro " + res.status + ":", t);
          });
        } else {
          console.info("[RD Station] lead enviado com sucesso.");
        }
      })
      .catch(function (err) {
        console.warn("[RD Station] falha de rede:", err);
      });
  }

  // ─── VIDEOS LAZY ───────────────────────────────────────────────────────────
  document.querySelectorAll(".video-lazy").forEach(function (wrap) {
    var btn    = wrap.querySelector(".video-thumb");
    var iframe = wrap.querySelector(".video-iframe");
    var id     = wrap.getAttribute("data-video-id");
    if (!btn || !iframe || !id) return;
    btn.addEventListener("click", function () {
      var origin =
        window.location.origin && window.location.origin !== "null"
          ? window.location.origin
          : "";
      iframe.src =
        "https://www.youtube-nocookie.com/embed/" +
        id +
        "?autoplay=1&rel=0&modestbranding=1" +
        (origin ? "&origin=" + encodeURIComponent(origin) : "");
      wrap.classList.add("is-playing");
    });
  });

  // ─── MENU MOBILE ───────────────────────────────────────────────────────────
  document.querySelectorAll(".menu-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var nav = document.getElementById("mobile-nav");
      if (nav) nav.classList.toggle("open");
    });
  });

  // ─── MODAL ─────────────────────────────────────────────────────────────────
  var modal = document.getElementById("lead-modal");
  if (!modal) return;

  var overlay = modal;
  var form    = modal.querySelector("form");
  var errorEl = modal.querySelector(".form-error");

  document.querySelectorAll("[data-open-lead]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var source = btn.getAttribute("data-source") || "Site";
      overlay.dataset.source = source;
      overlay.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

  function closeModal() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
    if (errorEl) errorEl.textContent = "";
    if (form) form.reset();
  }

  overlay.querySelectorAll("[data-close-modal]").forEach(function (el) {
    el.addEventListener("click", closeModal);
  });

  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });

  if (!form) return;

  // ─── SUBMIT ────────────────────────────────────────────────────────────────
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var data = {
      nome:     String(form.nome.value     || "").trim(),
      razao:    String(form.razao.value    || "").trim(),
      cnpj:     String(form.cnpj.value     || "").trim(),
      telefone: String(form.telefone.value || "").trim(),
      email:    String(form.email.value    || "").trim(),
    };

    if (data.nome.length < 2)     return showError("Informe seu nome");
    if (data.razao.length < 2)    return showError("Informe a razão social");
    if (data.cnpj.length < 11)    return showError("CNPJ inválido");
    if (data.telefone.length < 8) return showError("Telefone inválido");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return showError("Email inválido");

    var source = overlay.dataset.source || "Site";

    var msg =
      "Olá! Gostaria de falar com um especialista do Grupo Cipriano Ayala.%0A%0A" +
      "*Nome:* "         + encodeURIComponent(data.nome)     + "%0A" +
      "*Razão Social:* " + encodeURIComponent(data.razao)    + "%0A" +
      "*CNPJ:* "         + encodeURIComponent(data.cnpj)     + "%0A" +
      "*Telefone:* "     + encodeURIComponent(data.telefone) + "%0A" +
      "*Email:* "        + encodeURIComponent(data.email)    + "%0A" +
      "*Origem:* "       + encodeURIComponent(source);

    var waUrl = "https://wa.me/" + WHATSAPP + "?text=" + msg;

    closeModal();

    var waDone = false;
    function openWhatsApp() {
      if (waDone) return;
      waDone = true;
      window.open(waUrl, "_blank", "noopener,noreferrer");
    }

    // Abre WhatsApp após RD responder, ou em no máximo 3s
    var timer = setTimeout(openWhatsApp, 3000);
    sendToRDStation(data, source).then(function () {
      clearTimeout(timer);
      openWhatsApp();
    });
  });

  function showError(msg) {
    if (errorEl) errorEl.textContent = msg;
  }

})();
