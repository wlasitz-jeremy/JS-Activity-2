// import pulls in exported values from another JS file
import { characters } from "./characters.js";

// -- Challenge 1: Mobile Nav Toggle --

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

// TODO: Toggle 'is-open' on navMenu when navToggle is clicked
// TODO: Close the menu when clicking outside of it — look up element.contains()
// TODO: Close the menu on window resize when viewport reaches desktop width

// -- Challenge 2: Image Carousel --

const carouselTrack = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".carousel-slide");
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");
const dotsContainer = document.querySelector(".carousel-dots");

// TODO: Track the current slide index (start at 0)
// TODO: Write showSlide(index) — move the track with translateX, keep index in bounds
// TODO: Wire up prevBtn and nextBtn clicks to call showSlide with the updated index
// Extra: generate a dot button per slide inside dotsContainer, keep the active dot in sync

// -- Challenge 3: Username Validation --

const usernameForm = document.querySelector("#username-form");
const usernameInput = document.querySelector("#username-input");
const validationMsg = document.querySelector("#username-validation");

// Rules: no leading numbers, no spaces, no special characters (@ # $ % & * ! ?)
// TODO: Listen for the 'submit' event — call event.preventDefault()
// TODO: Validate the input value and update validationMsg with an error or success class
// Extra: replace spaces with hyphens before validating and show the corrected value

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
// TODO: Call renderCards(characters) on load
// TODO: getFiltered() — return characters matching any checked attribute (all if none checked)
// TODO: getSorted(list) — return a sorted copy based on sortSelect value (don't mutate the original)
// TODO: Re-render on checkbox change and sort change: renderCards(getSorted(getFiltered()))
