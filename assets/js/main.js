(function () {
  const WHATSAPP = "5515998589225";

  // ─── RD STATION ────────────────────────────────────────────────────────────
  // Client ID da conta RD Station (usado no endpoint público de conversões)
  const RD_CLIENT_ID = "1136833";

  /**
   * Envia o lead para o RD Station via API pública de conversões (v3).
   * Não requer token secreto — usa o client_id público da conta.
   * Retorna uma Promise que resolve após o envio (ou falha silenciosa).
   *
   * Fluxo corrigido:
   *   1. Valida e coleta dados do formulário customizado
   *   2. POST para api.rd.station.com/platform/contacts
   *   3. Abre o WhatsApp SÓ após confirmação (ou timeout de 3s)
   */
  function sendToRDStation(data, source) {
    const payload = {
      event_type: "CONVERSION",
      event_family: "CDP",
      payload: {
        conversion_identifier: source || "Site GCA",
        name:         data.nome,
        email:        data.email,
        mobile_phone: data.telefone,
        cf_razao_social: data.razao,
        cf_cnpj:      data.cnpj,
        traffic_source: source || "Site GCA",
      },
    };

    return fetch(
      "https://api.rd.station.com/platform/contacts/conversions?client_id=" + RD_CLIENT_ID,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    )
      .then(function (res) {
        if (!res.ok) {
          // Loga erro mas não bloqueia o WhatsApp
          res.text().then(function (t) {
            console.warn("[RD Station] resposta de erro:", res.status, t);
          });
        }
      })
      .catch(function (err) {
        // Falha de rede — silenciosa para não bloquear o WhatsApp
        console.warn("[RD Station] falha na requisição:", err);
      });
  }

  // ─── VIDEOS LAZY ───────────────────────────────────────────────────────────
  document.querySelectorAll(".video-lazy").forEach((wrap) => {
    const btn = wrap.querySelector(".video-thumb");
    const iframe = wrap.querySelector(".video-iframe");
    const id = wrap.getAttribute("data-video-id");
    if (!btn || !iframe || !id) return;
    btn.addEventListener("click", () => {
      const origin =
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
  document.querySelectorAll(".menu-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const nav = document.getElementById("mobile-nav");
      if (nav) nav.classList.toggle("open");
    });
  });

  // ─── MODAL ─────────────────────────────────────────────────────────────────
  const modal = document.getElementById("lead-modal");
  if (!modal) return;

  const overlay = modal;
  const form = modal.querySelector("form");
  const errorEl = modal.querySelector(".form-error");

  document.querySelectorAll("[data-open-lead]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const source = btn.getAttribute("data-source") || "Site";
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

  overlay.querySelectorAll("[data-close-modal]").forEach((el) => {
    el.addEventListener("click", closeModal);
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  if (!form) return;

  // ─── SUBMIT ────────────────────────────────────────────────────────────────
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
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

    const source = overlay.dataset.source || "Site";

    // Monta mensagem do WhatsApp
    const msg =
      "Olá! Gostaria de falar com um especialista do Grupo Cipriano Ayala.%0A%0A" +
      "*Nome:* "         + encodeURIComponent(data.nome)     + "%0A" +
      "*Razão Social:* " + encodeURIComponent(data.razao)    + "%0A" +
      "*CNPJ:* "         + encodeURIComponent(data.cnpj)     + "%0A" +
      "*Telefone:* "     + encodeURIComponent(data.telefone) + "%0A" +
      "*Email:* "        + encodeURIComponent(data.email)    + "%0A" +
      "*Origem:* "       + encodeURIComponent(source);

    const waUrl = "https://wa.me/" + WHATSAPP + "?text=" + msg;

    // Fecha modal imediatamente para melhor UX
    closeModal();

    // 1. Dispara envio para RD Station (assíncrono)
    // 2. Abre WhatsApp após resposta da API OU após 3s de timeout
    //    (garante que o lead seja registrado antes de sair da página)
    var rdDone = false;

    function openWhatsApp() {
      if (rdDone) return;
      rdDone = true;
      window.open(waUrl, "_blank", "noopener,noreferrer");
    }

    // Timeout de segurança: abre WhatsApp em no máximo 3 segundos
    var safetyTimer = setTimeout(openWhatsApp, 3000);

    sendToRDStation(data, source).then(function () {
      clearTimeout(safetyTimer);
      openWhatsApp();
    });
  });

  function showError(msg) {
    if (errorEl) errorEl.textContent = msg;
  }
})();
