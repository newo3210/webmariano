// Mariano Montini ('bosque','bosquestudio')
// Site boot - video, reveals, formation accordion, rubro folders.

// Folder ledger content - appears when a rubro folder is selected
const FOLDER_DATA = {
  prensa: {
    title: "Dirección de Prensa — Municipio de Epuyén",
    kicker: "Folder · Prensa",
    items: [
      {
        code: "PR",
        tone: "cyan",
        name: "Coordinación de comunicación institucional",
        meta: "Municipio de Epuyén",
        status: "Activo",
        detail:
          "Diseño de relatos públicos, vínculo con medios y cobertura de agenda territorial.",
      },
      {
        code: "EV",
        tone: "gold",
        name: "Cobertura de actos y cultura local",
        meta: "Prensa + producción",
        status: "Campo",
        detail:
          "Registro, difusión y protocolo de eventos municipales y comunitarios.",
      },
      {
        code: "NT",
        tone: "silver",
        name: "Narrativa territorial",
        meta: "Epuyén / Comarca",
        status: "Serie",
        detail:
          "Piezas editoriales que conectan gestión, paisaje y comunidad.",
      },
    ],
  },
  web3: {
    title: "Arquitecto de Protocolos & Desarrollador Web3 & IA",
    kicker: "Folder · Protocolos",
    items: [
      {
        code: "W3",
        tone: "magenta",
        name: "Arquitectura de protocolos Web3",
        meta: "Smart flows / integraciones",
        status: "Build",
        detail:
          "Diseño de flujos on-chain/off-chain, wallets, y capas de identidad.",
      },
      {
        code: "AG",
        tone: "lime",
        name: "Agentes IA y automatizaciones",
        meta: "Orquestación / RAG / tools",
        status: "Live",
        detail:
          "Agentes autónomos, automatización de procesos y consultoría de adopción.",
      },
      {
        code: "FE",
        tone: "cyan",
        name: "Interfaces full stack",
        meta: "React / Node / APIs",
        status: "Ship",
        detail:
          "Frontends reactivos conectados a backends, datos y servicios IA.",
      },
    ],
  },
  bosque: {
    title: "Bosquegracias — Dirección e infraestructura",
    kicker: "Folder · Bosquegracias",
    items: [
      {
        code: "BG",
        tone: "lime",
        name: "Dirección de proyecto",
        meta: "Bosquegracias",
        status: "Core",
        detail:
          "Visión, operación y coordinación de infraestructura cultural-tecnológica.",
      },
      {
        code: "IN",
        tone: "green",
        name: "Infraestructura y sistemas",
        meta: "Red / studio / ops",
        status: "Ops",
        detail:
          "Montaje técnico, redes, persistencia de identidad y stack creativo.",
      },
      {
        code: "ST",
        tone: "gold",
        name: "Studio & brand systems",
        meta: "Bosque / Bosquestudio",
        status: "Lab",
        detail:
          "Sistemas de marca, herramientas internas y laboratorio de producto.",
      },
    ],
  },
  arte: {
    title: "Arte y Música Experimental",
    kicker: "Folder · Arte",
    items: [
      {
        code: "AX",
        tone: "gold",
        name: "Música experimental / live",
        meta: "Sonido · performance",
        status: "Stage",
        detail:
          "Exploración sonora, live sets y calibración de espacios culturales.",
      },
      {
        code: "AV",
        tone: "magenta",
        name: "Arte audiovisual",
        meta: "Imagen · código · escena",
        status: "Show",
        detail:
          "Piezas que cruzan video, código y atmósfera; planos vivos en escena.",
      },
      {
        code: "ED",
        tone: "cyan",
        name: "Edición y archivo vivo",
        meta: "Memoria / collage",
        status: "Archive",
        detail:
          "Curaduría de material propio: fotogramas, stems y relatos en capas.",
      },
    ],
  },
  hardware: {
    title: "Hardware y soporte",
    kicker: "Folder · Hardware",
    items: [
      {
        code: "HW",
        tone: "gold",
        name: "Ensamble y reparación de PC",
        meta: "Diagnóstico · upgrade · recovery",
        status: "Core",
        detail:
          "Armado, mantenimiento y reparación de equipos: desde el primer protocolo técnico hasta soporte actual.",
      },
      {
        code: "NET",
        tone: "cyan",
        name: "Redes y periféricos",
        meta: "LAN · impresoras · storage",
        status: "Ops",
        detail:
          "Configuración de redes locales, almacenamiento y periféricos para estudio y producción.",
      },
      {
        code: "SUP",
        tone: "silver",
        name: "Soporte técnico aplicado",
        meta: "Campo · remoto",
        status: "Live",
        detail:
          "Resolución de incidencias, optimización de estaciones de trabajo y acompañamiento técnico.",
      },
    ],
  },
};

// Hero + nature muted loop autoplay
function bootHeroVideo() {
  const videos = document.querySelectorAll(
    ".hero-video video, .nature-shot__video",
  );

  videos.forEach((video) => {
    video.muted = true;
    video.playsInline = true;

    const tryPlay = () => {
      const play = video.play();
      if (play && typeof play.then === "function") {
        play.catch(() => {});
      }
    };

    if (video.readyState >= 2) tryPlay();
    else video.addEventListener("loadeddata", tryPlay, { once: true });
  });
}

// Section reveal - fade/rise into view
function bootReveals() {
  const nodes = document.querySelectorAll(
    ".section--gallery, .section--focus, .section--planes, .section--scroll-lab, .section--close, .nature-stage, .filler:not([data-fade-parallax])",
  );
  nodes.forEach((node) => node.classList.add("reveal"));

  if (!("IntersectionObserver" in window)) {
    nodes.forEach((node) => node.classList.add("is-in"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  );

  nodes.forEach((node) => io.observe(node));
}

// Phrase pin stage - sticky block; scroll progress reveals gold phrases one by one
function bindPhrasePin(pin, stage) {
  const phrases = [...pin.querySelectorAll(".bio-duo__phrase")];
  if (!phrases.length) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || window.matchMedia("(max-width: 900px)").matches) {
    phrases.forEach((node) => node.classList.add("is-on"));
    pin.classList.add("is-complete");
    return;
  }

  // Phrase unlock share of the runway; remainder is a read-hold with video sticky
  const PHRASE_VH = 0.55;
  const HOLD_VH = 0.95;
  const REVEAL_END = 0.68;

  // Pin height - phrases + extra sticky hold after the last line appears
  const syncPinHeight = () => {
    const stageH = Math.max(stage.offsetHeight, window.innerHeight * 0.7);
    const runway =
      stageH +
      phrases.length * window.innerHeight * PHRASE_VH +
      window.innerHeight * HOLD_VH;
    pin.style.height = `${Math.round(runway)}px`;
  };

  let ticking = false;
  let lastCount = -1;

  // Scroll progress inside pin - reveal first, then hold to read before unpinning
  const update = () => {
    const rect = pin.getBoundingClientRect();
    const travel = pin.offsetHeight - window.innerHeight;
    if (travel <= 0) {
      phrases.forEach((node) => node.classList.add("is-on"));
      pin.classList.add("is-complete");
      ticking = false;
      return;
    }

    const scrolled = Math.min(Math.max(-rect.top, 0), travel);
    const progress = scrolled / travel;
    // Map only the early part of the runway to phrase unlocks
    const padded = Math.min(
      1,
      Math.max(0, (progress - 0.03) / (REVEAL_END - 0.03)),
    );
    const revealed = Math.min(
      phrases.length,
      Math.ceil(padded * phrases.length),
    );

    if (revealed !== lastCount) {
      phrases.forEach((node, index) => {
        node.classList.toggle("is-on", index < revealed);
      });
      lastCount = revealed;
    }

    pin.classList.toggle("is-complete", revealed >= phrases.length);
    ticking = false;
  };

  // Scroll/resize listeners - rAF throttle
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  syncPinHeight();
  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => {
    syncPinHeight();
    onScroll();
  });
}

// Bio duo pins - sticky video + phrase reveal for each runway
function bootBioDuoParallax() {
  document.querySelectorAll(".bio-duo-pin").forEach((pin) => {
    const duo = pin.querySelector(".bio-duo");
    if (!duo) return;

    // Autoplay muted loop for the duo video
    const video = duo.querySelector("video");
    if (video) {
      video.muted = true;
      video.playsInline = true;
      const tryPlay = () => {
        const play = video.play();
        if (play && typeof play.then === "function") play.catch(() => {});
      };
      if (video.readyState >= 2) tryPlay();
      else video.addEventListener("loadeddata", tryPlay, { once: true });
    }

    bindPhrasePin(pin, duo);
  });
}

// Mid-plane parallax - ghost type drifts lightly under the hero
function bootCenterParallax() {
  const ghost = document.querySelector(".hero__ghost");
  if (!ghost) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  let ticking = false;

  const update = () => {
    const y = window.scrollY;
    ghost.style.transform = `translate(-50%, calc(-50% + ${y * 0.12}px))`;
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    },
    { passive: true },
  );
}

// Side column stacks - original then mirrored opposite, repeated to cover page
function bootSideColumnStacks() {
  const L = "design/images/Lcolumn-alpha.png";
  const R = "design/images/Rcolumn-alpha.png";

  // Left: L then mirrored R; right: R then mirrored L
  const specs = [
    {
      plane: document.getElementById("lplane"),
      className: "lplane__img",
      pattern: [
        { src: L, mirror: false },
        { src: R, mirror: true },
      ],
    },
    {
      plane: document.getElementById("rplane"),
      className: "rplane__img",
      pattern: [
        { src: R, mirror: false },
        { src: L, mirror: true },
      ],
    },
  ];

  // Fill one stack until it covers document height (+ lag headroom)
  const fillStack = async (plane, className, pattern) => {
    const stack = plane?.querySelector(".sideplane__stack");
    if (!stack || !pattern.length) return;

    const probe = new Image();
    probe.src = pattern[0].src;
    try {
      await probe.decode();
    } catch {
      return;
    }

    const planeW = Math.max(plane.offsetWidth, 1);
    const scale = className.startsWith("lplane") ? 1.1 : 1;
    const tileH = planeW * scale * (probe.naturalHeight / probe.naturalWidth);
    const pageH = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      window.innerHeight,
    );
    // Lag moves columns slower — need extra length past page end
    const targetH = pageH * 1.5;
    const count = Math.min(48, Math.max(2, Math.ceil(targetH / tileH) + 1));

    stack.innerHTML = "";
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const step = pattern[i % pattern.length];
      const img = document.createElement("img");
      img.className = step.mirror ? `${className} ${className}--mirror` : className;
      img.src = step.src;
      img.alt = "";
      img.decoding = "async";
      img.loading = i < 2 ? "eager" : "lazy";
      frag.appendChild(img);
    }
    stack.appendChild(frag);
  };

  return Promise.all(
    specs.map(({ plane, className, pattern }) =>
      fillStack(plane, className, pattern),
    ),
  );
}

// Rebuild stacks when layout/page height changes
function bootSideColumnStacksLive() {
  let timer = 0;
  const run = () => {
    bootSideColumnStacks();
  };
  run();
  window.addEventListener("resize", () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(run, 200);
  });
  // Late rebuild after fonts/images settle page height
  window.addEventListener("load", () => {
    window.setTimeout(run, 300);
  });
}

// Side column lag — left + right rise slower than center (JS only)
function bootSideColumnParallax() {
  const planes = [
    document.getElementById("lplane"),
    document.getElementById("rplane"),
  ].filter(Boolean);
  if (!planes.length) return;

  // 0.7 = column rises at ~30% of center speed (very obvious desync)
  const LAG = 0.7;
  let ticking = false;

  const update = () => {
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    const offset = y * LAG;
    planes.forEach((plane) => {
      plane.style.setProperty(
        "transform",
        "translate3d(0," + offset + "px,0)",
        "important",
      );
    });
    ticking = false;
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  document.addEventListener("scroll", onScroll, { passive: true, capture: true });
  window.addEventListener("resize", update);
}

// Accordion - expand/collapse token rows inside a list
function bindAccordion(root) {
  if (!root) return;

  root.addEventListener("click", (event) => {
    const button = event.target.closest(".token-row");
    if (!button || !root.contains(button)) return;

    const item = button.closest(".token-item");
    const panel = item?.querySelector(".token-panel");
    if (!item || !panel) return;

    const willOpen = !item.classList.contains("is-open");

    root.querySelectorAll(".token-item.is-open").forEach((openItem) => {
      if (openItem === item) return;
      openItem.classList.remove("is-open");
      const openBtn = openItem.querySelector(".token-row");
      const openPanel = openItem.querySelector(".token-panel");
      if (openBtn) openBtn.setAttribute("aria-expanded", "false");
      if (openPanel) openPanel.hidden = true;
    });

    item.classList.toggle("is-open", willOpen);
    button.setAttribute("aria-expanded", String(willOpen));
    panel.hidden = !willOpen;
  });
}

// Formation accordion
function bootFormationAccordion() {
  bindAccordion(document.querySelector('[data-accordion="formacion"]'));
}

// Formation ledger pin - sticky title; each study item fades up with a read-hold
function bootFormationLedgerPin() {
  const pin = document.querySelector(".ledger-pin");
  const stage = document.querySelector(".ledger-stage");
  const items = [...document.querySelectorAll("[data-ledger-item]")];
  if (!pin || !stage || !items.length) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || window.matchMedia("(max-width: 900px)").matches) {
    items.forEach((node) => node.classList.add("is-on"));
    pin.classList.add("is-complete");
    return;
  }

  // Per-item scroll share + trailing hold after the last row appears
  const ITEM_VH = 0.72;
  const HOLD_VH = 0.85;
  const REVEAL_START = 0.04;
  const REVEAL_END = 0.78;

  // Pin height - sticky stage + one hold beat per item + exit hold
  const syncPinHeight = () => {
    const stageH = Math.max(stage.offsetHeight, window.innerHeight * 0.55);
    const runway =
      stageH +
      items.length * window.innerHeight * ITEM_VH +
      window.innerHeight * HOLD_VH;
    pin.style.height = `${Math.round(runway)}px`;
  };

  let ticking = false;
  let lastCount = -1;

  // Progress → unlock items one by one; remainder is read time before unpin
  const update = () => {
    const rect = pin.getBoundingClientRect();
    const travel = pin.offsetHeight - window.innerHeight;
    if (travel <= 0) {
      items.forEach((node) => node.classList.add("is-on"));
      pin.classList.add("is-complete");
      ticking = false;
      return;
    }

    const scrolled = Math.min(Math.max(-rect.top, 0), travel);
    const progress = scrolled / travel;
    const padded = Math.min(
      1,
      Math.max(0, (progress - REVEAL_START) / (REVEAL_END - REVEAL_START)),
    );
    const revealed = Math.min(items.length, Math.ceil(padded * items.length));

    if (revealed !== lastCount) {
      items.forEach((node, index) => {
        node.classList.toggle("is-on", index < revealed);
      });
      lastCount = revealed;
    }

    pin.classList.toggle("is-complete", revealed >= items.length);
    ticking = false;
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  syncPinHeight();
  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => {
    syncPinHeight();
    onScroll();
  });
}

// Build folder detail list markup - slim table rows (not formation pills)
function renderFolderItems(items) {
  return items
    .map((item, index) => {
      const id = `rubro-${index + 1}`;
      return `
        <li class="token-item">
          <button class="token-row" type="button" aria-expanded="false" aria-controls="${id}">
            <span class="token-avatar" data-tone="${item.tone}">${item.code}</span>
            <span class="token-name">${item.name}</span>
            <span class="token-meta">${item.meta}</span>
            <span class="token-status">${item.status}</span>
            <span class="token-chevron" aria-hidden="true"></span>
          </button>
          <div class="token-panel" id="${id}" hidden>
            <p>${item.detail}</p>
          </div>
        </li>`;
    })
    .join("");
}

// Folder carousel - click reveals the hidden ledger for that rubro
function bootFolderRail() {
  const rail = document.querySelector(".folder-rail");
  const detail = document.querySelector("#folder-detail");
  const list = document.querySelector("#folder-detail-list");
  const title = document.querySelector("#folder-detail-title");
  const kicker = document.querySelector("#folder-detail-kicker");
  if (!rail || !detail || !list || !title || !kicker) return;

  bindAccordion(list);

  rail.addEventListener("click", (event) => {
    const folder = event.target.closest(".folder");
    if (!folder || !folder.classList.contains("is-flipped")) return;

    const key = folder.dataset.folder;
    const data = FOLDER_DATA[key];
    if (!data) return;

    const already = folder.getAttribute("aria-pressed") === "true";

    rail.querySelectorAll(".folder").forEach((node) => {
      node.setAttribute("aria-pressed", "false");
    });

    if (already) {
      detail.hidden = true;
      list.innerHTML = "";
      return;
    }

    folder.setAttribute("aria-pressed", "true");
    kicker.textContent = data.kicker;
    title.textContent = data.title;
    list.innerHTML = renderFolderItems(data.items);
    detail.hidden = false;

    detail.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

// Folder naipes pin - sticky rail; cards flip face-up one by one on scroll
function bootFolderFlipPin() {
  const pin = document.querySelector(".folders-pin");
  const stage = document.querySelector(".folders-stage");
  const cards = [...document.querySelectorAll("[data-folder-card]")];
  if (!pin || !stage || !cards.length) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || window.matchMedia("(max-width: 900px)").matches) {
    cards.forEach((card) => card.classList.add("is-flipped"));
    pin.classList.add("is-complete");
    return;
  }

  // One hold beat per naipe + trailing pause after the last flip
  const CARD_VH = 0.62;
  const HOLD_VH = 0.7;
  const REVEAL_START = 0.05;
  const REVEAL_END = 0.82;

  // Pin height - sticky stage + flip runway + exit hold
  const syncPinHeight = () => {
    const stageH = Math.max(stage.offsetHeight, window.innerHeight * 0.45);
    const runway =
      stageH +
      cards.length * window.innerHeight * CARD_VH +
      window.innerHeight * HOLD_VH;
    pin.style.height = `${Math.round(runway)}px`;
  };

  let ticking = false;
  let lastCount = -1;

  // Progress → flip cards left-to-right like dealing naipes
  const update = () => {
    const rect = pin.getBoundingClientRect();
    const travel = pin.offsetHeight - window.innerHeight;
    if (travel <= 0) {
      cards.forEach((card) => card.classList.add("is-flipped"));
      pin.classList.add("is-complete");
      ticking = false;
      return;
    }

    const scrolled = Math.min(Math.max(-rect.top, 0), travel);
    const progress = scrolled / travel;
    const padded = Math.min(
      1,
      Math.max(0, (progress - REVEAL_START) / (REVEAL_END - REVEAL_START)),
    );
    const revealed = Math.min(cards.length, Math.ceil(padded * cards.length));

    if (revealed !== lastCount) {
      cards.forEach((card, index) => {
        card.classList.toggle("is-flipped", index < revealed);
      });
      lastCount = revealed;
    }

    pin.classList.toggle("is-complete", revealed >= cards.length);
    ticking = false;
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  syncPinHeight();
  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => {
    syncPinHeight();
    onScroll();
  });
}

// Nature pin - sticky; void → image hold → video horizontal scrub with smooth lerp
function bootNatureHorizontalScrub() {
  const pin = document.querySelector(".nature-pin");
  const track = document.querySelector("[data-nature-track]");
  if (!pin || !track) return;

  // Max translate: two of three panels (void → image → video)
  const MAX_SHIFT = 200 / 3;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    track.style.transform = `translate3d(-${MAX_SHIFT}%, 0, 0)`;
    return;
  }

  // Timeline shares of the pin: arrive on image, hold, then scrub to video
  const SCRUB_START = 0.02;
  const IMAGE_AT = 0.2;
  const IMAGE_HOLD_END = 0.52;
  const SCRUB_END = 0.72;
  const MOVE_VH = 2.2;
  const IMAGE_HOLD_VH = 1.6;
  const VIDEO_HOLD_VH = 2;
  const LERP = 0.14;

  // Ease-in-out - softens start/stop so the track does not feel stepped
  const easeInOut = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  // Map pin progress → scrub 0 (void) … 0.5 (image hold) … 1 (video)
  const mapProgressToScrub = (progress) => {
    if (progress <= SCRUB_START) return 0;
    if (progress >= SCRUB_END) return 1;

    if (progress < IMAGE_AT) {
      const t = (progress - SCRUB_START) / (IMAGE_AT - SCRUB_START);
      return easeInOut(Math.min(1, Math.max(0, t))) * 0.5;
    }

    // machinenature centered — stay still for several scroll beats
    if (progress < IMAGE_HOLD_END) return 0.5;

    const t = (progress - IMAGE_HOLD_END) / (SCRUB_END - IMAGE_HOLD_END);
    return 0.5 + easeInOut(Math.min(1, Math.max(0, t))) * 0.5;
  };

  // Pin height - void→image + image hold + image→video + video hold
  const syncPinHeight = () => {
    const stage = pin.querySelector(".nature-stage");
    const stageH = stage ? stage.offsetHeight : window.innerHeight * 0.75;
    const runway =
      stageH +
      window.innerHeight * (MOVE_VH + IMAGE_HOLD_VH + VIDEO_HOLD_VH);
    pin.style.height = `${Math.round(runway)}px`;
  };

  let target = 0;
  let current = 0;
  let raf = 0;

  // Paint smoothed position every frame until it catches the scroll target
  const paint = () => {
    current += (target - current) * LERP;
    if (Math.abs(target - current) < 0.0004) current = target;
    track.style.transform = `translate3d(${(-current * MAX_SHIFT).toFixed(4)}%, 0, 0)`;
    if (current !== target) raf = requestAnimationFrame(paint);
    else raf = 0;
  };

  // Read pin progress and latch scrub target (with image hold plateau)
  const updateTarget = () => {
    const rect = pin.getBoundingClientRect();
    const travel = Math.max(pin.offsetHeight - window.innerHeight, 1);
    const scrolled = Math.min(Math.max(-rect.top, 0), travel);
    const progress = scrolled / travel;
    target = mapProgressToScrub(progress);
    if (!raf) raf = requestAnimationFrame(paint);
  };

  syncPinHeight();
  updateTarget();
  window.addEventListener("scroll", updateTarget, { passive: true });
  window.addEventListener("resize", () => {
    syncPinHeight();
    updateTarget();
  });
}

// Protocols pin - sticky hold; title fade + video currentTime scrubbed by scroll
function bootProtocolsParallax() {
  const pin = document.querySelector(".protocols-pin");
  const title = document.querySelector("[data-protocols-parallax]");
  const video = document.querySelector("[data-protocols-scrub]");
  if (!pin || !title) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    title.style.opacity = "1";
    title.style.filter = "none";
    title.style.transform = "none";
    if (video) {
      video.pause();
      const showStill = () => {
        if (video.duration && Number.isFinite(video.duration)) {
          video.currentTime = Math.min(video.duration * 0.5, video.duration - 0.05);
        }
      };
      if (video.readyState >= 1) showStill();
      else video.addEventListener("loadedmetadata", showStill, { once: true });
    }
    return;
  }

  // Scrub starts as soon as the pin locks; long runway keeps mouse-wheel slow
  const SCRUB_START = 0;
  const SCRUB_END = 0.97;
  const LERP = 0.2;
  // ~1.75 vh of scroll per second of footage — slow mouse-wheel scrub
  const SCRUB_VH_PER_SEC = 1.75;
  const BASE_HOLD_VH = 2.5;

  let duration = 0;
  let targetTime = 0;
  let smoothTime = 0;
  let seeking = false;
  let seekTo = 0;
  let canScrub = false;
  let raf = 0;
  let ticking = false;

  // Linear map - responds on the first scroll (ease-in-out felt like a dead zone)

  // True once the media reports a real seekable window (needs HTTP Range)
  const refreshSeekable = () => {
    if (!video || !video.seekable || video.seekable.length === 0) {
      canScrub = false;
      return false;
    }
    canScrub = video.seekable.end(video.seekable.length - 1) > 0.25;
    return canScrub;
  };

  // Pin height - stage + hold long enough to scrub the full clip
  const syncPinHeight = () => {
    const stage = pin.querySelector(".protocols-stage");
    const stageH = stage ? stage.offsetHeight : window.innerHeight * 0.78;
    const scrubVh =
      BASE_HOLD_VH + Math.max(duration, 8) * SCRUB_VH_PER_SEC;
    const runway = stageH + window.innerHeight * scrubVh;
    pin.style.height = `${Math.round(runway)}px`;
  };

  // Seek queue - one in-flight seek; skip if Range/seekable is not ready
  const requestSeek = (time) => {
    if (!video || !duration || !refreshSeekable()) return;
    const end = video.seekable.end(video.seekable.length - 1);
    const t = Math.min(Math.max(time, 0), Math.min(end, Math.max(duration - 0.04, 0)));
    if (Math.abs(video.currentTime - t) < 0.04) return;
    if (seeking) {
      seekTo = t;
      return;
    }
    seeking = true;
    seekTo = t;
    try {
      video.currentTime = t;
    } catch {
      seeking = false;
    }
  };

  // Paint lerp toward scroll-mapped time every frame while sticky
  const paint = () => {
    smoothTime += (targetTime - smoothTime) * LERP;
    if (Math.abs(targetTime - smoothTime) < 0.001) smoothTime = targetTime;
    requestSeek(smoothTime);
    if (smoothTime !== targetTime) raf = requestAnimationFrame(paint);
    else raf = 0;
  };

  // Fade title + map pin progress → video timeline
  const update = () => {
    const rect = pin.getBoundingClientRect();
    const vh = window.innerHeight;
    const travel = Math.max(pin.offsetHeight - vh, 1);
    const scrolled = Math.min(Math.max(-rect.top, 0), travel);
    const progress = scrolled / travel;

    const enter = Math.min(1, Math.max(0, (vh * 0.72 - rect.top) / (vh * 0.35)));
    const blur = (1 - enter) * 6;
    const rise = (1 - enter) * 2.5;
    // Gentle upward drift while sticky — keep title readable during the scrub hold
    const drift = progress * -4.5;

    title.style.opacity = enter.toFixed(3);
    title.style.filter = blur > 0.15 ? `blur(${blur.toFixed(2)}px)` : "none";
    title.style.transform = `translate3d(0, ${(rise + drift).toFixed(2)}rem, 0)`;

    if (video && duration > 0 && canScrub) {
      const raw = Math.min(
        1,
        Math.max(0, (progress - SCRUB_START) / (SCRUB_END - SCRUB_START)),
      );
      targetTime = raw * duration;
      if (!raf) raf = requestAnimationFrame(paint);
    }

    ticking = false;
  };

  if (video) {
    video.muted = true;
    video.playsInline = true;
    video.pause();

    const onMeta = () => {
      duration = video.duration || 0;
      if (!Number.isFinite(duration) || duration <= 0) duration = 0;
      refreshSeekable();
      syncPinHeight();
      update();
    };

    if (video.readyState >= 1) onMeta();
    else video.addEventListener("loadedmetadata", onMeta, { once: true });

    // progress fires as more bytes arrive and seekable expands
    video.addEventListener("progress", () => {
      if (refreshSeekable()) update();
    });

    video.addEventListener("seeked", () => {
      seeking = false;
      if (Math.abs(video.currentTime - seekTo) > 0.05) requestSeek(seekTo);
      else if (Math.abs(smoothTime - video.currentTime) > 0.05) requestSeek(smoothTime);
    });
  }

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  syncPinHeight();
  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => {
    syncPinHeight();
    onScroll();
  });
}

// Fade-parallax entries - each layer rises from its own depth while fading in on scroll
function bootFadeParallax() {
  const blocks = [...document.querySelectorAll("[data-fade-parallax]")];
  if (!blocks.length) return;

  const layers = blocks.map((block) => ({
    block,
    items: [...block.querySelectorAll("[data-fp-depth]")],
  }));

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    layers.forEach(({ items }) => items.forEach((node) => (node.style.opacity = "1")));
    return;
  }

  // Entry window - starts at viewport bottom, completes when block top reaches 40% of viewport
  const ENTRY_SPAN = 0.6;
  const STAGGER = 0.15;
  let ticking = false;

  const update = () => {
    const vh = window.innerHeight;

    layers.forEach(({ block, items }) => {
      const rect = block.getBoundingClientRect();
      const progress = Math.min(Math.max((vh - rect.top) / (vh * ENTRY_SPAN), 0), 1);

      items.forEach((node, index) => {
        const delay = index * STAGGER;
        const local = Math.min(Math.max((progress - delay) / (1 - delay), 0), 1);
        const eased = 1 - Math.pow(1 - local, 3);
        const depth = Number(node.dataset.fpDepth) || 80;

        node.style.opacity = eased.toFixed(3);
        node.style.transform = `translate3d(0, ${((1 - eased) * depth).toFixed(1)}px, 0)`;
        node.style.filter = eased < 1 ? `blur(${((1 - eased) * 6).toFixed(2)}px)` : "none";
      });
    });

    ticking = false;
  };

  // Scroll/resize listeners - rAF throttle
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
}

bootHeroVideo();
bootReveals();
bootFadeParallax();
bootCenterParallax();
bootSideColumnStacksLive();
bootSideColumnParallax();
bootBioDuoParallax();
bootNatureHorizontalScrub();
bootProtocolsParallax();
bootFormationAccordion();
bootFormationLedgerPin();
bootFolderRail();
bootFolderFlipPin();

// CRM clients - fictional people, tasks, stages, and contact coordinates.
const CRM_STAGES = ["Lead", "Propuesta", "Activa"];

const CRM_CLIENTS = [
  {
    id: "alejandro",
    name: "Alejandro Pérez",
    zone: "Tupungato, Mendoza",
    address: "Ruta 89, espacio de cowork",
    role: "Campaña Mendoza",
    lat: -33.37,
    lon: -69.148,
    skin: "#f0c7a4",
    hair: "#3a2a22",
    shirt: "#2457c5",
    contact: "12 mar 2026",
    stage: 0,
    groups: [
      {
        title: "Hoy",
        open: true,
        tasks: [
          { id: "al-visita", title: "Confirmar visita al cowork", points: 8, done: false },
          { id: "al-servidor", title: "Enviar propuesta de servidores", points: 5, done: false },
        ],
      },
      {
        title: "Seguimiento",
        open: false,
        tasks: [
          { id: "al-bot", title: "Probar chatbot de turnos", points: 6, done: false },
        ],
      },
    ],
  },
  {
    id: "camila",
    name: "Camila Soto",
    zone: "San Telmo, CABA",
    address: "Av. Defensa 1120",
    role: "Base de clientes",
    lat: -34.621,
    lon: -58.373,
    skin: "#e7b497",
    hair: "#1c120e",
    shirt: "#7c3aed",
    contact: "4 feb 2026",
    stage: 1,
    groups: [
      {
        title: "Hoy",
        open: true,
        tasks: [
          { id: "ca-mail", title: "Delegar campaña de correo", points: 8, done: false },
        ],
      },
      {
        title: "Seguimiento",
        open: false,
        tasks: [
          { id: "ca-base", title: "Cerrar listado de ventas", points: 6, done: false },
        ],
      },
    ],
  },
  {
    id: "mateo",
    name: "Mateo Vargas",
    zone: "Epuyén, Chubut",
    address: "Salón cultural municipal",
    role: "Cobertura de prensa",
    lat: -42.233,
    lon: -71.367,
    skin: "#f3d2b5",
    hair: "#6b3a22",
    shirt: "#0f766e",
    contact: "28 ene 2026",
    stage: 0,
    groups: [
      {
        title: "Hoy",
        open: true,
        tasks: [
          { id: "ma-acto", title: "Coordinar cobertura del acto", points: 5, done: false },
          { id: "ma-sala", title: "Checklist de sonido en sala", points: 4, done: false },
        ],
      },
      {
        title: "Seguimiento",
        open: false,
        tasks: [
          { id: "ma-nota", title: "Enviar nota a la redacción", points: 6, done: false },
        ],
      },
    ],
  },
];

// Avatar markup - flat portrait so each client reads as a user, not a photo of a real person.
function crmAvatar(client) {
  return `<svg class="crm-demo__face" viewBox="0 0 64 64" aria-hidden="true">
    <circle cx="32" cy="32" r="32" fill="${client.shirt}"></circle>
    <circle cx="32" cy="26" r="11" fill="${client.skin}"></circle>
    <path d="M16 58c3-14 29-14 32 0" fill="${client.shirt}"></path>
    <path d="M20 24c2-10 22-12 26-2-6-6-18-6-26 2z" fill="${client.hair}"></path>
  </svg>`;
}

// Map embed - OpenStreetMap frame around the fictional contact point.
function crmMapSrc(client) {
  const latPad = 0.12;
  const lonPad = 0.16;
  const bbox = [
    client.lon - lonPad,
    client.lat - latPad,
    client.lon + lonPad,
    client.lat + latPad,
  ].join(",");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${client.lat},${client.lon}`;
}

// Demo panel - switch clients, fold tasks, and add points when the ficha moves.
function bootCrmDemo() {
  const root = document.querySelector("[data-crm-demo]");
  if (!root) return;

  const switcher = root.querySelector("[data-crm-switch]");
  const avatar = root.querySelector("[data-crm-avatar]");
  const facts = root.querySelector("[data-crm-facts]");
  const stats = root.querySelector("[data-crm-stats]");
  const tasks = root.querySelector("[data-crm-tasks]");
  const advance = root.querySelector("[data-crm-advance]");
  const contact = root.querySelector("[data-crm-contact]");
  const flash = root.querySelector("[data-crm-flash]");
  const map = root.querySelector("[data-crm-map]");
  const zone = root.querySelector("[data-crm-zone]");
  let current = 0;
  let points = 0;
  let flashTimer = 0;

  const client = () => CRM_CLIENTS[current];

  const doneCount = () =>
    CRM_CLIENTS.reduce(
      (sum, person) =>
        sum + person.groups.reduce((inner, group) => inner + group.tasks.filter((task) => task.done).length, 0),
      0,
    );

  const showGain = (gain) => {
    flash.textContent = `+${gain} pts`;
    window.clearTimeout(flashTimer);
    flashTimer = window.setTimeout(() => {
      flash.textContent = "";
    }, 1200);
  };

  const paintStats = () => {
    const person = client();
    const score = Math.min(99, 70 + points);
    stats.innerHTML = `
      <li><strong data-crm-points>${points}</strong><span>Puntos</span></li>
      <li><strong>${doneCount()}</strong><span>Tareas</span></li>
      <li><strong>${score}</strong><span>Score</span></li>
    `;
    advance.disabled = person.stage >= CRM_STAGES.length - 1;
    advance.textContent = advance.disabled ? "Etapa al día" : "Avanzar etapa";
  };

  const paintFacts = () => {
    const person = client();
    facts.innerHTML = `
      <div><dt>Nombre</dt><dd>${person.name}</dd></div>
      <div><dt>Rol</dt><dd>${person.role}</dd></div>
      <div><dt>Dirección</dt><dd>${person.address}</dd></div>
      <div><dt>Zona</dt><dd>${person.zone}</dd></div>
      <div><dt>Etapa</dt><dd>${CRM_STAGES[person.stage]}</dd></div>
      <div><dt>Contacto</dt><dd>${person.contact}</dd></div>
    `;
  };

  const paintTasks = () => {
    const person = client();
    tasks.innerHTML = person.groups
      .map(
        (group, index) => `
        <div class="crm-demo__group${group.open ? " is-open" : ""}">
          <button type="button" class="crm-demo__group-btn" data-crm-group="${index}" aria-expanded="${group.open}">
            <span class="crm-demo__chev" aria-hidden="true"></span>
            <span>${group.title}</span>
            <span class="crm-demo__count">${group.tasks.length}</span>
          </button>
          <ul class="crm-demo__list"${group.open ? "" : " hidden"}>
            ${group.tasks
              .map(
                (task) => `
              <li>
                <button type="button" class="crm-demo__task${task.done ? " is-done" : ""}" data-crm-task="${task.id}" aria-pressed="${task.done}">
                  <span class="crm-demo__check" aria-hidden="true"></span>
                  <span class="crm-demo__task-name">${task.title}</span>
                  <span class="crm-demo__task-pts">+${task.points}</span>
                </button>
              </li>`,
              )
              .join("")}
          </ul>
        </div>`,
      )
      .join("");
  };

  const paintPeople = () => {
    switcher.innerHTML = CRM_CLIENTS.map(
      (person, index) => `
        <button type="button" class="crm-demo__person${index === current ? " is-on" : ""}" data-crm-client="${person.id}" role="tab" aria-selected="${index === current}">
          ${crmAvatar(person)}
          <span>${person.name.split(" ")[0]}</span>
        </button>`,
    ).join("");
  };

  const paintMap = () => {
    const person = client();
    const src = crmMapSrc(person);
    if (map.getAttribute("src") !== src) {
      map.title = `Mapa de la zona de contacto de ${person.name}`;
      map.src = src;
    }
    zone.textContent = `Zona de contacto · ${person.zone}`;
    avatar.innerHTML = crmAvatar(person);
  };

  const paint = () => {
    paintPeople();
    paintFacts();
    paintTasks();
    paintStats();
    paintMap();
  };

  root.addEventListener("click", (event) => {
    const personBtn = event.target.closest("[data-crm-client]");
    const groupBtn = event.target.closest("[data-crm-group]");
    const taskBtn = event.target.closest("[data-crm-task]");
    const person = client();

    if (personBtn) {
      const next = CRM_CLIENTS.findIndex((item) => item.id === personBtn.dataset.crmClient);
      if (next === -1 || next === current) return;
      current = next;
      paint();
      return;
    }

    if (groupBtn) {
      const group = person.groups[Number(groupBtn.dataset.crmGroup)];
      if (!group) return;
      group.open = !group.open;
      paintTasks();
      return;
    }

    if (!taskBtn) return;
    const task = person.groups.flatMap((group) => group.tasks).find((item) => item.id === taskBtn.dataset.crmTask);
    if (!task) return;
    task.done = !task.done;
    points += task.done ? task.points : -task.points;
    if (task.done) showGain(task.points);
    paintTasks();
    paintStats();
  });

  advance.addEventListener("click", () => {
    const person = client();
    if (person.stage >= CRM_STAGES.length - 1) return;
    person.stage += 1;
    points += 10;
    showGain(10);
    paintFacts();
    paintStats();
  });

  contact.addEventListener("click", () => {
    client().contact = "Ahora";
    points += 4;
    showGain(4);
    paintFacts();
    paintStats();
  });

  paint();
}

bootCrmDemo();
