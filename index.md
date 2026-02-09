---
layout: home
title: Home
nav_order: 1
nav_exclude: true
---

<!-- Hero Section -->
<section class="hero hero-home bg-secondary">
  <div class="hero-pattern" style="background-image: url('{{ '/assets/img/patterns/circuit.svg' | relative_url }}');"></div>
  <div class="hero-gradient"></div>
  <span class="hero-braces left">{</span>
  <span class="hero-braces right">}</span>

  <div class="hero-container">
    <div class="hero-content">
      <div class="hero-logo-group">
        <img src="{{ '/assets/img/occ-tree-logo-wht-grn.png' | relative_url }}" alt="Orlando Code Camp Logo" class="hero-logo">
        <div class="hero-title-group">
          <span class="hero-annual">18th Annual</span>
          <h1 class="hero-title">Orlando<br>Code Camp</h1>
          <span class="hero-year">2026</span>
        </div>
      </div>

      <p class="hero-subtitle">April 11th, 2026 &bull; Seminole State College, Sanford, FL</p>
      <p class="hero-description">A full day of learning, networking, and technical sessions with over 70 speakers and sessions. Free to attend!</p>

      <div class="hero-presented-by">
        <span>Presented by</span>
        <a href="https://onetug.net" target="_blank" rel="noopener" class="presented-by-link">
          <img src="{{ '/assets/img/onetug-tree-logo.png' | relative_url }}" alt="ONETUG Logo">
          <span>Orlando .NET User Group</span>
        </a>
      </div>

      <!-- Registration CTA - uncomment when registration opens
      <div class="hero-cta-group">
        <a href="https://www.eventbrite.com/e/orlando-code-camp-2026-tickets" target="_blank" rel="noopener" class="btn btn-primary btn-lg animate-pulse-glow">
          Register Now - It's Free!
        </a>
        <a href="{{ '/schedule/' | relative_url }}" class="btn btn-secondary btn-lg">
          View Schedule
        </a>
      </div>
      -->
    </div>
  </div>

  <!-- Scroll Indicator -->
  <a href="#countdown-section" class="scroll-indicator" aria-label="Scroll down">
    <span class="scroll-indicator-text">Scroll</span>
    <svg class="scroll-indicator-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
    </svg>
  </a>
</section>

<!-- Countdown Section -->
{% include countdown.html %}

<!-- Event Info Section -->
<section class="section bg-primary">
  <div class="container">
    <div class="content-wrapper">
      <div class="event-highlight">
        <span class="highlight-icon">📅</span>
        <div class="highlight-content">
          <strong>Save the Date!</strong> Orlando Code Camp 2026 is happening on April 11th at Seminole State College in Sanford, FL.
        </div>
      </div>

      <div class="stack-lg">
        <p>Orlando Code Camp is organized by the <a href="https://onetug.net" target="_blank" rel="noopener">Orlando .NET User Group (ONETUG)</a> and hosted at the Sanford/Lake Mary campus of <a href="https://www.seminolestate.edu/slm" target="_blank" rel="noopener">Seminole State College</a>.</p>

        <p>The event entry is <strong>FREE</strong> to all attendees, thanks to our generous sponsors.</p>

        <p>Our conference will showcase multiple tracks featuring cutting-edge technical deep dives and strategic industry insights, with focused 50-minute sessions presented by speakers from across the tech and software development landscape.</p>
      </div>
    </div>
  </div>
</section>

<!-- Event Photo -->
<section class="section-sm bg-secondary">
  <div class="container">
    <div class="event-photo">
      <img src="{{ '/assets/img/photos/orlando-code-camp-2025-keynote-001.jpeg' | relative_url }}" alt="Orlando Code Camp 2025 Keynote">
    </div>
  </div>
</section>

<!-- Discord Community Section -->
<section class="section-sm bg-primary" id="discord">
  <div class="container">
    <div class="discord-callout">
      <div class="discord-callout-icon">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.8733.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/>
        </svg>
      </div>
      <div class="discord-callout-content">
        <h2 class="discord-callout-title">Join Our Discord Community</h2>
        <p class="discord-callout-description">Connect with fellow attendees, speakers, and sponsors before, during, and after the event. Ask questions, share resources, and network with the community.</p>
        <a href="https://discord.gg/hgWnKzTTVU" target="_blank" rel="noopener" class="btn btn-primary">
          Join Discord Server
        </a>
      </div>
    </div>
  </div>
</section>

<!-- Quick Links Section -->
<section class="section bg-primary">
  <div class="container">
    <div class="section-header">
      <span class="section-label">Explore</span>
      <h2 class="section-title">Event Information</h2>
      <p class="section-description">Everything you need to know about Orlando Code Camp 2026</p>
    </div>

    <div class="grid grid-3 stagger-children">
      <a href="{{ '/location/' | relative_url }}" class="card card-quick-link">
        <span class="card-icon">📍</span>
        <span class="card-text">Location &amp; Directions</span>
      </a>

      <a href="{{ '/attendees/' | relative_url }}" class="card card-quick-link">
        <span class="card-icon">🎟️</span>
        <span class="card-text">Attendee Information</span>
      </a>

      <a href="{{ '/speakers/' | relative_url }}" class="card card-quick-link">
        <span class="card-icon">🎤</span>
        <span class="card-text">Speakers</span>
      </a>

      <a href="{{ '/sessions/' | relative_url }}" class="card card-quick-link">
        <span class="card-icon">💻</span>
        <span class="card-text">Sessions</span>
      </a>

      <a href="{{ '/volunteers/' | relative_url }}" class="card card-quick-link">
        <span class="card-icon">🙋</span>
        <span class="card-text">Volunteer</span>
      </a>

      <a href="{{ '/sponsors/' | relative_url }}" class="card card-quick-link">
        <span class="card-icon">🤝</span>
        <span class="card-text">Sponsors &amp; Partners</span>
      </a>
    </div>
  </div>
</section>

<!-- Sponsors Preview Section -->
<section class="section-sm bg-secondary">
  <div class="container">
    <div class="section-header">
      <span class="section-label">Thank You</span>
      <h2 class="section-title">Our Sponsors</h2>
      <p class="section-description">Orlando Code Camp is made possible by these generous sponsors</p>
    </div>

    {% assign platinum_sponsors = site.data.sponsors | where: "level", "Platinum" %}
    {% assign gold_sponsors = site.data.sponsors | where: "level", "Gold" %}
    {% assign silver_sponsors = site.data.sponsors | where: "level", "Silver" %}
    {% assign bronze_sponsors = site.data.sponsors | where: "level", "Bronze" %}

    <div class="sponsor-showcase">
      {% if platinum_sponsors.size > 0 %}
      <div class="sponsor-row">
        <span class="sponsor-row-label">Platinum</span>
        <div class="sponsor-row-logos">
          {% for sponsor in platinum_sponsors %}
            {% if sponsor.logoPath %}
            <a href="{{ sponsor.url }}" target="_blank" rel="noopener" class="sponsor-card sponsor-platinum" title="{{ sponsor.name }}">
              {% if sponsor.sponsorType %}<span class="sponsor-type-badge">{{ sponsor.sponsorType }}</span>{% endif %}
              <img src="{{ sponsor.logoPath | relative_url }}" alt="{{ sponsor.name }}" loading="lazy">
            </a>
            {% endif %}
          {% endfor %}
        </div>
      </div>
      {% endif %}

      {% if gold_sponsors.size > 0 %}
      <div class="sponsor-row">
        <span class="sponsor-row-label">Gold</span>
        <div class="sponsor-row-logos">
          {% for sponsor in gold_sponsors %}
            {% if sponsor.logoPath %}
            <a href="{{ sponsor.url }}" target="_blank" rel="noopener" class="sponsor-card sponsor-gold" title="{{ sponsor.name }}">
              {% if sponsor.sponsorType %}<span class="sponsor-type-badge">{{ sponsor.sponsorType }}</span>{% endif %}
              <img src="{{ sponsor.logoPath | relative_url }}" alt="{{ sponsor.name }}" loading="lazy">
            </a>
            {% endif %}
          {% endfor %}
        </div>
      </div>
      {% endif %}

      {% if silver_sponsors.size > 0 %}
      <div class="sponsor-row">
        <span class="sponsor-row-label">Silver</span>
        <div class="sponsor-row-logos">
          {% for sponsor in silver_sponsors %}
            {% if sponsor.logoPath %}
            <a href="{{ sponsor.url }}" target="_blank" rel="noopener" class="sponsor-card sponsor-silver" title="{{ sponsor.name }}">
              {% if sponsor.sponsorType %}<span class="sponsor-type-badge">{{ sponsor.sponsorType }}</span>{% endif %}
              <img src="{{ sponsor.logoPath | relative_url }}" alt="{{ sponsor.name }}" loading="lazy">
            </a>
            {% endif %}
          {% endfor %}
        </div>
      </div>
      {% endif %}

      {% if bronze_sponsors.size > 0 %}
      <div class="sponsor-row">
        <span class="sponsor-row-label">Bronze</span>
        <div class="sponsor-row-logos">
          {% for sponsor in bronze_sponsors %}
            {% if sponsor.logoPath %}
            <a href="{{ sponsor.url }}" target="_blank" rel="noopener" class="sponsor-card sponsor-bronze" title="{{ sponsor.name }}">
              {% if sponsor.sponsorType %}<span class="sponsor-type-badge">{{ sponsor.sponsorType }}</span>{% endif %}
              <img src="{{ sponsor.logoPath | relative_url }}" alt="{{ sponsor.name }}" loading="lazy">
            </a>
            {% endif %}
          {% endfor %}
        </div>
      </div>
      {% endif %}
    </div>

    <div class="text-center mt-8">
      <a href="{{ '/sponsors/' | relative_url }}" class="btn btn-secondary">View All Sponsors</a>
    </div>
  </div>
</section>

<!-- Partners Preview Section -->
<section class="section-sm bg-primary">
  <div class="container">
    <div class="section-header">
      <span class="section-label">Community</span>
      <h2 class="section-title">Our Partners</h2>
      <p class="section-description">Orlando Code Camp proudly partners with these local organizations</p>
    </div>

    <div class="logo-grid logo-grid-2">
      {% for partner in site.data.partners %}
        {% if partner.logoPath %}
        <a href="{{ partner.url }}" target="_blank" rel="noopener" class="logo-item {% if partner.logoStyle == 'wide' %}logo-wide{% endif %}" title="{{ partner.name }}">
          <img src="{{ partner.logoPath | relative_url }}" alt="{{ partner.name }}" loading="lazy">
        </a>
        {% endif %}
      {% endfor %}
    </div>

    <div class="text-center mt-8">
      <a href="{{ '/sponsors/#partners' | relative_url }}" class="btn btn-secondary">View All Partners</a>
    </div>
  </div>
</section>

<!-- Disclaimer Section -->
<section class="section-sm bg-primary">
  <div class="container">
    <div class="disclaimer" id="disclaimer">
      <h3>Disclaimer</h3>
      <p><em>This event and its organizer are neither affiliated with nor endorsed by <a href="https://www.seminolestate.edu/slm" target="_blank" rel="noopener">Seminole State College</a> of Florida. Any views expressed at this event are solely those of the person expressing them and not those of Seminole State College of Florida.</em></p>
    </div>
  </div>
</section>
