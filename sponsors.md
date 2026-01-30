---
layout: page
title: Sponsors
permalink: /sponsors/
description: "Meet the sponsors and community partners who make Orlando Code Camp possible."
nav_order: 9
---

<div class="event-photo mb-8">
  <img src="/assets/img/photos/sponsors-gallery-2025.jpeg" alt="Orlando Code Camp Sponsors">
</div>

## Become a Sponsor

Orlando Code Camp is Central Florida's premier free technology conference. We welcome sponsorships from companies who want to connect with our community of developers, engineers, and tech professionals.

<div class="banner banner-cta">
  <h3 class="banner-title">Sponsorship Opportunities Available</h3>
  <p class="banner-description">Download our sponsorship package to learn about the different tiers and benefits.</p>
  <a href="/assets/doc/Orlando-Code-Camp-2026-Sponsor-Info.pdf" target="_blank" rel="noopener" class="btn btn-primary">
    View Sponsorship Package
  </a>
  <p class="text-muted mt-4 mb-0">
    Questions? Email us at <a href="mailto:board@orlandocodecamp.com">board@orlandocodecamp.com</a>
  </p>
</div>

---

## 2026 Sponsors

<p class="text-muted">Our 2026 sponsor lineup will be announced soon. Check back for updates!</p>

{% comment %}
Uncomment this section when sponsors are confirmed:

{% for sponsor in site.data.sponsors %}
{% if sponsor.logoPath %}
<div class="sponsor-tier">
  <h3 class="tier-title">{{ sponsor.level }} Sponsor</h3>
  <div class="logo-grid logo-grid-2">
    <a href="{{ sponsor.url }}" target="_blank" rel="noopener" class="logo-item {% if sponsor.logoStyle == 'wide' %}logo-wide{% endif %}" title="{{ sponsor.name }}">
      <img src="{{ sponsor.logoPath }}" alt="{{ sponsor.name }}">
    </a>
  </div>
  <p class="mt-2">
    <a href="{{ sponsor.url }}" target="_blank" rel="noopener">{{ sponsor.urlLabelOverride | default: "Visit Website" }}</a>
  </p>
</div>
{% endif %}
{% endfor %}
{% endcomment %}

---

## Community Partners {#partners}

Orlando Code Camp proudly partners with the following local organizations:

### Orlando .NET User Group (ONETUG)

<div class="info-card mb-6">
  <div class="flex items-center gap-4 flex-wrap">
    <img src="/assets/img/partners/ONETUG.png" alt="ONETUG Logo" style="max-width: 200px; background: white; padding: 1rem; border-radius: 8px;">
    <div>
      <p>ONETUG is the organizer of Orlando Code Camp and a vibrant community of .NET developers in Central Florida.</p>
      <p>
        <a href="https://www.meetup.com/onetug/" target="_blank" rel="noopener" class="btn btn-secondary btn-sm">Meetup</a>
        <a href="https://onetug.net" target="_blank" rel="noopener" class="btn btn-secondary btn-sm">Website</a>
      </p>
    </div>
  </div>
</div>

### Seminole State College - Sanford/Lake Mary Campus

<div class="info-card mb-6">
  <div class="flex items-center gap-4 flex-wrap">
    <img src="/assets/img/partners/Seminole-State.png" alt="Seminole State College Logo" style="max-width: 200px; background: white; padding: 1rem; border-radius: 8px;">
    <div>
      <p>Our gracious host venue for Orlando Code Camp.</p>
      <p>
        <a href="https://www.seminolestate.edu/" target="_blank" rel="noopener" class="btn btn-secondary btn-sm">Website</a>
      </p>
    </div>
  </div>
</div>

### Google Developer Group (GDG) Central Florida

<div class="info-card mb-6">
  <div class="flex items-center gap-4 flex-wrap">
    <img src="/assets/img/partners/GDG-Central-Florida.png" alt="GDG Central Florida Logo" style="max-width: 200px; background: white; padding: 1rem; border-radius: 8px;">
    <div>
      <p>A community of Google technology enthusiasts in Central Florida.</p>
      <p>
        <a href="https://gdgcentralflorida.org/" target="_blank" rel="noopener" class="btn btn-secondary btn-sm">Blog</a>
        <a href="https://www.meetup.com/gdg-central-florida/" target="_blank" rel="noopener" class="btn btn-secondary btn-sm">Meetup</a>
        <a href="https://gdg.community.dev/gdg-central-florida/" target="_blank" rel="noopener" class="btn btn-secondary btn-sm">GDG Community</a>
      </p>
    </div>
  </div>
</div>

### SQLOrlando

<div class="info-card mb-6">
  <div class="flex items-center gap-4 flex-wrap">
    <img src="/assets/img/partners/SQLOrlando.jpg" alt="SQLOrlando Logo" style="max-width: 200px; background: white; padding: 1rem; border-radius: 8px;">
    <div>
      <p>Orlando's SQL Server and data platform user group.</p>
      <p>
        <a href="https://sqlorlando.org/" target="_blank" rel="noopener" class="btn btn-secondary btn-sm">Website</a>
        <a href="https://www.meetup.com/SQLOrlando/" target="_blank" rel="noopener" class="btn btn-secondary btn-sm">Meetup</a>
      </p>
    </div>
  </div>
</div>

### Orlando DevOps

<div class="info-card mb-6">
  <div class="flex items-center gap-4 flex-wrap">
    <img src="/assets/img/partners/Orlando-DevOps-with-text.png" alt="Orlando DevOps Logo" style="max-width: 200px; background: white; padding: 1rem; border-radius: 8px;">
    <div>
      <p>A community focused on DevOps practices and culture in Orlando.</p>
      <p>
        <a href="https://orlandodevs.com/groups/orlando-devops/" target="_blank" rel="noopener" class="btn btn-secondary btn-sm">Website</a>
        <a href="https://www.meetup.com/Orlando-DevOps/" target="_blank" rel="noopener" class="btn btn-secondary btn-sm">Meetup</a>
      </p>
    </div>
  </div>
</div>
