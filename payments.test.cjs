const test = require("node:test");
const assert = require("node:assert/strict");
const { validatedBillingUrl } = require("./payments.js");

test("billing is unavailable until an explicit URL is configured", () => {
  for (const value of [null, undefined]) assert.equal(validatedBillingUrl(value), null);
});
test("only an HTTPS account-linked billing page can be configured", () => {
  assert.equal(validatedBillingUrl("https://billing.example.com/billing/web"), "https://billing.example.com/billing/web");
  for (const value of [
    "", 42, false,
    "http://billing.example.com/billing/web", "javascript:alert(1)",
    "https://user:pass@billing.example.com/billing/web",
    "https://billing.example.com:8443/billing/web",
    "https://buy.stripe.com/unlinked", "https://billing.example.com/billing/web?token=secret",
    "https://billing.example.com/billing/web#token", "/billing/web"
  ]) assert.throws(() => validatedBillingUrl(value));
});
