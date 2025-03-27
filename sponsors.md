---
layout: page
title: Sponsors
permalink: /sponsors/
nav_order: 8
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

{% if sponsor.logoPath %}
![{{ sponsor.name }}]({{ sponsor.logoPath }}){:class="logo-sponsor-page"}

[ {{sponsor.urlLabelOverride | default: "Company Site"}} ]({{ sponsor.url }})

{% else %}

[ {{sponsor.name}} ]( {{sponsor.url}} )

{% endif %}

{% endfor %}