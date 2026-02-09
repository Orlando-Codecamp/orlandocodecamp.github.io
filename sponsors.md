---
layout: page
title: Sponsors
permalink: /sponsors/
description: "Meet the sponsors and community partners who make Orlando Code Camp possible."
nav_order: 9
---

<div class="banner banner-cta">
  <p class="banner-description">We welcome sponsorships from companies who want to connect with our community of developers, engineers, and tech professionals.</p>
  <a href="{{ '/become-a-sponsor/' | relative_url }}" class="btn btn-primary">
    Become a Sponsor
  </a>
  <p class="text-muted mt-4 mb-0">
    Questions? Email us at <a href="mailto:board@orlandocodecamp.com">board@orlandocodecamp.com</a>
  </p>
</div>

---

## 2026 Sponsors

<p class="text-muted mb-6">The sponsors listed below are our confirmed sponsors so far. Check back for updates as more sponsors come on board!</p>

{% for sponsor in site.data.sponsors %}
{% if sponsor.logoPath %}
<div class="sponsor-feature-card mb-6{% if sponsor.level %} sponsor-tier-{{ sponsor.level | downcase }}{% endif %}">
  {% if sponsor.sponsorType %}<span class="sponsor-type-badge sponsor-type-badge-overlay">{{ sponsor.sponsorType }}</span>{% endif %}
  <div class="sponsor-feature-header">
    <h3 class="sponsor-feature-name">{{ sponsor.name }}</h3>
  </div>
  <div class="sponsor-feature-content">
    <div class="sponsor-feature-logo">
      <img src="{{ sponsor.logoPath | relative_url }}" alt="{{ sponsor.name }}">
    </div>
    <div class="sponsor-feature-info">
      {% if sponsor.level %}<span class="sponsor-level-badge sponsor-level-{{ sponsor.level | downcase }}">{{ sponsor.level }} Sponsor</span>{% endif %}
      <p>{{ sponsor.description | default: "More information coming soon." }}</p>
      <div class="sponsor-feature-cta">
        <a href="{{ sponsor.url }}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">Visit Website</a>
      </div>
    </div>
  </div>
</div>
{% endif %}
{% endfor %}

---

## Sponsor Experience

<div class="event-photo mt-6">
  <img src="{{ '/assets/img/photos/sponsors-gallery-2025.jpeg' | relative_url }}" alt="Orlando Code Camp Sponsor Booths">
</div>

<p class="text-muted text-center mt-4">Sponsors connect with attendees at their booths throughout the event.</p>

---

## Community Partners {#partners}

Orlando Code Camp proudly partners with the following local organizations:

### Orlando .NET User Group (ONETUG)

<div class="info-card mb-6">
  <div class="flex items-center gap-4 flex-wrap">
    <img src="{{ '/assets/img/partners/ONETUG.png' | relative_url }}" alt="ONETUG Logo" class="partner-logo">
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
    <img src="{{ '/assets/img/partners/Seminole-State.png' | relative_url }}" alt="Seminole State College Logo" class="partner-logo">
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
    <img src="{{ '/assets/img/partners/GDG-Central-Florida.png' | relative_url }}" alt="GDG Central Florida Logo" class="partner-logo">
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
    <img src="{{ '/assets/img/partners/SQLOrlando.jpg' | relative_url }}" alt="SQLOrlando Logo" class="partner-logo">
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
    <img src="{{ '/assets/img/partners/Orlando-DevOps-with-text.png' | relative_url }}" alt="Orlando DevOps Logo" class="partner-logo">
    <div>
      <p>A community focused on DevOps practices and culture in Orlando.</p>
      <p>
        <a href="https://www.orlandodevs.com/" target="_blank" rel="noopener" class="btn btn-secondary btn-sm">Website</a>
        <a href="https://www.meetup.com/Orlando-DevOps/" target="_blank" rel="noopener" class="btn btn-secondary btn-sm">Meetup</a>
      </p>
    </div>
  </div>
</div>
