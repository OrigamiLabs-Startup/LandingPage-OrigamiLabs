import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import logoUrl from "../origami-labs/logo.png";
const dashboardUrl = "/dashboard.jpeg";
const landingPageUrl = "/landing-page.png";
const agendaUrl = "/agenda.png";

const WHATSAPP_URL =
  "https://wa.me/SEUNUMERO?text=Ol%C3%A1%2C%20quero%20uma%20an%C3%A1lise%20gratuita%20para%20entender%20qual%20solu%C3%A7%C3%A3o%20faz%20mais%20sentido%20para%20meu%20neg%C3%B3cio.";

const dynamicWords = ["presença", "controle", "ferramenta"];

const navLinks = [
  ["Soluções", "#solucoes"],
  ["Processo", "#processo"],
  ["Planos", "#planos"],
  ["FAQ", "#faq"],
];

const proofItems = ["Visual premium", "Escopo claro", "Entrega objetiva", "WhatsApp como conversão"];

const pains = [
  {
    title: "Instagram não explica tudo",
    text: "O cliente até se interessa, mas precisa garimpar informações básicas antes de confiar.",
  },
  {
    title: "WhatsApp vira operação",
    text: "Perguntas, horários, confirmações e pedidos ficam misturados na mesma conversa.",
  },
  {
    title: "A rotina depende da memória",
    text: "O negócio funciona, mas parte da informação importante não está visível em lugar nenhum.",
  },
];

const principles = [
  {
    label: "01",
    title: "Presença que posiciona",
    text: "Páginas e experiências que explicam seu serviço com clareza antes da primeira conversa.",
  },
  {
    label: "02",
    title: "Atendimento com fluxo",
    text: "Solicitações, horários e status organizados para reduzir ruído e retrabalho.",
  },
  {
    label: "03",
    title: "Rotina com visão",
    text: "Painéis simples para enxergar pedidos, pendências, entradas, estoque ou orçamento.",
  },
];

const solutions = [
  {
    name: "Origami Sites",
    eyebrow: "Presença",
    title: "Uma página profissional para apresentar seu serviço com confiança.",
    text: "Serviços, diferenciais, fotos, prova social e chamada direta para WhatsApp em uma experiência limpa.",
    bullets: ["Landing page", "Prova visual", "Contato direto"],
  },
  {
    name: "Origami Agenda",
    eyebrow: "Atendimento",
    title: "Um fluxo simples para organizar solicitações e reduzir horários confusos.",
    text: "Nome, serviço, data, horário e status em uma visão prática, sem capturar dados sensíveis.",
    bullets: ["Solicitações", "Confirmações", "Status"],
  },
  {
    name: "Origami Organize",
    eyebrow: "Operação",
    title: "Um painel objetivo para visualizar melhor o que acontece no negócio.",
    text: "Pedidos, entradas, despesas, estoque, orçamentos ou pendências em uma estrutura sob medida.",
    bullets: ["Pedidos", "Entradas", "Pendências"],
  },
];

const processSteps = [
  {
    label: "Diagnóstico",
    title: "Entendimento rápido",
    text: "Mapeamos seu negócio, sua rotina e a dificuldade que mais prejudica a percepção do cliente.",
  },
  {
    label: "Escopo",
    title: "Escopo enxuto",
    text: "Definimos se o melhor próximo passo é página, agenda, painel ou uma combinação simples.",
  },
  {
    label: "Design",
    title: "Visual e estrutura",
    text: "Montamos a experiência com identidade premium, copy clara e fluxo pensado para uso real.",
  },
  {
    label: "Publicação",
    title: "Revisão e entrega",
    text: "Ajustamos o necessário, publicamos e deixamos tudo pronto para ser apresentado aos clientes.",
  },
  {
    label: "Resultado",
    title: "Mais clareza",
    text: "Seu negócio passa a explicar melhor o que vende, como atende e como organiza o próximo passo.",
  },
];

const serviceDemos = [
  {
    name: "Origami Sites",
    label: "Presença digital",
    title: "Uma landing page completa para transformar serviço em percepção profissional.",
    text: "Estrutura visual maior para apresentar oferta, diferenciais, seções de confiança e CTA direto.",
    image: landingPageUrl,
    alt: "Screenshot de uma landing page criada para representar o serviço Origami Sites",
    featured: true,
  },
  {
    name: "Origami Agenda",
    label: "Atendimento organizado",
    title: "Agenda personalizada para visualizar horários, pacientes e status da semana.",
    text: "Ideal para profissionais que precisam transformar mensagens soltas em uma rotina de atendimento clara.",
    image: agendaUrl,
    alt: "Screenshot de agenda semanal administrativa usada como exemplo do serviço Origami Agenda",
  },
  {
    name: "Origami Dashboard",
    label: "Rotina visual",
    title: "Dashboard para enxergar leads, propostas, receita e prioridades em um só lugar.",
    text: "Um painel interno simples para acompanhar operação, próximos passos e indicadores do negócio.",
    image: dashboardUrl,
    alt: "Screenshot de dashboard operacional usado como exemplo do serviço Origami Dashboard",
  },
];

const plans = [
  {
    name: "Essencial",
    fit: "Landing page com valor fixo para sair do improviso visual.",
    price: "R$ 497",
    description: "Página profissional com copy, seções essenciais e CTA para WhatsApp.",
    items: ["Diagnóstico inicial", "Página responsiva", "Identidade Origami aplicada", "Publicação assistida"],
  },
  {
    name: "Profissional",
    fit: "Para agenda personalizada, captação e atendimento mais claros.",
    price: "Consultoria",
    description: "Estrutura com página, solicitação de horários e organização simples do fluxo de atendimento.",
    items: ["Diagnóstico do fluxo", "Agenda personalizada", "Solicitações com status", "Proposta por escopo"],
    featured: true,
  },
  {
    name: "Sistema",
    fit: "Para quem precisa organizar a operação.",
    price: "Orçamento",
    description: "Painel interno para acompanhar pedidos, despesas, estoque, orçamentos ou pendências.",
    items: ["Diagnóstico operacional", "Dashboard sob medida", "Campos sem dados sensíveis", "Entrega guiada"],
  },
];

const faqs = [
  {
    question: "A Origami Labs faz apenas sites?",
    answer:
      "Não. A Origami Labs cria páginas, agendas e painéis simples. O foco é escolher a estrutura digital que resolve melhor o problema atual do negócio.",
  },
  {
    question: "Preciso saber exatamente o que quero antes de chamar?",
    answer:
      "Não. A conversa inicial existe justamente para entender se você precisa de presença, atendimento, organização ou uma combinação enxuta.",
  },
  {
    question: "A agenda coleta dados sensíveis?",
    answer:
      "Não é essa a proposta. Os exemplos usam apenas informações operacionais como nome, serviço, data, horário e status.",
  },
  {
    question: "Os planos têm preço fixo?",
    answer:
      "A entrega é definida por escopo. Depois da análise inicial, você recebe uma proposta clara com o que será criado e o que fica fora.",
  },
  {
    question: "O site fica pronto para WhatsApp?",
    answer: "Sim. A conversão principal é pensada para WhatsApp, com chamadas objetivas e links configuráveis.",
  },
];

function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.1,
    });

    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!rootRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".site-header", {
        y: -18,
        autoAlpha: 0,
        duration: 0.7,
        ease: "power3.out",
      });

      gsap.from(".hero-reveal", {
        y: 34,
        autoAlpha: 0,
        filter: "blur(16px)",
        duration: 0.95,
        ease: "power3.out",
        stagger: 0.08,
      });

      gsap.from(".hero-product", {
        y: 58,
        scale: 0.96,
        autoAlpha: 0,
        duration: 1.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.set(element, { y: -28, autoAlpha: 0, filter: "blur(18px)" });

        const tween = gsap.to(element, {
          y: 0,
          autoAlpha: 1,
          filter: "blur(0px)",
          duration: 0.82,
          ease: "power3.out",
          paused: true,
        });

        ScrollTrigger.create({
          trigger: element,
          start: "top 82%",
          end: "bottom 18%",
          onEnter: () => tween.restart(),
          onEnterBack: () => tween.restart(),
          onLeave: () => tween.reverse(),
          onLeaveBack: () => tween.reverse(),
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-split-title]").forEach((title) => {
        const words = title.querySelectorAll(".split-word-inner");

        gsap.set(words, { yPercent: -110, autoAlpha: 0, filter: "blur(12px)" });

        const tween = gsap.to(words, {
          yPercent: 0,
          autoAlpha: 1,
          filter: "blur(0px)",
          duration: 0.72,
          ease: "power3.out",
          stagger: 0.035,
          paused: true,
        });

        ScrollTrigger.create({
          trigger: title,
          start: "top 84%",
          end: "bottom 16%",
          onEnter: () => tween.restart(),
          onEnterBack: () => tween.restart(),
          onLeave: () => tween.reverse(),
          onLeaveBack: () => tween.reverse(),
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((grid) => {
        const items = Array.from(grid.children);

        gsap.set(items, { y: 30, autoAlpha: 0, filter: "blur(18px)" });

        const tween = gsap.to(items, {
          y: 0,
          autoAlpha: 1,
          filter: "blur(0px)",
          duration: 0.82,
          ease: "power3.out",
          stagger: 0.07,
          paused: true,
        });

        ScrollTrigger.create({
          trigger: grid,
          start: "top 80%",
          end: "bottom 16%",
          onEnter: () => tween.restart(),
          onEnterBack: () => tween.restart(),
          onLeave: () => tween.reverse(),
          onLeaveBack: () => tween.reverse(),
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-pricing]").forEach((section) => {
        const toggle = section.querySelector(".pricing-toggle");
        const cards = section.querySelectorAll(".pricing-card-shell");
        const glow = section.querySelector(".pricing-feature-glow");

        if (!toggle || cards.length === 0) return;

        gsap.set(toggle, { y: -18, autoAlpha: 0, filter: "blur(14px)" });
        gsap.set(cards, { y: 44, autoAlpha: 0, filter: "blur(18px)" });

        if (glow) {
          gsap.set(glow, { scale: 0.82, autoAlpha: 0, filter: "blur(28px)" });
        }

        const timeline = gsap.timeline({
          paused: true,
          defaults: {
            ease: "power3.out",
          },
          scrollTrigger: {
            trigger: section,
            start: "top 74%",
            end: "bottom 12%",
            onEnter: () => timeline.restart(),
            onEnterBack: () => timeline.restart(),
            onLeave: () => timeline.reverse(),
            onLeaveBack: () => timeline.reverse(),
          },
        });

        timeline
          .to(toggle, {
            y: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 0.62,
          })
          .to(
            cards,
            {
              y: 0,
              autoAlpha: 1,
              filter: "blur(0px)",
              duration: 0.82,
              stagger: 0.08,
            },
            "-=0.12",
          );

        if (glow) {
          timeline.to(
            glow,
            {
              scale: 1,
              autoAlpha: 1,
              filter: "blur(92px)",
              duration: 0.9,
              ease: "power2.out",
            },
            "-=0.28",
          );
        }
      });

      ScrollTrigger.refresh();
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const scrollToHash = (immediate = false) => {
      const id = window.location.hash.slice(1);
      if (!id) return;

      window.requestAnimationFrame(() => {
        const target = document.getElementById(decodeURIComponent(id));
        if (!target) return;

        if (lenisRef.current) {
          lenisRef.current.scrollTo(target, { offset: -88, immediate });
          return;
        }

        target.scrollIntoView();
      });
    };

    scrollToHash(true);

    const handleHashChange = () => scrollToHash();

    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div ref={rootRef} className="min-h-screen bg-absolute text-ink">
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>

      <header className="site-header fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-absolute/76 backdrop-blur-2xl">
        <nav className="site-container flex h-20 items-center justify-between">
          <Brand />

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map(([label, href]) => (
              <a key={label} className="nav-link" href={href}>
                {label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <a href="#faq" className="nav-link">
              Dúvidas
            </a>
            <a href={WHATSAPP_URL} className="btn-primary" target="_blank" rel="noreferrer">
              Análise gratuita
            </a>
          </div>

          <button
            type="button"
            className="menu-button lg:hidden"
            aria-label="Abrir menu"
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>

        <div id="mobile-menu" className={`mobile-menu ${menuOpen ? "is-open" : ""}`}>
          {navLinks.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>
            Análise gratuita
          </a>
        </div>
      </header>

      <main id="conteudo">
        <Hero />
        <ProofStrip />
        <PainSection />
        <TransformationSection />
        <SolutionsSection />
        <DemoSection />
        <ProcessSection />
        <SecuritySection />
        <PricingSection />
        <FAQSection />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}

function Brand() {
  return (
    <a href="#topo" className="brand-link" aria-label="Origami Labs">
      <span className="brand-mark">
        <img src={logoUrl} alt="" className="h-7 w-7 object-contain" />
      </span>
      <span>
        <strong>Origami Labs</strong>
        <small>Digital solutions</small>
      </span>
    </a>
  );
}

function Hero() {
  return (
    <section id="topo" className="hero-section relative border-b border-divider pt-20">
      <div className="lab-grid" aria-hidden="true" />
      <div className="hero-radial" aria-hidden="true" />

      <div className="hero-shell site-container relative z-10">
        <div className="hero-copy">
          <p className="hero-reveal eyebrow">Origami Labs / Soluções digitais objetivas</p>
          <h1 className="hero-reveal hero-title">
            <span className="hero-title__line">Seu negócio precisa de uma melhor</span>
            <span className="hero-title__line">
              <DynamicWord />
            </span>
          </h1>
          <p className="hero-reveal hero-subtitle">
            Criamos sites, agendas e painéis simples para transformar presença, atendimento e organização em uma experiência mais confiável.
          </p>
          <div className="hero-reveal hero-actions flex flex-col gap-3 sm:flex-row">
            <a href={WHATSAPP_URL} className="btn-primary" target="_blank" rel="noreferrer">
              Quero uma análise gratuita
            </a>
            <a href="#solucoes" className="btn-secondary">
              Ver soluções
            </a>
          </div>
        </div>

        <HeroProduct />
      </div>
    </section>
  );
}

function DynamicWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % dynamicWords.length);
    }, 1600);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <span className="dynamic-word" aria-live="polite">
      <span key={dynamicWords[index]} className="dynamic-word__item">
        {dynamicWords[index]}
      </span>
    </span>
  );
}

function HeroProduct() {
  const tabs = useMemo(
    () => [
      { label: "Presença", meta: "site claro" },
      { label: "Controle", meta: "leads visíveis" },
      { label: "Ferramenta", meta: "rotina objetiva" },
    ],
    [],
  );
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveTab((current) => (current + 1) % tabs.length);
    }, 2600);

    return () => window.clearInterval(timer);
  }, [tabs.length]);

  return (
    <div className="hero-product">
      <div className="hero-tabs" role="tablist" aria-label="Demonstrações Origami">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            type="button"
            role="tab"
            aria-selected={activeTab === index}
            className={activeTab === index ? "is-active" : ""}
            onClick={() => setActiveTab(index)}
          >
            <span>{tab.label}</span>
            <small>{tab.meta}</small>
          </button>
        ))}
      </div>

      <div className="hero-dashboard">
        <img src={dashboardUrl} alt="Mockup escuro de dashboard usado como referência visual da Origami Labs" />
        <span className="hero-guide hero-guide--top" aria-hidden="true" />
        <span className="hero-guide hero-guide--bottom" aria-hidden="true" />
        <span className="hero-guide hero-guide--dash-top" aria-hidden="true" />
        <span className="hero-guide hero-guide--dash-bottom" aria-hidden="true" />
        <span className="hero-guide hero-guide--left" aria-hidden="true" />
        <span className="hero-guide hero-guide--right" aria-hidden="true" />
      </div>
    </div>
  );
}

function ProofStrip() {
  return (
    <section className="proof-strip" aria-label="Pilares da Origami Labs">
      <div className="site-container grid gap-4 md:grid-cols-[0.7fr_1.3fr] md:items-center">
        <p>Estrutura digital para negócios que já estão em operação</p>
        <div className="grid gap-2 sm:grid-cols-4">
          {proofItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function PainSection() {
  return (
    <section className="section-shell" aria-labelledby="dor-title">
      <SectionIntro
        eyebrow="Identificação"
        title="Seu serviço pode ser bom, mas a experiência ao redor dele ainda parece improvisada."
        text="Muitos profissionais já vendem, atendem e entregam. O problema é que a forma de explicar, receber solicitações e organizar informações ainda depende de mensagens soltas."
      />

      <div className="mt-12 grid gap-4 lg:grid-cols-3" data-stagger>
        {pains.map((pain, index) => (
          <article key={pain.title} className="pain-card">
            <CornerMarks />
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{pain.title}</h3>
            <p>{pain.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function TransformationSection() {
  return (
    <section className="section-shell transform-section" aria-labelledby="transformacao-title">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div data-reveal>
          <p className="eyebrow">Sistema de percepção</p>
          <AnimatedTitle id="transformacao-title" text="Uma estrutura digital muda a forma como seu negócio é percebido." />
        </div>
        <div className="copy-panel" data-reveal>
          <p>
            A Origami Labs conecta apresentação, atendimento e organização em uma experiência mais profissional. Não é uma vitrine solta, nem uma ferramenta complicada. É uma camada digital para ajudar o cliente a entender, confiar e avançar.
          </p>
        </div>
      </div>

      <div className="corner-grid mt-14" data-stagger>
        {principles.map((item) => (
          <article key={item.title} className="corner-card">
            <CornerMarks />
            <span>{item.label}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SolutionsSection() {
  return (
    <section id="solucoes" className="section-shell" aria-labelledby="solucoes-title">
      <SectionIntro
        center
        eyebrow="Três soluções"
        title="Escolha a estrutura certa para o gargalo certo."
        text="Cada solução resolve uma parte da experiência do seu negócio: como ele se apresenta, como ele atende e como ele organiza a rotina."
      />

      <div className="solution-grid mt-14" data-stagger>
        {solutions.map((solution, index) => (
          <article key={solution.name} className={`solution-card ${index === 1 ? "is-featured" : ""}`}>
            <CornerMarks />
            <div>
              <span className="solution-card__eyebrow">{solution.eyebrow}</span>
              <h3>{solution.name}</h3>
              <p>{solution.title}</p>
              <small>{solution.text}</small>
            </div>
            <ul>
              {solution.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <a href={WHATSAPP_URL} className="btn-secondary" target="_blank" rel="noreferrer">
              Conversar sobre {solution.eyebrow.toLowerCase()}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function DemoSection() {
  return (
    <section className="section-shell demo-section" aria-labelledby="demos-title">
      <SectionIntro
        eyebrow="Demonstrações"
        title="Três entregas, três formas de organizar melhor a presença do seu negócio."
        text="Cada bloco mostra uma direção real de produto: apresentação, atendimento e visão operacional. A ideia é deixar claro o que a Origami Labs pode construir para cada gargalo."
      />

      <div className="demo-grid mt-12" data-stagger>
        {serviceDemos.map((demo) => (
          <article key={demo.name} className={`demo-card ${demo.featured ? "demo-card--wide" : ""}`}>
            <CornerMarks />
            <div className="demo-card__copy">
              <span>{demo.name}</span>
              <h3>{demo.title}</h3>
              <p>{demo.text}</p>
              <small>{demo.label}</small>
            </div>
            <figure className="demo-frame">
              <img src={demo.image} alt={demo.alt} loading={demo.featured ? "eager" : "lazy"} />
            </figure>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section id="processo" className="section-shell process-section" aria-labelledby="processo-title">
      <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
        <div data-reveal>
          <p className="eyebrow">Como funciona</p>
          <AnimatedTitle id="processo-title" text="Da conversa ao resultado, em cinco movimentos claros." />
          <p className="section-copy">
            A animação orbital representa o processo: tudo parte do diagnóstico e volta para uma entrega prática, publicada e pronta para uso.
          </p>
        </div>

        <div className="orbit-card" data-reveal>
          <div className="orbit-stage" aria-hidden="true">
            <div className="orbit-ring orbit-ring--outer" />
            <div className="orbit-ring orbit-ring--middle" />
            <div className="orbit-ring orbit-ring--inner" />
            <div className="orbit-center">
              <img src={logoUrl} alt="" />
              <span>Origami</span>
            </div>
            <div className="orbit-track">
              {processSteps.map((step, index) => (
                <span key={step.label} className={`orbit-node orbit-node--${index + 1}`}>
                  <strong>{step.label}</strong>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="process-list mt-12" data-stagger>
        {processSteps.map((step, index) => (
          <article key={step.label}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SecuritySection() {
  return (
    <section className="section-shell security-section" aria-labelledby="seguranca-title">
      <SectionIntro
        center
        eyebrow="Simplicidade e segurança"
        title="O sistema deve organizar a rotina, não criar complexidade."
        text="Nos exemplos de agenda e painéis, usamos apenas dados operacionais. A proposta é clareza, não acúmulo de informações sensíveis."
      />

      <div className="security-grid mt-12" data-stagger>
        {["Sem CPF ou documentos", "Sem prontuário ou histórico clínico", "Sem dados bancários", "Campos definidos por escopo"].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </section>
  );
}

function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <section id="planos" className="pricing-section relative overflow-hidden border-b border-divider py-24 lg:py-32" aria-labelledby="planos-title" data-pricing>
      <div className="site-container relative z-10">
        <SectionIntro
          center
          eyebrow="Planos"
          title="Planos por escopo, definidos a partir da necessidade real."
          text="A análise inicial evita vender ferramenta demais. Primeiro entendemos o gargalo, depois fechamos uma entrega objetiva."
        />

        <div className="pricing-toggle">
          <button type="button" className={billing === "monthly" ? "is-active" : ""} onClick={() => setBilling("monthly")}>
            <span>Mensal</span>
          </button>
          <button type="button" className={billing === "yearly" ? "is-active" : ""} onClick={() => setBilling("yearly")}>
            <span>Anual</span>
          </button>
        </div>

        <div className="pricing-grid mt-14">
          {plans.map((plan) => (
            <div key={plan.name} className={`pricing-card-shell ${plan.featured ? "is-featured" : ""}`}>
              {plan.featured ? <span className="pricing-feature-glow" aria-hidden="true" /> : null}
              <article className={`pricing-card ${plan.featured ? "is-featured" : ""}`}>
              <div>
                <div className="pricing-card__top">
                  <h3>{plan.name}</h3>
                  <span>{plan.price}</span>
                </div>
                <p>{plan.fit}</p>
                <strong>{plan.description}</strong>
              </div>
              <a href={WHATSAPP_URL} className="btn-primary" target="_blank" rel="noreferrer">
                Solicitar análise
              </a>
              <ul>
                {plan.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [query, setQuery] = useState("");
  const [openIndex, setOpenIndex] = useState(0);

  const filteredFaqs = faqs.filter((faq) => `${faq.question} ${faq.answer}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <section id="faq" className="section-shell faq-section" aria-labelledby="faq-title">
      <SectionIntro
        center
        eyebrow="FAQ"
        title="Dúvidas comuns antes de começar."
        text="Use a busca se quiser encontrar um ponto específico sobre escopo, agenda, dados ou publicação."
      />

      <div className="faq-panel mt-12" data-reveal>
        <label className="sr-only" htmlFor="faq-search">
          Buscar dúvidas
        </label>
        <input
          id="faq-search"
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpenIndex(0);
          }}
          placeholder="Buscar dúvidas..."
        />

        <div className="faq-list">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <article key={faq.question} className={isOpen ? "is-open" : ""}>
                  <button type="button" aria-expanded={isOpen} onClick={() => setOpenIndex(isOpen ? -1 : index)}>
                    <span>{faq.question}</span>
                    <i aria-hidden="true" />
                  </button>
                  <div className="faq-answer" aria-hidden={!isOpen}>
                    <p>{faq.answer}</p>
                  </div>
                </article>
              );
            })
          ) : (
            <p className="faq-empty">Nenhuma dúvida encontrada. Me chama no WhatsApp e eu respondo direto por lá.</p>
          )}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="px-4 py-20 lg:py-28" aria-labelledby="cta-title">
      <div className="final-cta mx-auto max-w-5xl" data-reveal>
        <p className="eyebrow justify-center">Próximo passo</p>
        <AnimatedTitle id="cta-title" text="Qual parte do seu negócio precisa parecer mais profissional agora?" />
        <p>
          Me chama no WhatsApp e receba uma análise rápida para entender se o melhor próximo passo é uma página, uma agenda ou um painel de organização.
        </p>
        <a href={WHATSAPP_URL} className="btn-primary" target="_blank" rel="noreferrer">
          Quero uma análise gratuita
        </a>
      </div>
    </section>
  );
}

function Footer() {
  const columns = [
    {
      title: "Soluções",
      links: [
        ["Origami Sites", "#solucoes"],
        ["Origami Agenda", "#solucoes"],
        ["Origami Organize", "#solucoes"],
      ],
    },
    {
      title: "Página",
      links: [
        ["Processo", "#processo"],
        ["Planos", "#planos"],
        ["FAQ", "#faq"],
      ],
    },
    {
      title: "Contato",
      links: [
        ["WhatsApp", WHATSAPP_URL],
        ["Análise gratuita", WHATSAPP_URL],
      ],
    },
  ];

  return (
    <footer className="footer-section">
      <div className="footer-glow" aria-hidden="true" />
      <div className="site-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Brand />
          <p>Sites, agendas e sistemas de organização para negócios que precisam transmitir mais confiança.</p>
          <small>Origami Labs © 2026. Todos os direitos reservados.</small>
        </div>

        <div className="footer-links">
          {columns.map((column) => (
            <div key={column.title}>
              <h3>{column.title}</h3>
              {column.links.map(([label, href]) => (
                <a key={label} href={href} target={href.startsWith("https://wa.me") ? "_blank" : undefined} rel={href.startsWith("https://wa.me") ? "noreferrer" : undefined}>
                  {label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

function SectionIntro({
  eyebrow,
  title,
  text,
  center,
}: {
  eyebrow: string;
  title: string;
  text: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "section-intro section-intro--center" : "section-intro"} data-reveal>
      <p className={`eyebrow ${center ? "justify-center" : ""}`}>{eyebrow}</p>
      <AnimatedTitle text={title} />
      <p className="section-copy">{text}</p>
    </div>
  );
}

function AnimatedTitle({ id, text }: { id?: string; text: string }) {
  return (
    <h2 id={id} className="section-title" data-split-title>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="split-title">
        {text.split(" ").map((word, index, words) => (
          <span key={`${word}-${index}`} className="split-word">
            <span className="split-word-inner">{word}</span>
            {index < words.length - 1 ? <span className="split-space"> </span> : null}
          </span>
        ))}
      </span>
    </h2>
  );
}

function CornerMarks() {
  return (
    <>
      <i className="corner corner--tl" aria-hidden="true" />
      <i className="corner corner--tr" aria-hidden="true" />
      <i className="corner corner--bl" aria-hidden="true" />
      <i className="corner corner--br" aria-hidden="true" />
    </>
  );
}

export default App;
