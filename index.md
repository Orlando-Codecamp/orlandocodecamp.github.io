---
layout: home
title: Home
nav_order: 1
---

{% raw %}
<style>
  /* Hero Section with Banner Background */
  .hero-section {
    position: relative;
    color: white;
    padding: 3rem 2rem;
    margin-bottom: 2rem;
    border-radius: 8px;
    text-align: center;
    overflow: hidden;
    min-height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hero-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #2c5282; /* Base color that complements the tree logo */
    background-size: cover;
    background-position: center;
    z-index: 1;
  }

  .hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(44, 82, 130, 0.85), rgba(49, 130, 206, 0.85));
    z-index: 2;
  }

  .hero-content {
    position: relative;
    z-index: 3;
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .hero-logo-container {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
    justify-content: center;
  }

  .hero-logo {
    height: 120px;
    margin-right: 1.5rem;
    /* Add a slight animation on load */
    animation: logoAppear 0.8s ease-out forwards;
  }

  @keyframes logoAppear {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .hero-title-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  
  .hero-annual {
    font-size: 1.4rem;
    font-weight: 500;
    color: white;
    margin: 0 0 0.3rem 0;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    opacity: 0.9;
    letter-spacing: 1px;
  }

  .hero-title {
    font-size: 2.8rem;
    margin: 0;
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    line-height: 1.1;
    text-align: left;
  }

  .hero-year {
    color: #FF6347; /* Orange/red color that matches the tree logo */
    font-size: 2.5rem;
    font-weight: bold;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .hero-subtitle {
    font-size: 1.5rem;
    font-weight: 500;
    margin: 0.5rem 0 1.5rem;
    color: rgba(255, 255, 255, 0.9);
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  .hero-description {
    font-size: 1.2rem;
    max-width: 800px;
    margin: 0 auto 2rem;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }

  /* Enhanced Primary CTA Button */
  .primary-cta {
    display: inline-block;
    padding: 0.85rem 1.75rem;
    border-radius: 6px;
    font-weight: 700;
    text-decoration: none;
    transition: all 0.3s ease;
    background-color: #FFD700; /* Bright gold color that complements the logo */
    color: #333333;
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border: 2px solid #FFD700;
    position: relative;
    overflow: hidden;
    z-index: 1;
    animation: pulse 2s infinite;
  }

  .primary-cta:hover {
    background-color: #FFC107;
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
    color: #222222;
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.7);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(255, 215, 0, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(255, 215, 0, 0);
    }
  }

  .secondary-cta {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
    border: 2px solid white;
  }

  .secondary-cta:hover {
    background-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  /* Hero CTA container */
  .hero-cta-container {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;
    margin-top: 2rem;
  }

  /* Added background pattern for hero section */
  .hero-pattern {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.3;
    z-index: 1;
  }

  @media (max-width: 768px) {
    .hero-logo-container {
      flex-direction: column;
      margin-bottom: 1.5rem;
    }
    
    .hero-logo {
      height: 100px;
      margin-right: 0;
      margin-bottom: 1rem;
    }
    
    .hero-title-container {
      align-items: center;
    }
    
    .hero-annual {
      text-align: center;
    }
    
    .hero-title {
      font-size: 2.2rem;
      text-align: center;
    }
    
    .hero-subtitle {
      font-size: 1.2rem;
      text-align: center;
    }
  }
  
  /* Countdown Section */
  .countdown-section {
    margin: 2rem 0;
    text-align: center;
  }
  
  /* Keynote Highlight Styles */
  .keynote-highlight {
    margin: 2.5rem 0;
    padding: 1.5rem;
    background: linear-gradient(to right, #f8f9fa, #e9ecef);
    border-left: 5px solid #3182ce;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1.5rem;
  }
  
  .keynote-highlight-image {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  .keynote-highlight-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .keynote-highlight-content {
    flex: 1;
    min-width: 250px;
  }
  
  .keynote-highlight-tag {
    display: inline-block;
    background-color: #3182ce;
    color: white;
    font-size: 0.8rem;
    font-weight: 600;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .keynote-highlight h3 {
    margin: 0.25rem 0 0.5rem;
    font-size: 1.5rem;
    color: #2d3748;
  }
  
  .keynote-highlight h4 {
    margin: 0 0 0.75rem;
    font-size: 1.1rem;
    color: #3182ce;
  }
  
  .keynote-highlight p {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.5;
    color: #4a5568;
  }
  
  .keynote-highlight-cta {
    display: inline-block;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #3182ce;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    font-weight: 500;
    transition: background-color 0.3s ease;
  }
  
  .keynote-highlight-cta:hover {
    background-color: #2c5282;
  }
  
  /* Event Banner */
  .event-banner {
    margin: 2rem 0;
    text-align: center;
  }
  
  .event-banner img {
    max-width: 100%;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  /* Event Info */
  .event-info {
    margin: 2rem 0;
    line-height: 1.6;
  }
  
  /* Event Photo */
  .event-photo {
    margin: 2rem 0;
    text-align: center;
  }
  
  .event-photo img {
    max-width: 100%;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .photo-credit {
    margin-top: 0.5rem;
    font-size: 0.9rem;
    color: #718096;
  }
  
  /* Quick Links Section */
  .quick-links-section {
    margin: 3rem 0;
  }
  
  .quick-links-section h2 {
    text-align: center;
    margin-bottom: 1.5rem;
  }
  
  .quick-links {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
  }
  
  .quick-link {
    display: flex;
    align-items: center;
    padding: 1rem;
    background-color: #f7fafc;
    border-radius: 8px;
    text-decoration: none;
    color: #2d3748;
    transition: all 0.3s ease;
  }
  
  .quick-link:hover {
    background-color: #edf2f7;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }
  
  .quick-link-icon {
    font-size: 1.5rem;
    margin-right: 0.75rem;
  }
  
  .quick-link-text {
    font-weight: 500;
  }
  
  /* Section Titles */
  .section-title {
    text-align: center;
    margin-bottom: 0.5rem;
  }
  
  .section-subtitle {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #718096;
  }
  
  /* Sponsors and Partners */
  .partners, .sponsors {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    border-radius: 15px;   
    padding: 15px;
    background-color: #f7f7f7;
    margin-bottom: 2rem;
  }

  .partners img, .sponsors img {
    background-color: white;
    width: 100%; 
    height: 100%;    
    object-fit: contain;
    padding: 20px;
  }

  .sponsor-partner.wide {
    grid-column: span 2;
  }

  .sponsor-partner.standard {
    grid-column: span 1;
  }

  .sponsor-partner {
    padding: 10px;
    border-radius: 10px;
    background-color: white;
    text-align: center;
    max-height: 250px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .sponsor-partner:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }
  
  /* Ensure the button stands out even more by adding some space around it */
  .hero-cta-container {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;
    margin-top: 2rem;
  }

  @media (min-width: 765px) {
    .sponsor-partner.standard {
      grid-column: span 1;
    }
  }

  @media (max-width: 765px) {
    .sponsor-partner.standard {
      grid-column: span 2;
    }
    
    .hero-section {
      padding: 3rem 1rem;
    }
    
    .hero-content h1 {
      font-size: 2rem;
    }
    
    .hero-content h2 {
      font-size: 1.2rem;
    }
    
    .keynote-highlight {
      flex-direction: column;
      text-align: center;
    }
    
    .keynote-highlight-image {
      margin: 0 auto;
    }
  }
</style>
{% endraw %}
<!-- Hero Section with Banner Background and Tree Logo Image -->
<div class="hero-section">
  <div class="hero-background">
    <!-- This is the base color background -->
  </div>
  
  <div class="hero-pattern">
    <!-- This adds a subtle pattern to the background -->
  </div>
  
  <div class="hero-overlay">
    <!-- This creates a semi-transparent overlay to ensure text remains readable -->
  </div>
  
  <div class="hero-content">
    <div class="hero-logo-container">
      <!-- Real Tree Logo Image -->
      <img src="/assets/img/occ-tree-logo.png" alt="Orlando Code Camp Logo" class="hero-logo">
      
      <div class="hero-title-container">
        <span class="hero-annual">17th Annual</span>
        <h1 class="hero-title">Orlando<br>Code Camp</h1>
        <span class="hero-year">2025</span>
      </div>
    </div>
    
    <h2 class="hero-subtitle">April 5th, 2025 • Seminole State College, Sanford, FL</h2>
    <p class="hero-description">A full day of learning, networking, and technical sessions with over 70 speakers and sessions.</p>
    
    <div class="hero-cta-container">
      <a href="https://www.eventbrite.com/e/orlando-code-camp-2025-tickets-1244003330449" target="_blank" class="primary-cta">Register Now - It's Free!</a>
      <a href="/schedule/" class="secondary-cta">View Schedule</a>
    </div>
  </div>
</div>

<!-- Countdown Section -->
<div id="countdown-clock" class="countdown-section">
  {% include clock.html %}
</div>

<!-- Keynote Speaker Highlight Section -->
<div class="keynote-highlight">
  <div class="keynote-highlight-image">
    <img src="/assets/img/photos/shaun-walker.jpg" alt="Shaun Walker" />
  </div>
  <div class="keynote-highlight-content">
    <span class="keynote-highlight-tag">Keynote Speaker</span>
    <h3>Shaun Walker</h3>
    <h4>Who Pays for Open Source</h4>
    <p>Join us for an insightful keynote on the challenges and opportunities of open source sustainability from the creator of DotNetNuke and Chair of the .NET Foundation Project Committee.</p>
    <a href="/speakers/#keynote" class="keynote-highlight-cta">Learn More</a>
  </div>
</div>

<!-- Event Info -->
<div class="event-info">
  <p>Orlando Code Camp is organized by the <a href="https://onetug.net">Orlando .NET User Group (ONETUG)</a> and hosted at the Sanford/Lake Mary campus of <a href="#disclaimer">Seminole State College</a>.</p>
  
  <p>The event entry is <strong>FREE</strong> to all attendees, thanks to our generous sponsors.</p>
  
  <p>Our conference will showcase multiple tracks featuring cutting-edge technical deep dives and strategic industry insights, with focused 50-minute sessions presented by speakers from across the tech and software development landscape.</p>
</div>

<!-- Event Photo -->
<div class="event-photo">
  <img src="/assets/img/photos/occ-keynote.jpg" alt="Orlando CC KeyNote">
  <p class="photo-credit">Photo courtesy of Adam Stark</p>
</div>

<!-- Quick Links Section -->
<div class="quick-links-section">
  <h2>Explore More</h2>
  <div class="quick-links">
    <a href="/attendees" class="quick-link">
      <span class="quick-link-icon">📋</span>
      <span class="quick-link-text">Attendee Info</span>
    </a>
    <a href="/schedule" class="quick-link">
      <span class="quick-link-icon">🗓️</span>
      <span class="quick-link-text">Event Schedule</span>
    </a>
    <a href="/sponsors" class="quick-link">
      <span class="quick-link-icon">🤝</span>
      <span class="quick-link-text">Our Sponsors</span>
    </a>
    <a href="/speakers/#speaker-list" class="quick-link">
      <span class="quick-link-icon">🎤</span>
      <span class="quick-link-text">70+ Speakers</span>
    </a>
    <a href="/sessions" class="quick-link">
      <span class="quick-link-icon">💻</span>
      <span class="quick-link-text">70+ Sessions</span>
    </a>
    <a href="/partners" class="quick-link">
      <span class="quick-link-icon">🔗</span>
      <span class="quick-link-text">Community Partners</span>
    </a>
  </div>
</div>

---

<!-- Sponsors Section -->
<h2 class="section-title">Our Sponsors</h2>
<p class="section-subtitle">Orlando Code Camp is generously sponsored by the following companies:</p>

<div class="sponsors">
{% for sponsor in site.data.sponsors %}
  {% if sponsor.logoPath %}
    <div class="sponsor-partner {{ sponsor.logoStyle }}">
      <a href="{{ sponsor.url }}">
        <img src="{{ sponsor.logoPath }}" alt="{{ sponsor.name }}" title="{{ sponsor.name }}">
      </a>
    </div>
  {% endif %}
{% endfor %}
</div>

---

<!-- Partners Section -->
<h2 class="section-title">Community Partners</h2>
<p class="section-subtitle">Orlando Code Camp proudly partners with the following local organizations:</p>

<div class="partners">
{% for partner in site.data.partners %}
  <div class="sponsor-partner {{ partner.logoStyle }}">
    <a href="{{ partner.url }}">
      <img src="{{ partner.logoPath }}" alt="{{ partner.name }}" title="{{ partner.name }}">
    </a>
  </div>
{% endfor %}
</div>

---

<h3 id="disclaimer">Disclaimer</h3>
<p><em>This event and its organizer are neither affiliated with nor endorsed by <a href="https://www.seminolestate.edu/slm" target="_blank">Seminole State College</a> of Florida. Any views expressed at this event are solely those of the person expressing them and not those of Seminole State College of Florida.</em></p>