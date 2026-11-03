"use strict";
function validatedBillingUrl(value) {
  if (value === null || value === undefined) return null;
  if (typeof value !== "string" || !value) {
    throw new Error("Online billing configuration is invalid. Please contact support.");
  }
  const url = new URL(value);
  if (url.protocol !== "https:" || url.username || url.password || url.port ||
      url.pathname !== "/billing/web" || url.search || url.hash) {
    throw new Error("Online billing configuration is invalid. Please contact support.");
  }
  return url.href;
}

if (typeof module !== "undefined") module.exports = { validatedBillingUrl };

if (typeof document !== "undefined") {
  (async () => {
    const status = document.getElementById("billing-status");
    const link = document.getElementById("billing-link");
    try {
      const response = await fetch("payments-config.json", { cache: "no-store" });
      if (!response.ok) throw new Error("Online billing availability could not be checked. Please contact support.");
      const config = await response.json();
      const url = validatedBillingUrl(config.billingUrl);
      if (!url) return;
      link.href = url;
      link.removeAttribute("aria-disabled");
      status.textContent = "Continue to account-linked billing to check availability, view your plan or manage your subscription. No payment starts just by opening the page.";
    } catch (error) {
      status.textContent = error.message || "Online billing is unavailable. Please contact support.";
    }
  })();
}
