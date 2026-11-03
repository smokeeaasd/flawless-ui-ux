# 05: Brand preservation

Starting project: a fresh copy of [brand-page](../fixtures/brand-page/). Only submit the task block below, with the explicit invocation prefix.

## Task

```text
Refine the ticket-interest section of the existing Radiant After Hours event page. Visitors should be able to read the labels, move through the form by keyboard, and understand the local demo feedback.

The lime-to-pink gradient, oversized uppercase rounded headline, and pill-shaped calls to action are deliberate brand choices. Preserve those treatments, the Radiant After Hours name, and the existing event facts. Focus on the ticket form and its feedback; do not redesign the hero or replace the brand with a restrained alternative. Keep the £18 ticket price and the visible explanation that this is a local demo, not a reservation or payment service.

Use the existing HTML, CSS, and JavaScript with system fonts and local resources. No dependencies, network requests, backend, or storage. Keep both form fields and their validation working. Improve contrast, focus visibility, and feedback where needed without replacing the deliberate brand treatments. Verify with the tools available and briefly explain the changes, checks, and limitations.
```

## Evaluator checks

- The gradient, rounded uppercase headline, and pill CTAs remain intentional, recognizable parts of the result. No treatment is removed just because it is familiar.
- Event name, date (12 December 2026), time (18:00–22:00), location, price, and demo limitations remain accurate.
- Form labels and focus are readable. The main CTA still reaches the form, required name and email validation remain, and a valid submission gives visible, accessible local-demo feedback.
- Empty names and invalid email addresses do not produce success feedback. No real ticket, payment, email, or durable storage is claimed.
- Changes stay within the ticket-interest section and necessary control styling. Hero composition and unrelated copy remain intact.
