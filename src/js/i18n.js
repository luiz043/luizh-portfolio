const STORAGE_KEY = 'lang';

const translations = {
  en: {
    meta: {
      title: 'Luiz H - Fullstack Developer',
      description:
        'Luiz H, fullstack developer from Brazil. Vue, React, Node, GraphQL and interfaces that move.',
    },
    nav: { work: 'Work', about: 'About', contact: 'Contact' },
    hero: {
      line1: 'Code in',
      line2: 'motion.',
      sub: 'Fullstack developer from Brazil. I build web products end to end, from database to pixel.',
      ctaWork: 'View work',
    },
    about: {
      heading1: 'Half engineer,',
      heading2: 'half producer.',
      body: 'By day I ship fullstack products: <strong>Vue and React</strong> on the front, <strong>Node, GraphQL and PostgreSQL</strong> underneath. Right now that means building and maintaining an enterprise intranet used by two industrial organizations, and the Partithura system, used by the company Fundimisa.',
    },
    work: {
      heading: 'Selected work',
      project1: {
        title: 'Enterprise intranet',
        desc: 'Fullstack platform serving two industrial organizations: user management, custom layouts, an icon system and a GraphQL API over PostgreSQL.',
      },
      project2: {
        title: 'Riff to drums',
        desc: 'Feed it a raw guitar take, get a drum MIDI file back. Pitch tracking and onset analysis feed a local LLM that writes the groove.',
      },
      project3: {
        title: 'Presence lock',
        desc: 'Locks a Linux workstation the moment you walk away, using real-time face presence detection on the webcam.',
      },
      project4: {
        title: 'The cost of bad UX',
        desc: 'Empirical study for my thesis: two e-commerce prototypes, one deliberately broken. Usability jumped from 26.9 to 85.2 on the SUS scale, statistically validated.',
      },
      study: { baseline: 'baseline', optimized: 'optimized' },
    },
    cap: {
      heading: 'What I do',
      a: {
        title: 'Frontend engineering',
        desc: 'Interfaces built with Vue, Nuxt and React: component systems, state management, animation, and the discipline to keep them fast.',
      },
      b: {
        title: 'Backend &amp; APIs',
        desc: 'GraphQL and REST services in Node and Python, with schemas, auth and relational data modeled to last.',
      },
      c: {
        title: 'Data, AI &amp; tooling',
        desc: 'Practical machine learning and automation: audio analysis pipelines, local LLM integrations, computer vision experiments.',
      },
      d: {
        title: 'Audio &amp; creative code',
        desc: 'Producer and mix engineer for metal projects, bringing that ear for rhythm and dynamics into interactive work.',
      },
    },
    contact: { heading: "Let's build something." },
    footer: {
      meta: '&copy; 2026 Luiz Henrique &nbsp;&nbsp; Rio Grande do Sul, Brazil',
    },
  },
  pt: {
    meta: {
      title: 'Luiz H - Desenvolvedor Fullstack',
      description:
        'Luiz H, desenvolvedor fullstack do Brasil. Vue, React, Node, GraphQL e interfaces que se movem.',
    },
    nav: { work: 'Trabalhos', about: 'Sobre', contact: 'Contato' },
    hero: {
      line1: 'Código em',
      line2: 'movimento.',
      sub: 'Desenvolvedor fullstack do Brasil. Eu construo produtos web de ponta a ponta, do banco de dados ao pixel.',
      ctaWork: 'Ver projetos',
    },
    about: {
      heading1: 'Metade engenheiro,',
      heading2: 'metade produtor.',
      body: 'Durante o dia eu desenvolvo produtos fullstack: <strong>Vue e React</strong> no front, <strong>Node, GraphQL e PostgreSQL</strong> por baixo. Atualmente isso significa construir e manter uma intranet corporativa usada por duas organizações industriais, e o sistema Partithura, usado pela empresa Fundimisa.',
    },
    work: {
      heading: 'Projetos selecionados',
      project1: {
        title: 'Intranet corporativa',
        desc: 'Plataforma fullstack para duas organizações industriais: gestão de usuários, layouts customizados, um sistema de ícones e uma API GraphQL sobre PostgreSQL.',
      },
      project2: {
        title: 'Riff to drums',
        desc: 'Envie uma gravação de guitarra crua e receba um arquivo MIDI de bateria. Detecção de pitch e de onsets alimentam um LLM local que escreve o groove.',
      },
      project3: {
        title: 'Presence lock',
        desc: 'Bloqueia uma estação Linux no momento em que você se afasta, usando detecção de presença facial em tempo real pela webcam.',
      },
      project4: {
        title: 'O custo de uma UX ruim',
        desc: 'Estudo empírico para meu TCC: dois protótipos de e-commerce, um deliberadamente quebrado. A usabilidade saltou de 26.9 para 85.2 na escala SUS, com validação estatística.',
      },
      study: { baseline: 'linha de base', optimized: 'otimizado' },
    },
    cap: {
      heading: 'O que eu faço',
      a: {
        title: 'Engenharia de frontend',
        desc: 'Interfaces construídas com Vue, Nuxt e React: sistemas de componentes, gerenciamento de estado, animação e a disciplina de mantê-las rápidas.',
      },
      b: {
        title: 'Backend &amp; APIs',
        desc: 'Serviços GraphQL e REST em Node e Python, com schemas, autenticação e dados relacionais modelados para durar.',
      },
      c: {
        title: 'Dados, IA &amp; ferramentas',
        desc: 'Machine learning e automação na prática: pipelines de análise de áudio, integrações com LLM local, experimentos de visão computacional.',
      },
      d: {
        title: 'Áudio &amp; código criativo',
        desc: 'Produtor e engenheiro de mixagem para projetos de metal, trazendo esse ouvido para ritmo e dinâmica ao trabalho interativo.',
      },
    },
    contact: { heading: 'Vamos construir algo juntos.' },
    footer: {
      meta: '&copy; 2026 Luiz Henrique &nbsp;&nbsp; Rio Grande do Sul, Brasil',
    },
  },
};

function getPath(obj, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
}

function applyLang(lang) {
  const dict = translations[lang];
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  document.title = dict.meta.title;

  const descriptionTag = document.querySelector('meta[name="description"]');
  if (descriptionTag) descriptionTag.setAttribute('content', dict.meta.description);

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const value = getPath(dict, el.getAttribute('data-i18n'));
    if (value != null) el.textContent = value;
  });

  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const value = getPath(dict, el.getAttribute('data-i18n-html'));
    if (value != null) el.innerHTML = value;
  });

  const toggle = document.getElementById('lang-toggle');
  if (toggle) toggle.textContent = lang === 'pt' ? 'EN' : 'PT';

  localStorage.setItem(STORAGE_KEY, lang);
}

export function initI18n() {
  const saved = localStorage.getItem(STORAGE_KEY);
  const lang = saved === 'pt' || saved === 'en' ? saved : 'en';
  applyLang(lang);

  const toggle = document.getElementById('lang-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const current = document.documentElement.lang === 'pt-BR' ? 'pt' : 'en';
      applyLang(current === 'pt' ? 'en' : 'pt');
    });
  }
}
