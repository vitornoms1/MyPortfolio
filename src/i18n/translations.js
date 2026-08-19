export const translations = {
  en: {
    nav: {
      about: 'About',
      skills: 'Skills',
      journey: 'Journey',
      projects: 'Projects',
      contact: 'Contact',
    },
    hero: {
      index: '(00) — Software Engineer',
      subtitle:
        'I build reliable full-stack products from Java/Spring Boot APIs to React interfaces with clean architecture and an eye for detail.',
      github: 'GitHub ↗',
      linkedin: 'LinkedIn',
      resume: 'Download CV ↓',
    },
    about: {
      index: '(01) — About',
      title: 'Who I am',
      p1: "Software Engineering student with hands-on experience in full-stack development and SaaS applications. Skilled in building and maintaining RESTful APIs using Java, Spring Boot, React, Node.js, and SQL, with experience in data modeling and scalable application design.",
      p2: 'Familiar with modern development practices including Git-based workflows, Agile (Scrum) methodologies, and debugging across real-world projects. Strong problem-solving skills and the ability to translate technical requirements into reliable, user-focused solutions.',
      p3: 'Currently a Software Development Intern at Prolec, working on requirement analysis, feature implementation, and code reviews with C# and MudBlazor. Also a Hackathon Tech+Saúde 2024 winner, where I built a full-stack solution with Node.js and MySQL to track medical items for sanitary compliance.',
    },
    skills: {
      index: '(02) — Stack',
      title: 'Tools I work with',
    },
    journey: {
      index: '(03) — Journey',
      title: 'Timeline',
      items: [
        {
          date: '2018 - 2024',
          title: 'English Course',
          location: 'CCAA - Esteio',
          description: 'Completed a full English language program, reaching fluency through six years of continuous study.',
        },
        {
          date: 'Feb 2022 - Dec 2024',
          title: 'Technical Degree in Internet IT',
          location: 'SENAC - São Leopoldo',
          description: 'Studied the fundamentals of programming, logic, and database management, completing the Technical High School program focused on Internet IT.',
        },
        {
          date: 'Nov 2024',
          title: 'Hackathon Winner',
          location: 'SENAC RS / Unimed',
          description: 'First place in the Tech+Saúde Hackathon 2024. Built a full-stack solution with Node.js and MySQL to track medical items, ensuring sanitary compliance and patient safety.',
          highlight: true,
        },
        {
          date: 'Jan 2025 - Present',
          title: 'Bachelor in Software Engineering',
          location: 'Unilasalle - Canoas',
          description: "Pursuing a Bachelor's Degree in Software Engineering at Unilasalle to deepen theoretical and practical knowledge in complex systems.",
        },
        {
          date: 'June 2025 - Present',
          title: 'Software Developer Intern',
          location: 'Prolec - Canoas, Brazil',
          description: 'Working on Agile software development tasks, requirement analysis, feature implementation, and code reviews with C# and MudBlazor, while collaborating with senior and global teams to troubleshoot product issues.',
          highlight: true,
        },
      ],
    },
    projects: {
      index: '(04) — Projects',
      title: 'Selected work',
      subtitle: (count) => `${count} projects, spanning full-stack apps, APIs, and product landing pages.`,
      viewCode: 'Access Github',
      items: {
        JavaERP: {
          summary: 'A robust Java backend for inventory management with automated unit testing and audit logs.',
          description: 'A professional-grade backend application developed with Java 25 and Spring Boot. This Mini-ERP system manages product inventory and categories using a relational database (H2/JPA). It features complex business logic for stock validation, automated audit tracking (createdAt/updatedAt), and a global exception handling system. The project is fully documented with Swagger/OpenAPI and includes a suite of JUnit 5 tests to ensure 100% reliability of stock operations. This project demonstrates mastery of enterprise-level backend architecture and clean code principles.',
        },
        FinanceManager: {
          summary: 'A complete SaaS for personal finance with Auth, MySQL, and recurring payments logic.',
          description: 'A robust Full Stack application developed to manage personal finances. Built with React (Vite) on the frontend and Node.js (Express) on the backend, integrated with a MySQL database hosted on Railway. It features secure JWT authentication, complex business logic for handling recurring bill installments (preventing double payments), monthly/yearly data filtering, and dashboard visualization. This project demonstrates mastery of CRUD operations, relational database modeling, and solving production deployment challenges like CORS and Environment Variables.',
        },
        Alecrim: {
          summary: 'A responsive SPA for an event venue, featuring interactive modals and a backend-less WhatsApp contact form.',
          description: 'A responsive SPA for a local event venue, built with React (Vite) and Tailwind CSS. This project focuses on lead conversion, featuring subtle scroll animations (react-awesome-reveal) and a dynamic modal for event packages. The modal displays responsive tables (with horizontal scroll) and utilizes a `useEffect` hook to lock page scrolling when open. The primary feature is a backend-less contact form that formats user input and opens the WhatsApp API for an instant, direct line to the client. You can view the live deployment at: https://www.alecrimfestas.com.br/',
        },
        BarbeariaGustavo: {
          summary: 'A premium landing page for a barbershop featuring a dynamic service menu and an interactive image carousel.',
          description: 'A high-end, responsive landing page developed for a local barbershop to enhance online presence and client conversion. Built with React and Tailwind CSS, the project features a minimalist, menu-style price list categorized by individual services and promotional combos. It includes a custom-built, infinite-loop image gallery carousel with Framer Motion animations and automated transitions. The site is fully optimized for mobile devices and integrates a direct-to-WhatsApp scheduling system, ensuring a seamless booking experience for users. You can view the live deployment at: https://www.barbeariadogustavo.com.br/',
        },
        AnimeDex: {
          summary: 'An anime discovery platform using the Jikan API with search and filtering.',
          description: 'A feature-rich discovery platform for anime enthusiasts, powered by the Jikan API. Users can dynamically search, filter by genre, and sort titles across multiple pages. The application includes a detailed modal view with character data and utilizes URL-based state management, making user sessions shareable and refresh-proof.',
        },
      },
    },
    contact: {
      index: '(05) — Contact',
      title: "Let's talk",
      subtitle: 'Have a project in mind, or just want to say hi? Send me a message.',
      namePlaceholder: 'Your Name',
      emailPlaceholder: 'Your Email',
      messagePlaceholder: 'Your Message',
      send: 'Send Message',
      sending: 'Sending...',
      success: 'Message sent successfully!',
      error: 'Failed to send. Please try again.',
    },
  },

  pt: {
    nav: {
      about: 'Sobre',
      skills: 'Skills',
      journey: 'Trajetória',
      projects: 'Projetos',
      contact: 'Contato',
    },
    hero: {
      index: '(00) — Software Engineer',
      subtitle:
        'Eu construo produtos full-stack confiáveis de APIs em Java/Spring Boot a interfaces em React com arquitetura limpa e atenção aos detalhes.',
      github: 'GitHub ↗',
      linkedin: 'LinkedIn',
      resume: 'Baixar CV ↓',
    },
    about: {
      index: '(01) — Sobre',
      title: 'Quem eu sou',
      p1: 'Estudante de Engenharia de Software com experiência prática em desenvolvimento full-stack e aplicações SaaS. Habilidade em construir e manter APIs RESTful usando Java, Spring Boot, React, Node.js e SQL, com experiência em modelagem de dados e design de aplicações escaláveis.',
      p2: 'Familiaridade com práticas modernas de desenvolvimento, incluindo fluxos de trabalho baseados em Git, metodologias ágeis (Scrum) e debugging em projetos reais. Forte capacidade de resolução de problemas e habilidade de traduzir requisitos técnicos em soluções confiáveis e focadas no usuário.',
      p3: 'Atualmente Estagiário de Desenvolvimento de Software na Prolec, trabalhando em análise de requisitos, implementação de funcionalidades e revisões de código com C# e MudBlazor. Também vencedor do Hackathon Tech+Saúde 2024, onde construí uma solução full-stack com Node.js e MySQL para rastrear itens médicos garantindo conformidade sanitária.',
    },
    skills: {
      index: '(02) — Stack',
      title: 'Ferramentas que eu uso',
    },
    journey: {
      index: '(03) — Trajetória',
      title: 'Linha do tempo',
      items: [
        {
          date: '2018 - 2024',
          title: 'Curso de Inglês',
          location: 'CCAA - Esteio',
          description: 'Completei um curso completo de inglês, alcançando fluência ao longo de seis anos de estudo contínuo.',
        },
        {
          date: 'Fev 2022 - Dez 2024',
          title: 'Técnico em Informática para Internet',
          location: 'SENAC - São Leopoldo',
          description: 'Estudei os fundamentos de programação, lógica e gerenciamento de banco de dados, concluindo o Ensino Técnico focado em Informática para Internet.',
        },
        {
          date: 'Nov 2024',
          title: 'Vencedor de Hackathon',
          location: 'SENAC RS / Unimed',
          description: 'Primeiro lugar no Hackathon Tech+Saúde 2024. Construí uma solução full-stack com Node.js e MySQL para rastrear itens médicos, garantindo conformidade sanitária e segurança dos pacientes.',
          highlight: true,
        },
        {
          date: 'Jan 2025 - Presente',
          title: 'Bacharelado em Engenharia de Software',
          location: 'Unilasalle - Canoas',
          description: 'Cursando Bacharelado em Engenharia de Software na Unilasalle para aprofundar o conhecimento teórico e prático em sistemas complexos.',
        },
        {
          date: 'Jun 2025 - Presente',
          title: 'Estagiário de Desenvolvimento de Software',
          location: 'Prolec - Canoas, Brasil',
          description: 'Trabalhando em tarefas ágeis de desenvolvimento, análise de requisitos, implementação de funcionalidades e revisões de código  com C# e MudBlazor, colaborando com times seniores e globais para resolver problemas de produto.',
          highlight: true,
        },
      ],
    },
    projects: {
      index: '(04)  Projetos',
      title: 'Trabalhos selecionados',
      subtitle: (count) => `${count} projetos, entre aplicações full-stack, APIs e landing pages.`,
      viewCode: 'Acessar Github',
      items: {
        JavaERP: {
          summary: 'Um backend robusto em Java para gestão de estoque, com testes unitários automatizados e logs de auditoria.',
          description: 'Uma aplicação backend de nível profissional desenvolvida com Java 25 e Spring Boot. Este Mini-ERP gerencia estoque e categorias de produtos usando um banco de dados relacional (H2/JPA). Possui lógica de negócio complexa para validação de estoque, rastreamento automático de auditoria (createdAt/updatedAt) e um sistema global de tratamento de exceções. O projeto é totalmente documentado com Swagger/OpenAPI e inclui uma suíte de testes JUnit 5 para garantir 100% de confiabilidade nas operações de estoque. Demonstra domínio de arquitetura backend de nível empresarial e princípios de código limpo.',
        },
        FinanceManager: {
          summary: 'Um SaaS completo para finanças pessoais com autenticação, MySQL e lógica de pagamentos recorrentes.',
          description: 'Uma aplicação Full Stack robusta desenvolvida para gerenciar finanças pessoais. Construída com React (Vite) no frontend e Node.js (Express) no backend, integrada a um banco de dados MySQL hospedado na Railway. Possui autenticação segura com JWT, lógica complexa para lidar com parcelas de contas recorrentes (evitando pagamentos duplicados), filtragem de dados mensal/anual e visualização em dashboard. Demonstra domínio de operações CRUD, modelagem de banco de dados relacional e solução de desafios de deploy em produção como CORS e variáveis de ambiente.',
        },
        Alecrim: {
          summary: 'Uma SPA responsiva para um espaço de eventos, com modais interativos e formulário de contato via WhatsApp sem backend.',
          description: 'Uma SPA responsiva para um espaço de eventos local, construída com React (Vite) e Tailwind CSS. O projeto foca em conversão de leads, com animações sutis de scroll (react-awesome-reveal) e um modal dinâmico para pacotes de eventos. O modal exibe tabelas responsivas (com scroll horizontal) e utiliza um hook `useEffect` para travar o scroll da página quando aberto. O destaque é um formulário de contato sem backend que formata a entrada do usuário e abre a API do WhatsApp para um contato direto e instantâneo com o cliente. Você pode ver o deploy em produção em: https://www.alecrimfestas.com.br/',
        },
        BarbeariaGustavo: {
          summary: 'Uma landing page premium para uma barbearia, com cardápio de serviços dinâmico e carrossel de imagens interativo.',
          description: 'Uma landing page premium e responsiva desenvolvida para uma barbearia local, aumentando a presença online e a conversão de clientes. Construída com React e Tailwind CSS, apresenta uma lista de preços minimalista em estilo cardápio, categorizada por serviços individuais e combos promocionais. Inclui um carrossel de galeria de imagens em loop infinito, construído do zero com animações em Framer Motion e transições automáticas. O site é totalmente otimizado para dispositivos móveis e integra um sistema de agendamento direto pelo WhatsApp. Você pode ver o deploy em produção em: https://www.barbeariadogustavo.com.br/',
        },
        AnimeDex: {
          summary: 'Uma plataforma de descoberta de animes usando a API Jikan, com busca e filtros.',
          description: 'Uma plataforma rica em funcionalidades para descoberta de animes, alimentada pela API Jikan. Os usuários podem buscar dinamicamente, filtrar por gênero e ordenar títulos em múltiplas páginas. A aplicação inclui uma visualização em modal detalhada com dados de personagens e utiliza gerenciamento de estado via URL, tornando as sessões dos usuários compartilháveis e resistentes a atualizações de página.',
        },
      },
    },
    contact: {
      index: '(05)  Contato',
      title: 'Vamos conversar',
      subtitle: 'Tem um projeto em mente, ou só quer dar um oi? Me manda uma mensagem.',
      namePlaceholder: 'Seu Nome',
      emailPlaceholder: 'Seu E-mail',
      messagePlaceholder: 'Sua Mensagem',
      send: 'Enviar Mensagem',
      sending: 'Enviando...',
      success: 'Mensagem enviada com sucesso!',
      error: 'Falha ao enviar. Tente novamente.',
    },
  },
};
