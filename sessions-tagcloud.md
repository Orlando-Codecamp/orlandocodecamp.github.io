---
layout: page
title: Sessions Tag Cloud
permalink: /sessions-tagcloud/
description: "Browse the sessions at Orlando Code Camp 2027 - technical deep dives and strategic industry insights."
nav_exclude: true
---

{% assign sessionize_embed_id = site.sessionize_embed_id | strip %}
{% if sessionize_embed_id != "" %}
## Confirmed Sessions

<div class="sessionize-embed">
  <script type="text/javascript" src="https://sessionize.com/api/v2/{{ sessionize_embed_id }}/view/Sessions"></script>
</div>
{% else %}
<div class="banner banner-info">
  The 2027 sessions will be posted here once speakers are selected.
</div>
{% endif %}
