#!/usr/bin/env python3
import re
from pathlib import Path

ROOT = Path(__file__).parent

HOME_STATS = [
    ("+R$ 2 bi", "em recursos captados", ""),
    ("+1.200", "projetos estruturados", ""),
    ("+450", "instituições atendidas", ""),
    ("+8 anos", "de experiência", ""),
    ("Brasil + Mundo", "atuação e expansão internacional", " stat-num--sm"),
]

UNIT_STATS = {
    "eps": [
        ("+R$ 2 bi", "em recursos captados", ""),
        ("+100", "instituições atendidas", ""),
        ("+8 anos", "de experiência", ""),
        ("100%", "de aderência à lei", ""),
    ],
    "fundify": [
        ("+R$ 50M", "captados em campanhas digitais", ""),
        ("+200", "instituições conectadas", ""),
        ("100%", "transparência automatizada", ""),
        ("24/7", "operação na nuvem", ""),
    ],
    "certisafe": [
        ("6", "pilares avaliados", ""),
        ("+150", "instituições certificadas", ""),
        ("ISO", "metodologia internacional", ""),
        ("ESG", "incorporado à avaliação", ""),
    ],
    "3s-marketing": [
        ("+30", "marcas atendidas", ""),
        ("+R$ 1 Mi", "captados em campanhas digitais", ""),
        ("+1 Mi", "pessoas alcançadas por ano", ""),
        ("100%", "foco no terceiro setor", ""),
    ],
    "otimistas": [
        ("+8 anos", "de articulações em Brasília", ""),
        ("+R$ 2 bi", "em recursos viabilizados para o terceiro setor", ""),
        ("+300", "instituições atendidas em todo o país", ""),
        ("100%", "foco em causas de impacto social", ""),
    ],
}

VIDEOS = [
    ("Fv3m7NUsW1A", "Depoimento · Parceiro Institucional"),
    ("LYp5GAalvJ8", "História de Transformação"),
    ("W6pSS5F-G-Q", "Impacto na Gestão Pública"),
    ("ATo_Lzo9zQ0", "Resultados em Captação"),
]


def stats_row(stats, extra=""):
    cards = "".join(
        f'<motion-app-root class="stat-card card-soft"><div class="stat-num{cls}">{v}</div>'
        f'<p class="stat-label">{label}</p></div>'
        for v, label, cls in stats
    )
    return f'<div class="container-x stats-row{extra}">{cards}</div>'.replace(
        "<motion-app-root", "<div"
    ).replace("</motion-app-root>", "</div>")


def footer_html(prefix):
    home = "index.html" if prefix == "assets" else "../index.html"
    area = "area-cliente/index.html" if prefix == "assets" else "../area-cliente/index.html"
    u = lambda s: f"{s}/index.html" if prefix == "assets" else f"../{s}/index.html"
    return f"""<footer class="site-footer">
  <div class="container-x footer-grid">
    <div class="footer-brand">
      <a href="{home}"><img src="{prefix}/images/logo-gca-footer.svg" alt="Grupo Cipriano Ayala" class="footer-logo"></a>
      <p class="footer-desc">Ecossistema de soluções estratégicas para gestão pública e terceiro setor, com foco em impacto social e transparência.</p>
      <div class="social-links">
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">ig</a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">fb</a>
        <a href="mailto:contato@ciprianoayala.com.br" aria-label="Email">@</a>
      </div>
    </div>
    <div class="footer-col">
      <h4>Navegação</h4>
      <ul class="footer-links">
        <li><a href="{home}">Início</a></li>
        <li><a href="{home}#grupo">O Grupo</a></li>
        <li><a href="{home}#unidades">Unidades</a></li>
        <li><a href="{home}#resultados">Resultados</a></li>
        <li><a href="{area}">Área do Cliente</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Unidades</h4>
      <ul class="footer-links">
        <li><a href="{u('eps')}">EPS</a></li>
        <li><a href="{u('fundify')}">Fundify</a></li>
        <li><a href="{u('certisafe')}">Certsafe</a></li>
        <li><a href="{u('cataliza')}">Instituto Cataliza</a></li>
        <li><a href="{u('3s-marketing')}">3s Marketing</a></li>
        <li><a href="{u('otimistas')}">Otimistas</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Contato</h4>
      <ul class="footer-links footer-contact">
        <li><a href="mailto:contato@ciprianoayala.com.br">contato@ciprianoayala.com.br</a></li>
        <li><strong>Sorocaba, SP</strong><br>Av. Pres. Juscelino Kubitscheck de Oliveira, 888<br>Centro, 18035-060</li>
        <li><strong>Brasília, DF</strong><br>SHN Quadra 1 Conj. A Bloco F, Entrada A, Sala 713<br>Asa Norte, 70701-000</li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom container-x">
    <p>© 2026 Grupo Cipriano Ayala. Todos os direitos reservados.</p>
    <div class="footer-legal"><a href="#">Política de Privacidade</a> · <a href="#">Termos de Uso</a></div>
  </div>
</footer>"""


def videos_section():
    cards = []
    for vid, title in VIDEOS:
        cards.append(
            f"""<div class="card-soft video-card">
      <div class="video-wrap video-lazy" data-video-id="{vid}">
        <button type="button" class="video-thumb" aria-label="Reproduzir: {title}">
          <img src="https://img.youtube.com/vi/{vid}/hqdefault.jpg" alt="{title}" loading="lazy" width="480" height="360">
          <span class="video-play" aria-hidden="true">▶</span>
        </button>
        <iframe class="video-iframe" title="{title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe>
      </div>
      <div class="video-caption">{title}</div>
    </div>"""
        )
    return f"""<section id="depoimentos" class="section-py">
  <div class="container-x">
    <div class="max-w-2xl">
      <span class="pill">Prova social</span>
      <h2 class="section-title mt-4">Quem trabalha com a gente, conta a história.</h2>
      <p class="section-lead">Lideranças e instituições parceiras compartilham os resultados e o impacto do trabalho conjunto com o Grupo Cipriano Ayala.</p>
    </div>
    <div class="video-grid">{"".join(cards)}</div>
  </div>
</section>"""


def clean_motion(html):
    html = html.replace("</motion-app-root>", "</div>")
    html = re.sub(r"<motion-app-root\b", "<div", html)
    return html


def clean_dashes(html):
    html = re.sub(r"\s+—\s+", " ", html)
    html = re.sub(r"\s+-\s+", " ", html)
    html = html.replace("01 — ", "01 · ")
    html = html.replace("02 — ", "02 · ")
    html = html.replace("— Acesso", "· Acesso")
    html = html.replace("— Dashboard", "· Dashboard")
    html = html.replace("— Área do Cliente", "· Área do Cliente")
    html = re.sub(r"<footer>—\s*", "<footer>", html)
    return html


def fix_file(path):
    html = path.read_text(encoding="utf-8")
    depth = len(path.parent.relative_to(ROOT).parts)
    prefix = "assets" if depth == 0 else "../assets"

    html = clean_motion(html)
    html = html.replace("Impacto desde 2009", "Impacto desde 2016")
    html = re.sub(
        r'href="(\.\./)?assets/css/style\.css[^"]*"',
        lambda m: f'href="{m.group(1) or ""}assets/css/style.css?v=4"',
        html,
    )

    if path.name == "index.html" and path.parent == ROOT:
        for pat in [
            r'<div class="container-x stats-grid">.*?(?=\n</section>)',
            r'<div class="container-x stats-nested-wrap">.*?(?=\n</section>)',
        ]:
            html, n = re.subn(pat, stats_row(HOME_STATS, " stats-row--home"), html, count=1, flags=re.S)
            if n:
                break

    for unit, stats in UNIT_STATS.items():
        if unit in path.parts:
            html, _ = re.subn(
                r'<div class="stats-grid"[^>]*>.*?</div>\s*(?=\n\s*</motion-app-root>|\n\s*</motion-app-root>\s*\n\s*</section>)',
                stats_row(stats, " stats-row--unit") + "\n    ",
                html,
                count=1,
                flags=re.S,
            )
            html, _ = re.subn(
                r'<motion-app-root class="stats-grid"[^>]*>.*?</motion-app-root>\s*(?=\n\s*</motion-app-root>\s*\n\s*</section>)',
                stats_row(stats, " stats-row--unit") + "\n    ",
                html,
                count=1,
                flags=re.S,
            )

    html = html.replace(
        '<div class="card-soft partner-chip">Hospital São Luiz</motion-app-root><div class="card-soft partner-chip">FEMICE',
        '<div class="card-soft partner-chip">Bairral</div><div class="card-soft partner-chip">FEMICE',
    )
    html = html.replace(
        ">Hospital São Luiz</div><div class=\"card-soft partner-chip\">FEMICE",
        ">Bairral</div><div class=\"card-soft partner-chip\">FEMICE",
    )
    html = html.replace(
        ">CEJAM</div><div class=\"card-soft partner-chip\">Bairral</div>",
        ">CEJAM</div><div class=\"card-soft partner-chip\">Hospital São Luiz</div>",
    )

    if path.name == "index.html" and path.parent == ROOT:
        html = re.sub(r'<section id="depoimentos".*?</section>', videos_section(), html, count=1, flags=re.S)
        html = re.sub(
            r'<section id="contato" class="section-py"><div class="container-x">\s*<h2>.*?</div></section>',
            """<section id="contato" class="section-py"><div class="container-x">
  <div class="cta-banner">
    <h2>Vamos transformar juntos a gestão da sua instituição?</h2>
    <p>Fale com nossos especialistas e descubra como podemos gerar mais impacto e resultados.</p>
    <button type="button" class="btn-white" data-open-lead data-source="CTA final">Falar com um especialista →</button>
  </div>
</div></section>""",
            html,
            count=1,
            flags=re.S,
        )

    html = re.sub(r"<footer class=\"site-footer\".*?</footer>", footer_html(prefix), html, count=1, flags=re.S)
    html = clean_dashes(html)
    path.write_text(html, encoding="utf-8")
    print("OK", path.relative_to(ROOT))


if __name__ == "__main__":
    for p in sorted(ROOT.rglob("*.html")):
        fix_file(p)
