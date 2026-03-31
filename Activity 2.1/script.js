"use strict";

/* ----- Example 1 ----- */

// select DOM nodes
const toggleBtn = document.getElementById("toggle-btn");
const toggleStatus = document.getElementById("toggle-status");

// create an event listener and attach it to the button
toggleBtn.addEventListener("click", () => {
  // toggle the class is active on the button
  const isActiveToggle = toggleBtn.classList.toggle("is-active");

  // access the text Content of the button and change it based on whether or not the is-active class is true/false
  toggleBtn.textContent = isActiveToggle ? "Active" : "Toggle me";

  // OPTION 1: template + innerHTML to render html and the expression
  toggleStatus.innerHTML = `Status: <strong>${isActiveToggle ? "active" : "inactive"}</strong>`;

  // OPTION 2: Change what the id is attached to and use textContent

  // toggleStatus.textContent = isActiveToggle ? "Active" : "Inactive";
});

/* ----- Example 2 ----- */

// select DOM Nodes
const characterForm = document.getElementById("character-form");
const characterInput = document.getElementById("character-input");
const characterListEl = document.getElementById("character-list");
const resetBtn = document.getElementById("reset-btn");

// create an initial list
const DEFAULT_CHARACTERS = ["Magnus Carleson", "Judit Polgar", "Mikhail Tal"];

// copy the default list into a "working list" using the "spread operator"
let characterList = [...DEFAULT_CHARACTERS];

// render list
function renderCharacterList() {
  // clear list elements in case there are some left over
  characterListEl.innerHTML = "";
  // iterate through array
  characterList.forEach((name) => {
    // for each item in the array create a list element
    const li = document.createElement("li");
    // add the text Content to the list element
    li.textContent = name;
    // append that element into the list
    characterListEl.appendChild(li);
  });
}
renderCharacterList();
// Event that accesses input field information and appends it to the list and re-renders that list to the DOM
characterForm.addEventListener("submit", (event) => {
  // prevent default refresh behavior
  event.preventDefault();
  // next extract the value from the input field and strip out leading and trailing spaces
  const inputValue = characterInput.value.trim();
  // guard against empty submission
  if (!inputValue) return;
  // push the new entry into the character list
  characterList.push(inputValue);
  // re-render the list
  renderCharacterList();
  // reset form field
  characterInput.value = "";
  // TODO: Evaluate if this enhances the page UX: characterInput.focus();
});

// reset button -> re-render the default list without user additions
function resetForm() {
  characterList = [...DEFAULT_CHARACTERS];
  renderCharacterList();
}

resetBtn.addEventListener("click", resetForm);

/* ----- Example 3 Filtering ---- */
// TODO: Extract default data into a separate js file
const SW_CHARACTERS = [
  { name: "Luke Skywalker", alignment: "jedi" },
  { name: "Obi-Wan Kenobi", alignment: "jedi" },
  { name: "Yoda", alignment: "jedi" },
  { name: "Mace Windu", alignment: "jedi" },
  { name: "Ahsoka Tano", alignment: "jedi" },
  { name: "Darth Vader", alignment: "sith" },
  { name: "Emperor Palpatine", alignment: "sith" },
  { name: "Count Dooku", alignment: "sith" },
  { name: "Darth Maul", alignment: "sith" },
  { name: "Grand Moff Tarkin", alignment: "empire" },
  { name: "Director Krennic", alignment: "empire" },
  { name: "Captain Phasma", alignment: "empire" },
  { name: "Padmé Amidala", alignment: "republic" },
  { name: "Bail Organa", alignment: "republic" },
  { name: "Mon Mothma", alignment: "republic" },
  { name: "General Grievous", alignment: "separatist" },
  { name: "Nute Gunray", alignment: "separatist" },
  { name: "Wat Tambor", alignment: "separatist" },
];

// DOM Selectors: filter control fieldset, list element to render the characters, results count to say how many are being filtered
const filterControls = document.getElementById("filter-controls");
const swListEl = document.getElementById("sw-character-list");
const resultCount = document.getElementById("result-count");

// render filtered characters
function renderFilteredCharacters() {
  // get check box information for whatever is checked
  const checkedBoxes = [
    ...filterControls.querySelectorAll("input[type='checkbox']:checked"),
  ];
  // map values of the checkboxes
  const activeAlignments = checkedBoxes.map((cb) => cb.value);

  // filter the content based on what is checked in the checkbox
  const filtered =
    activeAlignments.length === 0
      ? SW_CHARACTERS
      : SW_CHARACTERS.filter((char) =>
          activeAlignments.includes(char.alignment),
        );
  // DOM Manipulation
  // clearing the list to get rid of old stuff
  swListEl.innerHTML = "";
  // forEach through content and print it to the dom
  filtered.forEach(({ name, alignment }) => {
    const li = document.createElement("li");
    li.textContent = `${name} -- ${alignment}`;
    swListEl.appendChild(li);
  });
  // result count is getting the filtered array length and comparing it against the initial length
  resultCount.textContent = `Showing ${filtered.length} of ${SW_CHARACTERS.length} characters`;
}

// filter controls: only show the characters who's alignment matches that of the selected checkbox

// render filtered characters on load for default values
// add event listener to the controls so onchange it's going to render only the array elements based on alignment
filterControls.addEventListener("change", (event) => {
  if (event.target.name === "alignment") {
    renderFilteredCharacters();
  }
});
renderFilteredCharacters();
/* OPTIMIZATION Question: Is there a way to render even earlier or to avoid other errors etc? do initial list rendering there if so **HINT THERE IS!** */
