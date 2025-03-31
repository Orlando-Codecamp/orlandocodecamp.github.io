---
layout: page
title: Volunteers
permalink: /volunteers/
description: "Orlando Code Camp is run by volunteers. We are always looking for more help! If you would like to volunteer, please let us know."
nav_order: 4
---

<style>
  .volunteer-contact {
    background-color: #f7fafc;
    border-radius: 8px;
    padding: 1.5rem;
    margin: 2rem 0;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }
  
  .contact-info {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 0.5rem;
  }
  
  .copy-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    width: 36px;
    height: 36px;
    background-color: #2c5282;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .copy-btn:hover {
    background-color: #1a365d;
    transform: translateY(-2px);
  }
  
  /* Toast notification */
  .toast {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    background-color: #38a169;
    color: white;
    padding: 12px 24px;
    border-radius: 4px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    opacity: 0;
    transition: transform 0.3s ease-out, opacity 0.3s ease-out;
    pointer-events: none;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .toast.show {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
  
  /* New hero CTA styles */
  .hero-cta {
    background: linear-gradient(135deg, #2c5282, #3182ce);
    color: white;
    padding: 2rem;
    border-radius: 8px;
    margin: 1rem 0 2.5rem 0;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .hero-cta h2 {
    margin-top: 0;
    font-size: 1.8rem;
    color: white;
  }
  
  .hero-cta p {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }
  
  .cta-email {
    background-color: rgba(255, 255, 255, 0.15);
    padding: 1rem;
    border-radius: 6px;
    display: inline-flex;
    align-items: center;
    margin: 0 auto;
    gap: 0.75rem;
  }
  
  .cta-email-text {
    font-weight: bold;
    font-size: 1.2rem;
    letter-spacing: 0.5px;
  }
  
  .cta-copy-btn {
    background-color: white;
    color: #2c5282;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
  }
  
  .cta-copy-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .cta-copy-btn svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
  }
</style>

# Volunteers

<!-- Hero CTA Section -->
<div class="hero-cta">
  <h2>Ready to Join Our Volunteer Team?</h2>
  <p>Contact us today to be part of Orlando Code Camp 2025!</p>
  <div class="cta-email">
    <span class="cta-email-text">board@onetug.org</span>
    <button id="copyEmailBtn" class="cta-copy-btn" aria-label="Copy email address to clipboard" title="Copy email address">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
      </svg>
    </button>
  </div>
</div>

<div class="event-photo">
  <img src="/assets/img/photos/occ-lunch.jpg" alt="Orlando Code Camp Volunteers">
  <p class="photo-credit">Orlando Code Camp community volunteers</p>
</div>

## Be Part of Something Amazing

Orlando Code Camp is a free event and is only made possible by the dedication and enthusiasm of our volunteers. Each year, dozens of community members come together to create an unforgettable experience for attendees and speakers alike.

As a volunteer, you'll help with various aspects of the event, from registration and session management to directing attendees and assisting speakers. It's a great way to network with fellow tech enthusiasts while contributing to one of Central Florida's premier tech events.

## Details Coming Soon

We're currently finalizing our volunteer roles and schedules for the 2025 event. More detailed information will be posted here in the next couple of days.

## Previous Volunteer Activities

Volunteers at Orlando Code Camp help with:

- Attendee check-in and registration
- Lunch and break management
- Speaker assistance and room management
- Setup and teardown of venue spaces
- Attendee questions and directions
- Keeping the event running smoothly throughout the day

Volunteering at Orlando Code Camp is a fantastic way to give back to the tech community while making valuable connections and being part of an exciting, educational event!

<!-- Toast notification -->
<div id="toast" class="toast" role="alert" aria-live="polite">
  <span>Email copied to clipboard!</span>
</div>

<script src="{{ '/assets/js/volunteers.js' | relative_url }}?v={{ site.time | date: '%s' }}"></script>