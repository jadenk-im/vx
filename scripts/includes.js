const inject = async (selector, url) => {
  const el = document.querySelector(selector);
  if (!el) return;

  const res = await fetch(url, { cache: "force-cache" });
  el.innerHTML = await res.text();
};

inject("#site-nav", "../components/nav.html");
inject("#site-modals", "../components/modals.html");