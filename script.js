/**
 * PROTINUT FOODS - Classy Crunch Product Information Website
 * Vanilla JavaScript Implementation
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const header = document.getElementById('site-header');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const backToTopBtn = document.getElementById('back-to-top');
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  /* ==========================================
     1. Mobile Drawer Navigation Toggle
     ========================================== */
  function toggleMobileMenu() {
    const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
    hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
    hamburgerBtn.classList.toggle('active');
    
    mobileDrawer.classList.toggle('open');
    mobileDrawer.setAttribute('aria-hidden', isExpanded);
  }

  function closeMobileMenu() {
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    hamburgerBtn.classList.remove('active');
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
  }

  if (hamburgerBtn && mobileDrawer) {
    hamburgerBtn.addEventListener('click', toggleMobileMenu);

    // Close menu when clicking any nav link
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && mobileDrawer.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  }

  /* ==========================================
     2. Sticky Header & Back-to-Top Scroll Observer
     ========================================== */
  function handleScroll() {
    const scrollY = window.scrollY || window.pageYOffset;

    // Header elevation
    if (scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // Initial scroll check
  handleScroll();

  /* ==========================================
     3. Back to Top Smooth Click
     ========================================== */
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================
     4. FAQ Accordion Logic
     ========================================== */
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const accordionItem = header.parentElement;
      const isCurrentlyActive = accordionItem.classList.contains('active');

      // Optional: Close all other accordion items first
      document.querySelectorAll('.accordion-item').forEach(item => {
        if (item !== accordionItem) {
          item.classList.remove('active');
          const itemHeader = item.querySelector('.accordion-header');
          if (itemHeader) itemHeader.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle clicked accordion item
      if (isCurrentlyActive) {
        accordionItem.classList.remove('active');
        header.setAttribute('aria-expanded', 'false');
      } else {
        accordionItem.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ==========================================
     5. Smooth Scroll Offset for Anchor Links
     ========================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ==========================================
     6. Product Gallery View Switcher
     ========================================== */
  const galleryMainImg = document.getElementById('product-hero-image');
  const galleryTabs = document.querySelectorAll('.gallery-tab');
  const mainImageWrapper = document.getElementById('main-image-wrapper');

  let currentViewTitle = "PROTINUT Classy Crunch – Front View";

  if (galleryMainImg && galleryTabs.length > 0) {
    galleryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active from all tabs
        galleryTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const newImgSrc = tab.getAttribute('data-view-img');
        const viewTitle = tab.getAttribute('data-view-title');

        if (newImgSrc && galleryMainImg) {
          galleryMainImg.style.opacity = '0';
          setTimeout(() => {
            galleryMainImg.src = newImgSrc;
            galleryMainImg.alt = viewTitle || 'PROTINUT Product View';
            currentViewTitle = viewTitle || 'PROTINUT Product View';
            galleryMainImg.style.opacity = '1';
          }, 150);
        }
      });
    });
  }

  /* ==========================================
     7. Lightbox Image Modal
     ========================================== */
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxOverlay = document.getElementById('lightbox-overlay');

  function openLightbox(imgSrc, title) {
    if (!lightboxModal || !lightboxImg) return;
    lightboxImg.src = imgSrc;
    lightboxImg.alt = title || 'Product Detail View';
    if (lightboxTitle) lightboxTitle.textContent = title || 'PROTINUT Peanut Butter – Classy Crunch';
    
    lightboxModal.classList.add('open');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('open');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Hero main image click to zoom
  if (mainImageWrapper) {
    mainImageWrapper.addEventListener('click', () => {
      const currentSrc = galleryMainImg ? galleryMainImg.src : 'images/product-front.jpg';
      openLightbox(currentSrc, currentViewTitle);
    });
  }

  // Clickable zoom elements in sections
  document.querySelectorAll('.clickable-zoom').forEach(elem => {
    elem.addEventListener('click', () => {
      const src = elem.getAttribute('data-zoom-src') || elem.querySelector('img')?.src;
      const title = elem.getAttribute('data-zoom-title') || 'PROTINUT Packaging Detail View';
      if (src) openLightbox(src, title);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('open')) {
      closeLightbox();
    }
  });
});

