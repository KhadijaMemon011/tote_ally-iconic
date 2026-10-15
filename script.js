  /* ==========================================================
    TOTE-ALLY ICONIC — script.js
    PART 1 (top): everything you will want to edit.
    PART 2 (below): the code that builds the page. No need to touch it.
    ========================================================== */

  /* ---------- 1. PRODUCTS ----------
    One photo per product. Put your photo in the images folder using the
    exact filename below (or change the filename here). */
  const PRODUCTS = [
    { id: "tote",      name: "Tote Bags",  image: "images/totebag.png",  blurb: "Carry-everywhere totes made to be noticed." },
    { id: "hamper",    name: "Hampers",    image: "images/hampers.png",    blurb: "Gifts, gathered and wrapped with care." },
    { id: "charm",     name: "Charms",     image: "images/charms.jpeg",    blurb: "Tiny details that add personality." },
    { id: "bouquet",   name: "Bouquets",   image: "images/boquets.jpeg",   blurb: "Bouquets made to be gifted and remembered." },
    { id: "jewellery", name: "Jewellery",  image: "images/jwelleries.png", blurb: "Statement pieces to wear and love." },
    { id: "keychain",  name: "Keychains",  image: "images/keychains.png",  blurb: "A little iconic detail for your keys." },
    { id: "bracelet",  name: "Bracelets",  image: "images/bracelet.png",  blurb: "Wrist stacks with a story." },
    { id: "bookmark", name: "Bookmarks", image: "images/bookmarks.jpeg", blurb: "Little pages, pretty memories." }
  ];

  /* ---------- 2. COLLECTIONS (group products by their id above) ---------- */
  const COLLECTIONS = [
    { title: "Carry",        text: "Pieces made to go out into the world with you.", items: ["tote"] },
    { title: "Gift",         text: "For birthdays, thank-yous and just-because moments.", items: ["hamper", "bouquet"] },
    { title: "Wear",         text: "Little luxuries for your wrist and beyond.", items: ["jewellery", "bracelet"] },
    { title: "Charm & Keep", text: "Small treasures to keep close.", items: ["charm", "keychain"] }
  ];

  /* ---------- 3. FOUNDERS (the group photo is images/founders.png) ---------- */
  const FOUNDERS = [
    { name: "Khadija", side: "left" },
    { name: "Abhirami", side: "right" }
  ];

  /* ---------- 4. CONTACT & SOCIAL ----------
    Replace each "ADD_..." value with your real details.
    email: just the address. phone: with country code, e.g. +91xxxxxxxxxx.
    Links must start with https://  — leave "ADD_..." to show a placeholder. */
  const CONTACT = [
    { label: "Email us",              type: "email", value: "toteallyiconic@gmail.com" },
    { label: "Call or message us",    type: "phone", value: "6354656157" },
    { label: "Follow us on Instagram", type: "link",  value: "https://www.instagram.com/tote-ally_iconic" },
    { label: "Whatsapp Us", type: "phone", value: "982563143" }
  ];

  /* ---------- 5. INTRO TIMING ---------- */
  const INTRO_MS = 9500; // total intro length in milliseconds

  /* ==========================================================
    PART 2 — BUILDING THE PAGE
    ========================================================== */
  const $ = (s) => document.querySelector(s);
  const tile = (p) => `<figure class="ph"><span class="fb">${p.name}</span><img src="${p.image}" alt="${p.name} by Tote-ally Iconic" loading="lazy"></figure>`;

  /* Product cards */
  $("#product-grid").innerHTML = PRODUCTS.map((p) =>
    `<article class="card reveal">${tile(p)}<h3>${p.name}</h3><p>${p.blurb}</p></article>`).join("");

  /* Collections */
  const star = '<svg viewBox="0 0 24 24" fill="#E8B7C5" aria-hidden="true"><path d="M12 1l2.6 7.4L22 11l-7.4 2.6L12 21l-2.6-7.4L2 11l7.4-2.6z"/></svg>';
  $("#collection-grid").innerHTML = COLLECTIONS.map((c) =>
    `<div class="coll reveal">${star}<h3>${c.title}</h3><p>${c.text}</p><ul>${
      c.items.map((id) => `<li>${PRODUCTS.find((p) => p.id === id).name}</li>`).join("")}</ul></div>`).join("");

  /* Founders */
  const founderNames = $("#founder-names");

  if (founderNames) {
    founderNames.innerHTML = FOUNDERS.map((f) => `
      <div class="hand-name ${f.side}">
        ${f.name}
        <svg class="heart" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 21s-7.5-4.6-9.6-9.4C.9 8 3 4.5 6.4 4.5c2 0 3.7 1.1 4.6 2.7h2c.9-1.6 2.6-2.7 4.6-2.7 3.4 0 5.5 3.5 4 7.1C19.5 16.4 12 21 12 21z"/>
        </svg>
        <svg class="arrow" viewBox="0 0 60 60" aria-hidden="true">
          <path d="M10 4C2 24 14 46 46 50M34 40l13 10-14 8"/>
        </svg>
      </div>
    `).join("");
  }
  /* Contact & Social */
  $("#contact-list").innerHTML = CONTACT.map((c) => {
    if (c.value.startsWith("ADD_")) {
      return `<li><span>${c.label}: add yours in script.js</span></li>`;
    }

    const href =
      c.type === "email" ? "mailto:" + c.value :
      c.type === "phone" ? "tel:" + c.value :
      c.value;

    const ext = c.type === "link"
      ? ' target="_blank" rel="noopener"'
      : "";

    return `<li><a href="${href}"${ext}>${c.label}</a></li>`;
  }).join("");
  $("#year").textContent = new Date().getFullYear();

  /* Missing photo? Hide the broken <img> so the clean fallback behind it shows. */
  document.addEventListener("error", (e) => {
    if (e.target.tagName === "IMG") e.target.classList.add("hide");
  }, true);
  document.querySelectorAll("img").forEach((i) => { if (i.complete && !i.naturalWidth) i.classList.add("hide"); });

  /* Scroll reveal */
  const io = "IntersectionObserver" in window
    ? new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.15 })
    : null;
  document.querySelectorAll(".reveal").forEach((el) => (io ? io.observe(el) : el.classList.add("in")));

  /* ---------- Intro ---------- */
  const intro = $("#intro");
  const page = document.querySelectorAll("header, main, footer");
  let timer, soundOn = false, ctx;

  function swoosh() { // soft synthesised swoosh, only if the visitor switched sound on
    if (!soundOn || !ctx) return;
    const n = ctx.sampleRate * 1.8, buf = ctx.createBuffer(1, n, ctx.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * i / n);
    const src = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    src.buffer = buf; f.type = "bandpass";
    f.frequency.setValueAtTime(300, ctx.currentTime);
    f.frequency.exponentialRampToValueAtTime(2500, ctx.currentTime + 1.6);
    g.gain.value = 0.22;
    src.connect(f).connect(g).connect(ctx.destination); src.start();
  }

  function endIntro() {
    clearTimeout(timer);
    try { localStorage.setItem("tai-intro-seen", "1"); } catch (e) {}
    intro.classList.add("done");
    document.body.classList.remove("intro-active");
    page.forEach((el) => el.removeAttribute("inert"));
    setTimeout(() => intro.remove(), 1000);
    window.scrollTo(0, 0);
  }

  if (!document.documentElement.classList.contains("no-intro")) {
    /* Pedestals */
    $("#pedestals").innerHTML = PRODUCTS.map((p, i) =>
  `<div class="ped" style="--i:${i}">
    ${tile(p)}
    <div class="base"><span class="product-name">${p.name}</span></div>
  </div>`).join("");
    /* Sparkles */
    $("#sparkles").innerHTML = Array.from({ length: 30 }, () =>
      `<i style="left:${Math.random() * 100}%;top:${Math.random() * 100}%;--d:${(3 + Math.random() * 4).toFixed(2)}s;width:${6 + Math.random() * 10}px;height:${6 + Math.random() * 10}px"></i>`).join("");

    /* Typewriter text: each letter fades in one by one (timing is in styles.css) */
    const teaser = $(".teaser"), line = teaser.textContent.trim();
    teaser.setAttribute("aria-label", line);
    teaser.innerHTML = [...line].map((c, n) => `<span class="ch" aria-hidden="true" style="--n:${n}">${c}</span>`).join("");
    document.body.classList.add("intro-active");
    page.forEach((el) => el.setAttribute("inert", ""));
    requestAnimationFrame(() => intro.classList.add("play"));
    setTimeout(swoosh, 3300);
    timer = setTimeout(endIntro, INTRO_MS);

    $("#skip").addEventListener("click", endIntro);
    $("#skip").focus();
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && document.body.classList.contains("intro-active")) endIntro(); });
    $("#sound").addEventListener("click", (e) => {
      soundOn = !soundOn;
      if (soundOn) { ctx = ctx || new (window.AudioContext || window.webkitAudioContext)(); ctx.resume(); }
      e.target.setAttribute("aria-pressed", soundOn);
      e.target.textContent = "Sound: " + (soundOn ? "on" : "off");
    });
  } else {
    document.body.classList.remove("intro-active");
  }
