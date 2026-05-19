(function () {
  const WHATSAPP = "5515998589225";

  // ─── RD STATION ────────────────────────────────────────────────────────────
  // ID do formulário nativo criado no RD Station Marketing
  const RD_FORM_ID = "formulario-nativo-dac32ba0eeb6401cffc3";

  /**
   * Envia os dados do lead para o RD Station como se o formulário nativo
   * tivesse sido submetido. Usa a mesma lib RDStationForms que o embed usa.
   * Falha silenciosamente para não bloquear o fluxo do WhatsApp.
   */
  function sendToRDStation(data, source) {
    try {
      if (typeof RDStationForms === "undefined") return;

      // Cria uma instância oculta do formulário RD (sem renderizar na tela)
      const instance = new RDStationForms(RD_FORM_ID, "null");

      // Aguarda o form ser inicializado antes de submeter
      instance.createForm().then(function () {
        // Localiza o form oculto injetado pelo RD no DOM
        const rdForm = document.querySelector(
          "#" + RD_FORM_ID + " form, [data-rf-id='" + RD_FORM_ID + "'] form"
        );
        if (!rdForm) return;

        // Preenche os campos mapeados do formulário RD
        const fieldMap = {
          email:          data.email,
          name:           data.nome,
          mobile_phone:   data.telefone,
          cf_razao_social: data.razao,
          cf_cnpj:        data.cnpj,
          // campo de tráfego/origem (se existir no formulário RD)
          traffic_source: source,
        };

        Object.entries(fieldMap).forEach(function ([key, value]) {
          const el = rdForm.querySelector(
            "[name='" + key + "'], [id='" + key + "']"
          );
          if (el) el.value = value;
        });

        // Dispara o submit do form RD (ele faz o POST para a API deles)
        rdForm.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
      }).catch(function () {
        // falha silenciosa
      });
    } catch (err) {
      // falha silenciosa — nunca bloqueia o WhatsApp
      console.warn("[RD Station] erro ao enviar lead:", err);
    }
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

    // 1. Envia para o RD Station (assíncrono, silencioso)
    sendToRDStation(data, source);

    // 2. Abre WhatsApp normalmente
    const msg =
      "Olá! Gostaria de falar com um especialista do Grupo Cipriano Ayala.%0A%0A" +
      "*Nome:* "         + encodeURIComponent(data.nome)     + "%0A" +
      "*Razão Social:* " + encodeURIComponent(data.razao)    + "%0A" +
      "*CNPJ:* "         + encodeURIComponent(data.cnpj)     + "%0A" +
      "*Telefone:* "     + encodeURIComponent(data.telefone) + "%0A" +
      "*Email:* "        + encodeURIComponent(data.email)    + "%0A" +
      "*Origem:* "       + encodeURIComponent(source);

    window.open(
      "https://wa.me/" + WHATSAPP + "?text=" + msg,
      "_blank",
      "noopener,noreferrer"
    );
    closeModal();
  });

  function showError(msg) {
    if (errorEl) errorEl.textContent = msg;
  }
})();
