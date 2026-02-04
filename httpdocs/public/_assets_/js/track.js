// public/_assets_/js/track.js
(function () {
  function getBodyCtx() {
    var b = document.body;
    if (!b) return {};
    return {
      page_type: b.dataset.pageType || "",
      service: b.dataset.service || "",
      ville: b.dataset.ville || "",
      zone: b.dataset.zone || "",
      page_path: location.pathname || ""
    };
  }

  function safeStr(v) {
    return typeof v === "string" ? v : String(v || "");
  }

  function merge(a, b) {
    var out = {};
    for (var k in a) out[k] = a[k];
    for (var k2 in b) out[k2] = b[k2];
    return out;
  }

  function hasGtag() {
    return typeof window.gtag === "function";
  }

  window.hcTrack = function (eventName, params) {
    try {
      var ctx = getBodyCtx();
      var payload = merge(ctx, params || {});
      payload.event_source = "hc_site";
      payload.event_time = new Date().toISOString();

      if (!hasGtag()) {
        if (window.__HC_DEBUG__) console.log("[hcTrack]", eventName, payload);
        return;
      }
      window.gtag("event", eventName, payload);
      if (window.__HC_DEBUG__) console.log("[hcTrack:sent]", eventName, payload);
    } catch (e) {
      if (window.__HC_DEBUG__) console.warn("[hcTrack:error]", e);
    }
  };

  document.addEventListener("click", function (e) {
    var el = e.target && e.target.closest ? e.target.closest("[data-track]") : null;
    if (!el) return;

    var type = el.getAttribute("data-track");
    if (!type) return;

    if (type === "tel") {
      var href = el.getAttribute("href") || "";
      window.hcTrack("click_tel", { href: safeStr(href) });
    }

    if (type === "whatsapp") {
      var href2 = el.getAttribute("href") || "";
      window.hcTrack("click_whatsapp", { href: safeStr(href2) });
    }
  });

  document.addEventListener(
    "submit",
    function (e) {
      var form = e.target;
      if (!form || !form.getAttribute) return;
      if (form.getAttribute("data-track") !== "form") return;

      var formId = form.getAttribute("id") || form.getAttribute("name") || "form";

      var service = "";
      var zone = "";
      try {
        var fd = new FormData(form);
        service = safeStr(fd.get("service") || "");
        zone = safeStr(fd.get("zone") || "");
      } catch (_) {}

      window.hcTrack("form_submit", {
        form_id: safeStr(formId),
        form_type: "contact",
        selected_service: service,
        entered_zone: zone ? "yes" : "no"
      });
    },
    true
  );

  // CTA clicks (optional)
  document.addEventListener("click", function (e) {
    var el = e.target && e.target.closest ? e.target.closest("[data-track='cta_audit']") : null;
    if (!el) return;
    var label = el.getAttribute("data-cta-label") || "cta";
    window.hcTrack("cta_click", { cta_label: label });
  });
})();