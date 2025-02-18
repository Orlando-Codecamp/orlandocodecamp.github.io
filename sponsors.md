---
layout: page
title: Sponsors
permalink: /sponsors/
nav_order: 7
---

# Sponsors

<p />

![Orlando CC Sponsors](/assets/img/photos/occ-sponsors.jpg "Orlando CC Sponsors")

<p />

## Sponsor Packages

<p />

Here is our [sponsorship package](/assets/doc/OrlandoCodeCamp2025-SponsorInfo.pdf){:target="_blank"}.

If you're interested in sponsoring, please email the OCC organizers at [board@onetug.net](mailto:board@onetug.net).

{% for sponsor in site.data.sponsors %}
---
## {{ sponsor.level }} Sponsor

![{{ sponsor.name }}]({{ sponsor.logoPath }}){:class="logo-sponsor-page"}

{% if sponsor.urlLabelOverride %}
  [ {{sponsor.urlLabelOverride}} ]({{ sponsor.url }})
{% else %}
  [Company site]({{ sponsor.url }})
{% endif %}

{% endfor %}