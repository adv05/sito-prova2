let currentSlide = 0; // Track the active slide index
const slides = document.querySelector(".slides");
const totalSlides = document.querySelectorAll(".slide").length;
let isSliding = false; // Prevent overlapping transitions

let autoSlideTimeout; // Timer to pause auto-slide after manual interaction
let autoSlideInterval; // Interval for automatic sliding
const autoSlideDelay = 3000; // Time between slides (3 seconds)

// Update the slider position and active indicator
function updateSlider() {
  // Move the slides container
  const offset = currentSlide * -100; // Calculate offset percentage
  slides.style.transform = `translateX(${offset}%)`;

  // Update the active class on the dots
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

// Move to the next or previous slide
function changeSlide(direction) {
  // Prevent overlapping slide actions
  if (isSliding) return;
  isSliding = true;

  currentSlide += direction;

  // Wrap around if out of bounds
  if (currentSlide < 0) {
    currentSlide = totalSlides - 1; // Go to the last slide
  } else if (currentSlide >= totalSlides) {
    currentSlide = 0; // Go to the first slide
  }

  // Update the slider
  updateSlider();

  // Allow new slide actions after the animation completes
  setTimeout(() => {
    isSliding = false;
  }, 500); // Match the CSS transition duration

  // Reset the auto-slide timer
  resetAutoSlide();
}

// Jump directly to a specific slide via indicators
function goToSlide(index) {
  if (isSliding) return; // Block mid-animation jumps
  currentSlide = index;
  updateSlider();

  // Reset the auto-slide timer
  resetAutoSlide();
}

// Auto-slide functionality
function autoSlide() {
  changeSlide(1); // Move to the next slide
}

function startAutoSlide() {
  // Start the interval only if it hasn't been set
  if (!autoSlideInterval) {
    autoSlideInterval = setInterval(autoSlide, autoSlideDelay);
  }
}

function stopAutoSlide() {
  // Clear both the interval and timeout
  clearInterval(autoSlideInterval);
  autoSlideInterval = null; // Reset the interval variable
}

function resetAutoSlide() {
  stopAutoSlide(); // Stop any ongoing auto-slide
  clearTimeout(autoSlideTimeout); // Clear any pending timeout
  autoSlideTimeout = setTimeout(() => {
    startAutoSlide(); // Restart auto-slide after the delay
  }, autoSlideDelay); // Wait 5 seconds before restarting auto-slide
}

// Initialize the slider and set the first dot as active
document.addEventListener("DOMContentLoaded", () => {
  updateSlider();
  startAutoSlide(); // Start the auto-slide on page load
});

// Event listeners for manual controls
document.querySelector(".prev").addEventListener("click", () => changeSlide(-1));
document.querySelector(".next").addEventListener("click", () => changeSlide(1));

// Add event listener for keyboard navigation
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      changeSlide(1); // Move to the next slide
    } else if (event.key === "ArrowLeft") {
      changeSlide(-1); // Move to the previous slide
    }
  });


// JavaScript to toggle the mobile menu
document.querySelector(".menu-toggle").addEventListener("click", () => {
    const navList = document.querySelector(".nav-list");
    navList.classList.toggle("active"); // Toggle the "active" class to show/hide the menu
  });