// Animate timeline items with intersection observer
const timelineItems = document.querySelectorAll(".timeline-item");

const timelineObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Stop observing after visible
      }
    });
  },
  {
    threshold: 0.1,
  }
);

timelineItems.forEach((item) => {
  // Add animation direction class
  if (item.classList.contains("left")) {
    item.classList.add("animate", "left");
  } else if (item.classList.contains("right")) {
    item.classList.add("animate", "right");
  }
  timelineObserver.observe(item);
});

// Toggle mobile menu
function toggleMenu() {
  const nav = document.getElementById("navbar");
  nav.classList.toggle("show");
}

// Animate hidden elements (other than timeline items)
const hiddenObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target); // Stop observing
      }
    });
  },
  {
    threshold: 0.3,
  }
);

document
  .querySelectorAll(".hidden")
  .forEach((el) => hiddenObserver.observe(el));

// Initialize AOS animations
AOS.init({
  duration: 1000, // Animation duration in ms
  once: true, // Animation occurs only once
});

function loadPage(event, pageUrl) {
  event.preventDefault();
  fetch(pageUrl)
    .then((response) => response.text())
    .then((data) => {
      // replace all content in content-area with new content
      document.getElementById("content-area").innerHTML = ""; // remove old
      document.getElementById("content-area").innerHTML = data; // set new
      window.history.pushState({}, "", pageUrl); // change browser URL
    })
    .catch((err) => console.error("Failed to load page:", err));
}

window.addEventListener("popstate", () => {
  const path = window.location.pathname.slice(1);
  if (path) {
    fetch(path)
      .then((response) => response.text())
      .then((data) => {
        document.getElementById("content-area").innerHTML = data;
      });
  }
});

