---
layout: page
title: Speakers
permalink: /speakers/
description: "Meet the speakers at Orlando Code Camp 2027 - industry experts sharing their knowledge on the latest technologies."
nav_exclude: true
---

{% assign sessionize_embed_id = site.sessionize_embed_id | strip %}
{% assign call_for_speakers_url = site.call_for_speakers_url | strip %}

{% if sessionize_embed_id != "" %}
{% comment %}
Add the 2027 keynote card here once it is announced, as a
<section class="keynote-section" id="keynote"> so /keynote/ lands on it.
{% endcomment %}

## Confirmed Speakers {#speaker-list}

The speakers below have approved sessions and have confirmed their attendance. Check back later as we finalize the list of confirmed speakers.

<div class="sessionize-embed">
  <script type="text/javascript" src="https://sessionize.com/api/v2/{{ sessionize_embed_id }}/view/Speakers"></script>
</div>
{% else %}
<div class="banner banner-info" id="keynote">
  The 2027 keynote and speakers will be announced here once they are selected.
  {% if call_for_speakers_url != "" %}Want to speak? The <a href="{{ call_for_speakers_url }}" target="_blank" rel="noopener">call for speakers</a> is open now.{% else %}The call for speakers has not opened yet.{% endif %}
</div>
{% endif %}
