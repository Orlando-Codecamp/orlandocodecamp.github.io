---
layout: page
title: Become a Sponsor
permalink: /become-a-sponsor/
description: "Partner with Orlando Code Camp 2026 and connect with 400+ developers, engineers, and tech professionals."
nav_exclude: true
---

{% assign now = site.time | date: "%s" | plus: 0 %}
{% assign after_jan31 = "2026-02-01" | date: "%s" | plus: 0 %}
{% assign after_feb28 = "2026-03-01" | date: "%s" | plus: 0 %}
{% assign after_mar11 = "2026-03-12" | date: "%s" | plus: 0 %}
{% assign after_mar28 = "2026-03-29" | date: "%s" | plus: 0 %}

<div class="sponsor-info-page">

<div class="banner banner-cta mb-8">
  <h3 class="banner-title">18th Annual Orlando Code Camp</h3>
  <p class="banner-description">April 11th, 2026 &mdash; Seminole State College, Sanford, FL</p>
  <p class="text-muted mb-4">Join us in supporting Central Florida's largest free developer conference.</p>
  <a href="mailto:sponsors@orlandocodecamp.com" class="btn btn-primary btn-lg">Get in Touch</a>
</div>

<h2>Event Overview</h2>

<p>Code Camps are <strong>free, one-day learning events</strong> for programming professionals and students with a focus on .NET and other related technologies. They are community-driven mini developer conferences, free of charge to attendees and open to presenters of all experience levels.</p>

<div class="info-cards-grid mt-6 mb-8">
  <div class="info-card text-center">
    <div class="stat-number">400+</div>
    <div class="stat-label">Attendees</div>
  </div>
  <div class="info-card text-center">
    <div class="stat-number">75+</div>
    <div class="stat-label">Speakers</div>
  </div>
  <div class="info-card text-center">
    <div class="stat-number">70+</div>
    <div class="stat-label">Sessions</div>
  </div>
</div>

<div class="info-card mb-6">
  <h3 class="info-card-title">Our Goals</h3>
  <ul class="goals-list">
    <li><strong>First-class training</strong> &mdash; A free event as good as or better than similar paid conferences</li>
    <li><strong>Networking</strong> &mdash; Excellent opportunities for software professionals, vendors, and employers</li>
    <li><strong>Speaker development</strong> &mdash; Growing the local speaker pool with mentorship for new presenters</li>
    <li><strong>Sponsor relationships</strong> &mdash; A great venue for highlighting your products, services, or finding .NET talent</li>
  </ul>
</div>

<p>Our target audience is Software, IT, and Database professionals and managers working in the state of Florida, ranging from beginning to senior level positions. We advertise via .NET and SQL user groups, local blogs, community newsletters, Microsoft events, Twitter, and LinkedIn.</p>

<hr>

<h2>Sponsorship Levels</h2>

<div class="sponsor-levels-table-wrapper">
  <table class="sponsor-levels-table">
    <thead>
      <tr>
        <th class="benefit-col">Benefits</th>
        <th class="tier-col tier-bronze">Bronze</th>
        <th class="tier-col tier-silver">Silver</th>
        <th class="tier-col tier-gold">Gold</th>
        <th class="tier-col tier-platinum">Platinum</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Logo in communications &amp; website</td>
        <td class="check-cell"><span class="check-mark">&#10003;</span></td>
        <td class="check-cell"><span class="check-mark">&#10003;</span></td>
        <td class="check-cell"><span class="check-mark">&#10003;</span></td>
        <td class="check-cell"><span class="check-mark">&#10003;</span></td>
      </tr>
      <tr>
        <td>Flyer &amp; swag in attendee bags</td>
        <td class="check-cell"><span class="check-mark">&#10003;</span></td>
        <td class="check-cell"><span class="check-mark">&#10003;</span></td>
        <td class="check-cell"><span class="check-mark">&#10003;</span></td>
        <td class="check-cell"><span class="check-mark">&#10003;</span></td>
      </tr>
      <tr>
        <td>May donate prizes for end of day raffle</td>
        <td class="check-cell"></td>
        <td class="check-cell"><span class="check-mark">&#10003;</span></td>
        <td class="check-cell"><span class="check-mark">&#10003;</span></td>
        <td class="check-cell"><span class="check-mark">&#10003;</span></td>
      </tr>
      <tr>
        <td>Sponsor booth in Common Area</td>
        <td class="check-cell"></td>
        <td class="check-cell"><span class="check-mark">&#10003;</span></td>
        <td class="check-cell"><span class="check-mark">&#10003;</span></td>
        <td class="check-cell"><span class="check-mark">&#10003;</span></td>
      </tr>
      <tr>
        <td>Logo on T-shirt back</td>
        <td class="check-cell"></td>
        <td class="check-cell"><span class="check-mark">&#10003;</span></td>
        <td class="check-cell"><span class="check-mark">&#10003;</span></td>
        <td class="check-cell"><span class="check-mark">&#10003;</span></td>
      </tr>
      <tr>
        <td>Speaking time during keynote</td>
        <td class="check-cell"></td>
        <td class="check-cell"></td>
        <td class="check-cell"><span class="check-mark">&#10003;</span></td>
        <td class="check-cell"><span class="check-mark">&#10003;</span></td>
      </tr>
      <tr>
        <td>Invitation to Speaker Party</td>
        <td class="check-cell"></td>
        <td class="check-cell"></td>
        <td class="check-cell"></td>
        <td class="check-cell"><span class="check-mark">&#10003;</span></td>
      </tr>
    </tbody>
    <tfoot>
      <tr class="pricing-row discount-row{% if now >= after_jan31 %} discount-expired{% else %} discount-active{% endif %}">
        <td>Until Jan 31st {% if now >= after_jan31 %}<span class="discount-badge expired">Expired</span>{% else %}<span class="discount-badge active">20% off &mdash; Act now!</span>{% endif %}</td>
        <td class="price-cell">$600</td>
        <td class="price-cell">$1,200</td>
        <td class="price-cell">$1,800</td>
        <td class="price-cell">$2,400</td>
      </tr>
      <tr class="pricing-row discount-row{% if now >= after_feb28 %} discount-expired{% elsif now >= after_jan31 %} discount-active{% endif %}">
        <td>Feb 1st &ndash; Feb 28th {% if now >= after_feb28 %}<span class="discount-badge expired">Expired</span>{% elsif now >= after_jan31 %}<span class="discount-badge active">10% off &mdash; Act now!</span>{% else %}<span class="discount-badge">10% off</span>{% endif %}</td>
        <td class="price-cell">$675</td>
        <td class="price-cell">$1,350</td>
        <td class="price-cell">$2,025</td>
        <td class="price-cell">$2,700</td>
      </tr>
      <tr class="pricing-row">
        <td>Mar 1st and after</td>
        <td class="price-cell">$750</td>
        <td class="price-cell">$1,500</td>
        <td class="price-cell">$2,250</td>
        <td class="price-cell">$3,000</td>
      </tr>
    </tfoot>
  </table>
</div>

<hr>

<h2>Additional Sponsorship Opportunities</h2>

<p>Your organization may also be interested in sponsoring high-profile portions of Orlando Code Camp. In cases where sponsorship level is included, sponsors may later opt to increase their level by providing the difference.</p>

<div class="additional-sponsorships">
  {% for opportunity in site.data.sponsor_opportunities %}
    {% assign claimed_by = nil %}
    {% for sponsor in site.data.sponsors %}
      {% if sponsor.sponsorType == opportunity.sponsorType %}
        {% assign claimed_by = sponsor.name %}
      {% endif %}
    {% endfor %}
    <div class="additional-sponsor-card{% if claimed_by %} claimed{% endif %}">
      {% if claimed_by %}
        <div class="claimed-banner">Claimed by {{ claimed_by }}</div>
      {% else %}
        <div class="available-badge">Available</div>
      {% endif %}
      <div class="additional-sponsor-header">
        <h4>{{ opportunity.name }}</h4>
        <span class="additional-sponsor-price">{{ opportunity.price }}</span>
      </div>
      <ul>
        {% for benefit in opportunity.benefits %}
          <li>{{ benefit }}</li>
        {% endfor %}
      </ul>
    </div>
  {% endfor %}
</div>

<p class="text-muted text-sm mt-4"><em>Please note: these sponsorships are for specific budget items, so we can no longer offer early-payment discounts on additional sponsorship opportunities due to increased costs in recent years.</em></p>

<hr>

<h2>Event Logistics</h2>

<div class="info-card mb-6">
  <h3 class="info-card-title">Event Day Schedule</h3>
  <div class="schedule-overview">
    <div class="schedule-item">
      <span class="schedule-time">7:30 AM</span>
      <span class="schedule-desc">Registration opens</span>
    </div>
    <div class="schedule-item">
      <span class="schedule-time">8:00 AM</span>
      <span class="schedule-desc">Keynote begins</span>
    </div>
    <div class="schedule-item">
      <span class="schedule-time">9:30 AM</span>
      <span class="schedule-desc">Sessions begin</span>
    </div>
    <div class="schedule-item">
      <span class="schedule-time">4:20 PM</span>
      <span class="schedule-desc">Last session ends</span>
    </div>
    <div class="schedule-item">
      <span class="schedule-time">After</span>
      <span class="schedule-desc">Closing remarks &amp; prize raffles</span>
    </div>
  </div>
</div>

<p>Sessions run for <strong>50 minutes</strong> with <strong>10-minute breaks</strong> in between, giving attendees time to visit sponsor booths. Breakfast, refreshments, and lunch are provided on site. The evening before, there is a VIP party for speakers, organizers, and volunteers. After the event, there is a networking party for attendees.</p>

<hr>

<h2>Sponsor Information</h2>

<div class="event-highlight mb-6">
  <span class="highlight-icon">&#128197;</span>
  <div class="highlight-content">
    Upon arrival, sponsors will be greeted by a volunteer and directed to their booth where a <strong>table and 2 chairs</strong> will be provided. All sponsors should bring marketing materials and be prepared to man their booth for the duration of the event.
  </div>
</div>

<div class="info-card mb-6">
  <h3 class="info-card-title">What to Bring</h3>
  <ul class="entrance-list">
    <li>Business cards</li>
    <li>Pens</li>
    <li>Branded swag</li>
    <li>Banner / sign</li>
    <li>Raffle prize</li>
  </ul>
  <p class="text-muted text-sm mt-4">We recommend having a raffle prize for your table to assist in collecting business cards and contact information. Prizes will be announced during closing remarks.</p>
</div>

<div class="banner banner-warning mb-6">
  <strong>Attendee bags:</strong> Items must be provided 2 weeks prior to the event. Please limit marketing material to one piece of paper. One or more additional small branded items can also be included.
</div>

<div class="banner banner-info mb-6">
  <strong>Logos:</strong> Please email us your logo at least 1 month before the event to be included in all marketing. We require a <strong>vector (SVG)</strong> logo for T-shirts and printed materials, and a <strong>PNG or JPEG</strong> logo for the website and emails (PNG preferred for transparency).
</div>

<p class="text-muted text-sm"><em>Please note: the organizers have a standing policy of not sharing attendees' personal data directly with anyone.</em></p>

<hr>

<h2>Important Deadlines</h2>

<div class="deadlines-list">
  <div class="deadline-item{% if now >= after_jan31 %} deadline-expired{% else %} deadline-active{% endif %}">
    <div class="deadline-date">
      <span class="deadline-day">Jan 31</span>
    </div>
    <div class="deadline-info">
      <strong>Last day for 20% early-payment discount</strong>
      <span class="text-muted">Bronze, Silver, Gold, and Platinum</span>
    </div>
    {% if now >= after_jan31 %}<span class="discount-badge expired">Expired</span>{% else %}<span class="discount-badge active">Act now!</span>{% endif %}
  </div>

  <div class="deadline-item{% if now >= after_feb28 %} deadline-expired{% elsif now >= after_jan31 %} deadline-active{% endif %}">
    <div class="deadline-date">
      <span class="deadline-day">Feb 28</span>
    </div>
    <div class="deadline-info">
      <strong>Last day for 10% early-payment discount</strong>
      <span class="text-muted">Bronze, Silver, Gold, and Platinum</span>
    </div>
    {% if now >= after_feb28 %}<span class="discount-badge expired">Expired</span>{% elsif now >= after_jan31 %}<span class="discount-badge active">Act now!</span>{% endif %}
  </div>

  <div class="deadline-item{% if now >= after_mar11 %} deadline-expired{% elsif now >= after_feb28 %} deadline-active{% endif %}">
    <div class="deadline-date">
      <span class="deadline-day">Mar 11</span>
    </div>
    <div class="deadline-info">
      <strong>Logo submission deadline</strong>
      <span class="text-muted">SVG for print, PNG/JPEG for web &mdash; Silver and above</span>
    </div>
    {% if now >= after_mar11 %}<span class="discount-badge expired">Expired</span>{% elsif now >= after_feb28 %}<span class="discount-badge active">Coming up!</span>{% endif %}
  </div>

  <div class="deadline-item{% if now >= after_mar28 %} deadline-expired{% elsif now >= after_mar11 %} deadline-active{% endif %}">
    <div class="deadline-date">
      <span class="deadline-day">Mar 28</span>
    </div>
    <div class="deadline-info">
      <strong>Booth requests &amp; attendee bag materials due</strong>
      <span class="text-muted">All special requests and marketing materials must be received</span>
    </div>
    {% if now >= after_mar28 %}<span class="discount-badge expired">Expired</span>{% elsif now >= after_mar11 %}<span class="discount-badge active">Coming up!</span>{% endif %}
  </div>
</div>

<hr>

<h2>Ready to Sponsor?</h2>

<div class="sponsor-cta-section">
  <p class="text-lg mb-6">We'd love to have your organization as a sponsor for Orlando Code Camp 2026. Reach out to us to get started!</p>

  <div class="info-card info-card-highlight text-center mb-6">
    <h4 class="info-card-title">Email Us</h4>
    <p><a href="mailto:sponsors@orlandocodecamp.com">sponsors@orlandocodecamp.com</a></p>
  </div>

  <p class="text-center text-muted text-sm mt-6">
    <a href="{{ '/assets/doc/Orlando-Code-Camp-2026-Sponsor-Info.pdf' | relative_url }}" target="_blank" rel="noopener">Download this information as a PDF</a>
  </p>
</div>

</div>
