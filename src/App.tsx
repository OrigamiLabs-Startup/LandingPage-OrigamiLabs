import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_WHATSAPP_MESSAGE =
  "Olá, quero uma análise rápida para entender se preciso de uma página, agenda ou dashboard.";

const WHATSAPP_URL =
  import.meta.env.VITE_WHATSAPP_URL ||
  `https://wa.me/?text=${encodeURIComponent(DEFAULT_WHATSAPP_MESSAGE)}`;

const navItems = [
  { label: "Soluções", href: "#solucoes" },
  { label: "Demonstrações", href: "#demos" },
  { label: "Planos", href: "#planos" },
  { label: "FAQ", href: "#faq" },
];

const dynamicWords = ["presença", "agenda", "ferramenta", "organização"];

const proofItems = [
  "Visual premium",
  "Escopo claro",
  "Entrega objetiva",
  "WhatsApp como conversão",
];

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

const solutions = [
  {
    name: "Origami Sites",
    eyebrow: "Presença",
    title: "Landing pages e sites de apresentação para melhorar percepção e conversão.",
    text: "Para negócios que precisam explicar melhor o que vendem e transformar interesse em conversa qualificada.",
    image: "/landing-slice.png",
    alt: "Trecho superior de landing page premium criada pela Origami Labs",
    bullets: ["Copy orientada a conversão", "Design responsivo", "Prova visual clara"],
  },
  {
    name: "Origami Agenda",
    eyebrow: "Atendimento",
    title: "Agendas personalizadas para organizar horários, solicitações e atendimentos.",
    text: "Para quem perde tempo controlando disponibilidade, confirmações e pedidos por mensagens soltas.",
    image: "/agenda.png",
    alt: "Interface de agenda personalizada com horários e solicitações",
    bullets: ["Horários claros", "Solicitações centralizadas", "Status de atendimento"],
  },
  {
    name: "Origami Dashboard",
    eyebrow: "Operação",
    title: "Painéis internos para visualizar leads, propostas, rotina e indicadores simples.",
    text: "Para quem precisa parar de depender de planilhas soltas e enxergar o que merece atenção.",
    image: "/dashboard.jpeg",
    alt: "Dashboard interno com leads, propostas e indicadores simples",
    bullets: ["Visão de pipeline", "Prioridades do dia", "Indicadores essenciais"],
  },
];

const plans = [
  {
    name: "Presença",
    fit: "Site de conversão",
    description: "Para quem precisa parecer profissional e receber conversas melhores.",
    items: ["Landing page completa", "Copy de oferta", "Prova visual", "Publicação assistida"],
    featured: false,
  },
  {
    name: "Operação",
    fit: "Agenda ou dashboard",
    description: "Para quem já vende, mas perde tempo organizando atendimento e rotina.",
    items: ["Mapeamento do fluxo", "Interface sob medida", "Dados essenciais", "Treinamento de uso"],
    featured: true,
  },
  {
    name: "Sistema leve",
    fit: "Estrutura combinada",
    description: "Para negócios que precisam unir vitrine, entrada de lead e controle interno.",
    items: ["Landing + ferramenta", "Painel simples", "Automações pontuais", "Evolução por etapas"],
    featured: false,
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
    answer:
      "Sim. A conversão principal é pensada para WhatsApp, com chamadas objetivas e links configuráveis.",
  },
];

function App() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [faqQuery, setFaqQuery] = useState("");
  const [activeFaq, setActiveFaq] = useState(0);
  const ctaUrl = useMemo(() => WHATSAPP_URL, []);

  const filteredFaqs = faqs.filter((faq) =>
    `${faq.question} ${faq.answer}`.toLowerCase().includes(faqQuery.toLowerCase()),
  );

  useEffect(() => {
    const tabTimer = window.setInterval(() => {
      setActiveTab((current) => (current + 1) % solutions.length);
    }, 2600);

    return () => window.clearInterval(tabTimer);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.1,
    });

    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!rootRef.current) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => {
      if (reduceMotion) {
        gsap.set("[data-reveal], [data-stagger] > *, .site-header, .hero-reveal, .hero-product", {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
        });
        return;
      }

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

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((item) => {
        gsap.from(item, {
          y: -28,
          autoAlpha: 0,
          filter: "blur(18px)",
          duration: 0.82,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 86%",
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-split-title]").forEach((title) => {
        const words = title.querySelectorAll(".split-word-inner");
        gsap.from(words, {
          yPercent: -110,
          autoAlpha: 0,
          filter: "blur(12px)",
          duration: 0.72,
          ease: "power3.out",
          stagger: 0.035,
          scrollTrigger: {
            trigger: title,
            start: "top 86%",
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
        const items = Array.from(group.children);
        gsap.from(items, {
          y: 30,
          autoAlpha: 0,
          filter: "blur(18px)",
          duration: 0.82,
          ease: "power3.out",
          stagger: 0.07,
          scrollTrigger: {
            trigger: group,
            start: "top 84%",
            once: true,
          },
        });
      });

      ScrollTrigger.refresh();
    }, rootRef);

    return () => context.revert();
  }, []);

  useEffect(() => {
    if (window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }

    const scrollToHash = (immediate = false, delay = 0) => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;

      window.setTimeout(() => {
        const target = document.getElementById(decodeURIComponent(hash));
        if (!target) return;

        ScrollTrigger.refresh();
        const top = target.getBoundingClientRect().top + window.scrollY - 88;

        if (lenisRef.current) {
          lenisRef.current.scrollTo(top, { immediate });
          return;
        }

        window.scrollTo({
          top,
          behavior: immediate ? "auto" : "smooth",
        });
      }, delay);
    };

    scrollToHash(true, 350);
    const onHashChange = () => scrollToHash(false);
    window.addEventListener("hashchange", onHashChange);

    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <div ref={rootRef} className="site-root">
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>

      <header className="site-header">
        <nav className="site-container header-nav">
          <Brand />

          <div className="desktop-nav">
            {navItems.map((item) => (
              <a key={item.href} className="nav-link" href={item.href}>
                {item.label}
              </a>
            ))}
          </div>

          <div className="desktop-actions">
            <a className="nav-link" href="#faq">
              Dúvidas
            </a>
            <a className="btn-primary" href={ctaUrl} target="_blank" rel="noreferrer">
              Análise gratuita
            </a>
          </div>

          <button
            type="button"
            className="menu-button"
            aria-label="Abrir menu"
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            Menu
          </button>
        </nav>

        <a className="mobile-cta" href={ctaUrl} target="_blank" rel="noreferrer">
          Contato
        </a>

        <div id="mobile-menu" className={`mobile-menu ${menuOpen ? "is-open" : ""}`}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
          <a href={ctaUrl} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>
            Análise gratuita
          </a>
        </div>
      </header>

      <main id="conteudo">
        <section id="topo" className="hero-section">
          <div className="lab-grid" aria-hidden="true" />
          <div className="hero-radial" aria-hidden="true" />

          <div className="hero-shell site-container">
            <div className="hero-copy">
              <p className="hero-reveal eyebrow justify-center">
                Origami Labs / Soluções digitais objetivas
              </p>
              <h1 className="hero-reveal hero-title">
                <span className="hero-title__line">Seu negócio precisa de uma</span>
                <span className="hero-title__line">
                  <DynamicWord /> <span className="hero-title__accent">melhor</span>
                </span>
              </h1>
              <p className="hero-reveal hero-subtitle">
                Criamos sites, agendas administrativas e dashboards para transformar presença,
                atendimento e organização em uma ferramenta para pequenos negócios faturarem mais
                e se organizarem melhor.
              </p>
              <div className="hero-reveal hero-actions">
                <a className="btn-primary" href={ctaUrl} target="_blank" rel="noreferrer">
                  Quero uma análise gratuita
                </a>
                <a className="btn-secondary" href="#solucoes">
                  Ver soluções
                </a>
              </div>
            </div>

            <div className="hero-product">
              <div className="hero-tabs" role="tablist" aria-label="Demonstrações Origami">
                {solutions.map((solution, index) => (
                  <button
                    key={solution.eyebrow}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === index}
                    className={activeTab === index ? "is-active" : ""}
                    onClick={() => setActiveTab(index)}
                  >
                    <span>{index === 1 ? "Agenda" : index === 2 ? "Painel" : solution.eyebrow}</span>
                    <small>{solution.name.replace("Origami ", "")}</small>
                  </button>
                ))}
              </div>

              <div className="hero-dashboard">
                <img
                  src={solutions[activeTab].image}
                  alt={solutions[activeTab].alt}
                  loading="eager"
                />
                <span className="hero-guide hero-guide--top" aria-hidden="true" />
                <span className="hero-guide hero-guide--bottom" aria-hidden="true" />
                <span className="hero-guide hero-guide--dash-top" aria-hidden="true" />
                <span className="hero-guide hero-guide--dash-bottom" aria-hidden="true" />
                <span className="hero-guide hero-guide--left" aria-hidden="true" />
                <span className="hero-guide hero-guide--right" aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>

        <section className="proof-strip" aria-label="Pilares da Origami Labs">
          <div className="site-container proof-grid">
            <p>Estrutura digital para negócios locais se profissionalizarem</p>
            <div>
              {proofItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell" aria-labelledby="dor-title">
          <SectionIntro
            eyebrow="Identificação"
            title="Seu serviço pode ser bom, mas a experiência ao redor dele ainda parece improvisada."
            text="Muitos profissionais já vendem, atendem e entregam. O problema é que a forma de explicar, receber solicitações e organizar informações ainda depende de mensagens soltas."
          />

          <div className="pain-grid" data-stagger>
            {pains.map((pain, index) => (
              <article className="corner-card pain-card" key={pain.title}>
                <CornerMarks />
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{pain.title}</h3>
                <p>{pain.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="solucoes" className="section-shell" aria-labelledby="solucoes-title">
          <SectionIntro
            center
            eyebrow="Três caminhos"
            title="Escolha a solução certa para você."
            text="Cada solução resolve uma parte da experiência do seu negócio ou serviço: como ele se posiciona na internet, como ele atende e como ele organiza a rotina e clientes."
          />

          <div className="solution-grid" data-stagger>
            {solutions.map((solution, index) => (
              <article className={`solution-card ${index === 1 ? "is-featured" : ""}`} key={solution.name}>
                <CornerMarks />
                <figure className="solution-shot">
                  <img src={solution.image} alt={solution.alt} loading={index === 0 ? "eager" : "lazy"} />
                </figure>
                <div className="solution-card__copy">
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
                <a className="btn-secondary" href={ctaUrl} target="_blank" rel="noreferrer">
                  Conversar sobre {solution.eyebrow.toLowerCase()}
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="demos" className="section-shell demo-section" aria-labelledby="demos-title">
          <SectionIntro
            eyebrow="Demonstrações"
            title="Agora que você já conhece as soluções, deixa eu te apresentar."
            text="A landing page, a agenda e o dashboard aparecem como evidência do produto, mostrando como cada entrega pode ganhar forma visual e operacional."
          />

          <div className="demo-grid" data-stagger>
            {solutions.map((solution, index) => (
              <article className={`demo-card ${index === 0 ? "demo-card--wide" : ""}`} key={solution.name}>
                <CornerMarks />
                <div className="demo-card__copy">
                  <span>{solution.name}</span>
                  <h3>{solution.title}</h3>
                  <p>{solution.text}</p>
                </div>
                <figure className="demo-frame">
                  <img src={solution.image} alt={solution.alt} loading={index === 0 ? "eager" : "lazy"} />
                </figure>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell security-section" aria-labelledby="seguranca-title">
          <SectionIntro
            center
            eyebrow="Simplicidade e segurança"
            title="O sistema deve organizar a rotina, não criar complexidade."
            text="Nos exemplos de agenda e painéis, usamos apenas dados operacionais. A proposta é clareza, não acúmulo de informações sensíveis."
          />

          <div className="security-grid" data-stagger>
            {["Sem CPF ou documentos", "Sem prontuário ou histórico clínico", "Sem dados bancários", "Campos definidos por escopo"].map(
              (item) => (
                <span key={item}>{item}</span>
              ),
            )}
          </div>
        </section>

        <section id="planos" className="pricing-section" aria-labelledby="planos-title">
          <div className="site-container">
            <SectionIntro
              center
              eyebrow="Planos"
              title="Planos por escopo, definidos a partir da necessidade real."
              text="A análise inicial evita vender ferramenta demais. Primeiro entendemos o gargalo, depois fechamos uma entrega objetiva."
            />

            <div className="pricing-grid" data-stagger>
              {plans.map((plan) => (
                <article className={`pricing-card ${plan.featured ? "is-featured" : ""}`} key={plan.name}>
                  {plan.featured && <span className="pricing-feature-glow" aria-hidden="true" />}
                  <div>
                    <div className="pricing-card__top">
                      <h3>{plan.name}</h3>
                      <span>{plan.fit}</span>
                    </div>
                    <p>{plan.description}</p>
                  </div>
                  <a className="btn-primary" href={ctaUrl} target="_blank" rel="noreferrer">
                    Solicitar análise
                  </a>
                  <ul>
                    {plan.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="section-shell faq-section" aria-labelledby="faq-title">
          <SectionIntro
            center
            eyebrow="FAQ"
            title="Dúvidas comuns antes de começar."
            text="Use a busca se quiser encontrar um ponto específico sobre escopo, agenda, dados ou publicação."
          />

          <div className="faq-panel" data-reveal>
            <label className="sr-only" htmlFor="faq-search">
              Buscar dúvidas
            </label>
            <input
              id="faq-search"
              type="search"
              value={faqQuery}
              onChange={(event) => {
                setFaqQuery(event.target.value);
                setActiveFaq(0);
              }}
              placeholder="Buscar dúvidas..."
            />
            <div className="faq-list">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, index) => {
                  const isOpen = activeFaq === index;

                  return (
                    <article className={isOpen ? "is-open" : ""} key={faq.question}>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setActiveFaq(isOpen ? -1 : index)}
                      >
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
                <p className="faq-empty">
                  Nenhuma dúvida encontrada. Me chama no WhatsApp e eu respondo direto por lá.
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="cta-section" aria-labelledby="cta-title">
          <div className="final-cta" data-reveal>
            <p className="eyebrow justify-center">Próximo passo</p>
            <SplitTitle
              id="cta-title"
              text="Qual parte do seu negócio precisa parecer mais profissional agora?"
            />
            <p>
              Me chama no WhatsApp e receba uma análise rápida para entender se o melhor
              próximo passo é uma página, uma agenda ou um painel de organização.
            </p>
            <a className="btn-primary" href={ctaUrl} target="_blank" rel="noreferrer">
              Quero uma análise gratuita
            </a>
          </div>
        </section>
      </main>

      <footer className="footer-section">
        <div className="footer-glow" aria-hidden="true" />
        <div className="site-container footer-grid">
          <div>
            <Brand />
            <p>
              Sites, agendas e sistemas de organização para negócios que precisam transmitir
              mais confiança.
            </p>
            <small>Origami Labs © 2026. Todos os direitos reservados.</small>
          </div>
          <div className="footer-links">
            <div>
              <h3>Soluções</h3>
              <a href="#solucoes">Origami Sites</a>
              <a href="#solucoes">Origami Agenda</a>
              <a href="#solucoes">Origami Dashboard</a>
            </div>
            <div>
              <h3>Página</h3>
              <a href="#demos">Demonstrações</a>
              <a href="#planos">Planos</a>
              <a href="#faq">FAQ</a>
            </div>
            <div>
              <h3>Contato</h3>
              <a href={ctaUrl} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
              <a href={ctaUrl} target="_blank" rel="noreferrer">
                Análise gratuita
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Brand() {
  return (
    <a className="brand-link" href="#topo" aria-label="Origami Labs">
      <span className="brand-mark">
        <img src="/logo.png" alt="" />
      </span>
      <span>
        <strong>Origami Labs</strong>
        <small>Digital solutions</small>
      </span>
    </a>
  );
}

function DynamicWord() {
  const [index, setIndex] = useState(0);
  const measureRef = useRef<HTMLDivElement | null>(null);
  const [wordWidth, setWordWidth] = useState<number | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % dynamicWords.length);
    }, 1800);

    return () => window.clearInterval(timer);
  }, []);

  useLayoutEffect(() => {
    const measure = () => {
      const activeMeasure = measureRef.current?.querySelector<HTMLElement>(
        `[data-word="${dynamicWords[index]}"]`,
      );

      if (activeMeasure) {
        setWordWidth(activeMeasure.offsetWidth);
      }
    };

    measure();
    window.addEventListener("resize", measure);

    return () => window.removeEventListener("resize", measure);
  }, [index]);

  return (
    <span
      className="dynamic-word"
      aria-live="polite"
      style={wordWidth ? { width: `${wordWidth}px` } : undefined}
    >
      <span ref={measureRef} className="dynamic-word__measure" aria-hidden="true">
        {dynamicWords.map((word) => (
          <span data-word={word} key={word}>
            {word}
          </span>
        ))}
      </span>
      <span className="dynamic-word__item" key={dynamicWords[index]}>
        {dynamicWords[index]}
      </span>
    </span>
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
      <SplitTitle text={title} />
      <p className="section-copy">{text}</p>
    </div>
  );
}

function SplitTitle({ id, text }: { id?: string; text: string }) {
  return (
    <h2 id={id} className="section-title" data-split-title>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="split-title">
        {text.split(" ").map((word, index, words) => (
          <span className="split-word" key={`${word}-${index}`}>
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
