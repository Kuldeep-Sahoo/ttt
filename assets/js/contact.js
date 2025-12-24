// Contact form handling
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        institution: document.getElementById("institution").value,
        service: document.getElementById("service").value,
        message: document.getElementById("message").value,
      }

      // Here you would typically send the data to a server
      // console.log("[v0] Form submitted with data:", formData)

      // Show success message
      alert("Thank you for your message! Our team will contact you within 24 hours.")

      // Reset form
      contactForm.reset()
    })
  }
})
