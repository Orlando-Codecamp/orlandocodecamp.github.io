---
layout: page
title: Community
permalink: /community/
description: "Discover the Orlando tech community, meetups, user groups, and ways to get involved year-round."
nav_order: 6
---

## Orlando's Tech Community

Orlando is home to a growing and welcoming tech community. From .NET and cloud to data, DevOps, and beyond, there are groups meeting regularly across Central Florida. Orlando Code Camp is proud to be part of this ecosystem and to bring these communities together each year.

---

## Community Partners

These local organizations help make Orlando Code Camp possible and keep the Orlando tech scene thriving year-round.

{% for partner in site.data.partners %}
<div class="info-card mb-6">
  <div class="partner-card">
    <img src="{{ partner.logoPath | relative_url }}" alt="{{ partner.name }} Logo" class="partner-logo">
    <p>{{ partner.description }}</p>
    {% if partner.links %}
    <p>
      {% for link in partner.links %}
      <a href="{{ link.url }}" target="_blank" rel="noopener" class="btn btn-secondary btn-sm">{{ link.label }}</a>
      {% endfor %}
    </p>
    {% endif %}
  </div>
</div>
{% endfor %}

---

## Get Involved

Orlando Code Camp happens once a year, but the community is active year-round. Here's how to stay connected:

<div class="info-card mb-6">
  <div class="info-card-content">
    <div class="flex items-center gap-4 flex-wrap">
      <div>
        <h3 class="info-card-title">Join Our Discord</h3>
        <p>Connect with fellow developers, speakers, and sponsors. Ask questions, share resources, and network with the community.</p>
        <a href="https://discord.gg/hgWnKzTTVU" target="_blank" rel="noopener" class="btn btn-primary btn-sm">Join Discord Server</a>
      </div>
    </div>
  </div>
</div>

<div class="info-card mb-6">
  <div class="info-card-content">
    <div class="flex items-center gap-4 flex-wrap">
      <div>
        <h3 class="info-card-title">Follow ONETUG</h3>
        <p>Stay up to date with Orlando Code Camp news and ONETUG events throughout the year.</p>
        <p>
          <a href="https://www.meetup.com/onetug/" target="_blank" rel="noopener" class="btn btn-secondary btn-sm">Meetup</a>
          <a href="https://twitter.com/onetug" target="_blank" rel="noopener" class="btn btn-secondary btn-sm">Twitter</a>
          <a href="https://github.com/onetug" target="_blank" rel="noopener" class="btn btn-secondary btn-sm">GitHub</a>
        </p>
      </div>
    </div>
  </div>
</div>
