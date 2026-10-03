"use strict";
(() => {
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const track = document.querySelector(".highlight-track");
  const slides = document.querySelectorAll("[data-slide]");
  function updateSlides() {
    slides.forEach((button) => {
      button.disabled =
        button.dataset.slide === "prev"
          ? track.scrollLeft < 4
          : track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
    });
  }
  slides.forEach((button) =>
    button.addEventListener("click", () => {
      const card = track.querySelector("article");
      track.scrollBy({
        left:
          (card.offsetWidth + parseFloat(getComputedStyle(track).gap)) *
          (button.dataset.slide === "next" ? 1 : -1),
        behavior: reducedMotion.matches ? "instant" : "smooth",
      });
    }),
  );
  track.addEventListener("scroll", updateSlides, { passive: true });
  track.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      track.scrollBy({
        left:
          (track.querySelector("article").offsetWidth + 24) * (event.key === "ArrowRight" ? 1 : -1),
        behavior: "instant",
      });
    }
  });
  addEventListener("resize", updateSlides);
  updateSlides();
  const details = {
    essencial: {
      eyebrow: "Essencial. Radicalmente.",
      title: "A evolução também sabe apagar.",
      body: "Removemos letras, números e atalhos. Mantivemos tudo o que um desenvolvedor de 2026 realmente precisa: uma forma de pedir. E outra de concordar. <strong>Uma revolução de duas teclas.</strong>",
      image: "hero-escuro",
    },
    sim: {
      eyebrow: "A tecnologia Sim.",
      title: "Projetado para dizer sim. Mesmo sem ler.",
      body: "Uma superfície generosa. Um curso preciso. Uma palavra que desbloqueia milhares de linhas de código. Você poderia revisar o diff. Mas nós não fizemos uma tecla para isso.",
      image: "macro-sim",
    },
    fluxo: {
      eyebrow: "Vibe coding. Agora com hardware.",
      title: "Você dá a ideia. E todas as permissões.",
      body: "Você fala o que quer. A IA escreve o código e pede permissão para continuar. Você aperta Sim. Da primeira ideia à última dependência, o seu trabalho é manter a vibe. <strong>E o dedo no lugar certo.</strong>",
      image: "mesa",
    },
  };
  const detailDialog = document.querySelector("#detail-dialog");
  document.querySelectorAll("[data-detail]").forEach((button) =>
    button.addEventListener("click", () => {
      const detail = details[button.dataset.detail];
      document.querySelector("#detail-eyebrow").textContent = detail.eyebrow;
      document.querySelector("#detail-title").textContent = detail.title;
      document.querySelector("#detail-body").innerHTML = detail.body;
      document.querySelector("#detail-image").src = `assets/${detail.image}.webp`;
      detailDialog.showModal();
    }),
  );
  document.querySelectorAll("dialog").forEach((dialog) => {
    dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        const r = dialog.getBoundingClientRect();
        if (
          event.clientX < r.left ||
          event.clientX > r.right ||
          event.clientY < r.top ||
          event.clientY > r.bottom
        )
          dialog.close();
      }
    });
  });
  const mic = document.querySelector("#demo-mic");
  const yes = document.querySelector("#demo-yes");
  const reset = document.querySelector("#demo-reset");
  const message = document.querySelector("#agent-message");
  const permission = document.querySelector("#permission-box");
  const hint = document.querySelector("#demo-hint");
  const count = document.querySelector("#approval-count");
  const composer = document.querySelector("#demo-composer");
  const composerPlaceholder = document.querySelector("#composer-placeholder");
  const steps = [
    {
      message: "Ótima ideia. Posso refatorar 47 arquivos antes de começar?",
      action: "Alterar 47 arquivos",
      description: "Uma pequena melhoria. Em todo o projeto.",
    },
    {
      message: "Perfeito. Posso instalar mais 238 dependências?",
      action: "Instalar 238 dependências",
      description: "É um botão. Mas precisa de um ecossistema.",
    },
    {
      message: "Quase lá. E se eu reescrever tudo em Rust?",
      action: "Reescrever o projeto inteiro",
      description: "Vai ficar mais rápido. Confia.",
    },
  ];
  let approval = 0;
  function renderStep() {
    const step = steps[approval];
    message.textContent = step.message;
    document.querySelector("#permission-action").textContent = step.action;
    document.querySelector("#permission-description").textContent = step.description;
  }
  function startDemo() {
    if (mic.disabled) return;
    approval = 0;
    renderStep();
    permission.hidden = false;
    yes.disabled = false;
    mic.disabled = true;
    composer.disabled = true;
    reset.disabled = false;
    composerPlaceholder.textContent = "Aguardando seu Sim";
    hint.textContent = "A IA tem uma sugestão. Você tem uma tecla.";
    count.textContent = "0 aprovações. O projeto já parece promissor.";
  }
  mic.addEventListener("click", startDemo);
  composer.addEventListener("click", startDemo);
  yes.addEventListener("click", () => {
    if (yes.disabled || approval >= steps.length) return;
    approval++;
    count.textContent = `${approval} ${approval === 1 ? "aprovação" : "aprovações"}. ${approval === 3 ? "1.284 linhas. 0 linhas digitadas." : "Você está fazendo um ótimo trabalho."}`;
    if (approval < steps.length) {
      renderStep();
      hint.textContent =
        approval === 1
          ? "Tudo sob controle. Pelo menos alguém parece ter um plano."
          : "É só mais um Sim. O que poderia dar errado?";
    } else {
      message.textContent = "Pronto. 1.284 linhas de código. E você escreveu zero.";
      permission.hidden = true;
      document.querySelector("#demo-result").hidden = false;
      yes.disabled = true;
      composerPlaceholder.textContent = "Projeto concluído";
      hint.textContent = "Você não digitou uma linha. Pode atualizar o LinkedIn.";
    }
  });
  reset.addEventListener("click", () => {
    approval = 0;
    mic.disabled = false;
    composer.disabled = false;
    yes.disabled = true;
    reset.disabled = true;
    permission.hidden = true;
    document.querySelector("#demo-result").hidden = true;
    message.textContent = "Posso transformar essa ideia em um projeto.";
    composerPlaceholder.textContent = "Peça à Magic Intelligence";
    count.textContent = "0 aprovações. Potencial ilimitado.";
    hint.textContent = "Toque no microfone para usar um prompt de exemplo. Depois, é só dizer sim.";
    mic.focus({ preventScroll: true });
  });

  const finishes = {
    silver: { name: "Prata", image: "hero-prata" },
    black: { name: "Preto espacial", image: "hero-escuro" },
  };
  let currentFinish = "silver";
  document.querySelectorAll("[data-finish]").forEach((button) =>
    button.addEventListener("click", () => {
      if (currentFinish === button.dataset.finish) return;
      currentFinish = button.dataset.finish;
      const finish = finishes[currentFinish];
      document.querySelectorAll("[data-finish]").forEach((option) => {
        const selected = option === button;
        option.classList.toggle("selected", selected);
        option.setAttribute("aria-pressed", String(selected));
      });
      const image = document.querySelector("#buy-image");
      image.src = `assets/${finish.image}.webp`;
      image.alt = `Magic Keyboard Pro no acabamento ${finish.name}`;
      document.querySelector("#finish-name").textContent = finish.name;
      document
        .querySelector("#buy-image-stage")
        .classList.toggle("black-finish", currentFinish === "black");
    }),
  );
  const purchaseDialog = document.querySelector("#purchase-dialog");
  document.querySelector("#buy-button").addEventListener("click", () => {
    document.querySelector("#purchase-finish").textContent = finishes[currentFinish].name;
    document.querySelector("#purchase-image").src = `assets/${finishes[currentFinish].image}.webp`;
    purchaseDialog.showModal();
  });
  document.querySelector("#purchase-done").addEventListener("click", () => purchaseDialog.close());

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reducedMotion.matches) {
    document.documentElement.classList.add("motion-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    reveals.forEach((element) => observer.observe(element));
    reducedMotion.addEventListener("change", () => {
      if (reducedMotion.matches) {
        document.documentElement.classList.remove("motion-ready");
        observer.disconnect();
      }
    });
  }
  const story = document.querySelector(".scroll-story");
  const storyImage = document.querySelector(".story-product img");
  const heroImage = document.querySelector(".hero-image");
  const storyTitle = document.querySelector("#story-title");
  const storySubtitle = document.querySelector(".story-subtitle");
  const storyNote = document.querySelector(".story-note");
  const storyDots = [...document.querySelectorAll(".story-dots i")];
  const storyPhases = [
    {
      title: "Sua voz.<br>O novo código.",
      subtitle: "Você descreve a ideia. A IA escreve o código.",
      note: "Você pede. A IA programa. É vibe coding.",
    },
    {
      title: "Um Sim.<br>Todo o resto.",
      subtitle: "A IA pede permissão. Você aprova.",
      note: "Instalar dependências. Alterar arquivos. Continuar.",
    },
    {
      title: "Feito por você.<br>Mais ou menos.",
      subtitle: "O crédito continua sendo todo seu.",
      note: "Pensado por você. Codado pela IA. Aprovado com Sim.",
    },
  ];
  let layout = { storyTop: 0, storyTravel: 1, heroTop: 0, heroHeight: 1, storyHeight: 1 };
  let frame = 0,
    lastPhase = -1;
  function measure() {
    const top = (element) => element.getBoundingClientRect().top + scrollY;
    layout = {
      storyTop: top(story) - 54,
      storyTravel: Math.max(1, story.offsetHeight - (innerHeight - 54)),
      heroTop: top(document.querySelector(".hero")),
      heroHeight: document.querySelector(".hero").offsetHeight,
      storyHeight: story.offsetHeight,
    };
    schedule();
  }
  function renderMotion() {
    frame = 0;
    if (reducedMotion.matches) {
      storyImage.style.transform = "none";
      heroImage.style.transform = "none";
      storyTitle.innerHTML = "Sua voz.<br>Seu Sim. Seu próximo código.";
      storySubtitle.textContent = "Você pede. A IA programa. Você aprova as permissões.";
      return;
    }
    const progress = Math.max(0, Math.min(1, (scrollY - layout.storyTop) / layout.storyTravel));
    const phase = progress < 0.32 ? 0 : progress < 0.68 ? 1 : 2;
    if (phase !== lastPhase) {
      const data = storyPhases[phase];
      storyTitle.innerHTML = data.title;
      storySubtitle.textContent = data.subtitle;
      storyNote.textContent = data.note;
      document.querySelector(".story-index").textContent = `0${phase + 1} / 03`;
      storyDots.forEach((dot, index) => dot.classList.toggle("active", index === phase));
      document.querySelector(".mic-callout").style.opacity = phase === 0 ? "1" : "0";
      document.querySelector(".yes-callout").style.opacity = phase === 1 ? "1" : "0";
      lastPhase = phase;
    }
    if (scrollY > layout.storyTop - innerHeight && scrollY < layout.storyTop + layout.storyHeight) {
      storyImage.style.transform = `translateY(${(1 - progress) * 16}px) scale(${0.86 + progress * 0.18})`;
    }
    if (scrollY < layout.heroTop + layout.heroHeight) {
      const heroProgress = Math.max(0, Math.min(1, (scrollY - layout.heroTop) / layout.heroHeight));
      heroImage.style.transform = `scale(${1 + heroProgress * 0.055})`;
    }
  }
  function schedule() {
    if (!frame) frame = requestAnimationFrame(renderMotion);
  }
  addEventListener("scroll", schedule, { passive: true });
  addEventListener("resize", measure);
  addEventListener("load", measure);
  reducedMotion.addEventListener("change", () => {
    lastPhase = -1;
    measure();
  });
  measure();
})();
