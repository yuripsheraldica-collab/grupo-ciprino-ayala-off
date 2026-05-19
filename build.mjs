import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const ASSET = "assets";

const units = [
  { slug: "eps", theme: "theme-eps", logo: "logo-azul.svg", name: "EPS", file: "eps" },
  { slug: "fundify", theme: "theme-fundify", logo: "logo-fundify.svg", name: "Fundify", file: "fundify" },
  { slug: "certisafe", theme: "theme-certisafe", logo: "logo-certisafe.svg", name: "Certisafe", file: "certisafe" },
  { slug: "cataliza", theme: "theme-cataliza", logo: "logo-cataliza.svg", name: "Instituto Cataliza", file: "cataliza" },
  { slug: "3s-marketing", theme: "theme-3s", logo: "logo-3s.svg", name: "3s Marketing", file: "3s-marketing" },
  { slug: "otimistas", theme: "theme-otimistas", logo: "logo-otimistas.svg", name: "Otimistas", file: "otimistas" },
];

const unitData = {
  eps: {
    title: "EPS — Escritório de Projetos Sociais · Grupo Cipriano Ayala",
    h1: 'Da emenda à <span class="text-brand">prestação de contas</span>, com você em cada etapa.',
    desc: "O EPS é o braço técnico do Grupo Cipriano Ayala para gestão de recursos públicos — elaboração de projetos, aprovação, execução e prestação de contas com total conformidade.",
    stats: [["+R$ 2 bi", "em recursos captados"], ["+100", "instituições atendidas"], ["+8 anos", "de experiência"], ["100%", "de aderência à lei"]],
    pillarsTitle: "Projetos sociais com excelência técnica e jurídica.",
    pillarsBody: "Cuidamos do ciclo completo: do diagnóstico inicial à entrega da prestação de contas final. Todo o processo é conduzido por equipe sênior com expertise em legislação, finanças públicas e gestão.",
    pillarsBullets: ["Elaboração técnica de projetos para emendas e convênios", "Acompanhamento da execução físico-financeira", "Conformidade com TCU, CGU, TCEs e órgãos de controle", "Prestação de contas digital, transparente e auditável"],
    pillarsTags: ["Projetos técnicos", "Conformidade total", "Execução financeira", "Prestação de contas"],
    servicesTitle: "Tudo o que sua instituição precisa para captar e executar.",
    servicesBody: "Atuação ponta a ponta na gestão de recursos públicos para hospitais, OSCs e fundações.",
    services: [
      ["01", "Elaboração de Projetos", "Construção técnica de projetos alinhados às prioridades de governo e janelas de oportunidade.", ["Emendas", "Convênios", "Editais"]],
      ["02", "Captação e Aprovação", "Articulação técnica e institucional para aprovação de propostas junto a órgãos públicos.", ["Articulação", "Aprovação"]],
      ["03", "Execução Físico-Financeira", "Acompanhamento da execução, fluxo financeiro e indicadores de entrega.", ["Execução", "Indicadores"]],
      ["04", "Prestação de Contas", "Encerramento técnico com conformidade total perante órgãos de controle.", ["TCU", "CGU", "TCEs"]],
      ["05", "Compliance Público", "Assessoria jurídica e técnica para conformidade contínua e auditorias.", ["Jurídico", "Auditoria"]],
      ["06", "Capacitação", "Treinamentos para equipes internas das instituições parceiras.", ["Treinamento", "OSCs"]],
    ],
    ctaTitle: "Vamos estruturar seus próximos projetos públicos com excelência?",
    ctaBody: "Nosso time técnico está pronto para conduzir sua instituição da elaboração à prestação de contas.",
  },
  fundify: {
    title: "Fundify — Captação digital e transparência · Grupo Cipriano Ayala",
    h1: 'Tecnologia para <span class="text-brand">captar mais</span> e prestar contas com confiança.',
    desc: "Fundify é a plataforma do GCA para captação digital e transparência. Crowdfunding para causas, doações recorrentes e portal de transparência automático em conformidade com TCU, CGU e TCEs.",
    stats: [["+R$ 50M", "captados em campanhas digitais"], ["+200", "instituições conectadas"], ["100%", "transparência automatizada"], ["24/7", "operação na nuvem"]],
    pillarsTitle: "Doações, transparência e dados — em uma plataforma só.",
    pillarsBody: "Fundify une o que toda instituição social precisa: ferramentas para arrecadar com público amplo e um portal de transparência que se atualiza sozinho com base nos dados da execução.",
    pillarsBullets: ["Páginas de campanha customizadas para cada causa", "Doações recorrentes via Pix, cartão e boleto", "Portal de transparência automatizado", "Painéis com indicadores em tempo real"],
    pillarsTags: ["Captação digital", "Portal público", "Dados em tempo real", "Comunidade engajada"],
    servicesTitle: "Plataforma completa para captar e prestar contas.",
    servicesBody: "Tudo o que uma instituição social precisa para operar com tecnologia de ponta e transparência total.",
    services: [
      ["01", "Crowdfunding", "Campanhas para projetos específicos com landing pages, vídeos e gestão de doadores.", ["Campanhas", "Pix", "Cartão"]],
      ["02", "Doação Recorrente", "Programa de mantenedores com cobrança automática e dashboard de retenção.", ["Recorrência", "CRM"]],
      ["03", "Portal de Transparência", "Atualização automática de prestação de contas com base em dados de execução.", ["Transparência", "Auto"]],
      ["04", "Painéis de Indicadores", "KPIs em tempo real para diretoria, conselho e órgãos de controle.", ["KPI", "BI"]],
      ["05", "Integração GCA", "Conexão direta com o EPS para fluxo único do projeto ao doador.", ["EPS", "API"]],
      ["06", "Compliance Digital", "Conformidade com LGPD, PCI e exigências regulatórias do terceiro setor.", ["LGPD", "PCI"]],
    ],
    ctaTitle: "Pronto para captar mais e prestar contas com transparência total?",
    ctaBody: "Conecte sua instituição ao Fundify e tenha tecnologia de ponta a serviço da sua causa.",
  },
  certisafe: {
    title: "Certisafe — Certificação ESG e governança · Grupo Cipriano Ayala",
    h1: 'A certificação que <span class="text-brand">abre portas</span> para captar mais.',
    desc: "CertSafe é a certificação independente que atesta a maturidade da sua organização em compliance, governança, ESG e transparência — credibilidade que se traduz em mais recursos.",
    stats: [["6", "pilares avaliados"], ["+150", "instituições certificadas"], ["ISO", "metodologia internacional"], ["ESG", "incorporado à avaliação"]],
    pillarsTitle: "Compliance, governança e ESG em uma certificação só.",
    pillarsBody: "Avaliamos sua instituição em 6 pilares — Governança, Compliance, Financeiro, Operações, ESG e Transparência — entregando um selo público que comprova maturidade e idoneidade.",
    pillarsBullets: ["Diagnóstico inicial gratuito da maturidade", "Avaliação independente em 6 pilares", "Selo público reconhecido por financiadores", "Plano de evolução com indicadores claros"],
    pillarsTags: ["Compliance", "Governança", "Transparência", "Selo público"],
    servicesTitle: "Certificação que se traduz em credibilidade real.",
    servicesBody: "Trilhas de certificação adaptadas ao porte e à maturidade de cada organização.",
    services: [
      ["01", "Diagnóstico de Maturidade", "Análise inicial dos 6 pilares com plano de ação para evolução.", ["Diagnóstico", "Plano"]],
      ["02", "Trilha de Certificação", "Acompanhamento estruturado para alcance dos níveis Bronze, Prata e Ouro.", ["Trilha", "Níveis"]],
      ["03", "Auditoria Independente", "Avaliação externa com metodologia inspirada em padrões ISO e GRI.", ["Auditoria", "ISO"]],
      ["04", "Selo CertSafe", "Selo público reconhecido por financiadores, governos e parceiros.", ["Selo", "Público"]],
      ["05", "ESG Aplicado", "Apoio para integrar critérios ESG à operação e à comunicação.", ["ESG", "Operação"]],
      ["06", "Renovação Anual", "Manutenção contínua da maturidade certificada com avaliações periódicas.", ["Renovação", "Contínuo"]],
    ],
    ctaTitle: "Certifique sua instituição e amplie sua capacidade de captação.",
    ctaBody: "O selo CertSafe é o atalho entre maturidade institucional e novos recursos.",
  },
  cataliza: {
    title: "Instituto Cataliza — Educação e inovação social · Grupo Cipriano Ayala",
    h1: 'Da ideia à <span class="text-brand">organização pronta</span> para captar e transformar.',
    desc: "O Instituto Cataliza é o braço de educação e inovação social do Grupo Cipriano Ayala — formando lideranças, fortalecendo organizações e produzindo conhecimento aplicável ao terceiro setor.",
    stats: null,
    pillarsTitle: "Conhecimento aplicado para transformar realidades.",
    pillarsBody: "Formação executiva, mentoria e pesquisa aplicada — conectando teoria, prática e impacto para gestores e empreendedores sociais.",
    pillarsBullets: ["Programas de formação para lideranças sociais", "Mentorias para empreendedores de impacto", "Pesquisa aplicada ao terceiro setor", "Cursos abertos e in-company"],
    pillarsTags: ["Formação", "Mentoria", "Inovação", "Impacto social"],
    servicesTitle: "Trilhas de aprendizado para todo o ciclo de vida de uma OSC.",
    servicesBody: "Programas estruturados em níveis para empreendedores, gestores e conselhos.",
    services: [
      ["01", "Formação Executiva", "Programa para gestores de OSCs, fundações e hospitais filantrópicos.", ["Executivo", "Gestão"]],
      ["02", "Trilha do Empreendedor Social", "Da ideia à organização legalmente constituída e pronta para captar.", ["Trilha", "Constituição"]],
      ["03", "Mentoria 1:1", "Acompanhamento individual com mentores experientes do setor.", ["1:1", "Mentor"]],
      ["04", "Cursos Abertos", "Conteúdo prático e acessível para profissionais do terceiro setor.", ["Cursos", "Aberto"]],
      ["05", "Pesquisa Aplicada", "Produção de conhecimento conectado à realidade das organizações.", ["Pesquisa", "Aplicada"]],
      ["06", "In-company", "Programas customizados para equipes e conselhos de grandes OSCs.", ["In-company", "Custom"]],
    ],
    ctaTitle: "Vamos formar a próxima geração de lideranças sociais juntos?",
    ctaBody: "Conheça os programas do Instituto Cataliza e fortaleça sua organização com conhecimento aplicado.",
  },
  "3s-marketing": {
    title: "3s Marketing — Comunicação para o terceiro setor · Grupo Cipriano Ayala",
    h1: 'Comunicação que <span class="text-brand">fortalece marcas</span> e gera doação.',
    desc: "A 3S Marketing é a agência do GCA dedicada exclusivamente ao terceiro setor — branding, conteúdo, mídia e captação digital com o tom certo para causas sociais.",
    stats: [["+30", "marcas atendidas"], ["+R$ 1 Mi", "captados em campanhas digitais"], ["+1 Mi", "pessoas alcançadas por ano"], ["100%", "foco no terceiro setor"]],
    pillarsTitle: "Estratégia, criatividade e dados para causas que importam.",
    pillarsBody: "Equipe sênior em branding, performance e conteúdo, com profundo entendimento da linguagem e dos limites éticos do setor social.",
    pillarsBullets: ["Branding e posicionamento de marcas sociais", "Sites institucionais e landing pages de captação", "Mídia paga e SEO orientados a doação", "Conteúdo, vídeos e gestão de redes sociais"],
    pillarsTags: ["Branding", "Sites e SEO", "Conteúdo e vídeo", "Captação digital"],
    servicesTitle: "Tudo o que sua causa precisa para ser vista e apoiada.",
    servicesBody: "Atuação 360º — da identidade da marca à campanha de doação que entrega resultado.",
    services: [
      ["01", "Branding & Identidade", "Construção ou reposicionamento de marca, manuais, naming e narrativa.", ["Marca", "Naming"]],
      ["02", "Sites e Landing Pages", "Sites institucionais, hotsites de campanha e landing pages de captação.", ["Site", "Landing"]],
      ["03", "Conteúdo e Redes Sociais", "Planejamento editorial, produção e gestão de redes sociais.", ["Social", "Conteúdo"]],
      ["04", "Mídia Paga e SEO", "Performance orientada a doação, leads e engajamento qualificado.", ["Ads", "SEO"]],
      ["05", "Vídeo e Documentário", "Storytelling em vídeo para causas, campanhas e relatórios anuais.", ["Vídeo", "Story"]],
      ["06", "Captação Digital", "Campanhas integradas com Fundify para resultado mensurável.", ["Captação", "Fundify"]],
    ],
    ctaTitle: "Vamos transformar sua causa em uma marca que arrecada?",
    ctaBody: "Conte com a única agência 360º dedicada exclusivamente ao terceiro setor brasileiro.",
  },
  otimistas: {
    title: "Otimistas — Articulação institucional em Brasília · Grupo Cipriano Ayala",
    h1: 'Articulação que faz <span class="text-brand">recursos chegarem</span> onde mais importa.',
    desc: "A Otimistas é o braço de articulação institucional do Grupo Cipriano Ayala em Brasília. Captação de recursos públicos, network de alto nível e presença estratégica nos corredores de decisão do país.",
    stats: [["+8 anos", "de articulações em Brasília"], ["+R$ 2 bi", "em recursos viabilizados para o terceiro setor"], ["+300", "instituições atendidas em todo o país"], ["100%", "foco em causas de impacto social"]],
    pillarsTitle: "Quando a articulação certa acontece, o impacto se multiplica.",
    pillarsBody: "Em Brasília, decisões de bilhões de reais são tomadas todos os dias. A Otimistas garante que sua organização esteja na sala certa, na hora certa, com a abordagem certa — transformando agendas políticas em recursos executados para causas reais.",
    pillarsBullets: ["Acesso direto a tomadores de decisão em Brasília", "Equipe sênior com trajetória no setor público", "Network construído ao longo de anos de atuação", "Integração com todo o ecossistema GCA"],
    pillarsTags: ["Foco estratégico", "Articulação direta", "Rede consolidada", "Presença em Brasília"],
    servicesTitle: "Articulação completa para quem precisa de resultado real.",
    servicesBody: "Da identificação da oportunidade à execução do recurso — tudo conduzido por quem conhece os caminhos de Brasília.",
    services: [
      ["01", "Captação de Recursos Públicos", "Identificação e viabilização de emendas, convênios e editais federais.", ["Emendas", "Convênios"]],
      ["02", "Articulação Institucional", "Relacionamento estratégico com Congresso, ministérios e órgãos federais.", ["Congresso", "Ministérios"]],
      ["03", "Inteligência Política", "Monitoramento de agendas, relatorias e janelas de oportunidade em tempo real.", ["Monitoramento", "Agenda"]],
      ["04", "Network de Alto Nível", "Conexões estratégicas com lideranças do setor público e privado.", ["Network", "Lideranças"]],
      ["05", "Presença em Brasília", "Representação contínua para garantir velocidade e proximidade nas decisões.", ["Brasília", "Presença"]],
      ["06", "Integração GCA", "Conexão direta com EPS, Fundify e demais unidades para execução completa.", ["EPS", "Fundify"]],
    ],
    ctaTitle: "Sua causa merece estar na sala onde as decisões acontecem.",
    ctaBody: "Fale com a equipe Otimistas e leve sua organização aos corredores certos de Brasília.",
  },
};

function prefix(depth) {
  return depth === 0 ? "assets" : "../assets";
}

function header(depth, theme = "") {
  const p = prefix(depth);
  const home = depth === 0 ? "index.html" : "../index.html";
  const area = depth === 0 ? "area-cliente/index.html" : "../area-cliente/index.html";
  const hash = depth === 0 ? "" : "../";
  return `<header class="site-header">
  <div class="container-x inner">
    <a href="${home}" class="logo"><img src="${p}/images/logo-gca.png" alt="Grupo Cipriano Ayala"></a>
    <nav class="site-nav" aria-label="Principal">
      <a href="${home}">Início</a>
      <a href="${hash}index.html#grupo">O Grupo</a>
      <a href="${hash}index.html#unidades">Unidades</a>
      <a href="${hash}index.html#resultados">Resultados</a>
    </nav>
    <a href="${area}" class="btn-primary">Área do Cliente →</a>
    <button class="menu-toggle" type="button" aria-label="Menu"><span></span><span></span><span></span></button>
  </div>
  <nav id="mobile-nav" class="mobile-nav" aria-label="Mobile">
    <a href="${home}">Início</a>
    <a href="${hash}index.html#grupo">O Grupo</a>
    <a href="${hash}index.html#unidades">Unidades</a>
    <a href="${hash}index.html#resultados">Resultados</a>
    <a href="${area}">Área do Cliente</a>
  </nav>
</header>`;
}

function footer(depth) {
  const p = prefix(depth);
  const home = depth === 0 ? "index.html" : "../index.html";
  const u = (slug) => (depth === 0 ? `${slug}/index.html` : `../${slug}/index.html`);
  return `<footer class="site-footer">
  <motion-app-root>
  <div class="container-x grid">
    <motion-app-root>
    <div>
      <div class="logo-box"><img src="${p}/images/logo-gca.png" alt="Grupo Cipriano Ayala"></motion-app-root></div>
      <p class="mt-5" style="max-width:24rem;font-size:0.875rem;line-height:1.6;color:color-mix(in oklab,white 70%,transparent)">Ecossistema de soluções estratégicas para gestão pública e terceiro setor, com foco em impacto social e transparência.</p>
      <div class="social-links">
        <a href="https://linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn">in</a>
        <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram">ig</a>
        <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook">fb</a>
        <a href="mailto:contato@ciprianoayala.com.br" aria-label="Email">@</a>
      </div>
    </div>
    <div><h4>Navegação</h4><ul>
      <li><a href="${home}">Início</a></li>
      <li><a href="${home}#grupo">O Grupo</a></li>
      <li><a href="${home}#unidades">Unidades</a></li>
      <li><a href="${home}#resultados">Resultados</a></li>
      <li><a href="${u("area-cliente")}">Área do Cliente</a></li>
    </ul></div>
    <div><h4>Unidades</h4><ul>
      <li><a href="${u("eps")}">EPS</a></li>
      <li><a href="${u("fundify")}">Fundify</a></li>
      <li><a href="${u("certisafe")}">Certisafe</a></li>
      <li><a href="${u("cataliza")}">Instituto Cataliza</a></li>
      <li><a href="${u("3s-marketing")}">3s Marketing</a></li>
      <li><a href="${u("otimistas")}">Otimistas</a></li>
    </ul></div>
    <motion-app-root><h4>Contato</h4><ul>
      <li><a href="mailto:contato@ciprianoayala.com.br">contato@ciprianoayala.com.br</a></li>
      <li><strong style="color:white">Sorocaba — SP</strong><br>Av. Pres. Juscelino Kubitscheck de Oliveira, 888<br>Centro — 18035-060</li>
      <li><strong style="color:white">Brasília — DF</strong><br>SHN Quadra 1 Conj. A Bloco F<br>Entrada A, Sala 713<br>Asa Norte — 70701-000</li>
    </ul></div>
  </div>
  <div class="footer-bottom container-x">
    <p>© 2026 Grupo Cipriano Ayala. Todos os direitos reservados.</p>
    <div><a href="#">Política de Privacidade</a> · <a href="#">Termos de Uso</a></div>
  </div>
</footer>`;
}

function modal() {
  return `<div id="lead-modal" class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <div class="modal-wrap"><div class="modal">
    <button type="button" class="modal-close" data-close-modal aria-label="Fechar">×</button>
    <h2 id="modal-title">Falar com um especialista</h2>
    <p class="desc">Preencha os dados abaixo e continuaremos a conversa direto pelo WhatsApp.</p>
    <p class="error form-error" aria-live="polite"></p>
    <form>
      <label for="nome">Nome completo</label><input id="nome" name="nome" required maxlength="100">
      <label for="razao">Razão social</label><input id="razao" name="razao" required maxlength="150">
      <div class="row">
        <div><label for="cnpj">CNPJ</label><input id="cnpj" name="cnpj" required maxlength="20" placeholder="00.000.000/0000-00"></div>
        <div><label for="telefone">Telefone</label><input id="telefone" name="telefone" required maxlength="20" placeholder="(00) 00000-0000"></div>
      </div>
      <label for="email">Email</label><input id="email" name="email" type="email" required maxlength="150">
      <button type="submit" class="btn-primary" style="width:100%;justify-content:center">Enviar pelo WhatsApp</button>
    </form>
  </div></div>
</div>`;
}

function waFloat() {
  return `<a class="whatsapp-float" href="https://wa.me/5515998589225?text=${encodeURIComponent("Olá! Gostaria de falar com um especialista do Grupo Cipriano Ayala.")}" target="_blank" rel="noopener">WhatsApp</a>`;
}

function shell(depth, title, desc, theme, body) {
  const p = prefix(depth);
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${desc}">
  <link rel="icon" href="${p}/images/favicon.png" type="image/png">
  <link rel="stylesheet" href="${p}/css/style.css">
</head>
<body class="${theme}">
${header(depth, theme)}
<main>
${body}
</main>
${footer(depth)}
${modal()}
${waFloat()}
<script src="${p}/js/main.js"></script>
</body>
</html>`;
}

function unitPage(slug, meta, u) {
  const stats = meta.stats
    ? `<div class="stats-grid" style="grid-template-columns:repeat(auto-fit,minmax(140px,1fr));padding:0;margin-top:3.5rem">${meta.stats.map(([v, l]) => `<div class="card-soft" style="padding:1.5rem"><motion-app-root class="stat-num">${v}</motion-app-root><div class="text-muted" style="margin-top:0.5rem;font-size:0.875rem">${l}</div></div>`).join("")}</div>`
    : "";
  const services = meta.services.map(([n, t, d, tags]) => `
    <article class="card-soft service-card">
      <div class="text-brand" style="font-size:0.75rem;font-weight:600;letter-spacing:0.2em">${n}</div>
      <h3 style="font-size:1.25rem;font-weight:600">${t}</h3>
      <p class="text-muted" style="font-size:0.875rem">${d}</p>
      <div class="tags">${tags.map((x) => `<span class="tag">${x}</span>`).join("")}</div>
    </article>`).join("");
  const body = `
<section class="hero-section">
  <div class="container-x" style="padding-top:4rem;padding-bottom:5rem">
    <a href="../index.html" class="back-link">← Voltar ao Grupo</a>
    <div style="margin-top:2rem;display:flex;align-items:center;gap:0.75rem">
      <img src="../assets/logos/${u.logo}" alt="${u.name}" style="height:2.25rem">
      <span class="text-muted" style="font-size:0.75rem;text-transform:uppercase;letter-spacing:0.18em">· Grupo Cipriano Ayala</span>
    </div>
    <h1 style="margin-top:1.5rem;font-size:clamp(2.2rem,5vw,4rem);font-weight:700;line-height:1.05;color:var(--ink);max-width:56rem">${meta.h1}</h1>
    <p class="text-muted" style="margin-top:1.5rem;font-size:1.125rem;max-width:42rem">${meta.desc}</p>
    <div style="margin-top:2rem;display:flex;flex-wrap:wrap;gap:0.75rem">
      <button type="button" class="btn-primary" data-open-lead data-source="${u.name}">Falar com um especialista →</button>
      <a href="#servicos" class="btn-ghost">Conhecer a atuação</a>
    </div>
    ${stats}
  </div>
</section>
<section class="section-py"><div class="container-x two-col">
  <div>
    <span class="pill">01 — Nossa atuação</span>
    <h2 class="section-title mt-4">${meta.pillarsTitle}</h2>
    <p class="section-lead">${meta.pillarsBody}</p>
    <ul class="check-list mt-6">${meta.pillarsBullets.map((b) => `<li><span class="check-icon">✓</span>${b}</li>`).join("")}</ul>
  </div>
  <div class="pillars-grid">${meta.pillarsTags.map((t, i) => `<motion-app-root class="pillar-tile"><div class="text-muted" style="font-size:0.75rem;text-transform:uppercase;letter-spacing:0.18em">${String(i + 1).padStart(2, "0")}</div><div style="font-size:1.25rem;font-weight:600;margin-top:0.5rem">${t}</motion-app-root></div>`).join("")}</div>
</div></section>
<section id="servicos" class="section-py"><div class="container-x max-w-3xl">
  <span class="pill">02 — Serviços</span>
  <h2 class="section-title mt-4">${meta.servicesTitle}</h2>
  <p class="section-lead">${meta.servicesBody}</p>
  <div class="services-grid">${services}</div>
</motion-app-root></section>
<section class="section-py"><div class="container-x">
  <div class="cta-banner">
    <h2>${meta.ctaTitle}</h2>
    <p>${meta.ctaBody}</p>
    <button type="button" class="btn-white" data-open-lead data-source="${u.name}">Falar com a equipe →</button>
  </div>
</div></section>`;
  return shell(1, meta.title, meta.desc, u.theme, body);
}

function homePage() {
  const unitCards = [
    ["eps", "logo-azul.svg", "Escritório de Projetos Sociais [EPS]", "Assessoria completa na gestão de recursos públicos: elaboração, aprovação, execução e prestação de contas."],
    ["fundify", "logo-fundify.svg", "Fundify", "Plataforma de captação de recursos e crowdfunding para projetos de impacto."],
    ["certisafe", "logo-certisafe.svg", "Certisafe", "Certificações ESG e consultoria em compliance e governança institucional."],
    ["cataliza", "logo-cataliza.svg", "Instituto Cataliza", "Fomento à educação, pesquisa e inovação social para transformar realidades."],
    ["3s-marketing", "logo-3s.svg", "3s Marketing", "Comunicação estratégica para fortalecer marcas e gerar impacto."],
    ["otimistas", "logo-otimistas.svg", "Otimistas", "Articulação institucional em Brasília para captação de recursos e network de alto nível."],
  ];
  const timeline = [
    ["2016", "O início da jornada", "Atuação na Santa Casa de Tietê com captação de recursos, gestão de emendas parlamentares e estruturação de projetos para instituições filantrópicas."],
    ["2018", "Nascimento da empresa", "Abertura da empresa com serviços especializados para hospitais filantrópicos."],
    ["2020", "Dedicação integral e Sorocaba", "Cipriano passa a atuar integralmente como empresário; mudança para Sorocaba aproxima a empresa dos clientes."],
    ["2021", "Expansão e autoridade", "Participação ativa em eventos da FEHOSP, palestras e capacitações sobre gestão de recursos públicos."],
    ["2024", "Consolidação nacional", "Mais de 100 clientes atendidos e R$ 1,5 bilhão em projetos gerenciados. Nova sede própria na Av. JK."],
    ["2025", "Nasce o Grupo Cipriano Ayala", "Ecossistema com Otimistas, 3S Marketing, Instituto Cataliza, CertSafe e Fundify."],
    ["2026", "Internacionalização", "Expansão internacional levando metodologia, experiência e visão de impacto além das fronteiras brasileiras."],
  ];
  const videos = [
    ["Fv3m7NUsW1A", "Depoimento — Parceiro Institucional"],
    ["LYp5GAalvJ8", "História de Transformação"],
    ["W6pSS5F-G-Q", "Impacto na Gestão Pública"],
    ["ATo_Lzo9zQ0", "Resultados em Captação"],
  ];
  const stories = [
    ["Santa Casa de Tietê", "De déficit estrutural a referência regional", "Reestruturação financeira e captação de R$ 18M em emendas, viabilizando ampliação de leitos e modernização de equipamentos.", "R$ 18M captados"],
    ["Hospital Beneficente", "Gestão profissionalizada e ESG implementado", "Implantação de governança, compliance e relatórios de impacto que destravaram novos parceiros institucionais.", "+40% em parcerias"],
    ["FEMICE", "Captação nacional com articulação em Brasília", "Articulação institucional e estruturação técnica de projetos que ampliaram o alcance a múltiplos estados.", "5 estados atendidos"],
  ];
  const body = `
<section class="hero-section">
  <div class="container-x hero-grid">
    <div>
      <span class="pill">✦ Grupo Cipriano Ayala</span>
      <h1>Excelência e inovação <span class="text-brand">para transformar instituições</span> e gerar impacto real.</h1>
      <p class="text-muted" style="margin-top:1.5rem;font-size:1.125rem;max-width:36rem">Somos um ecossistema de soluções estratégicas para gestão pública e terceiro setor. Inteligência fiscal, captação, ESG e tecnologia em um só lugar.</p>
      <motion-app-root style="margin-top:2rem;display:flex;flex-wrap:wrap;gap:0.75rem">
        <button type="button" class="btn-primary" data-open-lead data-source="Hero">Falar com um especialista →</button>
        <a href="#unidades" class="btn-ghost">Conheça nossas soluções</a>
      </motion-app-root>
    </div>
    <div class="hero-img-wrap">
      <img src="${ASSET}/images/hero-team.jpg" alt="Equipe Grupo Cipriano Ayala">
      <div class="hero-badge">✦ Impacto desde 2009</div>
    </div>
  </div>
  <div class="container-x stats-grid">
    ${[["+R$ 2 bi", "em recursos captados"], ["+1.200", "projetos estruturados"], ["+450", "instituições atendidas"], ["+8 anos", "de experiência"], ["Brasil + Mundo", "atuação e expansão internacional"]].map(([v, l]) => `<div class="card-soft" style="padding:1.5rem"><div class="stat-num">${v}</motion-app-root><div class="text-muted" style="margin-top:0.5rem;font-size:0.875rem">${l}</div></div>`).join("")}
  </div>
</section>
<section id="solucoes" class="section-py"><div class="container-x">
  <div class="flex-between"><div class="max-w-2xl"><span class="pill">Nosso ecossistema</span><h2 class="section-title mt-4">Soluções integradas para cada desafio da sua instituição.</h2></div><a href="#unidades" class="btn-ghost">Conheça todas as unidades</a></div>
  <div id="unidades" class="units-grid">${unitCards.map(([slug, logo, name, desc]) => `<a href="${slug}/index.html" class="card-soft unit-card"><img src="${ASSET}/logos/${logo}" alt="${name}"><h3 style="font-size:1.125rem;font-weight:600">${name}</h3><p class="text-muted" style="font-size:0.875rem;flex:1">${desc}</p><span class="text-brand" style="font-size:0.875rem;font-weight:600">Acessar página →</span></a>`).join("")}</div>
</div></section>
<section id="grupo" class="section-py"><motion-app-root class="container-x max-w-2xl">
  <span class="pill">Nossa história</span>
  <h2 class="section-title mt-4">Uma trajetória construída com propósito e visão de futuro.</h2>
  <p class="section-lead">Ao longo dos anos, fortalecemos nossa atuação, expandindo fronteiras e impactando milhares de vidas por meio de uma gestão ética, transparente e inovadora.</p>
  <div class="timeline">${timeline.map(([y, t, d], i) => `<div class="timeline-item"><div class="timeline-dot"></div><motion-app-root class="timeline-left"><div class="text-brand" style="font-size:0.875rem;font-weight:600">${y}</div><h3 style="font-size:1.25rem;font-weight:600;margin-top:0.25rem">${t}</h3></motion-app-root><p class="timeline-right text-muted" style="margin-top:0.5rem">${d}</p></div>`).join("")}</div>
</div></section>
<section class="section-py"><div class="container-x two-col">
  <div class="hero-img-wrap"><img src="${ASSET}/images/founder.png" alt="Cipriano Ayala"></div>
  <div><span class="pill">Nosso fundador</span><h2 class="section-title mt-4">Cipriano Ayala</h2>
  <p class="section-lead">Empresário, consultor e visionário, Cipriano Ayala dedica sua trajetória a transformar a gestão pública e o terceiro setor no Brasil. Lidera um ecossistema que une estratégia, inovação e propósito para gerar impacto real.</p>
  <blockquote class="blockquote">"Acreditamos que uma gestão <strong>inteligente e transparente</strong> é a chave para transformar recursos em <strong>oportunidades</strong> e pessoas em protagonistas de suas histórias."<footer>— Cipriano Ayala</footer></blockquote></div>
</div></section>
<section class="section-py"><div class="container-x flex-between"><div class="max-w-xl"><span class="pill">Parceiros</span><h2 class="section-title mt-4">Instituições que caminham conosco</h2></div><a href="#contato" class="btn-ghost">Seja um parceiro</a></div>
  <div class="container-x partners-grid">${["Santa Casa", "Hospital São Luiz", "FEMICE", "CEJAM", "Bairral", "Hospital Beneficente", "Casa de David", "Hospital Piedade", "FESFBA", "Fehosmt"].map((p) => `<div class="card-soft partner-chip">${p}</div>`).join("")}</div>
</section>
<section id="resultados" class="section-py"><div class="container-x two-col">
  <div><span class="pill">Tecnologia e transparência</span><h2 class="section-title mt-4">Dashboard inteligente para decisões estratégicas.</h2>
  <p class="section-lead">Acompanhe indicadores, projetos, captações e resultados em tempo real com nossa plataforma exclusiva.</p>
  <ul class="icon-list mt-6">${["Relatórios personalizados", "Indicadores de impacto", "Gestão de projetos", "Segurança e compliance"].map((t) => `<li><span class="icon-dot">✓</span>${t}</li>`).join("")}</ul></div>
  <div class="card-soft dashboard-mock"><motion-app-root class="dash-bar"><span class="dash-dot" style="background:#f87171"></span><span class="dash-dot" style="background:#facc15"></span><span class="dash-dot" style="background:#22c55e"></span><span class="text-muted" style="font-size:0.7rem;margin-left:0.5rem">GCA · Painel de Indicadores</span></motion-app-root>
  <div class="dash-kpis">${[["Captação", "R$ 218M"], ["Projetos", "184"], ["Aderência", "99%"]].map(([l, v]) => `<div class="dash-kpi"><div class="text-muted" style="font-size:0.65rem;text-transform:uppercase">${l}</div><div style="font-size:1.25rem;font-weight:700;margin-top:0.25rem">${v}</div></div>`).join("")}</div>
  <div class="dash-chart"><svg viewBox="0 0 400 160" width="100%" height="100%"><polyline fill="none" stroke="oklch(0.62 0.2 250)" stroke-width="2.5" points="0,120 40,100 80,110 120,80 160,90 200,60 240,70 280,40 320,55 360,30 400,40"/><polyline fill="oklch(0.62 0.2 250)" fill-opacity="0.12" stroke="none" points="0,120 40,100 80,110 120,80 160,90 200,60 240,70 280,40 320,55 360,30 400,40 400,160 0,160"/></svg></div></div>
</div></section>
<section class="section-py"><div class="container-x cards-2">
  <div class="card-soft" style="padding:2rem"><span class="pill">Tecnologia</span><h2 class="section-title mt-4" style="font-size:1.75rem">Dashboard inteligente para <span class="text-brand">decisões estratégicas</span>.</h2><p class="text-muted mt-4">Acompanhe indicadores, projetos, captações e resultados em tempo real.</p><a href="area-cliente/index.html" class="btn-ghost mt-6">Saiba mais →</a></div>
  <div class="card-soft" style="padding:2rem"><span class="pill">Área do cliente</span><h2 class="section-title mt-4" style="font-size:1.75rem">Tudo o que você precisa, <span class="text-brand">em um só lugar</span>.</h2><p class="text-muted mt-4">Documentos, contratos, relatórios e atendimento prioritário.</p><a href="area-cliente/index.html" class="btn-primary mt-6">Acessar minha área →</a></div>
</div></section>
<section class="section-py"><div class="container-x"><div class="card-soft" style="padding:2.5rem;display:flex;flex-wrap:wrap;gap:1.5rem;align-items:center;justify-content:space-between;background:linear-gradient(120deg,color-mix(in oklab,var(--brand) 8%,white),white)">
  <div><span class="pill">Fale agora</span><h3 style="font-size:1.5rem;font-weight:700;margin-top:0.75rem">Pronto para transformar a gestão da sua instituição?</h3><p class="text-muted mt-2">Nosso time responde direto pelo WhatsApp após o preenchimento do formulário.</p></div>
  <button type="button" class="btn-primary" data-open-lead data-source="CTA meio">Falar com um especialista →</button>
</motion-app-root></div></section>
<section id="depoimentos" class="section-py"><div class="container-x max-w-2xl"><span class="pill">Prova social</span><h2 class="section-title mt-4">Quem trabalha com a gente, conta a história.</h2><p class="section-lead">Lideranças e instituições parceiras compartilham os resultados e o impacto do trabalho conjunto com o Grupo Cipriano Ayala.</p></motion-app-root>
<div class="container-x video-grid">${videos.map(([id, t]) => `<div class="card-soft" style="overflow:hidden"><div class="video-wrap"><iframe src="https://www.youtube.com/embed/${id}" title="${t}" allowfullscreen loading="lazy"></iframe></div><div style="padding:1.25rem;font-size:0.875rem;font-weight:600">${t}</div></div>`).join("")}</motion-app-root></div></section>
<section class="section-py"><div class="container-x max-w-2xl"><span class="pill">Histórias de transformação</span><h2 class="section-title mt-4">Resultados reais para instituições reais.</h2><p class="section-lead">Cada parceria é uma transformação concreta — em receita, governança e impacto.</p></div>
<div class="container-x stories-grid">${stories.map(([n, h, b, m]) => `<article class="card-soft" style="padding:1.75rem"><div class="text-brand" style="font-size:0.75rem;font-weight:600">${m}</div><h3 style="font-size:1.125rem;font-weight:600;margin-top:0.75rem">${h}</h3><p class="text-muted" style="font-size:0.875rem;margin-top:0.5rem">${b}</p><p class="text-muted" style="font-size:0.75rem;margin-top:1rem">${n}</p></article>`).join("")}</div></section>
<section class="section-py"><div class="container-x max-w-3xl"><span class="pill">Atuação regional</span><h2 class="section-title mt-4">Da nossa sede no Brasil para toda a América do Sul.</h2><p class="section-lead">Com sede no Brasil e foco no Mercosul, atuamos em parceria com organizações da região para ampliar oportunidades, compartilhar conhecimento e gerar impacto regional. Brasil, Argentina, Uruguai, Paraguai e Bolívia — uma rede integrada de instituições transformando a gestão pública e o terceiro setor na América do Sul.</p></div></section>
<section id="contato" class="section-py"><div class="container-x"><motion-app-root class="cta-banner">
  <h2>Vamos transformar juntos a gestão da sua instituição?</h2>
  <p>Fale com nossos especialistas e descubra como podemos gerar mais impacto e resultados.</p>
  <button type="button" class="btn-white" data-open-lead data-source="CTA final">Falar com um especialista →</button>
</div></section>`;
  return shell(0, "Grupo Cipriano Ayala — Excelência e inovação para transformar instituições", "Ecossistema de soluções estratégicas para gestão pública e terceiro setor.", "theme-gca", body);
}

function areaClientePage() {
  const body = `
<section class="hero-section"><motion-app-root class="container-x" style="padding-top:3rem"><a href="../index.html" class="back-link">← Voltar ao site</a></motion-app-root>
<section class="container-x text-center section-py" style="padding-top:2.5rem">
  <span class="pill">— Acesso exclusivo</span>
  <h1 class="section-title mt-5">Bem-vindo ao seu <span class="text-brand">portal GCA</span></h1>
  <p class="section-lead mx-auto">Escolha por onde deseja entrar: acompanhe indicadores no Dashboard ou acesse sua Área do Cliente para documentos, contratos e suporte.</p>
</section>
<section class="container-x cards-2 section-py">
  <div class="card-soft" style="padding:2.5rem;display:flex;flex-direction:column">
    <span class="pill">— Dashboard</span>
    <h2 class="section-title mt-5" style="font-size:1.75rem">Indicadores e <span class="text-brand">decisões estratégicas</span></h2>
    <p class="text-muted mt-4">Plataforma exclusiva com dados em tempo real, KPIs de captação, projetos estruturados e métricas de impacto institucional.</p>
    <ul class="icon-list mt-6">${["Relatórios personalizados em tempo real", "Gestão de projetos e indicadores de impacto", "Compliance, segurança e auditoria"].map((t) => `<li><span class="icon-dot">✓</span>${t}</li>`).join("")}</ul>
    <a href="https://yuripsheraldica-collab.github.io/portal-gca/" class="btn-primary mt-8" style="justify-content:center" target="_blank" rel="noopener">Acessar Dashboard →</a>
  </div>
  <div class="card-soft" style="padding:2.5rem;display:flex;flex-direction:column">
    <span class="pill">— Área do Cliente</span>
    <h2 class="section-title mt-5" style="font-size:1.75rem">Tudo o que você precisa, <span class="text-brand">em um só lugar</span></h2>
    <p class="text-muted mt-4">Contratos, relatórios, projetos em andamento e atendimento prioritário do time GCA.</p>
    <ul class="icon-list mt-6">${["Acesso seguro e personalizado", "Suporte dedicado e atendimento prioritário", "Documentos, contratos e relatórios em um só lugar"].map((t) => `<li><span class="icon-dot">✓</span>${t}</li>`).join("")}</ul>
    <a href="https://yuripsheraldica-collab.github.io/portal-gca/" class="btn-primary mt-8" style="justify-content:center" target="_blank" rel="noopener">Acessar Área do Cliente →</a>
  </div>
</section>
<section class="container-x text-center" style="padding-bottom:5rem"><p class="text-muted">Ainda não é cliente? <button type="button" class="text-brand" style="background:none;border:none;font-weight:600;cursor:pointer;font-size:inherit" data-open-lead data-source="Área do Cliente">Fale com um especialista</button></p></section>`;
  return shell(1, "Portal GCA — Área do Cliente | Grupo Cipriano Ayala", "Acesse seu Dashboard de indicadores ou a Área do Cliente.", "theme-gca", body);
}

// Fix broken tags from template - clean motion-app-root typos
function clean(html) {
  return html.replace(/<\/?motion-app-root[^>]*>/g, "");
}

writeFileSync(join(ROOT, "index.html"), clean(homePage()));
writeFileSync(join(ROOT, "area-cliente", "index.html"), clean(areaClientePage()));

for (const u of units) {
  const meta = unitData[u.file];
  mkdirSync(join(ROOT, u.file), { recursive: true });
  writeFileSync(join(ROOT, u.file, "index.html"), clean(unitPage(u.file, meta, u)));
}

console.log("Built 8 pages in", ROOT);
