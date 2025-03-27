---
layout: page
title: Location
permalink: /location/
nav_order: 2
has_toc: true
---

<style>
  .location-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
  }

  .event-banner {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 30px;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .countdown-container {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 15px;
  }

  .cta-button {
    margin-top: 15px;
  }

  .cta-button a {
    display: inline-block;
    background-color: #ff6b00;
    color: white;
    padding: 12px 24px;
    border-radius: 4px;
    text-decoration: none;
    font-weight: bold;
    transition: background-color 0.3s;
  }

  .cta-button a:hover {
    background-color: #e55d00;
  }

  .event-highlight {
    background-color: #e6f7ff;
    border-left: 4px solid #1890ff;
    padding: 15px;
    border-radius: 4px;
    margin: 20px 0;
    font-size: 1.1rem;
  }

  .address-card {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    margin: 20px 0;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }

  .address-card h3 {
    margin-top: 0;
    color: #333;
  }

  .location-link {
    color: #0078d4;
    text-decoration: none;
    display: inline-block;
    line-height: 1.6;
  }

  .location-link:hover {
    text-decoration: underline;
  }

  .map-container {
    margin: 30px 0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }

  .map-links {
    background-color: #f8f9fa;
    padding: 15px;
    text-align: center;
  }

  .button {
    display: inline-block;
    background-color: #ff6b00;
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    text-decoration: none;
    font-weight: bold;
    transition: background-color 0.3s;
  }

  .button:hover {
    background-color: #e55d00;
  }

  .campus-info {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    margin: 20px 0;
  }

  .entrance-list {
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .entrance-list li {
    background-color: #e6f7ff;
    padding: 8px 16px;
    border-radius: 20px;
    display: inline-block;
  }

  .campus-map-container {
    text-align: center;
    margin: 30px 0;
  }

  .campus-map-link {
    display: inline-block;
    position: relative;
    transition: transform 0.3s;
  }

  .campus-map-link:hover {
    transform: scale(1.02);
  }

  .campus-map-thumbnail {
    max-width: 100%;
    border-radius: 8px;
    box-shadow: 0 3px 10px rgba(0,0,0,0.2);
  }

  .map-caption {
    display: block;
    margin-top: 10px;
    color: #0078d4;
    font-weight: bold;
  }

  .travel-section {
    margin: 40px 0;
  }

  .airport-cards, .hotel-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }

  .airport-card, .hotel-card {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }

  .airport-card h4, .hotel-card h4 {
    margin-top: 0;
    color: #333;
    border-bottom: 2px solid #e6f7ff;
    padding-bottom: 10px;
  }

  .distance {
    color: #666;
    font-style: italic;
  }

  .phone-link {
    display: inline-block;
    margin-top: 8px;
    color: #0078d4;
    text-decoration: none;
  }

  .phone-link:hover {
    text-decoration: underline;
  }

  .disclaimer-section {
    margin-top: 40px;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    font-size: 0.9rem;
  }

  h1, h2, h3 {
    color: #333;
  }

  h1 {
    font-size: 2.2rem;
    margin-bottom: 20px;
  }

  h2 {
    font-size: 1.8rem;
    margin: 40px 0 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid #eaeaea;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .airport-cards, .hotel-cards {
      grid-template-columns: 1fr;
    }
  }
</style>

{:toc}

<div class="event-banner">
  <div id="countdown-clock" class="countdown-container">{% include clock.html %}</div>
  <div class="cta-button">{% include signup-link.md %}</div>
</div>

<div class="location-container">
  <h1>Location</h1>
  
  <div class="event-highlight">
    <p>Orlando Code Camp 2025 will be held on <strong>April 5th, 2025</strong> at <strong>Seminole State College</strong> in Sanford, FL.</p>
  </div>

  <h2>Event Address</h2>
  <div class="address-card">
    <h3>Seminole State College - Sanford/Lake Mary Campus</h3>
    <p>
      <a href="https://maps.google.com/?q=Wayne+M.+Densch+Partnership+Center,+Seminole+State+College,+100+Weldon+Blvd,+Sanford+FL+32773" target="_blank" class="location-link">
        Wayne M. Densch Partnership Center<br />
        100 Weldon Blvd<br/>
        Sanford FL, 32773
      </a>
    </p>
  </div>

  <div class="map-container">
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1749.0897107327119!2d-81.30701413734684!3d28.744059558742478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e76d180ab1b97b%3A0xd7369878036400a1!2sWayne%20M.%20Densch%20Partnership%20Center!5e0!3m2!1sen!2sus!4v1663965771738!5m2!1sen!2sus" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    <div class="map-links">
      <a href="https://maps.seminolestate.edu/#!BLD_2016012779162" target="_blank" class="button">Campus Map</a>
    </div>
  </div>

  <div class="campus-info">
    <h3>Campus Entrances</h3>
    <p>There are 3 entrances to campus via:</p>
    <ul class="entrance-list">
      <li>Weldon Blvd</li>
      <li>Broadmoor Rd</li>
      <li>College Dr</li>
    </ul>
  </div>

  <div class="campus-map-container">
    <a href="/assets/img/maps/Seminole State Landmarks - Full-Size.png" alt="Full Size Map of Event Landmarks at Seminole State" target="_blank" class="campus-map-link">
      <img src="/assets/img/maps/Seminole State Landmarks - Thumbnail.png" alt="Thumbnail Map of Event Landmarks at Seminole State" class="campus-map-thumbnail" />
      <span class="map-caption">Click to open the annotated campus map in a new window</span>
    </a>
  </div>

  <h2>Travel Information</h2>
  
  <div class="travel-section">
    <div class="airport-info">
      <h3>Nearest Airports</h3>
      <div class="airport-cards">
        <div class="airport-card">
          <h4>SFB</h4>
          <p>Sanford International Airport</p>
          <p class="distance">Closest (5 minute drive)</p>
        </div>
        <div class="airport-card">
          <h4>MCO</h4>
          <p>Orlando International Airport</p>
          <p class="distance">Largest (45 minute drive)</p>
        </div>
        <div class="airport-card">
          <h4>DAB</h4>
          <p>Daytona Beach International Airport</p>
          <p class="distance">45 minute drive</p>
        </div>
      </div>
    </div>

    <div class="hotel-info">
      <h3>Recommended Hotels</h3>
      <div class="hotel-cards">
        <div class="hotel-card">
          <h4>Orlando Marriott Lake Mary</h4>
          <p>1501 International Parkway<br>Lake Mary, Florida 32746</p>
          <p class="distance">10 minute drive</p>
          <a href="tel:+14079951100" class="phone-link">+1 407-995-1100</a>
        </div>
        <div class="hotel-card">
          <h4>The Westin Lake Mary, Orlando North</h4>
          <p>2974 International Parkway<br>Lake Mary, Florida 32746</p>
          <p class="distance">10 minute drive</p>
          <a href="tel:+14075313555" class="phone-link">+1 407-531-3555</a>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="disclaimer-section">
  <h3 id="disclaimer">Disclaimer</h3>
  <p><em>This event and its organizer are neither affiliated with nor endorsed by <a href="https://www.seminolestate.edu/slm" target="_blank">Seminole State College</a> of Florida. Any views expressed at this event are solely those of the person expressing them and not those of Seminole State College of Florida.</em></p>
</div>