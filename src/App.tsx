import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  Code2,
  LayoutTemplate,
  Menu,
  MessageCircle,
  MonitorSmartphone,
  QrCode,
  Sparkles,
  X,
} from "lucide-react";
import "./styles.css";

const DEFAULT_WHATSAPP_MESSAGE =
  "Olá, conheci a Origami Lab e quero conversar sobre uma solução digital para o meu negócio.";
const WHATSAPP_URL =
  import.meta.env.VITE_WHATSAPP_URL ||
  `https://wa.me/5583993450505?text=${encodeURIComponent(DEFAULT_WHATSAPP_MESSAGE)}`;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

type Visual = "landing" | "dashboard" | "menu" | "software";
type ServiceDetail = {
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  imageCaption: string;
  contextTitle: string;
  contextText: string;
  principles: Array<{ title: string; text: string }>;
  process: Array<{ title: string; text: string }>;
  faqs: Array<[string, string]>;
  ctaLabel: string;
};
type Service = {
  slug: string;
  nav: string;
  eyebrow: string;
  title: string;
  summary: string;
  problem: string;
  outcome: string;
  visual: Visual;
  icon: typeof LayoutTemplate;
  deliverables: string[];
  seoTitle: string;
  seoDescription: string;
  detail?: ServiceDetail;
};

const services: Service[] = [
  {
    slug: "/sites",
    nav: "Landing pages",
    eyebrow: "Apresentar e vender",
    title: "Um lugar próprio para sua oferta ser entendida",
    summary: "Organizamos serviços, diferenciais e o próximo passo em uma página rápida, responsiva e fácil de entender.",
    problem: "Sua oferta está espalhada em redes sociais, mensagens e materiais diferentes",
    outcome: "Um endereço próprio para apresentar, gerar confiança e conduzir o visitante ao contato",
    visual: "landing",
    icon: LayoutTemplate,
    deliverables: ["Arquitetura de conteúdo", "Interface responsiva", "Contato como ação principal"],
    seoTitle: "Landing Pages para pequenos negócios | Origami Lab",
    seoDescription: "Landing pages responsivas para organizar sua oferta, explicar diferenciais e conduzir o visitante a uma ação clara.",
    detail: {
      image: "/hero-landing.webp",
      imageWidth: 1600,
      imageHeight: 900,
      imageAlt: "Captura de uma landing page demonstrativa criada pela Origami",
      imageCaption: "Demonstração Origami. Exemplo visual de estrutura e hierarquia, não resultado de cliente.",
      contextTitle: "Sua oferta precisa funcionar sem depender de uma sequência de mensagens",
      contextText: "Quando informações importantes ficam espalhadas entre bio, destaques, posts e conversas, o visitante precisa montar sozinho a história do negócio. A landing page reúne essa explicação e mostra um próximo passo claro.",
      principles: [
        { title: "Mensagem em ordem", text: "Organizamos o que você oferece, para quem e por que vale iniciar uma conversa." },
        { title: "Leitura responsiva", text: "A hierarquia continua clara no celular e no desktop, sem esconder a informação principal." },
        { title: "Ação evidente", text: "O contato aparece no momento certo e conduz o visitante sem promessas ou distrações inventadas." },
      ],
      process: [
        { title: "Entender o cenário", text: "Você mostra a oferta, o público e o ponto que hoje dificulta a apresentação do negócio." },
        { title: "Organizar o conteúdo", text: "Definimos a mensagem principal, a ordem das informações e a ação esperada do visitante." },
        { title: "Construir a interface", text: "Transformamos a estrutura aprovada em uma página responsiva, acessível e coerente com a marca." },
        { title: "Publicar e orientar", text: "Colocamos a primeira versão no ar e deixamos o próximo ajuste visível a partir do uso real." },
      ],
      faqs: [
        ["Preciso chegar com todo o texto pronto?", "Não. A conversa inicial ajuda a separar o que já existe, o que precisa ser esclarecido e qual informação deve aparecer primeiro."],
        ["A landing page substitui minhas redes sociais?", "Não necessariamente. Ela cria um endereço próprio para explicar a oferta e pode receber visitantes vindos das redes, anúncios, QR Code ou indicações."],
        ["A página funciona no celular?", "Sim. A estrutura é construída para preservar leitura, navegação e contato em telas pequenas e grandes."],
        ["Posso evoluir a página depois?", "Sim. A primeira versão resolve a necessidade prioritária e pode ser ajustada quando novas ofertas, dúvidas ou evidências reais surgirem."],
        ["A página garante mais vendas?", "Não. Ela melhora a apresentação e orienta o próximo passo, mas o resultado também depende da oferta, do tráfego e do atendimento do negócio."],
      ],
      ctaLabel: "uma landing page",
    },
  },
  {
    slug: "/cardapio-digital",
    nav: "Cardápio digital",
    eyebrow: "Facilitar a escolha",
    title: "Produtos organizados para o cliente escolher e pedir com menos atrito",
    summary: "Um link ou QR Code que complementa o cardápio físico e leva categorias, produtos e pedido até o WhatsApp.",
    problem: "Produtos, preços e disponibilidade se perdem entre fotos, mensagens e materiais impressos",
    outcome: "Um menu fácil de compartilhar, atualizar e consultar no celular",
    visual: "menu",
    icon: QrCode,
    deliverables: ["Link e QR Code", "Categorias organizadas", "Pedido encaminhado ao WhatsApp"],
    seoTitle: "Cardápio Digital para pequenos negócios | Origami Lab",
    seoDescription: "Cardápios digitais com link, QR Code, categorias organizadas e pedido encaminhado ao WhatsApp.",
    detail: {
      image: "/hero-cardapio.webp",
      imageWidth: 1600,
      imageHeight: 900,
      imageAlt: "Captura do cardápio digital demonstrativo Brasa do Bairro",
      imageCaption: "Demonstração Origami do Brasa do Bairro. Produtos, preços, horários e dados comerciais são ilustrativos.",
      contextTitle: "O cliente precisa encontrar, escolher e encaminhar o pedido sem montar o cardápio em várias mensagens",
      contextText: "Quando produtos, preços e disponibilidade ficam espalhados entre fotos, destaques e conversas, a escolha demora e o atendimento repete as mesmas explicações. O cardápio digital reúne a vitrine em um link fácil de abrir e compartilhar.",
      principles: [
        { title: "Catálogo em ordem", text: "Categorias, destaques, produtos, adicionais e disponibilidade seguem uma estrutura previsível." },
        { title: "Escolha no celular", text: "Fotos, descrições e preços continuam fáceis de consultar na mesa, em casa ou no caminho." },
        { title: "Pedido encaminhado", text: "O cliente organiza a escolha e leva o resumo ao WhatsApp para a confirmação do negócio." },
      ],
      process: [
        { title: "Entender o atendimento", text: "Mapeamos onde o cliente encontra o menu e como o negócio confirma cada pedido." },
        { title: "Organizar o catálogo", text: "Estruturamos categorias, produtos, adicionais, avisos e estados de disponibilidade." },
        { title: "Montar o fluxo", text: "Configuramos contexto do pedido, carrinho e mensagem final sem inventar automações." },
        { title: "Publicar e atualizar", text: "Entregamos o link e orientamos quais informações precisam continuar atuais." },
      ],
      faqs: [
        ["O cardápio substitui o material físico?", "Não precisa substituir. Ele pode complementar o cardápio físico por QR Code e também funcionar como link para redes sociais, Google e WhatsApp."],
        ["O pedido é enviado automaticamente?", "Não. Na primeira versão, o cliente monta a escolha e abre o WhatsApp com a mensagem pronta; o envio e a confirmação continuam sob controle dele e do negócio."],
        ["Consigo alterar produtos e preços?", "Sim. A forma de atualização depende do escopo escolhido, mas o catálogo é estruturado para permitir evolução sem reconstruir toda a experiência."],
        ["Preciso ter fotos profissionais?", "Não para começar, mas imagens autorizadas e consistentes melhoram a apresentação. Podemos organizar o primeiro conjunto disponível sem inventar material do negócio."],
        ["Funciona fora da loja?", "Sim. O mesmo link pode ser compartilhado para retirada ou entrega, desde que esses modos e suas regras tenham sido confirmados pelo estabelecimento."],
      ],
      ctaLabel: "um cardápio digital",
    },
  },
  {
    slug: "/dashboards",
    nav: "Dashboards",
    eyebrow: "Acompanhar e decidir",
    title: "Os sinais importantes do negócio em uma única visão",
    summary: "Criamos painéis para acompanhar leads, propostas, tarefas e indicadores sem depender de várias planilhas.",
    problem: "Informações importantes ficam dispersas e as prioridades não aparecem com clareza",
    outcome: "Uma leitura rápida do que aconteceu, do que exige atenção e do que vem depois",
    visual: "dashboard",
    icon: BarChart3,
    deliverables: ["Indicadores essenciais", "Prioridades visíveis", "Fluxo adaptado à operação"],
    seoTitle: "Dashboards para pequenos negócios | Origami Lab",
    seoDescription: "Dashboards sob medida para acompanhar leads, propostas, tarefas, prioridades e indicadores essenciais.",
    detail: {
      image: "/hero-dashboard.webp",
      imageWidth: 1600,
      imageHeight: 900,
      imageAlt: "Captura do dashboard comercial demonstrativo da Origami Lab",
      imageCaption: "Dashboard Origami em modo demonstração. Empresas, tarefas, indicadores e valores exibidos são dados fictícios.",
      contextTitle: "Informação só ajuda quando mostra o que aconteceu e qual decisão vem depois",
      contextText: "Planilhas e ferramentas isoladas escondem prioridades, repetem cadastros e dificultam uma leitura rápida da operação. O dashboard reúne os sinais essenciais em uma visão construída em torno das decisões do negócio.",
      principles: [
        { title: "Indicadores com contexto", text: "Cada número aparece ligado a uma pergunta real, sem ocupar espaço apenas porque pode ser medido." },
        { title: "Prioridades visíveis", text: "Tarefas, oportunidades e pendências ficam próximas dos dados que ajudam a decidir." },
        { title: "Fluxo adaptado", text: "A interface acompanha os estágios e termos que a equipe realmente usa no dia a dia." },
      ],
      process: [
        { title: "Mapear decisões", text: "Identificamos o que precisa ser acompanhado e quais ações cada sinal deve provocar." },
        { title: "Definir os dados", text: "Separamos fontes, responsáveis, regras e limites antes de desenhar gráficos." },
        { title: "Construir a visão", text: "Organizamos indicadores, filtros, listas e atalhos na menor interface útil." },
        { title: "Validar com a rotina", text: "Ajustamos a leitura a partir de uso real, não de métricas adicionadas por conveniência." },
      ],
      faqs: [
        ["O dashboard precisa substituir minhas planilhas?", "Não necessariamente. A primeira versão pode consolidar somente os dados prioritários e manter fontes existentes enquanto o fluxo é validado."],
        ["Vocês escolhem os indicadores?", "A escolha é feita em conjunto. O negócio traz as decisões e dificuldades; nós ajudamos a transformar isso em métricas e estados compreensíveis."],
        ["Os dados são atualizados automaticamente?", "Depende das fontes e integrações aprovadas. Quando não existe integração segura, a atualização pode começar manualmente sem prometer automação inexistente."],
        ["Posso ter permissões diferentes por pessoa?", "Sim, mas perfis e permissões precisam fazer parte do escopo técnico e ser implementados no servidor quando representam uma fronteira real de acesso."],
        ["É possível começar com poucos módulos?", "Sim. Um dashboard útil costuma começar pelas decisões mais frequentes e evoluir quando novas necessidades aparecem no uso."],
      ],
      ctaLabel: "um dashboard",
    },
  },
  {
    slug: "/software-personalizado",
    nav: "Software personalizado",
    eyebrow: "Resolver um processo específico",
    title: "Uma ferramenta desenhada em torno da rotina que seu negócio já tem",
    summary: "Quando uma solução pronta não acompanha o processo, estruturamos o menor software útil e evoluímos com o uso real.",
    problem: "A equipe adapta sua rotina à ferramenta, quando deveria ser o contrário",
    outcome: "Um sistema interno com escopo, regras e interface alinhados ao trabalho real",
    visual: "software",
    icon: Code2,
    deliverables: ["Mapeamento do processo", "Primeira versão utilizável", "Evolução por prioridade"],
    seoTitle: "Software Personalizado para negócios | Origami Lab",
    seoDescription: "Software sob medida para organizar processos específicos, definir o menor escopo útil e evoluir com o uso real.",
    detail: {
      image: "/hero-software.webp",
      imageWidth: 1400,
      imageHeight: 659,
      imageAlt: "Captura demonstrativa de uma agenda administrativa criada como software personalizado",
      imageCaption: "Demonstração Origami de Agenda Administrativa com dados fictícios. Exemplo de software adaptado a uma rotina específica.",
      contextTitle: "Quando a equipe contorna a ferramenta todos os dias, o processo precisa orientar o software",
      contextText: "Soluções prontas resolvem necessidades comuns, mas podem forçar etapas, duplicar trabalho ou ignorar regras importantes. Um software personalizado começa pelo fluxo real e entrega primeiro a menor parte capaz de funcionar de ponta a ponta.",
      principles: [
        { title: "Rotina antes da tela", text: "Mapeamos pessoas, etapas, exceções e decisões antes de transformar o processo em interface." },
        { title: "Primeira versão útil", text: "O escopo inicial resolve um fluxo completo sem fingir que todo o sistema precisa nascer de uma vez." },
        { title: "Evolução com evidência", text: "Novas funções entram quando o uso mostra uma necessidade, reduzindo complexidade prematura." },
      ],
      process: [
        { title: "Observar o processo", text: "Entendemos como o trabalho acontece hoje, inclusive atalhos, exceções e informações duplicadas." },
        { title: "Delimitar o núcleo", text: "Escolhemos o menor fluxo que precisa funcionar do início ao fim na primeira versão." },
        { title: "Implementar e testar", text: "Construímos regras, estados e interface com validação técnica e cenários representativos." },
        { title: "Aprender com o uso", text: "A próxima etapa é priorizada a partir do que a operação realmente precisa melhorar." },
      ],
      faqs: [
        ["Software personalizado significa construir tudo do zero?", "Não. Podemos usar componentes e serviços consolidados; personalizado significa que o fluxo, as regras e a interface são organizados para a necessidade específica."],
        ["A primeira versão já inclui todas as ideias?", "Normalmente não. Priorizamos o menor conjunto que entrega valor e preservamos as demais ideias como possibilidades de evolução."],
        ["É possível integrar ferramentas que já uso?", "Possivelmente. Cada integração precisa ser analisada quanto a API, autorização, custo, limites e tratamento dos dados."],
        ["Como o orçamento é definido?", "Depois de mapear o processo e delimitar a primeira versão. O custo depende das regras, integrações, dados, perfis e nível de operação exigido."],
        ["A Agenda mostrada é um sistema de cliente em produção?", "Não. É uma demonstração própria com dados fictícios usada para mostrar como uma rotina administrativa pode virar uma interface específica."],
      ],
      ctaLabel: "um software personalizado",
    },
  },
];

type Project = { name: string; type: string; summary: string; href: string; visual: Visual; index: string; heroImage: string; heroImageWidth: number; heroImageHeight: number; heroAlt: string };

const projects: Project[] = [
  { name: "Dashboard Origami", type: "Dashboard operacional", summary: "Prioridades, indicadores e andamento reunidos em uma leitura objetiva.", href: "/dashboards", visual: "dashboard", index: "01", heroImage: "/hero-dashboard.webp", heroImageWidth: 1600, heroImageHeight: 900, heroAlt: "Captura demonstrativa de dashboard comercial da Origami" },
  { name: "Agenda Administrativa", type: "Demo · software personalizado", summary: "Agenda, atendimentos e rotina administrativa organizados em uma interface feita para o processo.", href: "/software-personalizado", visual: "software", index: "02", heroImage: "/hero-software.webp", heroImageWidth: 1400, heroImageHeight: 659, heroAlt: "Captura demonstrativa de agenda administrativa como software personalizado" },
  { name: "Brasa do Bairro", type: "Demo · cardápio digital", summary: "Categorias, produtos e pedido organizados para uma escolha simples no celular.", href: "/cardapio-digital", visual: "menu", index: "03", heroImage: "/hero-cardapio.webp", heroImageWidth: 1600, heroImageHeight: 900, heroAlt: "Captura demonstrativa de cardápio digital Brasa do Bairro" },
  { name: "Orion Elite", type: "Demo · landing page", summary: "Uma oferta apresentada com hierarquia, contexto e um próximo passo evidente.", href: "/sites", visual: "landing", index: "04", heroImage: "/hero-landing.webp", heroImageWidth: 1600, heroImageHeight: 900, heroAlt: "Captura da landing page esportiva Orion Elite" },
];

const faqs = [
  ["Preciso saber qual solução contratar?", "Não. Você pode chegar com o problema. A primeira conversa existe justamente para entender se o melhor começo é uma landing page, um dashboard, um cardápio digital ou um software personalizado."],
  ["A Origami trabalha apenas com pequenos negócios?", "Esse é o nosso foco principal hoje, especialmente negócios locais, prestadores de serviço e equipes que precisam organizar sua presença ou operação digital."],
  ["O projeto já começa como um sistema completo?", "Não necessariamente. Preferimos começar pelo menor escopo que resolva a necessidade prioritária. Isso reduz complexidade e permite evoluir com evidência de uso."],
  ["O cardápio digital substitui o físico?", "Não precisa substituir. Ele pode complementar o material físico com um link ou QR Code fácil de atualizar e compartilhar."],
  ["Vocês garantem aumento de vendas?", "Não. A tecnologia melhora apresentação, atendimento e visibilidade da operação, mas o resultado também depende da oferta, do tráfego e da rotina do negócio."],
  ["Como recebo um orçamento?", "Você explica o cenário, nós delimitamos a primeira versão e avaliamos a complexidade. O orçamento vem depois desse entendimento, sem pacote genérico ou preço inventado."],
];

type TransitionPhase = "idle" | "cover" | "reveal";

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return prefersReducedMotion;
}

function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [transitionPhase, setTransitionPhase] = useState<TransitionPhase>("idle");
  const timers = useRef<number[]>([]);
  const lenisRef = useRef<Lenis | null>(null);
  const pathRef = useRef(path);
  const focusPathRef = useRef(path);
  const service = services.find((item) => item.slug === path);
  const ctaUrl = useMemo(() => WHATSAPP_URL, []);

  useEffect(() => {
    const isNotFound = path !== "/" && !service;
    const title = isNotFound ? "Página não encontrada | Origami Lab" : service?.seoTitle || "Origami Lab | Tecnologia sob medida para negócios";
    const description = isNotFound ? "O endereço acessado não corresponde a uma solução disponível da Origami Lab." : service?.seoDescription || "A Origami Lab cria landing pages, dashboards, cardápios digitais e softwares personalizados para pequenos negócios.";
    document.title = title;
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute("content", title);
    document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute("content", description);
  }, [path, service]);

  useEffect(() => { pathRef.current = path; }, [path]);

  useEffect(() => {
    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);
    let lenis: Lenis | null = null;
    const syncLenis = () => {
      if (reducedMotion.matches) {
        lenis?.destroy();
        lenis = null;
        lenisRef.current = null;
        return;
      }
      if (!lenis) {
        lenis = new Lenis({ autoRaf: true, anchors: true, stopInertiaOnNavigate: true });
        lenisRef.current = lenis;
      }
    };
    syncLenis();
    reducedMotion.addEventListener("change", syncLenis);
    return () => {
      reducedMotion.removeEventListener("change", syncLenis);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  const clearTransitionTimers = useCallback(() => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  }, []);

  const transitionTo = useCallback((nextPath: string, onCovered?: () => void) => {
    clearTransitionTimers();
    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) {
      onCovered?.();
      setPath(nextPath);
      setTransitionPhase("idle");
      return;
    }
    setTransitionPhase("cover");
    timers.current.push(window.setTimeout(() => {
      onCovered?.();
      setPath(nextPath);
      setTransitionPhase("reveal");
      timers.current.push(window.setTimeout(() => setTransitionPhase("idle"), 740));
    }, 560));
  }, [clearTransitionTimers]);

  useEffect(() => {
    const onPopState = () => {
      const nextPath = window.location.pathname;
      if (nextPath !== pathRef.current) transitionTo(nextPath);
      else if (window.location.hash) window.setTimeout(() => document.querySelector(window.location.hash)?.scrollIntoView(), 0);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [transitionTo]);

  useEffect(() => () => clearTransitionTimers(), [clearTransitionTimers]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 961px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => { if (event.matches) setMenuOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    const timer = window.setTimeout(() => {
      if (path === "/" && hash) document.querySelector(hash)?.scrollIntoView({ behavior: "instant" });
      else {
        lenisRef.current?.scrollTo(0, { immediate: true });
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [path, service]);

  useEffect(() => {
    if (focusPathRef.current === path) return;
    focusPathRef.current = path;
    if (path === "/" && window.location.hash) return;
    const frame = window.requestAnimationFrame(() => {
      document.querySelector<HTMLElement>("main h1")?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [path]);

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("main h1, main h2, main .section-tag, main .reveal");
    targets.forEach((target) => target.classList.add("motion-reveal"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -10%", threshold: 0.12 });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [path]);

  const navigate = useCallback((href: string) => {
    setMenuOpen(false);
    if (href.startsWith("/#")) {
      const hash = href.slice(1);
      if (window.location.pathname !== "/") {
        transitionTo("/", () => window.history.pushState({}, "", href));
      } else {
        window.history.pushState({}, "", href);
        document.querySelector(hash)?.scrollIntoView({
          behavior: window.matchMedia(REDUCED_MOTION_QUERY).matches ? "instant" : "smooth",
        });
      }
      return;
    }
    const url = new URL(href, window.location.origin);
    if (url.pathname === window.location.pathname && !url.hash) {
      if (window.location.hash) {
        window.history.pushState({}, "", url.pathname);
        lenisRef.current?.scrollTo(0, { immediate: true });
        window.scrollTo({ top: 0, behavior: "instant" });
        window.requestAnimationFrame(() => {
          document.querySelector<HTMLElement>("main h1")?.focus({ preventScroll: true });
        });
      }
      return;
    }
    transitionTo(url.pathname, () => window.history.pushState({}, "", href));
  }, [transitionTo]);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header navigate={navigate} ctaUrl={ctaUrl} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main id="conteudo" tabIndex={-1}>
        {path !== "/" && !service ? <NotFound navigate={navigate} />
          : service ? <ServicePage service={service} navigate={navigate} ctaUrl={ctaUrl} />
            : <Home navigate={navigate} ctaUrl={ctaUrl} openFaq={openFaq} setOpenFaq={setOpenFaq} />}
      </main>
      <Footer navigate={navigate} ctaUrl={ctaUrl} />
      <div className={`route-transition route-transition-${transitionPhase}`} data-phase={transitionPhase} aria-hidden="true"><span /><span /><span /></div>
    </div>
  );
}

function InternalLink({ href, navigate, children, className, ariaLabel }: { href: string; navigate: (href: string) => void; children: React.ReactNode; className?: string; ariaLabel?: string }) {
  return <a href={href} className={className} aria-label={ariaLabel} onClick={(event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigate(href);
  }}>{children}</a>;
}

function Header({ navigate, ctaUrl, menuOpen, setMenuOpen }: { navigate: (href: string) => void; ctaUrl: string; menuOpen: boolean; setMenuOpen: (value: boolean) => void }) {
  return <header className="header-wrap"><nav className="nav-pill" aria-label="Navegação principal">
    <InternalLink className="brand" href="/" navigate={navigate} ariaLabel="Ir para o início"><img src="/logo.png" alt="" width="32" height="32" /><span>Origami Lab</span></InternalLink>
    <div className="nav-links"><InternalLink href="/#solucoes" navigate={navigate}>Soluções</InternalLink><InternalLink href="/#processo" navigate={navigate}>Como funciona</InternalLink><InternalLink href="/#demonstracoes" navigate={navigate}>Demonstrações</InternalLink><InternalLink href="/#duvidas" navigate={navigate}>Dúvidas</InternalLink></div>
    <a className="nav-cta" href={ctaUrl} target="_blank" rel="noopener noreferrer">Conversar no WhatsApp <ArrowRight size={15} /></a>
    <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="menu-mobile" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}>{menuOpen ? <X /> : <Menu />}</button>
  </nav>{menuOpen && <div className="mobile-nav" id="menu-mobile"><InternalLink className="mobile-nav-link" href="/#solucoes" navigate={navigate}>Soluções</InternalLink><InternalLink className="mobile-nav-link" href="/#processo" navigate={navigate}>Como funciona</InternalLink><InternalLink className="mobile-nav-link" href="/#demonstracoes" navigate={navigate}>Demonstrações</InternalLink><InternalLink className="mobile-nav-link" href="/#duvidas" navigate={navigate}>Dúvidas</InternalLink><a href={ctaUrl} target="_blank" rel="noopener noreferrer">Conversar no WhatsApp</a></div>}</header>;
}

function Home({ navigate, ctaUrl, openFaq, setOpenFaq }: { navigate: (href: string) => void; ctaUrl: string; openFaq: number | null; setOpenFaq: (value: number | null) => void }) {
  const [activeProject, setActiveProject] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = window.setInterval(() => {
      setActiveProject((current) => (current + 1) % projects.length);
    }, 4800);
    return () => window.clearInterval(timer);
  }, [prefersReducedMotion]);

  const slidePosition = (index: number) => {
    const offset = (index - activeProject + projects.length) % projects.length;
    return ["is-active", "is-next", "is-mid", "is-back"][offset];
  };

  return <>
    <section className="hero section-pad">
      <div className="container hero-copy"><span className="section-tag"><Sparkles size={14} /> Tecnologia sob medida</span><h1 tabIndex={-1}>Tecnologia que organiza o que hoje trava seu negócio</h1><p>Criamos landing pages, dashboards, cardápios digitais e softwares personalizados para apresentar, atender e operar melhor.</p><div className="hero-actions"><a className="button button-primary" href={ctaUrl} target="_blank" rel="noopener noreferrer">Conversar no WhatsApp <ArrowRight size={17} /></a><InternalLink className="button button-secondary" href="/#solucoes" navigate={navigate}>Conheça as soluções</InternalLink></div></div>
      <div
        className="container hero-showcase reveal"
        role="region"
        aria-roledescription="carrossel"
        aria-label="Demonstrações de produtos Origami"
      >
        <div className="hero-product-stack">
          {projects.map((project, index) => {
            const active = index === activeProject;
            return <article
              className={`hero-product hero-product-card hero-product-${project.visual} ${slidePosition(index)}`}
              key={project.name}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} de ${projects.length}: ${project.heroAlt}`}
              aria-hidden={!active}
            ><div className="product-window"><img className="hero-product-image" src={project.heroImage} alt={project.heroAlt} width={project.heroImageWidth} height={project.heroImageHeight} loading="eager" decoding="async" fetchPriority={index === 0 ? "high" : "auto"} /></div></article>;
          })}
        </div>
      </div>
    </section>
    <section className="hero-separator" aria-label="Princípio de trabalho"><div className="container"><span>Clareza antes da complexidade</span><p>Quatro formatos, uma mesma forma de pensar: começar pela necessidade real.</p></div></section>

    <section className="intro section-pad" id="solucoes"><div className="container"><SectionHeading tag="Serviços" title="Quais soluções a Origami oferece" text="Quatro caminhos para apresentar melhor sua oferta, facilitar escolhas, acompanhar informações e resolver processos específicos." /><div className="service-offer-grid reveal">{services.map((item, index) => { const Icon = item.icon; return <InternalLink className="service-offer" href={item.slug} navigate={navigate} key={item.slug}><div className="service-offer-top"><span>0{index + 1}</span><Icon size={24} /></div><h3>{item.nav}</h3><p>{item.summary}</p><b>Conhecer solução <ArrowRight size={16} /></b></InternalLink>; })}</div></div></section>

    <section className="visibility section-pad"><div className="container visibility-grid"><div className="visibility-copy"><h2>Veja a solução antes de transformar a conversa em um projeto enorme</h2><p>Cada proposta começa com uma demonstração clara do que pode ser organizado agora. Você entende a direção, o escopo e o que fica para depois.</p><ul><li><Check size={16} /> Problema e prioridade identificados</li><li><Check size={16} /> Primeira versão com limites visíveis</li><li><Check size={16} /> Evolução baseada no uso real</li></ul></div><div className="clarity-board reveal" aria-label="Como organizamos a primeira versão"><div className="clarity-top"><span>Escopo da primeira versão</span></div><div className="clarity-row"><div><strong>Necessidade principal</strong><small>O que hoje atrapalha a apresentação ou a operação?</small></div></div><div className="clarity-row"><div><strong>Fluxo essencial</strong><small>Qual caminho precisa funcionar do início ao fim?</small></div></div><div className="clarity-row"><div><strong>Próxima evolução</strong><small>O que só entra quando o uso justificar?</small></div></div><div className="clarity-summary"><div><small>Resultado</small><strong>Uma primeira versão utilizável</strong></div><ArrowRight /></div></div></div></section>

    <section className="showcase section-pad" id="demonstracoes"><div className="container"><SectionHeading tag="Soluções Origami" title="Projetos pensados como produtos, não como pacotes" text="Quatro projetos e demonstrações próprios mostram como cada formato responde a uma necessidade diferente." /><div className="editorial-projects">
      {projects.map((project) => <InternalLink className={`editorial-project project-card service-theme-${project.visual} reveal`} href={project.href} navigate={navigate} key={project.name}><div className="editorial-meta"><span>{project.index}</span><small>{project.type}</small></div><div className="editorial-copy"><h3>{project.name}</h3><p>{project.summary}</p><b>Explorar solução <ArrowRight size={16} /></b></div><div className="editorial-visual"><div className="editorial-image-frame"><img src={project.heroImage} width={project.heroImageWidth} height={project.heroImageHeight} alt={project.heroAlt} loading="eager" decoding="async" /></div></div></InternalLink>)}
    </div><p className="editorial-note">As imagens mostram projetos e demonstrações próprios da Origami. Dados operacionais e comerciais exibidos nas interfaces demonstrativas são fictícios.</p></div></section>

    <section className="feature-dark section-pad"><div className="container"><SectionHeading title="Decisões de produto, não apenas uma tela bonita" text="A interface é o que aparece. O trabalho também inclui conteúdo, fluxo, comportamento responsivo e uma base que possa evoluir." light /><div className="feature-dark-grid reveal">{[["Conteúdo organizado", "A mensagem deixa claro o que você oferece, para quem e qual é o próximo passo."], ["Responsividade real", "A experiência continua compreensível no celular, no tablet e no desktop."], ["Fluxos objetivos", "Cada etapa existe para ajudar alguém a concluir uma tarefa concreta."], ["Escopo verificável", "O que entra na primeira versão fica explícito antes da implementação."], ["Acessibilidade básica", "Hierarquia, foco, contraste e navegação recebem atenção desde o início."], ["Evolução consciente", "Novas funções entram quando o uso mostra que elas são necessárias."]].map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className="process section-pad" id="processo"><div className="container"><SectionHeading tag="Como funciona" title="Do problema à primeira versão, sem pular etapas" text="Um processo simples para transformar contexto em uma entrega que pode ser entendida, usada e melhorada." /><div className="process-track reveal">{[["Entender", "Você mostra o cenário, a rotina e o que hoje está difícil."], ["Priorizar", "Definimos qual ponto merece ser resolvido primeiro."], ["Estruturar", "Organizamos conteúdo, fluxo, interface e limites da versão."], ["Construir", "Desenvolvemos, validamos e orientamos o próximo passo."]].map(([title, text], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>

    <section className="scope section-pad"><div className="container scope-card reveal"><div><span className="section-tag">Sem preço inventado</span><h2>O orçamento nasce do escopo, não de um pacote genérico</h2><p>Você explica a necessidade. Nós entendemos o contexto, delimitamos a primeira versão, avaliamos a complexidade e apresentamos uma proposta.</p><a className="button button-primary" href={ctaUrl} target="_blank" rel="noopener noreferrer">Conversar no WhatsApp <ArrowRight size={17} /></a></div><div className="scope-steps">{[["Contexto", "O que precisa mudar?"], ["Escopo", "O que entra agora?"], ["Complexidade", "O que a solução exige?"], ["Proposta", "Como vamos executar?"]].map(([title, text], index) => <div key={title}><span>{index + 1}</span><p><strong>{title}</strong><small>{text}</small></p></div>)}</div></div></section>

    <section className="faq section-pad" id="duvidas"><div className="container faq-grid"><div><h2>O que vale saber antes de começar</h2><p>Se a sua dúvida não estiver aqui, a conversa inicial serve para esclarecer o cenário sem compromisso com uma solução específica.</p><a href={ctaUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /> Tirar dúvida no WhatsApp</a></div><div className="accordion">{faqs.map(([question, answer], index) => <article className={openFaq === index ? "open" : ""} key={question}><button id={`faq-button-${index}`} onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index} aria-controls={`faq-${index}`}><span>{question}</span><ChevronDown size={19} /></button><div id={`faq-${index}`} role="region" aria-labelledby={`faq-button-${index}`} aria-hidden={openFaq !== index}><p>{answer}</p></div></article>)}</div></div></section>
    <FinalCta ctaUrl={ctaUrl} />
  </>;
}

function SectionHeading({ tag, title, text, light = false }: { tag?: string; title: string; text: string; light?: boolean }) {
  return <div className={`section-heading ${light ? "light" : ""}`}><div>{tag && <span className="section-tag">{tag}</span>}<h2>{title}</h2></div><p>{text}</p></div>;
}

function WindowBar({ label }: { label: string }) { return <div className="window-bar"><span><i /><i /><i /></span><b>{label}</b><em>origamilabs.com.br</em></div>; }

function DemoCanvas({ visual, compact = false }: { visual: Visual; compact?: boolean }) {
  if (visual === "landing") return <div className={`demo-canvas demo-landing ${compact ? "compact" : ""}`} role="img" aria-label="Mockup ilustrativo de landing page com oferta, diferenciais e botão de contato"><div className="demo-landing-nav"><span>ORION</span><i /><i /><b>Contato</b></div><div className="demo-landing-hero"><small>POSICIONAMENTO EM PRIMEIRO PLANO</small><strong>Presença que transforma atenção em conversa</strong><p>Uma estrutura direta para explicar valor e orientar o próximo passo.</p><span>Começar <ArrowRight size={12} /></span></div><div className="demo-landing-proof"><i /><i /><i /></div><small className="demo-stamp">Conceito ilustrativo</small></div>;
  if (visual === "menu") return <div className={`demo-canvas demo-menu ${compact ? "compact" : ""}`} role="img" aria-label="Mockup ilustrativo de cardápio digital com categorias, produtos e pedido"><div className="demo-menu-head"><div><small>BRASA DO BAIRRO · DEMO</small><strong>Feito na brasa</strong></div><span>Pedido · 2 itens</span></div><div className="demo-menu-pills"><b>Destaques</b><span>Combos</span><span>Bebidas</span></div><div className="demo-menu-grid">{["Clássico", "Especial", "Combo da casa"].map((item, index) => <article key={item}><i className={`food-shape food-${index + 1}`} /><small>{item}</small><strong>Descrição ilustrativa do produto</strong><span className="demo-action">Adicionar</span></article>)}</div><small className="demo-stamp">Produtos e dados ilustrativos</small></div>;
  if (visual === "software") return <div className={`demo-canvas demo-software ${compact ? "compact" : ""}`} role="img" aria-label="Mockup ilustrativo de software personalizado com fluxo de trabalho em três etapas"><aside><strong>Lava Jato</strong><span>Visão geral</span><span>Serviços</span><span>Agenda</span><span>Equipe</span></aside><div className="demo-software-main"><header><div><small>OPERAÇÃO DEMONSTRATIVA</small><strong>Serviços em uma única visão</strong></div><span className="demo-action">Nova entrada</span></header><div className="demo-kanban">{[["Entrada", "Veículo recebido"], ["Em execução", "Serviço em andamento"], ["Concluído", "Pronto para entrega"]].map(([title, item], index) => <section key={title}><span><b>{title}</b><i>{index + 2}</i></span><article><small>PROCESSO DEMO</small><strong>{item}</strong><em>Dados fictícios</em></article></section>)}</div></div><small className="demo-stamp">Interface e dados ilustrativos</small></div>;
  return <div className={`demo-canvas demo-dashboard ${compact ? "compact" : ""}`} role="img" aria-label="Mockup ilustrativo de dashboard com indicadores, gráfico de fluxo e lista de prioridades"><aside><strong>Origami</strong><span>Visão geral</span><span>Prioridades</span><span>Relatórios</span></aside><div className="demo-dashboard-main"><header><div><small>PAINEL DEMONSTRATIVO</small><strong>O que pede atenção hoje</strong></div><span>Esta semana</span></header><div className="demo-metrics"><article><small>Em andamento</small><strong>12</strong></article><article><small>Próximas ações</small><strong>5</strong></article><article><small>Concluídos</small><strong>7</strong></article></div><div className="demo-dashboard-grid"><section><small>EVOLUÇÃO DO FLUXO</small><div className="demo-bars">{Array.from({ length: 7 }, (_, index) => <i key={index} />)}</div></section><section><small>PRIORIDADES</small><p><i /> Revisar nova entrada</p><p><i /> Preparar próxima etapa</p><p><i /> Validar entrega</p></section></div></div><small className="demo-stamp">Interface e dados ilustrativos</small></div>;
}

function ProductVisual({ service }: { service: Service }) { return <div className="product-window showcase-window"><WindowBar label={`Demonstração de ${service.nav}`} /><DemoCanvas visual={service.visual} /></div>; }

function DetailedServicePage({ service, navigate, ctaUrl }: { service: Service; navigate: (href: string) => void; ctaUrl: string }) {
  const detail = service.detail;
  if (!detail) return null;

  return <>
    <section className={`service-hero service-hero-detailed section-pad service-theme-${service.visual}`}>
      <div className="container service-hero-copy">
        <span className="section-tag">{service.eyebrow}</span>
        <h1 tabIndex={-1}>{service.title}</h1>
        <p>{service.summary}</p>
        <div className="hero-actions">
          <a className="button button-primary" href={ctaUrl} target="_blank" rel="noopener noreferrer">Conversar no WhatsApp <ArrowRight size={17} /></a>
          <a className="button button-secondary" href="#como-funciona">Como funciona</a>
        </div>
      </div>
      <figure className="container service-real-stage reveal">
        <div className="service-real-frame">
          <img src={detail.image} width={detail.imageWidth} height={detail.imageHeight} alt={detail.imageAlt} fetchPriority="high" />
        </div>
        <figcaption>{detail.imageCaption}</figcaption>
      </figure>
    </section>

    <section className="service-context section-pad">
      <div className="container service-context-grid">
        <div>
          <span className="section-tag">O ponto de partida</span>
          <h2>{detail.contextTitle}</h2>
        </div>
        <p>{detail.contextText}</p>
      </div>
    </section>

    <section className="service-principles section-pad">
      <div className="container">
        <SectionHeading title="O que esta solução precisa organizar" text="A primeira versão concentra as informações, decisões e ações essenciais para o fluxo funcionar com clareza." />
        <div className="service-principle-list reveal">
          {detail.principles.map((principle, index) => <article key={principle.title}>
            <span>0{index + 1}</span>
            <h3>{principle.title}</h3>
            <p>{principle.text}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section id="como-funciona" className="service-process section-pad">
      <div className="container">
        <SectionHeading title="Do contexto à primeira versão utilizável" text="O projeto avança em etapas curtas, com escopo, decisões e limites visíveis." />
        <div className="service-process-track reveal">
          {detail.process.map((item) => <article key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section className="service-faq section-pad">
      <div className="container service-faq-grid">
        <div>
          <span className="section-tag">Dúvidas frequentes</span>
          <h2>Antes de começar este tipo de projeto</h2>
          <p>Respostas diretas sobre escopo, conteúdo, operação e evolução.</p>
        </div>
        <div className="service-faq-list">
          {detail.faqs.map(([question, answer]) => <details key={question}>
            <summary>{question}<ChevronDown size={19} aria-hidden="true" /></summary>
            <p>{answer}</p>
          </details>)}
        </div>
      </div>
    </section>

    <section className="other-services section-pad">
      <div className="container">
        <SectionHeading title="Talvez o melhor começo esteja em outra frente" text="Compare as outras três formas de atuação da Origami Lab." />
        <div className="other-service-list">
          {services.filter((item) => item.slug !== service.slug).map((item) => <InternalLink href={item.slug} navigate={navigate} key={item.slug}>
            <item.icon size={21} />
            <span><strong>{item.nav}</strong><small>{item.summary}</small></span>
            <ArrowRight size={18} />
          </InternalLink>)}
        </div>
      </div>
    </section>

    <FinalCta ctaUrl={ctaUrl} label={detail.ctaLabel} />
  </>;
}

function ServicePage({ service, navigate, ctaUrl }: { service: Service; navigate: (href: string) => void; ctaUrl: string }) {
  if (service.detail) return <DetailedServicePage service={service} navigate={navigate} ctaUrl={ctaUrl} />;
  return <><section className={`service-hero section-pad service-theme-${service.visual}`}><div className="container service-hero-copy"><span className="section-tag">{service.eyebrow}</span><h1 tabIndex={-1}>{service.title}</h1><p>{service.summary}</p><div className="hero-actions"><a className="button button-primary" href={ctaUrl} target="_blank" rel="noopener noreferrer">Conversar no WhatsApp <ArrowRight size={17} /></a><InternalLink className="button button-secondary" href="/#solucoes" navigate={navigate}>Ver todas as soluções</InternalLink></div></div><div className="container service-stage reveal"><ProductVisual service={service} /><span>Demonstração visual para explicar possibilidades de interface, não um resultado de cliente.</span></div></section><section className="service-problem section-pad"><div className="container service-two-col"><div><span className="section-tag">O problema</span><h2>{service.problem}</h2></div><div><span className="section-tag">O que muda</span><h3>{service.outcome}</h3><p>A primeira versão é definida de acordo com o contexto e com o menor fluxo que precisa funcionar de ponta a ponta.</p></div></div></section><section className="deliverables section-pad"><div className="container"><SectionHeading tag="Primeira versão" title="Um escopo que você consegue visualizar" text="A entrega começa pela necessidade prioritária e mantém o próximo passo de evolução visível." /><div className="deliverables-grid reveal">{service.deliverables.map((item, index) => <article key={item}><span>0{index + 1}</span><Check size={22} /><h3>{item}</h3></article>)}</div></div></section><section className="other-services section-pad"><div className="container"><SectionHeading tag="Outras soluções" title="Talvez o melhor começo esteja em outra frente" text="Compare as quatro formas de atuação da Origami Lab." /><div className="other-service-list">{services.filter((item) => item.slug !== service.slug).map((item) => <InternalLink href={item.slug} navigate={navigate} key={item.slug}><item.icon size={21} /><span><strong>{item.nav}</strong><small>{item.summary}</small></span><ArrowRight size={18} /></InternalLink>)}</div></div></section><FinalCta ctaUrl={ctaUrl} label={service.nav.toLowerCase()} /></>;
}

function FinalCta({ ctaUrl, label = "uma solução digital" }: { ctaUrl: string; label?: string }) { return <section className="final-cta section-pad"><div className="container final-cta-card reveal"><h2>Conte o que hoje está difícil no seu negócio</h2><p>A conversa inicial serve para entender se {label} é o melhor começo, delimitar uma primeira versão e esclarecer o próximo passo.</p><a className="button button-light" href={ctaUrl} target="_blank" rel="noopener noreferrer">Conversar no WhatsApp <ArrowRight size={17} /></a><small className="contact-note">O WhatsApp abrirá em uma nova aba. Envie apenas as informações necessárias para entendermos o projeto e não compartilhe dados sensíveis.</small></div></section>; }

function NotFound({ navigate }: { navigate: (href: string) => void }) { return <section className="not-found section-pad"><div className="container"><span className="section-tag">Página não encontrada</span><h1 tabIndex={-1}>Esse endereço não faz parte das soluções Origami</h1><p>Volte ao início para conhecer as soluções disponíveis.</p><InternalLink className="button button-primary" href="/" navigate={navigate}>Voltar ao início <ArrowRight size={17} /></InternalLink></div></section>; }

function Footer({ navigate, ctaUrl }: { navigate: (href: string) => void; ctaUrl: string }) { return <footer><div className="container footer-grid"><div><InternalLink className="brand footer-brand" href="/" navigate={navigate}><img src="/logo.png" alt="" width="32" height="32" /><span>Origami Lab</span></InternalLink><p>Soluções digitais sob medida para necessidades reais de pequenos negócios.</p><small>João Pessoa, Paraíba. © 2026</small></div><div><strong>Soluções</strong>{services.map((item) => <InternalLink href={item.slug} navigate={navigate} key={item.slug}>{item.nav}</InternalLink>)}</div><div><strong>Explorar</strong><InternalLink href="/#processo" navigate={navigate}>Como funciona</InternalLink><InternalLink href="/#demonstracoes" navigate={navigate}>Demonstrações</InternalLink><InternalLink href="/#duvidas" navigate={navigate}>Dúvidas</InternalLink></div><div><strong>Contato</strong><a href={ctaUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a><span>João Pessoa, PB</span></div></div></footer>; }

export default App;
