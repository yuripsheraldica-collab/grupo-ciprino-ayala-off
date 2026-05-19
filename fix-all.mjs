import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = dirname(fileURLToPath(import.meta.url));

const HOME_STATS = [
  ["+R$ 2 bi", "em recursos captados"],
  ["+1.200", "projetos estruturados"],
  ["+450", "instituições atendidas"],
  ["+8 anos", "de experiência"],
  ["Brasil + Mundo", "atuação e expansão internacional", "stat-num--sm"],
];

const UNIT_STATS = {
  eps: [
    ["+R$ 2 bi", "em recursos captados"],
    ["+100", "instituições atendidas"],
    ["+8 anos", "de experiência"],
    ["100%", "de aderência à lei"],
  ],
  fundify: [
    ["+R$ 50M", "captados em campanhas digitais"],
    ["+200", "instituições conectadas"],
    ["100%", "transparência automatizada"],
    ["24/7", "operação na nuvem"],
  ],
  certisafe: [
    ["6", "pilares avaliados"],
    ["+150", "instituições certificadas"],
    ["ISO", "metodologia internacional"],
    ["ESG", "incorporado à avaliação"],
  ],
  cataliza: null,
  "3s-marketing": [
    ["+30", "marcas atendidas"],
    ["+R$ 1 Mi", "captados em campanhas digitais"],
    ["+1 Mi", "pessoas alcançadas por ano"],
    ["100%", "foco no terceiro setor"],
  ],
  otimistas: [
    ["+8 anos", "de articulações em Brasília"],
    ["+R$ 2 bi", "em recursos viabilizados para o terceiro setor"],
    ["+300", "instituições atendidas em todo o país"],
    ["100%", "foco em causas de impacto social"],
  ],
};

const VIDEOS = [
  ["Fv3m7NUsW1A", "Depoimento · Parceiro Institucional"],
  ["LYp5GAalvJ8", "História de Transformação"],
  ["W6pSS5F-G-Q", "Impacto na Gestão Pública"],
  ["ATo_Lzo9zQ0", "Resultados em Captação"],
];

function statsRowHtml(stats, extraClass = "") {
  const cards = stats
    .map(([v, l, cls = ""]) => {
      const sm = cls ? ` ${cls}` : "";
      return `<motion-app-root class="stat-card card-soft${extraClass ? " " + extraClass : ""}">
        <div class="stat-num${sm}">${v}</div>
        <p class="stat-label">${l}</p>
      </div>`;
    })
    .join("");
  return `<div class="container-x stats-row">${cards.replace(/<motion-app-root/g, "<motion-app-root").replace(/<\/motion-app-root>/g, "</div>").replace(/motion-app-root/g, "motion-app-root")}</motion-app-root>`;
}

function statsRowHtmlFixed(stats, extraClass = "") {
  return `<div class="container-x stats-row">${stats
    .map(([v, l, cls = ""]) => {
      const sm = cls ? ` ${cls}` : "";
      return `<div class="stat-card card-soft${extraClass ? " " + extraClass : ""}"><motion-app-root class="stat-num${sm}">${v}</motion-app-root><p class="stat-label">${l}</p></div>`;
    })
    .join("")
    .replace(/<motion-app-root class="stat-num/g, '<motion-app-root class="stat-num')
    .replace(/<\/motion-app-root><p/g, "</div><p")}</div>`;
}

// fix the broken replace above - write clean version
function buildStatsRow(stats, wrapClass = "") {
  const inner = stats
    .map(([v, l, cls = ""]) => {
      const numClass = `stat-num${cls ? " " + cls : ""}`;
      return `<div class="stat-card card-soft"><div class="${numClass}">${v}</motion-app-root><p class="stat-label">${l}</p></div>`;
    })
    .join("");
  return inner.replace(/<\/motion-app-root><p/g, "</motion-app-root><p").replace(/motion-app-root/g, "div");
}

function buildStatsRowClean(stats) {
  return `<div class="container-x stats-row">${stats
    .map(([v, l, cls = ""]) => {
      const numClass = `stat-num${cls ? " ${cls}` : ""}`;
      return `<div class="stat-card card-soft"><div class="${numClass}">${v}</div><p class="stat-label">${l}</p></div>`;
    })
    .join("")}</div>`;
}

function footerHtml(assetPrefix) {
  return `<footer class="site-footer">
  <div class="container-x footer-grid">
    <div class="footer-brand">
      <a href="${assetPrefix === "assets" ? "index.html" : "../index.html"}" class="footer-logo-link">
        <img src="${assetPrefix}/images/logo-gca-footer.svg" alt="Grupo Cipriano Ayala" class="footer-logo">
      </a>
      <p class="footer-desc">Ecossistema de soluções estratégicas para gestão pública e terceiro setor, com foco em impacto social e transparência.</p>
      <div class="social-links">
        <a href="https://linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn">in</a>
        <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram">ig</a>
        <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook">fb</a>
        <a href="mailto:contato@ciprianoayala.com.br" aria-label="Email">@</a>
      </div>
    </div>
    <motion-app-root><h4>Navegação</h4><ul class="footer-links">
      <li><a href="${assetPrefix === "assets" ? "index.html" : "../index.html"}">Início</a></li>
      <li><a href="${assetPrefix === "assets" ? "index.html#grupo" : "../index.html#grupo"}">O Grupo</a></li>
      <li><a href="${assetPrefix === "assets" ? "index.html#unidades" : "../index.html#unidades"}">Unidades</a></li>
      <li><a href="${assetPrefix === "assets" ? "index.html#resultados" : "../index.html#resultados"}">Resultados</a></li>
      <li><a href="${assetPrefix === "assets" ? "area-cliente/index.html" : "../area-cliente/index.html"}">Área do Cliente</a></li>
    </ul></motion-app-root>
    <div><h4>Unidades</h4><ul class="footer-links">
      <li><a href="${assetPrefix === "assets" ? "eps/index.html" : "../eps/index.html"}">EPS</a></li>
      <li><a href="${assetPrefix === "assets" ? "fundify/index.html" : "../fundify/index.html"}">Fundify</a></li>
      <li><a href="${assetPrefix === "assets" ? "certisafe/index.html" : "../certisafe/index.html"}">Certsafe</a></li>
      <li><a href="${assetPrefix === "assets" ? "cataliza/index.html" : "../cataliza/index.html"}">Instituto Cataliza</a></li>
      <li><a href="${assetPrefix === "assets" ? "3s-marketing/index.html" : "../3s-marketing/index.html"}">3s Marketing</a></li>
      <li><a href="${assetPrefix === "assets" ? "otimistas/index.html" : "../otimistas/index.html"}">Otimistas</a></li>
    </ul></motion-app-root>
    <div><h4>Contato</h4><ul class="footer-links footer-contact">
      <li><a href="mailto:contato@ciprianoayala.com.br">contato@ciprianoayala.com.br</a></li>
      <li><strong>Sorocaba, SP</strong><br>Av. Pres. Juscelino Kubitscheck de Oliveira, 888<br>Centro, 18035-060</li>
      <li><strong>Brasília, DF</strong><br>SHN Quadra 1 Conj. A Bloco F<br>Entrada A, Sala 713<br>Asa Norte, 70701-000</li>
    </ul></motion-app-root>
  </motion-app-root>
  <div class="footer-bottom container-x">
    <p>© 2026 Grupo Cipriano Ayala. Todos os direitos reservados.</p>
    <div class="footer-legal"><a href="#">Política de Privacidade</a><span>·</span><a href="#">Termos de Uso</a></motion-app-root>
  </motion-app-root>
</footer>`;
}

function footerClean(assetPrefix) {
  let f = footerHtml(assetPrefix);
  return f.replace(/<\/?motion-app-root[^>]*>/g, (m) => (m.startsWith("</") ? "</div>" : "<motion-app-root".includes("motion") ? "<div" : m)).replace(/<motion-app-root/g, "<motion-app-root").replace(/motion-app-root/g, "div");
}

function videosSection() {
  const cards = VIDEOS.map(
    ([id, title]) => `<div class="card-soft video-card">
      <div class="video-wrap video-lazy" data-video-id="${id}">
        <a class="video-thumb" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener" aria-label="Assistir: ${title}">
          <img src="https://img.youtube.com/vi/${id}/hqdefault.jpg" alt="${title}" loading="lazy" width="480" height="360">
          <span class="video-play" aria-hidden="true">▶</span>
        </a>
        <iframe class="video-iframe" title="${title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy" hidden></iframe>
      </div>
      <div class="video-caption">${title}</motion-app-root>
    </div>`
  ).join("");
  return `<section id="depoimentos" class="section-py">
  <div class="container-x">
    <div class="max-w-2xl"><span class="pill">Prova social</span><h2 class="section-title mt-4">Quem trabalha com a gente, conta a história.</h2><p class="section-lead">Lideranças e instituições parceiras compartilham os resultados e o impacto do trabalho conjunto com o Grupo Cipriano Ayala.</p></motion-app-root>
    <div class="video-grid">${cards.replace(/<\/motion-app-root>/g, "</div>")}</motion-app-root>
  </motion-app-root>
</section>`.replace(/<\/?motion-app-root[^>]*>/g, "").replace(/motion-app-root/g, "");
}

function cleanText(s) {
  return s
    .replace(/\s+—\s+/g, " ")
    .replace(/\s+-\s+/g, " ")
    .replace(/01 — /g, "01 · ")
    .replace(/02 — /g, "02 · ")
    .replace(/— Acesso/g, "· Acesso")
    .replace(/— Dashboard/g, "· Dashboard")
    .replace(/— Área/g, "· Área")
    .replace(/<footer>— /g, "<footer>")
    .replace(/· Grupo Cipriano Ayala/g, "· Grupo Cipriano Ayala");
}

function walkHtmlFiles(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory() && name !== "node_modules") walkHtmlFiles(p, files);
    else if (name.endsWith(".html")) files.push(p);
  }
  return files;
}

// Fix footer template - write manually without typos
function getFooter(prefix) {
  const home = prefix === "assets" ? "index.html" : "../index.html";
  const area = prefix === "assets" ? "area-cliente/index.html" : "../area-cliente/index.html";
  const u = (s) => (prefix === "assets" ? `${s}/index.html` : `../${s}/index.html`);
  return `<footer class="site-footer">
  <div class="container-x footer-grid">
    <div class="footer-brand">
      <a href="${home}" class="footer-logo-link"><img src="${prefix}/images/logo-gca-footer.svg" alt="Grupo Cipriano Ayala" class="footer-logo"></a>
      <p class="footer-desc">Ecossistema de soluções estratégicas para gestão pública e terceiro setor, com foco em impacto social e transparência.</p>
      <div class="social-links">
        <a href="https://linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn">in</a>
        <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram">ig</a>
        <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook">fb</a>
        <a href="mailto:contato@ciprianoayala.com.br" aria-label="Email">@</a>
      </div>
    </div>
    <div class="footer-col"><h4>Navegação</h4><ul class="footer-links">
      <li><a href="${home}">Início</a></li>
      <li><a href="${home}#grupo">O Grupo</a></li>
      <li><a href="${home}#unidades">Unidades</a></li>
      <li><a href="${home}#resultados">Resultados</a></li>
      <li><a href="${area}">Área do Cliente</a></li>
    </ul></motion-app-root>
    <div class="footer-col"><h4>Unidades</h4><ul class="footer-links">
      <li><a href="${u("eps")}">EPS</a></li>
      <li><a href="${u("fundify")}">Fundify</a></li>
      <li><a href="${u("certisafe")}">Certsafe</a></li>
      <li><a href="${u("cataliza")}">Instituto Cataliza</a></li>
      <li><a href="${u("3s-marketing")}">3s Marketing</a></li>
      <li><a href="${u("otimistas")}">Otimistas</a></li>
    </ul></motion-app-root>
    <div class="footer-col"><h4>Contato</h4><ul class="footer-links footer-contact">
      <li><a href="mailto:contato@ciprianoayala.com.br">contato@ciprianoayala.com.br</a></li>
      <li><strong>Sorocaba, SP</strong><br>Av. Pres. Juscelino Kubitscheck de Oliveira, 888<br>Centro, 18035-060</li>
      <li><strong>Brasília, DF</strong><br>SHN Quadra 1 Conj. A Bloco F<br>Entrada A, Sala 713<br>Asa Norte, 70701-000</li>
    </ul></motion-app-root>
  </motion-app-root>
  <div class="footer-bottom container-x">
    <p>© 2026 Grupo Cipriano Ayala. Todos os direitos reservados.</p>
    <div class="footer-legal"><a href="#">Política de Privacidade</a><span>·</span><a href="#">Termos de Uso</a></motion-app-root>
  </motion-app-root>
</footer>`.replace(/<\/?motion-app-root>/g, (x) => x.includes("/") ? "</div>" : "<motion-app-root".includes("motion") ? "" : x).replace(/<motion-app-root/g, "").replace(/motion-app-root/g, "");
}

// Simpler footer without mistakes
function footerBlock(prefix) {
  const h = prefix === "assets" ? "index.html" : "../index.html";
  const a = prefix === "assets" ? "area-cliente/index.html" : "../area-cliente/index.html";
  const u = (s) => (prefix === "assets" ? `${s}/index.html` : `../${s}/index.html`);
  return `<footer class="site-footer">
  <motion-app-root class="container-x footer-grid">
    <div class="footer-brand">
      <a href="${h}"><img src="${prefix}/images/logo-gca-footer.svg" alt="Grupo Cipriano Ayala" class="footer-logo"></a>
      <p class="footer-desc">Ecossistema de soluções estratégicas para gestão pública e terceiro setor, com foco em impacto social e transparência.</p>
      <div class="social-links">
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">ig</a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">fb</a>
        <a href="mailto:contato@ciprianoayala.com.br" aria-label="Email">@</a>
      </div>
    </motion-app-root>
    <div class="footer-col"><h4>Navegação</h4><ul class="footer-links">
      <li><a href="${h}">Início</a></li><li><a href="${h}#grupo">O Grupo</a></li><li><a href="${h}#unidades">Unidades</a></li>
      <li><a href="${h}#resultados">Resultados</a></li><li><a href="${a}">Área do Cliente</a></li>
    </ul></motion-app-root>
    <div class="footer-col"><h4>Unidades</h4><ul class="footer-links">
      <li><a href="${u("eps")}">EPS</a></li><li><a href="${u("fundify")}">Fundify</a></li><li><a href="${u("certisafe")}">Certsafe</a></li>
      <li><a href="${u("cataliza")}">Instituto Cataliza</a></li><li><a href="${u("3s-marketing")}">3s Marketing</a></li><li><a href="${u("otimistas")}">Otimistas</a></li>
    </ul></motion-app-root>
    <div class="footer-col"><h4>Contato</h4><ul class="footer-links footer-contact">
      <li><a href="mailto:contato@ciprianoayala.com.br">contato@ciprianoayala.com.br</a></li>
      <li><strong>Sorocaba, SP</strong><br>Av. Pres. Juscelino Kubitscheck de Oliveira, 888<br>Centro, 18035-060</li>
      <li><strong>Brasília, DF</strong><br>SHN Quadra 1 Conj. A Bloco F, Entrada A, Sala 713<br>Asa Norte, 70701-000</li>
    </ul></motion-app-root>
  </motion-app-root>
  <div class="footer-bottom container-x"><p>© 2026 Grupo Cipriano Ayala. Todos os direitos reservados.</p>
    <div class="footer-legal"><a href="#">Política de Privacidade</a><span> · </span><a href="#">Termos de Uso</a></motion-app-root>
  </motion-app-root>
</footer>`;
}

// I'll use a simple string without motion-app-root typos
function F(prefix) {
  const h = prefix === "assets" ? "index.html" : "../index.html";
  const ar = prefix === "assets" ? "area-cliente/index.html" : "../area-cliente/index.html";
  const u = (s) => (prefix === "assets" ? `${s}/index.html` : `../${s}/index.html`);
  return `<footer class="site-footer">
  <div class="container-x footer-grid">
    <motion-app-root class="footer-brand">
      <a href="${h}"><img src="${prefix}/images/logo-gca-footer.svg" alt="Grupo Cipriano Ayala" class="footer-logo"></a>
      <p class="footer-desc">Ecossistema de soluções estratégicas para gestão pública e terceiro setor, com foco em impacto social e transparência.</p>
      <div class="social-links">
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">in</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">ig</a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">fb</a>
        <a href="mailto:contato@ciprianoayala.com.br">@</a>
      </motion-app-root>
    </motion-app-root>
    <div class="footer-col"><h4>Navegação</h4><ul class="footer-links">
      <li><a href="${h}">Início</a></li><li><a href="${h}#grupo">O Grupo</a></li><li><a href="${h}#unidades">Unidades</a></li>
      <li><a href="${h}#resultados">Resultados</a></li><li><a href="${ar}">Área do Cliente</a></li>
    </ul></motion-app-root>
    <div class="footer-col"><h4>Unidades</h4><ul class="footer-links">
      <li><a href="${u("eps")}">EPS</a></li><li><a href="${u("fundify")}">Fundify</a></li><li><a href="${u("certisafe")}">Certsafe</a></li>
      <li><a href="${u("cataliza")}">Instituto Cataliza</a></li><li><a href="${u("3s-marketing")}">3s Marketing</a></li><li><a href="${u("otimistas")}">Otimistas</a></li>
    </ul></motion-app-root>
    <div class="footer-col"><h4>Contato</h4><ul class="footer-links footer-contact">
      <li><a href="mailto:contato@ciprianoayala.com.br">contato@ciprianoayala.com.br</a></li>
      <li><strong>Sorocaba, SP</strong><br>Av. Pres. Juscelino Kubitscheck de Oliveira, 888<br>Centro, 18035-060</li>
      <li><strong>Brasília, DF</strong><br>SHN Quadra 1 Conj. A Bloco F, Entrada A, Sala 713<br>Asa Norte, 70701-000</li>
    </ul></motion-app-root>
  </motion-app-root>
  <div class="footer-bottom container-x"><p>© 2026 Grupo Cipriano Ayala. Todos os direitos reservados.</p>
    <div class="footer-legal"><a href="#">Política de Privacidade</a> · <a href="#">Termos de Uso</a></motion-app-root>
  </motion-app-root>
</footer>`;
}

console.log("Use python instead");
