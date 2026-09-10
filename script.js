(function() {
            'use strict';

            // ---- NAV ACTIVE LINK ----
            const navLinks = document.querySelectorAll('.nav-link');
            const sections = document.querySelectorAll('section[id]');

            function updateActiveLink() {
                let current = '';
                const scrollY = window.scrollY + 100;
                sections.forEach(section => {
                    const top = section.offsetTop;
                    const height = section.offsetHeight;
                    if (scrollY >= top && scrollY < top + height) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + current) {
                        link.classList.add('active');
                    }
                });
            }

            window.addEventListener('scroll', updateActiveLink);
            window.addEventListener('load', updateActiveLink);

            // ---- HAMBURGER ----
            const hamburger = document.getElementById('hamburger');
            const navList = document.getElementById('navLinks');

            if (hamburger && navList) {
                hamburger.addEventListener('click', function() {
                    this.classList.toggle('active');
                    navList.classList.toggle('open');
                });

                navLinks.forEach(link => {
                    link.addEventListener('click', function() {
                        hamburger.classList.remove('active');
                        navList.classList.remove('open');
                    });
                });
            }

            // ---- INTERSECTION OBSERVER (fade-in) ----
            const fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .fade-in-up');

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('show');
                    }
                });
            }, {
                threshold: 0.15,
                rootMargin: '0px 0px -40px 0px'
            });

            fadeElements.forEach(el => observer.observe(el));

            // ---- SMOOTH SCROLL ----
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    const target = document.querySelector(targetId);
                    if (target) {
                        e.preventDefault();
                        const offsetTop = target.offsetTop - 80;
                        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                    }
                });
            });

            // ============================================================
            //  PROJECTS CAROUSEL — SWIPER
            //  Shows 1 active item centered + previews of prev/next
            // ============================================================
            const swiperEl = document.querySelector('.projectSwiper');
            if (swiperEl) {
                // Determine slides per view based on screen width
                let slidesPerView = 3;
                let spaceBetween = 20;

                if (window.innerWidth < 480) {
                    slidesPerView = 1.2;
                    spaceBetween = 12;
                } else if (window.innerWidth < 640) {
                    slidesPerView = 1.4;
                    spaceBetween = 14;
                } else if (window.innerWidth < 768) {
                    slidesPerView = 1.8;
                    spaceBetween = 16;
                } else if (window.innerWidth < 1024) {
                    slidesPerView = 2.2;
                    spaceBetween = 18;
                }

                const swiper = new Swiper('.projectSwiper', {
                    slidesPerView: slidesPerView,
                    centeredSlides: true,
                    spaceBetween: spaceBetween,
                    loop: true,
                    grabCursor: true,
                    speed: 600,

                    // Auto-play
                    autoplay: {
                        delay: 4500,
                        disableOnInteraction: true,
                        pauseOnMouseEnter: true,
                    },

                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },

                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },

                    // Responsive breakpoints
                    breakpoints: {
                        480: {
                            slidesPerView: 1.4,
                            spaceBetween: 14,
                        },
                        640: {
                            slidesPerView: 1.8,
                            spaceBetween: 16,
                        },
                        768: {
                            slidesPerView: 2.2,
                            spaceBetween: 18,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        1200: {
                            slidesPerView: 3,
                            spaceBetween: 24,
                        },
                    },

                    // On slide change, ensure proper scaling
                    on: {
                        slideChangeTransitionStart: function() {
                            // Reset any inline styles that might interfere
                            this.slides.forEach(slide => {
                                slide.style.transition =
                                'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                            });
                        },
                        resize: function() {
                            // Recalculate on resize
                            this.update();
                        }
                    }
                });

                // Expose for debugging
                window._projectSwiper = swiper;

                // Pause autoplay on hover over the entire carousel wrapper
                const wrapper = swiperEl.closest('.project-swiper-wrapper');
                if (wrapper) {
                    wrapper.addEventListener('mouseenter', () => {
                        if (swiper.autoplay) swiper.autoplay.stop();
                    });
                    wrapper.addEventListener('mouseleave', () => {
                        if (swiper.autoplay) swiper.autoplay.start();
                    });
                }
            }

        })();
