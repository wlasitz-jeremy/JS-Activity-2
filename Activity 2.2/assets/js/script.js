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
let currentIndex = 0;
// TODO: Write showSlide(index) — move the track with translateX, keep index in bounds
const showSlide = (index) => {
  const previousIndex = currentIndex;
  currentIndex = ((index % slides.length) + slides.length) % slides.length;
  const isWrapping =
    (previousIndex === slides.length - 1 && currentIndex === 0) ||
    (previousIndex === 0 && currentIndex === slides.length - 1);
  if (isWrapping) {
    carouselTrack.style.transition = "none";
  }
  carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
  if (isWrapping) {
    carouselTrack.offsetHeight;
    carouselTrack.style.transition = "";
  }
  // dots indicator
  updateDots();
};
// TODO: Wire up prevBtn and nextBtn clicks to call showSlide with the updated index
prevBtn.addEventListener("click", () => {
  showSlide(currentIndex - 1);
});
nextBtn.addEventListener("click", () => {
  showSlide(currentIndex + 1);
});
// Extra: generate a dot button per slide inside dotsContainer, keep the active dot in sync
slides.forEach((slide, index) => {
  const dot = document.createElement("button");
  dot.classList.add("carousel-dot");
  dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
  dot.addEventListener("click", () => {
    showSlide(index);
  });
  dotsContainer.appendChild(dot);
});
const updateDots = () => {
  const dots = dotsContainer.querySelectorAll(".carousel-dot");
  dots.forEach((dot, index) => {
    if (index === currentIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
};
updateDots();

// -- Challenge 3: Username Validation --

const usernameForm = document.querySelector("#username-form");
const usernameInput = document.querySelector("#username-input");
const validationMsg = document.querySelector("#username-validation");
// Rules: no leading numbers, no spaces, no special characters (@ # $ % & * ! ?)
// TODO: Listen for the 'submit' event — call event.preventDefault()
// TODO: Validate the input value and update validationMsg with an error or success class
// Extra: replace spaces with hyphens before validating and show the corrected value

const hasNoSpecialChars = (str) => /^[a-zA-Z0-9_-]+$/.test(str);

const validateUsername = (username) => {
  if (!hasNoSpecialChars(username))
    return {
      valid: false,
      reason: "username cannot contain special characters",
    };
  return { valid: true, reason: null };
};

usernameForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // access the text information trim space on the ends
  const inputText = usernameInput.value.trim();

  // replace all spaces with _  **USE CASE ISSUE: What if they put in lots of spaces in a row ?? TODO SOLVE IN REFACTOR
  let outputText = inputText.replaceAll(" ", "_");
  usernameInput.value = outputText;

  // access input field and show the updated name accordingly
  // EVALUATE CONDITIONS
  // error if starting with a number
  if (startsWithNumber) {
    // Show validator message
    showValidation("Username cannot start with a number", "error");
    return;
  }

  // get result of running tests
  // if tests don't pass, send error info accordingly
  // follow up space error (in case something got past for whatever reason)
  const hasSpaces = /\s/.test(outputText);
  if (hasSpaces) {
    showValidation("Username cannot contain spaces", "error");
    return;
  }

  const result = validateUsername(outputText);

  if (!result.valid) {
    showValidation(result.reason, "error");
    return;
  }
  // show validation message
  showValidation(`Username: ${outputText} is valid!`, "success");
});

// helper function to show message
function showValidation(message, type) {
  validationMsg.textContent = message;
  validationMsg.classList.remove("error", "success");
  validationMsg.classList.add(type);
}

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
