---
layout: home
title: Home
nav_order: 1
---

{::comment}
# Orlando Code Camp 2025 - April 5th 2025
{:/comment}

<div id="countdown-clock" style="text-align: center;">
  {% include clock.html %}
</div>

{% include signup-link.md %}

{::comment}
## Seminole State College, Sanford, FL
{:/comment}


![Orlando Code Camp 2025 logo](/assets/img/banners/2025%20Code%20Camp%20-%20Banner.png "Orlando Code Camp 2025 - April 5th, 2025"){:class="banner-home-page"}

<p></p>

Orlando Code Camp is organized by the [Orlando .NET User Group (ONETUG)](https://onetug.net)
and hosted at the Sanford/Lake Mary campus of [Seminole State College](#disclaimer).

<p></p>

<p></p>

![Orlando CC Keynote](/assets/img/photos/occ-keynote.jpg "Orlando CC KeyNote")
Photo courtesy of Adam Stark
{: .fs-4 }

<p></p>

The event entry is **FREE** to all attendees, thanks to our generous sponsors.

Our conference will showcase multiple tracks featuring cutting-edge technical deep dives and strategic industry insights, with focused 50-minute sessions presented by speakers from across the tech and software development landscape.


{::comment}
[Check out the sponsorship packages](/sponsors)
[Find out about our community partners](/partners)
[Learn more about the event location](/location)
{:/comment}

[Learn more about the event](/attendees)
[Look at the schedule](/schedule)
[Check out our sponsors](/sponsors)
[See 70+ confirmed speakers](/speakers)
[Pick from 70+ confirmed sessions](/sessions)
[Explore our community partners](/partners)


---
Orlando Code Camp is generously sponsored by the following companies:

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

Orlando Code Camp proudly partners with the following local organizations:

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
 <h3 id=disclaimer>Disclaimer</h3>
 <p><em>This event and its organizer are neither affiliated with nor endorsed by <a href="https://www.seminolestate.edu/slm" target="_blank">Seminole State College</a> of Florida. Any views expressed at this event are solely those of the person expressing them and not those of Seminole State College of Florida.</em></p>

{% raw %}

<style>
  .partners, .sponsors {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Two equal columns */
    border-radius: 15px;   
    padding: 10px;
    user-select: none;
  }

  .partners img, .sponsors img {
    background-color: white;

     /* These properties ensure that the image always fills the container but maintains proportions */
    width: 100%; 
    height: 100%;    
    object-fit: contain; 
  }

  .sponsor-partner.wide {
    grid-column: span 2;
  }

  .sponsor-partner.standard {
    grid-column: span 1;
  }

  .sponsor-partner {
    padding: 10px;
    border-radius: 15px;
    background-color: white;
    text-align: center;
    max-height: 250px;
  }

  @media (min-width: 765px) {
    .sponsor-partner.standard {
      grid-column: span 1;
    }

    .partners, .sponsors {
      gap: 10px; 
      background-color: #f7f7f7; 
    }

    .partners img, .sponsors img {
      padding: 20px;
    }
  }

  @media (max-width: 765px) {
    .sponsor-partner.standard {
      grid-column: span 2;
    }
  }
</style>

{% endraw %}