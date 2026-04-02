// import pulls in exported values from another JS file
import { characters } from "./characters.js";

// -- Challenge 1: Mobile Nav Toggle --
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

// TODO: Toggle 'is-open' on navMenu when navToggle is clicked
navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("is-open");
});

// TODO: Close the menu when clicking outside of it — look up element.contains()
window.addEventListener("click", (event) => {
  if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
    navMenu.classList.remove("is-open");
  }
});

// TODO: Close the menu on window resize when viewport reaches desktop width
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    navMenu.classList.remove("is-open");
  }
});

// -- Challenge 2: Image Carousel --
const carouselTrack = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".carousel-slide");
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");
const dotsContainer = document.querySelector(".carousel-dots");

// TODO: Track the current slide index (start at 0)
let currentSlide = 0;

// TODO: Write showSlide(index) — move the track with translateX, keep index in bounds
const showSlide = (index) => {
  currentSlide = index;
  carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
};

// TODO: Wire up prevBtn and nextBtn clicks to call showSlide with the updated index
prevBtn.addEventListener("click", () => {
  showSlide((currentSlide - 1 + slides.length) % slides.length);
});
nextBtn.addEventListener("click", () => {
  showSlide((currentSlide + 1) % slides.length);
});

// Extra: generate a dot button per slide inside dotsContainer, keep the active dot in sync
dotsContainer.innerHTML = slides
  .map(
    (_, i) =>
      `<button class="dot${i === 0 ? " active" : ""}" data-index="${i}"></button>`,
  )
  .join("");

// -- Challenge 3: Username Validation --
const usernameForm = document.querySelector("#username-form");
const usernameInput = document.querySelector("#username-input");
const validationMsg = document.querySelector("#username-validation");

// Rules: no leading numbers, no spaces, no special characters (@ # $ % & * ! ?)
// TODO: Listen for the 'submit' event — call event.preventDefault()
usernameForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // TODO: Validate the input value and update validationMsg with an error or success class
  const rawValue = usernameInput.value;
  const correctedValue = rawValue.replace(/\s+/g, "-");
  usernameInput.value = correctedValue;

  // Extra: replace spaces with hyphens before validating and show the corrected value
  const isValid = /^[a-zA-Z][a-zA-Z0-9-]*$/.test(correctedValue);
  if (isValid) {
    validationMsg.textContent = "Username is valid!";
    validationMsg.classList.remove("error");
    validationMsg.classList.add("success");
  } else {
    validationMsg.textContent =
      "Invalid username. Must start with a letter and contain only letters, numbers, or hyphens.";
    validationMsg.classList.remove("success");
    validationMsg.classList.add("error");
  }
});

// -- Challenge 4: Character Filter & Sort --
const cardContainer = document.querySelector("#character-grid");
const sortSelect = document.querySelector("#sort-select");
const filterCheckboxes = document.querySelectorAll(".filter-checkbox");

// Each card should produce this structure:
//
// <article class="character-card">
//   <h3>Name</h3>
//   <p class="age">Age: 30</p>
//   <p class="description">...</p>
//   <div class="tags">
//     <span class="tag">magical</span>
//     <span class="tag">adult</span>
//   </div>
// </article>

// TODO: renderCards(list) — clear cardContainer and build a card for each item in the list
const renderCards = (list) => {
  cardContainer.textContent = "";
  list.forEach((character) => {
    const card = document.createElement("article");
    card.classList.add("character-card");
    card.innerHTML = `
      <h3>${character.name}</h3>
      <p class="age">Age: ${character.age}</p>
        <p class="description">${character.description}</p>
        <div class="tags">
          ${character.tags
            .map((tag) => `<span class="tag">${tag}</span>`)
            .join("")}
        </div>
    `;
    cardContainer.appendChild(card);
  });
};

// TODO: Call renderCards(characters) on load
renderCards(characters);

// TODO: getFiltered() — return characters matching any checked attribute (all if none checked)
const getFiltered = () => {
  const checkedTags = Array.from(filterCheckboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);
  if (checkedTags.length === 0) {
    return characters;
  }
  return characters.filter((character) =>
    character.tags.some((tag) => checkedTags.includes(tag)),
  );
};

// TODO: getSorted(list) — return a sorted copy based on sortSelect value (don't mutate the original)
const getSorted = (list) => {
  const sortBy = sortSelect.value;
  const sortedList = [...list];
  if (sortBy === "name") {
    sortedList.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "age") {
    sortedList.sort((a, b) => a.age - b.age);
  }
  return sortedList;
};

// TODO: Re-render on checkbox change and sort change: renderCards(getSorted(getFiltered()))
filterCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    renderCards(getSorted(getFiltered()));
  });
});
sortSelect.addEventListener("change", () => {
  renderCards(getSorted(getFiltered()));
});
