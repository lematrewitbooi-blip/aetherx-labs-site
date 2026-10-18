// Paste your AdSense publisher id (e.g. "ca-pub-1234567890123456") once Google approves the site.
// While empty, ad slots stay hidden and no ad script is loaded.
const ADSENSE_CLIENT = "";

// Map each slot name used in data-slot to the ad unit id created in AdSense.
const AD_SLOTS = { top: "", bottom: "" };

(function () {
  const slots = document.querySelectorAll(".ad-slot");
  if (!ADSENSE_CLIENT) return;
  const s = document.createElement("script");
  s.async = true;
  s.crossOrigin = "anonymous";
  s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + ADSENSE_CLIENT;
  document.head.appendChild(s);
  slots.forEach(function (el) {
    const unit = AD_SLOTS[el.dataset.slot];
    if (!unit) return;
    el.innerHTML = '<span class="ad-label">Advertisement</span>' +
      '<ins class="adsbygoogle" style="display:block" data-ad-client="' + ADSENSE_CLIENT +
      '" data-ad-slot="' + unit + '" data-ad-format="auto" data-full-width-responsive="true"></ins>';
    el.classList.add("on");
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  });
})();
