# AetherX Labs website

Static site for `aetherxlabs.co.uk`.

## Billing

`payments.html` describes the optional TokTranslate APKPure subscription and provides an enquiry-only path for other services. It does not collect card details or use an unlinked Stripe payment link.

The account-linked billing UI is served by the separate TokTranslate APKPure proxy at `/billing/web`. It reuses Google account verification, hosted Stripe Checkout, customer portal sessions and webhook entitlements. Browser tokens stay in memory, not URLs or local storage.

`payments-config.json` deliberately leaves `billingUrl` null until the dedicated HTTPS billing service, Google authorized JavaScript origin, legal disclosures and sandbox/device payment tests are complete. Then set it to the verified service's exact `https://<billing-host>/billing/web` URL. Never add keys, account tokens or payment links here. Changing the config does not deploy or enable the server.

Run `node --test payments.test.cjs` to validate URL configuration. Preview locally with a static HTTP server. Website publication requires the normal reviewed GitHub Pages commit/push workflow; local edits alone do not update the public site.

The owner approved `terms.html`, including the trading identity/contact disclosures, for publication on 3 November 2026 alongside the Stripe privacy disclosures. This approval is not legal certification or approval to enable live charging. After deployment, verify `https://aetherxlabs.co.uk/terms.html` and `https://aetherxlabs.co.uk/privacy.html` before using them in Stripe. Keep online billing disabled until the separate service and payment validation are complete.
