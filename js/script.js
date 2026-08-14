/**
 * ICON Estate & Property Managers - Master Application Engine
 * Unified JavaScript Architecture for Navigation, Scroll Reveal, Form Systems & Interactions
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. DOM Elements & State Definitions
    // ==========================================================================
    const siteHeader = document.getElementById('site-header');
    const hamburgerToggle = document.getElementById('hamburger-toggle');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    const mobileNavClose = document.getElementById('mobile-nav-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-link');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ==========================================================================
    // 2. Sticky Header Scroll Detector
    // ==========================================================================
    function handleHeaderScroll() {
        if (window.scrollY > 30) {
            if (siteHeader) siteHeader.classList.add('scrolled');
        } else {
            if (siteHeader) siteHeader.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();

    // ==========================================================================
    // 3. Mobile Navigation Drawer Controls
    // ==========================================================================
    function openMobileMenu() {
        if (mobileNavOverlay) {
            mobileNavOverlay.classList.add('active');
            mobileNavOverlay.setAttribute('aria-hidden', 'false');
            if (hamburgerToggle) hamburgerToggle.setAttribute('aria-expanded', 'true');
            document.body.classList.add('menu-open');
        }
    }

    function closeMobileMenu() {
        if (mobileNavOverlay) {
            mobileNavOverlay.classList.remove('active');
            mobileNavOverlay.setAttribute('aria-hidden', 'true');
            if (hamburgerToggle) hamburgerToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');
        }
    }

    if (hamburgerToggle) hamburgerToggle.addEventListener('click', openMobileMenu);
    if (mobileNavClose) mobileNavClose.addEventListener('click', closeMobileMenu);

    if (mobileNavOverlay) {
        mobileNavOverlay.addEventListener('click', (e) => {
            if (e.target === mobileNavOverlay) closeMobileMenu();
        });
    }

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNavOverlay && mobileNavOverlay.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // ==========================================================================
    // 4. Section-by-Section Fade-In-Up Scroll Reveal Engine
    //    • Every <section> auto-gets the reveal treatment via JS (not CSS).
    //    • Sections already in the viewport on load appear instantly (no flash).
    //    • Sections below the fold fade + slide up as they scroll into view.
    //    • .reveal-on-scroll elements inside sections also animate.
    //    • Card grids (.reveal-grid) stagger each .reveal-card by 100ms.
    // ==========================================================================
    if ('IntersectionObserver' in window && !prefersReducedMotion) {

        // ── 4a. Auto section-by-section reveal ──────────────────────────────
        const allSections = document.querySelectorAll('section');

        // Apply hidden state via JS only (never via static CSS)
        // so sections visible on page load are never blank.
        allSections.forEach(section => {
            // Skip the hero/banner — it's always above the fold
            const skipIds = ['hero', 'about-hero', 'ws-hero', 'wr-hero', 'wb-hero', 'contact-hero'];
            const skip = skipIds.includes(section.id) || section.classList.contains('hero-section');
            if (!skip) {
                section.classList.add('section-hidden');
            }
        });

        const sectionObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('section-hidden');
                    entry.target.classList.add('section-in-view');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.07,
            rootMargin: '0px 0px -30px 0px'
        });

        allSections.forEach(section => {
            if (section.classList.contains('section-hidden')) {
                sectionObserver.observe(section);
            }
        });

        // ── 4b. Individual .reveal-on-scroll elements ────────────────────────
        const revealEls = document.querySelectorAll('.reveal-on-scroll');
        if (revealEls.length > 0) {
            const elObserver = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

            revealEls.forEach(el => elObserver.observe(el));
        }

        // ── 4c. Staggered card grids (.reveal-grid > .reveal-card) ──────────
        const revealGrids = document.querySelectorAll('.reveal-grid');
        if (revealGrids.length > 0) {
            const gridObserver = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const cards = entry.target.querySelectorAll('.reveal-card');
                        cards.forEach((card, i) => {
                            setTimeout(() => card.classList.add('is-visible'), i * 110);
                        });
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

            revealGrids.forEach(grid => gridObserver.observe(grid));
        }

    } else {
        // Reduced motion / no IntersectionObserver → show everything instantly
        document.querySelectorAll('section').forEach(s => {
            s.classList.remove('section-hidden');
            s.classList.add('section-in-view');
        });
        document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-visible'));
        document.querySelectorAll('.reveal-card').forEach(el => el.classList.add('is-visible'));
    }

    // ==========================================================================
    // 5. Expandable Form System
    // ==========================================================================
    const expandableTriggers = document.querySelectorAll('#open-seller-form-btn, #final-sell-btn, .expandable-trigger');
    const expandableFormWrappers = document.querySelectorAll('#ws-seller-form, .expandable-form-wrapper');

    expandableTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = trigger.getAttribute('aria-controls') || 'ws-seller-form';
            const targetForm = document.getElementById(targetId);

            if (targetForm) {
                const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
                
                if (isExpanded) {
                    targetForm.classList.remove('is-expanded');
                    trigger.setAttribute('aria-expanded', 'false');
                } else {
                    targetForm.classList.add('is-expanded');
                    trigger.setAttribute('aria-expanded', 'true');
                    
                    // Smooth scroll into form container
                    setTimeout(() => {
                        targetForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                }
            }
        });
    });

    // ==========================================================================
    // ==========================================================================
    // 6. Global Form Validation & Anti-Spam Hardening Engine
    // ==========================================================================
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    const phoneRegex = /^[\d\s\+\-\(\)]{7,20}$/;

    // HTML Sanitizer helper to prevent DOM XSS
    function escapeHTML(str) {
        if (!str || typeof str !== 'string') return '';
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function setupFormValidation(formId, successAlertId, errorAlertId) {
        const form = document.getElementById(formId);
        if (!form) return;

        const successAlert = document.getElementById(successAlertId);
        const errorAlert = document.getElementById(errorAlertId);
        const submitBtn = form.querySelector('button[type="submit"]');

        // Record form rendering timestamp for anti-bot timing check
        const formLoadTime = Date.now();

        // Real-time input error state clearing
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                const group = input.closest('.form-group, .ws-field-group');
                if (group) group.classList.remove('has-error');
                if (errorAlert) errorAlert.classList.add('hidden');
            });
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            if (successAlert) successAlert.classList.add('hidden');
            if (errorAlert) errorAlert.classList.add('hidden');

            // 1. Anti-Bot Check: Honeypot field validation
            const honeypotField = form.querySelector('input[name="website_hp"]');
            if (honeypotField && honeypotField.value.trim() !== '') {
                // Silent drop for bot submissions
                console.warn('[Anti-Spam] Honeypot triggered.');
                form.reset();
                return;
            }

            // 2. Anti-Bot Check: Minimum submission timing check (2 seconds)
            const submissionDuration = Date.now() - formLoadTime;
            if (submissionDuration < 2000) {
                console.warn('[Anti-Spam] Fast submission blocked.');
                if (errorAlert) {
                    errorAlert.textContent = 'Submission was too fast. Please take a moment and try again.';
                    errorAlert.classList.remove('hidden');
                }
                return;
            }

            // 3. Client-side UX Rate Limiting (Max 3 submissions per 10 mins per form)
            const rateKey = `form_rate_${formId}`;
            const recentSubmissions = JSON.parse(sessionStorage.getItem(rateKey) || '[]');
            const tenMinsAgo = Date.now() - (10 * 60 * 1000);
            const validSubmissions = recentSubmissions.filter(time => time > tenMinsAgo);

            if (validSubmissions.length >= 3) {
                if (errorAlert) {
                    errorAlert.textContent = 'Too many requests. Please wait a few minutes before submitting again.';
                    errorAlert.classList.remove('hidden');
                }
                return;
            }

            // 4. Field Validation & Input Sanitization
            let isValid = true;
            let combinedMessagePayload = '';

            inputs.forEach(input => {
                if (input.name === 'website_hp') return;

                const rawVal = input.value.trim();
                const sanitizedVal = escapeHTML(rawVal);
                const group = input.closest('.form-group, .ws-field-group');
                let fieldValid = true;

                if (input.hasAttribute('required')) {
                    if (!sanitizedVal) {
                        fieldValid = false;
                    } else if (input.type === 'email') {
                        if (sanitizedVal.length > 120 || !emailRegex.test(sanitizedVal)) {
                            fieldValid = false;
                        }
                    } else if (input.type === 'tel') {
                        if (sanitizedVal.length < 7 || sanitizedVal.length > 20 || !phoneRegex.test(sanitizedVal)) {
                            fieldValid = false;
                        }
                    } else if (input.tagName.toLowerCase() === 'textarea') {
                        if (sanitizedVal.length < 10 || sanitizedVal.length > 2000) {
                            fieldValid = false;
                        }
                        combinedMessagePayload += sanitizedVal;
                    } else if (input.type === 'text') {
                        if (sanitizedVal.length < 2 || sanitizedVal.length > 100) {
                            fieldValid = false;
                        }
                    } else if (input.tagName.toLowerCase() === 'select') {
                        if (!sanitizedVal || sanitizedVal === '') {
                            fieldValid = false;
                        }
                    }
                }

                if (!fieldValid) {
                    isValid = false;
                    if (group) group.classList.add('has-error');
                } else {
                    if (group) group.classList.remove('has-error');
                }
            });

            if (!isValid) {
                if (errorAlert) {
                    errorAlert.textContent = 'Please check the highlighted fields and try again.';
                    errorAlert.classList.remove('hidden');
                }
                return;
            }

            // 5. Duplicate Submission Prevention (60 seconds)
            const dupKey = `form_dup_${formId}`;
            const lastMessage = sessionStorage.getItem(dupKey);
            if (combinedMessagePayload && lastMessage === combinedMessagePayload) {
                if (errorAlert) {
                    errorAlert.textContent = 'You have already submitted this message recently.';
                    errorAlert.classList.remove('hidden');
                }
                return;
            }

            // Disable submit button during processing
            if (submitBtn) submitBtn.disabled = true;

            // Record successful submission timing & payload
            validSubmissions.push(Date.now());
            sessionStorage.setItem(rateKey, JSON.stringify(validSubmissions));
            if (combinedMessagePayload) sessionStorage.setItem(dupKey, combinedMessagePayload);

            // Display success alert
            if (successAlert) {
                successAlert.classList.remove('hidden');
                if (successAlert.hasAttribute('hidden')) successAlert.removeAttribute('hidden');
            }

            form.reset();

            // Re-enable button after brief delay
            setTimeout(() => {
                if (submitBtn) submitBtn.disabled = false;
            }, 2000);

            // Redirect if on contact inquiry form
            if (formId === 'inquiry-form') {
                setTimeout(() => {
                    window.location.href = 'thank-you.html';
                }, 1200);
            }
        });
    }

    // Initialize all form validation instances
    setupFormValidation('inquiry-form', 'form-success-alert', 'form-error-alert');
    setupFormValidation('ws-enquiry-form', 'ws-form-success', 'ws-form-error');
    setupFormValidation('wr-requirements-form', 'wr-form-success', 'wr-form-error');

    // ==========================================================================
    // 7. Popular Properties Carousel Slider Engine (Drag, Touch, Arrows & Dots)
    // ==========================================================================
    const popularTrack = document.getElementById('popular-cards-track');
    const popularPrevBtn = document.getElementById('popular-prev-btn');
    const popularNextBtn = document.getElementById('popular-next-btn');
    const dotsWrapper = document.getElementById('popular-dots-wrapper');

    if (popularTrack) {
        const cards = popularTrack.querySelectorAll('.property-exact-card, .ws-prop-card');
        const gap = 24;

        function getScrollStep() {
            if (cards.length === 0) return 360;
            return cards[0].offsetWidth + gap;
        }

        // --- Arrow Navigation ---
        if (popularNextBtn) {
            popularNextBtn.addEventListener('click', () => {
                popularTrack.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
            });
        }

        if (popularPrevBtn) {
            popularPrevBtn.addEventListener('click', () => {
                popularTrack.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
            });
        }

        // --- Interactive Clickable Pagination Dots ---
        if (dotsWrapper && cards.length > 0) {
            dotsWrapper.innerHTML = '';
            cards.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.className = index === 0 ? 'carousel-dot active' : 'carousel-dot';
                dot.setAttribute('aria-label', `Go to slide ${index + 1}`);

                dot.addEventListener('click', () => {
                    popularTrack.scrollTo({ left: index * getScrollStep(), behavior: 'smooth' });
                });

                dotsWrapper.appendChild(dot);
            });

            popularTrack.addEventListener('scroll', () => {
                const step = getScrollStep();
                const activeIndex = Math.min(cards.length - 1, Math.max(0, Math.round(popularTrack.scrollLeft / step)));
                const dots = dotsWrapper.querySelectorAll('.carousel-dot');
                dots.forEach((dot, idx) => {
                    if (idx === activeIndex) dot.classList.add('active');
                    else dot.classList.remove('active');
                });
            }, { passive: true });
        }

        // --- Drag Scroll & Touch Swipe Controls ---
        let isDragging = false;
        let startX, scrollLeft;

        popularTrack.addEventListener('mousedown', (e) => {
            isDragging = true;
            popularTrack.classList.add('is-dragging');
            startX = e.pageX - popularTrack.offsetLeft;
            scrollLeft = popularTrack.scrollLeft;
        });

        popularTrack.addEventListener('mouseleave', () => {
            isDragging = false;
            popularTrack.classList.remove('is-dragging');
        });

        popularTrack.addEventListener('mouseup', () => {
            isDragging = false;
            popularTrack.classList.remove('is-dragging');
        });

        popularTrack.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - popularTrack.offsetLeft;
            const walk = (x - startX) * 1.6;
            popularTrack.scrollLeft = scrollLeft - walk;
        });
    }

    // ==========================================================================
    // 7b. Interactive Property Listings Tab Filter Engine
    // ==========================================================================
    const filterTabs = document.querySelectorAll('.listing-tab-btn');
    const listingCards = document.querySelectorAll('.listings-grid-container .ws-prop-card, #ws-listings .ws-prop-card');

    if (filterTabs.length > 0 && listingCards.length > 0) {
        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                filterTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const filterCategory = tab.getAttribute('data-filter') || 'all';

                listingCards.forEach(card => {
                    const cardCat = card.getAttribute('data-category') || '';
                    if (filterCategory === 'all' || cardCat.includes(filterCategory)) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(15px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 250);
                    }
                });
            });
        });
    }

    // ==========================================================================
    // 8. Founder Stats Counter Animation
    // ==========================================================================
    if (!prefersReducedMotion) {
        function animateCount(el) {
            const target = +el.getAttribute('data-count');
            const from = el.hasAttribute('data-from') ? +el.getAttribute('data-from') : 0;
            const prefix = el.getAttribute('data-prefix') || '';
            const suffix = el.getAttribute('data-suffix') || '';
            const decimals = +(el.getAttribute('data-decimals') || 0);
            const duration = decimals > 0 ? 1600 : 1400;
            let start = null;

            function step(ts) {
                if (!start) start = ts;
                const progress = Math.min((ts - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const value = from + eased * (target - from);
                const done = progress >= 1;
                el.textContent = prefix + (done ? target.toFixed(decimals).replace(/\.0$/, '') : value.toFixed(decimals)) + suffix;
                if (!done) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
        }

        const countEls = document.querySelectorAll('.aw-count[data-count]');
        if (countEls.length > 0 && 'IntersectionObserver' in window) {
            const countObserver = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCount(entry.target);
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });

            countEls.forEach(el => countObserver.observe(el));
        }
    }

    // ==========================================================================
    // 9. FAQ Accordion Engine
    // ==========================================================================
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question-btn');
        if (questionBtn) {
            questionBtn.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    const btn = otherItem.querySelector('.faq-question-btn');
                    if (btn) btn.setAttribute('aria-expanded', 'false');
                });

                if (!isActive) {
                    item.classList.add('active');
                    questionBtn.setAttribute('aria-expanded', 'true');
                }
            });
        }
    });

    // ==========================================================================
    // 10. Floating Back-to-Top Button
    // ==========================================================================
    const backToTopBtn = document.getElementById('back-to-top-btn');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }, { passive: true });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==========================================================================
    // 11. Interactive Office Map Switcher Engine
    // ==========================================================================
    const mapHubCards = document.querySelectorAll('.map-hub-card');
    const mapIframe = document.querySelector('.map-frame-box iframe');

    if (mapHubCards.length > 0 && mapIframe) {
        mapHubCards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('a[target="_blank"]')) return;

                mapHubCards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');

                const newMapSrc = card.getAttribute('data-map-src');
                if (newMapSrc) {
                    mapIframe.src = newMapSrc;
                }
            });
        });
    // ==========================================================================
    // 12. Neighborhood Directory Search Filter Engine
    // ==========================================================================
    const locationInput = document.getElementById('location-search-input');
    const locationChips = document.querySelectorAll('.neighborhoods-grid .location-chip');

    if (locationInput && locationChips.length > 0) {
        locationInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            locationChips.forEach(chip => {
                const text = chip.textContent.toLowerCase();
                if (text.includes(query)) {
                    chip.style.display = 'flex';
                } else {
                    chip.style.display = 'none';
                }
            });
        });
    }

});

