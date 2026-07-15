import { useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, ClipboardCheck, Eye, Layers3, ShieldCheck } from "lucide-react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./styles.css";
gsap.registerPlugin(ScrollTrigger);
const DEFAULT_WHATSAPP_MESSAGE =
  "Olá, conheci a Origami Labs e quero entender qual solução pode organizar melhor o meu negócio.";
const WHATSAPP_URL =
  import.meta.env.VITE_WHATSAPP_URL ||
  `https://wa.me/5583993450505?text=${encodeURIComponent(DEFAULT_WHATSAPP_MESSAGE)}`;
type Solution = {
  path: string;
  key: string;
  label: string;
  eyebrow: string;
  title: string;
  short: string;
  image: string;
  alt: string;
  bullets: string[];
  problem: string;
  solution: string;
  proof: string;
  idealFor: string;
  commercialTitle: string;
  commercialDescription: string;
  researchNote: string;
  researchSource: { label: string; url: string };
  accent: string;
};
const solutions: Solution[] = [
  {
    path: "/cardapio-digital",
    key: "cardapio",
    label: "Origami Cardápio",
    eyebrow: "Apresentação",
    title: "Um cardápio que deixa o pedido mais claro.",
    short: "Link, QR Code e produtos organizados para complementar o cardápio físico e orientar o próximo passo.",
    image: "/cardapio-demo.png",
    alt: "Demonstração visual de cardápio digital com produtos e categorias",
    bullets: ["Link e QR Code", "Categorias organizadas", "Mensagem para WhatsApp"],
    problem: "O cliente procura item, preço e disponibilidade em lugares diferentes.",
    solution: "A Origami transforma os produtos do negócio em uma experiência digital simples de consultar e compartilhar.",
    proof: "Demonstração visual do tipo de cardápio online que pode ser adaptado ao contexto do negócio.",
    idealFor: "Restaurantes, cafés, lanchonetes e negócios que precisam apresentar produtos com mais clareza.",
    commercialTitle: "Mais clareza no menu. Mais espaço para o cliente decidir.",
    commercialDescription: "Uma apresentação organizada reduz a distância entre encontrar um produto e saber como pedir. Isso pode criar melhores condições para conversão, mas não garante aumento de faturamento.",
    researchNote: "Um estudo de 2024 analisou a integração de QR Code em menus e relacionou conveniência de pedido e intenção de compra. O efeito depende da execução, da oferta e da operação de cada negócio.",
    researchSource: { label: "Estudo acadêmico sobre QR Code, conveniência e intenção de compra", url: "https://doi.org/10.1007/978-3-031-65203-5_52" },
    accent: "orange",
  },
  {
    path: "/sites",
    key: "sites",
    label: "Origami Sites",
    eyebrow: "Presença",
    title: "Um site que explica o negócio antes da primeira conversa.",
    short: "Páginas e landing pages para apresentar serviços, organizar informações e encaminhar o contato.",
    image: "/landing-demo.png",
    alt: "Demonstração visual de landing page institucional Origami",
    bullets: ["Oferta mais clara", "Design responsivo", "Contato como próximo passo"],
    problem: "As informações ficam espalhadas nas redes e o visitante não entende rapidamente o que o negócio oferece.",
    solution: "A Origami estrutura uma presença própria com hierarquia, linguagem e uma ação principal bem definida.",
    proof: "Exemplo visual de uma interface institucional, sem representar um case ou resultado de cliente.",
    idealFor: "Prestadores de serviço e negócios que precisam explicar sua oferta antes da primeira conversa.",
    commercialTitle: "Mais profissionalismo percebido antes do primeiro contato.",
    commercialDescription: "Uma página própria organiza sua oferta, mostra que o negócio está preparado e dá ao visitante um próximo passo claro.",
    researchNote: "Pesquisas sobre qualidade da informação em sites móveis relacionam informação mais útil e satisfação a maior intenção de compra. Isso não substitui uma boa oferta nem garante conversão.",
    researchSource: { label: "Estudo sobre qualidade da informação, satisfação e intenção de compra", url: "https://doi.org/10.23839/kabe.2018.33.6.387" },
    accent: "blue",
  },
  {
    path: "/agenda-administrativa",
    key: "agenda",
    label: "Origami Agenda",
    eyebrow: "Atendimento",
    title: "Uma visão mais clara do que precisa acontecer.",
    short: "Organização de horários, solicitações e status para rotinas que não podem depender apenas de mensagens.",
    image: "/agenda.png",
    alt: "Demonstração visual de agenda administrativa",
    bullets: ["Horários visíveis", "Solicitações reunidas", "Status por atendimento"],
    problem: "Horários, confirmações e pedidos se perdem em mensagens, prints e lembretes isolados.",
    solution: "A Origami desenha o fluxo essencial do atendimento em uma interface adequada à rotina da equipe.",
    proof: "Interface demonstrativa para organizar informação operacional sem acumular dados desnecessários.",
    idealFor: "Equipes que trabalham com horários, solicitações e atendimentos recorrentes.",
    commercialTitle: "Menos ruído na rotina. Mais visibilidade do atendimento.",
    commercialDescription: "Um fluxo claro ajuda a equipe a entender o que foi solicitado, o que está confirmado e o que precisa de atenção.",
    researchNote: "Estudos sobre lembretes de agendamento encontraram redução de faltas em contextos específicos. A Origami não transforma essa evidência em garantia: o resultado depende do fluxo e da operação adotados.",
    researchSource: { label: "Estudo sobre lembretes de agendamento e faltas", url: "https://doi.org/10.1001/jama.1983.03340130060033" },
    accent: "green",
  },
  {
    path: "/dashboards",
    key: "dashboard",
    label: "Origami Dashboard",
    eyebrow: "Operação",
    title: "Os sinais importantes em uma visão que ajuda a decidir.",
    short: "Painéis internos para acompanhar leads, propostas, rotina e indicadores essenciais.",
    image: "/dashboard.jpeg",
    alt: "Demonstração visual de dashboard com indicadores operacionais",
    bullets: ["Prioridades visíveis", "Indicadores essenciais", "Leitura rápida"],
    problem: "Leads, propostas e tarefas vivem em planilhas e anotações diferentes.",
    solution: "A Origami reúne os sinais que importam em um painel que pode ser acompanhado e evoluído por etapas.",
    proof: "Exemplo de interface operacional; os campos e integrações dependem do escopo definido para cada negócio.",
    idealFor: "Operações que precisam reunir leads, propostas, tarefas ou indicadores essenciais.",
    commercialTitle: "Mais visão para decidir com menos improviso.",
    commercialDescription: "Um painel enxuto reúne os sinais que importam e ajuda a transformar informação espalhada em prioridade visível.",
    researchNote: "A literatura sobre visualização de dados e dashboards associa a apresentação estruturada ao apoio à decisão. O painel só ajuda quando acompanha dados relevantes e atualizados.",
    researchSource: { label: "Pesquisa sobre visualização de dados e apoio à decisão", url: "https://doi.org/10.63125/cp51y494" },
    accent: "violet",
  },
];
const faqs = [
  ["O que a Origami faz?", "A Origami cria e configura soluções digitais objetivas para negócios locais: cardápios, sites, agendas administrativas e dashboards."],
  ["Preciso escolher uma solução antes da conversa?", "Não. Você pode chegar com o problema. A conversa ajuda a entender se o ponto principal está na apresentação, no atendimento ou na organização interna."],
  ["O cardápio substitui o cardápio físico?", "Não necessariamente. A proposta é complementar o físico com uma experiência digital mais fácil de acessar, atualizar e compartilhar."],
  ["O pedido pelo cardápio é automático?", "O MVP pode organizar o pedido e abrir uma mensagem formatada no WhatsApp. O envio final continua sendo uma ação manual do usuário."],
  ["A Origami trabalha com sistemas complexos?", "A primeira versão parte do fluxo mais importante e do menor escopo que faça sentido. Integrações e automações dependem de validação específica."],
  ["Como o projeto é definido?", "Depois da análise inicial, o escopo, os limites e o próximo passo ficam claros antes de qualquer implementação."],
];
const capabilityTabs = [
  { id: "cardapio", label: "Apresentar", color: "orange", title: "Explique o que você oferece sem depender de improviso.", text: "Uma presença digital organizada para que clientes encontrem produtos, serviços e informações importantes com menos atrito.", solution: solutions[0] },
  { id: "sites", label: "Conectar", color: "blue", title: "Dê ao negócio um lugar próprio para ser entendido.", text: "Sites e landing pages que transformam indicação, busca e conversa em uma apresentação mais clara.", solution: solutions[1] },
  { id: "agenda", label: "Atender", color: "green", title: "Faça a rotina de atendimento caber em uma visão.", text: "Fluxos de horários e solicitações que ajudam a equipe a acompanhar o que precisa acontecer.", solution: solutions[2] },
  { id: "dashboard", label: "Acompanhar", color: "violet", title: "Veja o que merece atenção antes de decidir.", text: "Dashboards enxutos para reunir os sinais operacionais que fazem diferença no dia a dia.", solution: solutions[3] },
];
const solutionBenefitCopy: Record<string, string[]> = {
  cardapio: ["Encontrar produtos e categorias sem depender de mensagens soltas.", "Compartilhar um único link ou QR Code com quem chega ao negócio.", "Orientar o próximo passo no WhatsApp sem transformar a solução em delivery completo."],
  sites: ["Explicar rapidamente o que o negócio oferece e para quem.", "Organizar serviços, diferenciais e informações em uma página própria.", "Transformar visita, indicação ou busca em um próximo passo compreensível."],
  agenda: ["Reunir horários, solicitações e status em uma mesma leitura.", "Diminuir a dependência de prints e lembretes espalhados.", "Dar à equipe uma visão do que precisa acontecer agora."],
  dashboard: ["Colocar prioridades e indicadores essenciais no mesmo lugar.", "Acompanhar leads, propostas e rotina sem alternar entre várias anotações.", "Criar uma visão inicial que pode evoluir conforme a operação amadurece."],
};
function App() {
  const [path, setPath] = useState(() => window.location.pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeCapability, setActiveCapability] = useState("cardapio");
  const ctaUrl = useMemo(() => WHATSAPP_URL, []);
  const page = solutions.find((item) => item.path === path);
  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    document.title = page ? `${page.label} | Origami Labs` : "Origami Labs | Soluções digitais para negócios locais";
    return () => window.removeEventListener("popstate", onPopState);
  }, [page]);
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 0.85, touchMultiplier: 1.1 });
    const update = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    const context = gsap.context(() => {
      const introItems = gsap.utils.toArray<HTMLElement>(".animate-in");
      if (introItems.length) gsap.from(introItems, { y: 26, autoAlpha: 0, duration: 0.75, stagger: 0.06, ease: "power3.out" });
      const revealItems = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      revealItems.forEach((item) => {
        gsap.from(item, { y: 34, autoAlpha: 0, duration: 0.7, ease: "power3.out", immediateRender: false, scrollTrigger: { trigger: item, start: "top 86%", once: true } });
      });
    });
    return () => { context.revert(); gsap.ticker.remove(update); lenis.destroy(); };
  }, [path]);
  const navigate = (href: string) => {
    if (href.startsWith("/#")) {
      if (window.location.pathname !== "/") window.location.href = href;
      else document.querySelector(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
    } else if (href.startsWith("/")) {
      window.history.pushState({}, "", href);
      setPath(href);
      window.scrollTo({ top: 0, behavior: "auto" });
    }
    setMenuOpen(false);
  };
  return (
    <div className={`site-root ${page ? `theme-${page.accent}` : "theme-neutral"}`}>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <header className="site-header">
        <nav className="site-container header-nav">
          <button className="brand-link" onClick={() => navigate("/")} aria-label="Voltar para Origami Labs"><span className="brand-mark"><img src="/logo.png" alt="" /></span><span><strong>Origami Labs</strong><small>Digital solutions</small></span></button>
          <div className="desktop-nav"><button onClick={() => navigate("/#solucoes")}>Soluções</button><button onClick={() => navigate("/#processo")}>Como funciona</button><button onClick={() => navigate("/#faq")}>Dúvidas</button><button onClick={() => navigate("/#contato")}>Contato</button></div>
          <div className="desktop-actions">{page && <button onClick={() => navigate("/")}>Origami Labs</button>}<a className="btn-primary btn-small" href={ctaUrl} target="_blank" rel="noopener noreferrer">Falar com a Origami</a></div>
          <button className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="mobile-menu">Menu</button>
        </nav>
        <div id="mobile-menu" className={`mobile-menu ${menuOpen ? "is-open" : ""}`}><button onClick={() => navigate("/#solucoes")}>Soluções</button><button onClick={() => navigate("/#processo")}>Como funciona</button><button onClick={() => navigate("/#faq")}>Dúvidas</button><button onClick={() => navigate("/#contato")}>Contato</button><a className="btn-primary" href={ctaUrl} target="_blank" rel="noopener noreferrer">Falar com a Origami</a></div>
      </header>
      <main id="conteudo">{page ? <SolutionLanding page={page} ctaUrl={ctaUrl} navigate={navigate} /> : <Home ctaUrl={ctaUrl} navigate={navigate} activeFaq={activeFaq} setActiveFaq={setActiveFaq} activeCapability={activeCapability} setActiveCapability={setActiveCapability} />}</main>
      <Footer navigate={navigate} ctaUrl={ctaUrl} />
    </div>
  );
}
function Home({ ctaUrl, navigate, activeFaq, setActiveFaq, activeCapability, setActiveCapability }: { ctaUrl: string; navigate: (href: string) => void; activeFaq: number | null; setActiveFaq: (value: number | null) => void; activeCapability: string; setActiveCapability: (value: string) => void }) {
  return <>
    <section className="agent-hero"><div className="hero-glow" aria-hidden="true" /><div className="site-container agent-hero__top"><div className="hero-copy"><p className="eyebrow animate-in">Origami Labs</p><h1 className="agent-hero__title animate-in">Estruturas digitais para negócios que querem trabalhar com mais clareza.</h1></div><div className="hero-argument animate-in"><p>A Origami entende o contexto, organiza a informação e aplica a solução adequada ao ponto que mais precisa de atenção.</p></div></div><div className="site-container hero-demo-wrap animate-in"><div className="hero-demo"><div className="demo-toolbar"><span className="demo-brand"><span className="demo-dot" /> Origami / laboratório digital</span><span>posicionamento <b>↗</b></span></div><div className="institutional-hero-note"><strong>Apresentar. Atender. Organizar.</strong><span>Uma visão geral das frentes em que a Origami pode trabalhar com negócios locais.</span></div></div></div></section>
    <section className="signal-strip"><div className="site-container signal-grid"><span>Origami Cardápio</span><span>Origami Sites</span><span>Origami Agenda</span><span>Origami Dashboard</span></div></section>
    <section className="institutional-section section-shell" data-reveal><div className="site-container institutional-layout"><div><p className="eyebrow">Nosso posicionamento</p><h2>Resolver o ponto de atrito certo antes de adicionar complexidade.</h2><p>A Origami trabalha com negócios locais que precisam apresentar melhor o que oferecem, organizar o atendimento ou enxergar a própria operação com mais clareza.</p></div><div className="institutional-points"><div><strong>Para quem trabalhamos</strong><span>Negócios locais, prestadores de serviço e equipes em fase de organização digital.</span></div><div><strong>Nossa especialidade</strong><span>Transformar contexto, informação e fluxo em uma solução digital compreensível.</span></div><div><strong>O que valorizamos</strong><span>Escopo visível, linguagem direta e evolução baseada no uso real.</span></div></div></div></section>
    <section id="solucoes" className="capabilities-section section-shell"><div className="site-container"><SectionHeading eyebrow="O sistema Origami" title="Uma estrutura digital para cada ponto de atrito." text="Passe pelas quatro soluções e veja como cada uma organiza um momento diferente da rotina." /><ScrollSystem navigate={navigate} activeCapability={activeCapability} setActiveCapability={setActiveCapability} /></div></section>
    <section id="processo" className="process-section section-shell"><div className="site-container"><SectionHeading eyebrow="Como funciona" title="Da primeira conversa à solução em uso." text="Um processo em quatro etapas para entender o contexto, organizar a direção, aplicar a solução e entregar uma estrutura pronta para evoluir." /><div className="process-grid process-grid--four" data-reveal><article><span className="step-number">01</span><div><b className="step-tag tag-green">● Entender</b><h3>Fazer o briefing</h3><p>Mapeamos o que hoje está difícil de apresentar, atender ou acompanhar.</p></div></article><article><span className="step-number">02</span><div><b className="step-tag tag-violet">● Organizar</b><h3>Pesquisar e definir</h3><p>Organizamos ideias, referências e o escopo necessário para a solução.</p></div></article><article><span className="step-number">03</span><div><b className="step-tag tag-orange">● Aplicar</b><h3>Colocar a solução em prática</h3><p>Transformamos a direção definida em uma experiência digital utilizável.</p></div></article><article><span className="step-number">04</span><div><b className="step-tag tag-blue">● Entregar</b><h3>Publicar e orientar</h3><p>Publicamos a primeira versão e deixamos claro o próximo passo de evolução.</p></div></article></div><div className="process-footer"><span>O primeiro passo é entender o que merece atenção agora.</span><button className="btn-secondary" onClick={() => navigate("/#contato")}>Conversar sobre o cenário →</button></div></div></section>
    <section className="trust-section section-shell"><div className="site-container trust-layout"><div><p className="eyebrow">Confiança por clareza</p><h2>Uma base digital para vender, atender e operar melhor.</h2></div><div className="trust-copy"><p>Não usamos números inventados nem uma solução universal. A Origami entrega uma estrutura compreensível, visualmente consistente e alinhada ao que foi combinado.</p><div className="trust-list"><div><strong>Escopo</strong><span>O que entra fica claro antes de começar.</span></div><div><strong>Interface</strong><span>O visual ajuda a pessoa a encontrar o que precisa.</span></div><div><strong>Evolução</strong><span>A primeira versão pode crescer com uso real.</span></div></div></div></div></section>
    <section className="outcomes-section section-shell" data-reveal><div className="site-container"><p className="eyebrow">O que muda na prática</p><h2>Quatro caminhos para deixar a rotina mais organizada.</h2><div className="outcome-grid">{solutions.map((item) => <button key={item.path} className={`outcome-card outcome-${item.accent}`} onClick={() => navigate(item.path)}><span>{item.eyebrow}</span><h3>{item.label}</h3><p>{item.short}</p><b>Ver solução ↗</b></button>)}</div></div></section>
    <section className="faq-section section-shell" id="faq"><div className="site-container faq-layout"><div className="faq-intro"><p className="eyebrow">Dúvidas</p><h2>Perguntas que aparecem antes do próximo passo.</h2><p>Respostas diretas para entender se a Origami é adequada ao momento do seu negócio.</p><a className="faq-contact" href={ctaUrl} target="_blank" rel="noopener noreferrer"><span>◌</span><span><strong>Ainda tem dúvidas?</strong><small>Falar com a Origami ↗</small></span></a></div><div className="faq-panel"><div className="faq-list">{faqs.map(([question, answer], index) => <article className={activeFaq === index ? "is-open" : ""} key={question}><button onClick={() => setActiveFaq(activeFaq === index ? null : index)} aria-expanded={activeFaq === index}><span>{question}</span><b>+</b></button><div className="faq-answer"><p>{answer}</p></div></article>)}</div></div></div></section>
    <CTA ctaUrl={ctaUrl} />
  </>;
}
function HonestProof() {
  const proofItems = [
    { title: "Demonstração contextualizada", text: "Você visualiza como a solução pode organizar o ponto de atrito específico do seu negócio.", Icon: Eye },
    { title: "Primeira versão com escopo", text: "A entrega começa pelo que precisa funcionar agora, sem adicionar recursos desnecessários.", Icon: ClipboardCheck },
    { title: "Base pronta para evoluir", text: "A estrutura pode ser ajustada depois que o uso real mostrar o próximo passo.", Icon: ShieldCheck },
  ];
  return <section className="proof-section section-shell"><div className="site-container"><div className="proof-heading"><div><p className="eyebrow">O que você recebe</p><h2>Uma solução clara para começar pelo ponto certo.</h2></div><p>A proposta é transformar uma necessidade concreta em uma experiência digital compreensível, com escopo visível e espaço para evolução.</p></div><div className="proof-grid">{proofItems.map(({ title, text, Icon }) => <article key={title}><Icon aria-hidden="true" strokeWidth={1.5} /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>;
}
function ScrollSystem({ navigate, activeCapability, setActiveCapability }: { navigate: (href: string) => void; activeCapability: string; setActiveCapability: (value: string) => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 105px", "end 105px"] });
  const progressScale = useTransform(scrollYProgress, [0, 1], [0.04, 1]);
  const active = capabilityTabs.find((item) => item.id === activeCapability) || capabilityTabs[0];
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(capabilityTabs.length - 1, Math.max(0, Math.floor(latest * capabilityTabs.length)));
    const nextId = capabilityTabs[index]?.id;
    if (nextId && nextId !== activeCapability) setActiveCapability(nextId);
  });
  const goToSolution = (id: string) => {
    setActiveCapability(id);
    stepRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return <div ref={sectionRef} className="scroll-system">
    <aside className="scroll-system__nav" aria-label="Progresso das soluções Origami">
      <div className="scroll-system__progress" aria-hidden="true"><motion.span style={{ scaleY: progressScale }} /></div>
      <div className="scroll-system__nav-items">
        {capabilityTabs.map((item, index) => <motion.button key={item.id} className={`scroll-system__tab ${active.id === item.id ? "is-active" : ""}`} onClick={() => goToSolution(item.id)} aria-current={active.id === item.id ? "step" : undefined} initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .4 }} transition={{ delay: index * .08, duration: .5, ease: [0.16, 1, .3, 1] }}><motion.span className={`scroll-system__icon icon-${item.color}`} animate={{ scale: active.id === item.id ? 1.18 : 1, rotate: active.id === item.id ? 0 : -10 }} transition={{ type: "spring", stiffness: 220, damping: 18 }}>{item.id === "cardapio" ? <Layers3 size={16} aria-hidden="true" /> : item.id === "sites" ? <Eye size={16} aria-hidden="true" /> : item.id === "agenda" ? <CheckCircle2 size={16} aria-hidden="true" /> : <ClipboardCheck size={16} aria-hidden="true" />}</motion.span><span><strong>{item.label}</strong><small>{item.solution.label}</small></span><b>0{index + 1}</b></motion.button>)}
      </div>
      <p className="scroll-system__hint">Continue descendo para passar pelas soluções.</p>
    </aside>
    <div className="scroll-system__content">
      <div className="scroll-system__panel-wrap">
        <div className={`scroll-system__panel capability-card capability-card--${active.color}`}>
          <motion.article key={active.id} className="scroll-system__panel-inner" initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .18, ease: [0.16, 1, .3, 1] }}>
            <div className="capability-card__copy"><motion.span className="pill" initial={{ opacity: 1, scale: 1 }} animate={{ opacity: 1, scale: 1 }}>{active.solution.label}</motion.span><h3>{active.title}</h3><p>{active.text}</p><button className="text-link" onClick={() => navigate(active.solution.path)}>Conhecer esta solução <b>→</b></button></div>
            <motion.div className="capability-card__image" initial={{ opacity: 1, scale: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .18, ease: [0.16, 1, .3, 1] }}><img src={active.solution.image} alt={active.solution.alt} loading="lazy" /></motion.div>
          </motion.article>
        </div>
      </div>
      <div className="scroll-system__steps" aria-hidden="true">{capabilityTabs.map((item) => <div key={item.id} ref={(node) => { stepRefs.current[item.id] = node; }} className="scroll-system__step"><span>{item.solution.label}</span><strong>{item.label}</strong></div>)}</div>
    </div>
  </div>;
}
function SolutionLanding({ page, ctaUrl, navigate }: { page: Solution; ctaUrl: string; navigate: (href: string) => void }) {
  const benefits = solutionBenefitCopy[page.key] || page.bullets;
  return <div className={`solution-page solution-page--${page.accent}`}>
    <section className="sage-solution-hero">
      <div className="site-container sage-solution-hero__inner">
        <span className="sage-badge">{page.label} · {page.eyebrow}</span>
        <h1>{page.title}</h1>
        <p>{page.short}</p>
        <div className="hero-actions"><a className="btn-primary" href={ctaUrl} target="_blank" rel="noopener noreferrer">Falar com a Origami <span>↗</span></a><a className="btn-secondary" href="#estrutura">Entender a solução</a></div>
      </div>
      <div className="site-container">
        <div className="sage-stage-frame" data-reveal><div className="sage-stage-top"><span>DEMONSTRAÇÃO VISUAL</span><span>{page.label}</span></div><img src={page.image} alt={page.alt} loading="eager" /><div className="sage-stage-caption"><strong>Exemplo visual da solução</strong><span>{page.proof}</span></div></div>
      </div>
    </section>
    <section id="estrutura" className="solution-benefits section-shell" data-reveal>
          <div className="site-container"><div className="sage-section-intro"><p className="eyebrow">Para quem é</p><h2>{page.idealFor}</h2><p>Se você se reconhece nessa situação, esta solução pode ser um ponto de partida para organizar o que hoje está disperso.</p></div><div className="solution-benefit-grid">{benefits.map((benefit, index) => <motion.article key={benefit} className="solution-benefit-card" initial={{ opacity: 1, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .35 }} transition={{ delay: index * .08, duration: .55 }}><span className="solution-benefit-number">0{index + 1}</span><span className="solution-benefit-icon" aria-hidden="true">✦</span><p>{benefit}</p></motion.article>)}</div></div>
        </section>
    <section className="commercial-proof section-shell" data-reveal><div className="site-container commercial-proof__layout"><div><p className="eyebrow">Por que isso importa</p><h2>{page.commercialTitle}</h2><p>{page.commercialDescription}</p><a className="btn-primary" href={ctaUrl} target="_blank" rel="noopener noreferrer">Quero esta estrutura <span>↗</span></a></div><aside><p className="commercial-proof__label">O que a pesquisa indica</p><p>{page.researchNote}</p><a href={page.researchSource.url} target="_blank" rel="noopener noreferrer">{page.researchSource.label} ↗</a></aside></div></section>
    <section className="solution-problem section-shell"><div className="site-container"><div className="sage-section-intro sage-section-intro--left"><p className="eyebrow">O problema que organiza a conversa</p><h2>{page.problem}</h2></div><div className="solution-proof__grid"><div><span>Como a Origami resolve</span><p>{page.solution}</p></div><div><span>O que está sendo demonstrado</span><p>{page.proof}</p></div></div></div></section>
    <section className="solution-deliverables section-shell"><div className="site-container"><div className="sage-section-intro sage-section-intro--left"><p className="eyebrow">O que entra na primeira versão</p><h2>Uma solução com escopo visível.</h2><p>A estrutura é definida para o momento atual. Se a operação pedir mais depois, ela pode evoluir com contexto.</p></div><div className="deliverables-list">{page.bullets.map((bullet, index) => <div key={bullet}><span>0{index + 1}</span><strong>{bullet}</strong></div>)}</div></div></section>
    <section className="solution-scope section-shell" data-reveal><div className="site-container"><div className="sage-section-intro"><p className="eyebrow">Como começamos</p><h2>Uma conversa, uma primeira versão, um próximo passo claro.</h2></div><div className="solution-scope-grid"><article><span>01</span><h3>Entender</h3><p>Identificar o que está difícil de apresentar, atender ou acompanhar hoje.</p></article><article className="is-highlighted"><span>02</span><h3>Estruturar</h3><p>Escolher a menor solução que organize esse ponto sem criar complexidade desnecessária.</p><a className="btn-primary" href={ctaUrl} target="_blank" rel="noopener noreferrer">Conversar sobre isso ↗</a></article><article><span>03</span><h3>Evoluir</h3><p>Observar o uso real e decidir o que merece entrar depois, com contexto.</p></article></div></div></section>
    <HonestProof />
    <CTA ctaUrl={ctaUrl} label={page.label} />
  </div>;
}
function SectionHeading({ eyebrow, title, text }: { eyebrow?: string; title: string; text: string }) { return <div className="section-heading" data-reveal><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div><p>{text}</p></div>; }
function CTA({ ctaUrl, label = "uma solução" }: { ctaUrl: string; label?: string }) { return <section className="final-cta section-shell" id="contato"><div className="site-container final-cta__inner" data-reveal><p className="eyebrow">Próximo passo</p><h2>Quer entender se {label} é o melhor começo?</h2><p>Conte o que hoje está difícil de apresentar, atender ou organizar. A conversa começa por aí.</p><div className="hero-actions"><a className="btn-primary" href={ctaUrl} target="_blank" rel="noopener noreferrer">Falar com a Origami <span>↗</span></a><a className="btn-secondary" href="#faq">Ver dúvidas frequentes</a></div></div></section>; }
function Footer({ navigate, ctaUrl }: { navigate: (href: string) => void; ctaUrl: string }) { return <footer className="footer-section"><div className="site-container footer-grid"><div className="footer-brand"><button className="brand-link" onClick={() => navigate("/")}><span className="brand-mark"><img src="/logo.png" alt="" /></span><span><strong>Origami Labs</strong><small>Digital solutions</small></span></button><p>Soluções digitais objetivas para negócios locais que querem apresentar, atender e organizar melhor.</p><div className="footer-socials"><span>◌</span><span>in</span><span>◎</span></div><small>Origami Labs © 2026</small></div><div className="footer-links"><div><h3>Soluções</h3>{solutions.map((item) => <button key={item.path} onClick={() => navigate(item.path)}>{item.label.replace("Origami ", "")}</button>)}</div><div><h3>Explorar</h3><button onClick={() => navigate("/#processo")}>Como funciona</button><button onClick={() => navigate("/#faq")}>Dúvidas</button><button onClick={() => navigate("/#contato")}>Contato</button></div><div><h3>Contato</h3><a href={ctaUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a><a href={ctaUrl} target="_blank" rel="noopener noreferrer">Análise inicial</a><span className="footer-status">● Canal humano disponível</span></div></div></div></footer>; }
export default App;