<!-- Add a link that points to the sign up page on Eventbrite -->
{% assign signup_link = site.data.external_links | where_exp: 'item', 'item.id == 1' | first %}
{% if signup_link %}
<div class="signup-cta">
  <a href="{{ signup_link.url }}" target="_blank" class="signup-button">
    {{ signup_link.title | default: signup_link.url }}
  </a>
</div>

{% endif %}

{% raw %}
<!-- STYLES -->
<style>
  .signup-cta {
  text-align: center;
  margin: 20px 0;
}

.signup-button {
  display: inline-block;
  background-color: #ff6b35; /* Orange - energetic and eye-catching */
  color: white;
  font-size: 1.3rem;
  font-weight: bold;
  padding: 15px 30px;
  border-radius: 50px;
  text-decoration: none;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.signup-button:hover {
  background-color: #e85a2a;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
}
</style>

{% endraw %}