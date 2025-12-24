// Mobile menu toggle
document.addEventListener("DOMContentLoaded", () => {
  // Demo modal functionality
  const demoModal = document.getElementById("demo-modal");
  const demoBtns = [
    document.getElementById("demo-btn"),
    document.getElementById("demo-btn-mobile"),
  ];
  const closeModal = document.getElementById("close-modal");
  const demoForm = document.getElementById("demo-form");

  // Open modal
  demoBtns.forEach((btn) => {
    if (btn) {
      btn.addEventListener("click", () => {
        demoModal.classList.remove("hidden");
        document.body.style.overflow = "hidden";
      });
    }
  });

  // Close modal
  if (closeModal) {
    closeModal.addEventListener("click", () => {
      demoModal.classList.add("hidden");
      document.body.style.overflow = "auto";
    });
  }

  // Close modal on backdrop click
  if (demoModal) {
    demoModal.addEventListener("click", (e) => {
      if (e.target === demoModal) {
        demoModal.classList.add("hidden");
        document.body.style.overflow = "auto";
      }
    });
  }

  // Handle form submission
  if (demoForm) {
    demoForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(demoForm);
      const data = Object.fromEntries(formData);
      // console.log("Demo request submitted:", data);
      alert("Thank you for your interest! We will contact you shortly.");
      demoModal.classList.add("hidden");
      document.body.style.overflow = "auto";
      demoForm.reset();
    });
  }

  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
      const isExpanded = mobileMenu.classList.contains("hidden")
        ? "false"
        : "true";
      mobileMenuBtn.setAttribute("aria-expanded", isExpanded);
    });
  }

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
        animationObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe animated elements after DOM loads
  const animatedElements = document.querySelectorAll(
    ".scroll-animate, .slide-left, .slide-right, .scale-in"
  );
  animatedElements.forEach((el) => animationObserver.observe(el));

  const animateCounter = (element) => {
    const target = Number.parseFloat(element.getAttribute("data-target"));
    const suffix = element.getAttribute("data-suffix") || "";
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        if (suffix === "K+") {
          element.textContent = Math.floor(current);
        } else {
          element.textContent = current.toFixed(suffix === "%" ? 1 : 0);
        }
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target + (suffix === "%" ? "" : "");
      }
    };
    updateCounter();
  };

  // Start counter animation when visible
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll(".counter").forEach((counter) => {
    counterObserver.observe(counter);
  });

  const testimonials = [
    {
      quote:
        "ETNS School Management System has revolutionized how we manage our institution. The automated attendance and real-time parent communication features have saved us countless hours.",
      author: "Dr. Rajesh Kumar",
      position: "Principal, Delhi Public School",
      rating: 5,
    },
    {
      quote:
        "The mobile app is incredibly user-friendly. Parents love being able to track their child's progress in real-time. It's made parent-teacher communication so much more efficient.",
      author: "Priya Sharma",
      position: "Administrator, St. Xavier's Academy",
      rating: 5,
    },
    {
      quote:
        "Implementation was seamless and the support team was exceptional. We went from manual processes to a fully digital system in just 2 weeks. Highly recommended!",
      author: "Amit Patel",
      position: "Director, Bright Future International School",
      rating: 5,
    },
  ];

  const testimonialCarousel = document.getElementById("testimonial-carousel");
  const testimonialDots = document.getElementById("testimonial-dots");
  let currentTestimonial = 0;

  if (testimonialCarousel && testimonialDots) {
    // Create testimonial slides
    testimonials.forEach((testimonial, index) => {
      const slide = document.createElement("div");
      slide.className = "carousel-slide px-4";
      slide.innerHTML = `
        <div class="bg-white p-8 rounded-xl shadow-lg">
          <div class="flex gap-1 mb-4">
            ${Array(testimonial.rating)
              .fill(
                '<svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>'
              )
              .join("")}
          </div>
          <p class="text-gray-700 text-lg mb-6 italic leading-relaxed">"${
            testimonial.quote
          }"</p>
          <div class="border-t pt-4">
            <p class="font-bold text-gray-900">${testimonial.author}</p>
            <p class="text-gray-600 text-sm">${testimonial.position}</p>
          </div>
        </div>
      `;
      testimonialCarousel.appendChild(slide);

      // Create dots
      const dot = document.createElement("button");
      dot.className = `w-3 h-3 rounded-full transition-all ${
        index === 0 ? "bg-primary w-8" : "bg-gray-300"
      }`;
      dot.onclick = () => goToTestimonial(index);
      testimonialDots.appendChild(dot);
    });

    const updateCarousel = () => {
      testimonialCarousel.style.transform = `translateX(-${
        currentTestimonial * 100
      }%)`;

      // Update dots
      testimonialDots.querySelectorAll("button").forEach((dot, index) => {
        if (index === currentTestimonial) {
          dot.className = "w-8 h-3 rounded-full bg-primary transition-all";
        } else {
          dot.className = "w-3 h-3 rounded-full bg-gray-300 transition-all";
        }
      });
    };

    const goToTestimonial = (index) => {
      currentTestimonial = index;
      updateCarousel();
    };

    document.getElementById("prev-testimonial").onclick = () => {
      currentTestimonial =
        (currentTestimonial - 1 + testimonials.length) % testimonials.length;
      updateCarousel();
    };

    document.getElementById("next-testimonial").onclick = () => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      updateCarousel();
    };

    // Auto-advance carousel every 5 seconds
    setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      updateCarousel();
    }, 5000);
  }

  const faqs = [
    {
      question: "How long does implementation take?",
      answer:
        "Implementation typically takes 1-2 weeks depending on your institution size. Our team provides full support during onboarding including data migration, staff training, and system configuration.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. We use bank-grade 256-bit encryption, regular automated backups, and comply with all data protection regulations. Your data is stored on secure cloud servers with 99.9% uptime guarantee.",
    },
    {
      question: "Do you provide training?",
      answer:
        "Yes! We provide comprehensive training for all user roles including administrators, teachers, and staff. Training includes video tutorials, documentation, and live sessions. We also offer ongoing support.",
    },
    {
      question: "Can I access the system on mobile?",
      answer:
        "Yes, we offer native mobile apps for iOS and Android, plus a fully responsive web interface. You can access all features from any device, anywhere, anytime.",
    },
    {
      question: "What about data migration?",
      answer:
        "Our team handles complete data migration from your existing system at no extra cost. We ensure zero data loss and minimal disruption to your operations during the transition.",
    },
  ];

  const faqAccordion = document.getElementById("faq-accordion");

  if (faqAccordion) {
    faqs.forEach((faq, index) => {
      const item = document.createElement("div");
      item.className = "bg-white rounded-lg shadow-md overflow-hidden";
      item.innerHTML = `
        <button class="faq-button w-full text-left px-6 py-5 flex justify-between items-center hover:bg-gray-50 transition-colors" data-index="${index}">
          <span class="font-semibold text-gray-900 text-lg pr-4">${faq.question}</span>
          <svg class="faq-icon w-6 h-6 text-primary transform transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        <div class="faq-answer max-h-0 overflow-hidden transition-all duration-300">
          <div class="px-6 py-4 text-gray-600 leading-relaxed">
            ${faq.answer}
          </div>
        </div>
      `;
      faqAccordion.appendChild(item);
    });

    // FAQ accordion interaction
    document.querySelectorAll(".faq-button").forEach((button) => {
      button.addEventListener("click", () => {
        const answer = button.nextElementSibling;
        const icon = button.querySelector(".faq-icon");
        const isOpen =
          answer.style.maxHeight && answer.style.maxHeight !== "0px";

        // Close all other answers
        document.querySelectorAll(".faq-answer").forEach((a) => {
          a.style.maxHeight = "0px";
        });
        document.querySelectorAll(".faq-icon").forEach((i) => {
          i.style.transform = "rotate(0deg)";
        });

        // Toggle current answer
        if (!isOpen) {
          answer.style.maxHeight = answer.scrollHeight + "px";
          icon.style.transform = "rotate(180deg)";
        }
      });
    });
  }

  const ctaDemoBtn = document.getElementById("cta-demo-btn");
  if (ctaDemoBtn) {
    ctaDemoBtn.addEventListener("click", () => {
      demoModal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    });
  }
});
