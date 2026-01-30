/**
 * Orlando Code Camp - Main JavaScript
 * Handles navigation, animations, and interactive elements
 */

(function() {
  'use strict';

  // ==========================================================================
  // Mobile Navigation
  // ==========================================================================
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const navOverlay = document.getElementById('nav-overlay');
  const body = document.body;

  function openMobileNav() {
    mobileMenuToggle.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('open');
    navOverlay.classList.add('visible');
    body.classList.add('nav-open');
  }

  function closeMobileNav() {
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('open');
    navOverlay.classList.remove('visible');
    body.classList.remove('nav-open');
  }

  function toggleMobileNav() {
    const isOpen = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  }

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', toggleMobileNav);
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', closeMobileNav);
  }

  // Close mobile nav on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('open')) {
      closeMobileNav();
    }
  });

  // Close mobile nav when clicking a link
  if (mobileNav) {
    const mobileNavLinks = mobileNav.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(function(link) {
      link.addEventListener('click', closeMobileNav);
    });
  }

  // ==========================================================================
  // Sticky Header
  // ==========================================================================
  const header = document.getElementById('site-header');
  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateHeader() {
    const scrollY = window.scrollY;

    if (header) {
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    lastScrollY = scrollY;
    ticking = false;
  }

  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  });

  // ==========================================================================
  // Smooth Scroll for Anchor Links
  // ==========================================================================
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Update URL hash without jumping
        history.pushState(null, null, targetId);
      }
    });
  });

  // ==========================================================================
  // Scroll Animations (Intersection Observer)
  // ==========================================================================
  const animatedElements = document.querySelectorAll('[data-animate]');

  if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    };

    const animationObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          animationObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach(function(el) {
      animationObserver.observe(el);
    });
  }

  // Staggered children animation
  const staggerContainers = document.querySelectorAll('.stagger-children');

  if (staggerContainers.length > 0 && 'IntersectionObserver' in window) {
    const staggerObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          staggerObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    staggerContainers.forEach(function(el) {
      staggerObserver.observe(el);
    });
  }

  // ==========================================================================
  // Copy to Clipboard Utility
  // ==========================================================================
  window.copyToClipboard = function(text, successMessage) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function() {
        showToast(successMessage || 'Copied to clipboard!');
      }).catch(function(err) {
        console.error('Failed to copy:', err);
        fallbackCopyToClipboard(text, successMessage);
      });
    } else {
      fallbackCopyToClipboard(text, successMessage);
    }
  };

  function fallbackCopyToClipboard(text, successMessage) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
      showToast(successMessage || 'Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }

    document.body.removeChild(textArea);
  }

  // ==========================================================================
  // Toast Notifications
  // ==========================================================================
  function showToast(message, duration) {
    duration = duration || 3000;

    // Remove existing toast if any
    const existingToast = document.querySelector('.toast.show');
    if (existingToast) {
      existingToast.classList.remove('show');
    }

    // Find or create toast element
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast';
      toast.setAttribute('role', 'alert');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }

    toast.textContent = message;

    // Trigger reflow for animation
    void toast.offsetWidth;

    toast.classList.add('show');

    setTimeout(function() {
      toast.classList.remove('show');
    }, duration);
  }

  window.showToast = showToast;

  // ==========================================================================
  // External Link Handler
  // ==========================================================================
  document.querySelectorAll('a[href^="http"]').forEach(function(link) {
    if (!link.href.includes(window.location.hostname)) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });

  // ==========================================================================
  // Initialize on DOM Ready
  // ==========================================================================
  // Initial header state
  updateHeader();

  // Log initialization
  console.log('Orlando Code Camp website initialized');
})();
