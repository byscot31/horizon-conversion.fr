// public/_assets_/js/hc-events.js
(function () {
    function fire(name, extra) {
        // Exemple: dataLayer (si vous l’utilisez)
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: name, ...extra });

        // Ou POST vers un endpoint interne
        // fetch("/api/event", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name, ...extra }) });
    }

    document.addEventListener("click", (e) => {
        const el = e.target.closest("[data-hc-event]");
    if (!el) return;
    fire(el.getAttribute("data-hc-event"), {
        href: el.getAttribute("href") || null,
        text: (el.textContent || "").trim().slice(0, 80),
    });
});

    document.addEventListener("submit", (e) => {
        const form = e.target;
    if (!(form instanceof HTMLFormElement)) return;
    fire("submit_form", { id: form.id || null, name: form.getAttribute("name") || null });
});
})();