---
layout: page
title: Sponsors
permalink: /sponsors/
description: "Meet the sponsors and community partners who make Orlando Code Camp possible."
nav_order: 5
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

## Community Partners

Orlando Code Camp proudly partners with local tech organizations. Visit our [Community page]({{ '/community/' | relative_url }}) to learn more about the Orlando tech community and get involved.

<div class="text-center mt-4">
  <a href="{{ '/community/' | relative_url }}" class="btn btn-primary">Meet Our Community Partners</a>
</div>
