---
layout: page
title: Sponsors
permalink: /sponsors/
nav_order: 9
---

# Sponsors

<p />

![Orlando CC Sponsors](/assets/img/photos/sponsors-gallery-2025.jpeg "Orlando CC Sponsors"){:class="photo-sponsors-page"}

<p />

## Sponsor Packages

<p />

Here is our [sponsorship package](/assets/doc/Orlando-Code-Camp-2026-Sponsor-Info.pdf){:target="_blank"}.

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