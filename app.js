let buttons = document.querySelectorAll("div.btn-grp button");
let tip_value;
let custom_tip = document.querySelector("div.btn-grp input");
let amount = document.querySelector("div.text-input input");
let no_of_people = document.getElementById("no_of_people");
let rst_btn = document.querySelector(".bill-display button");

/* initialising values */

amount.value = "";
no_of_people.value = "";
custom_tip.value = "";
document.getElementById("tip_per_person").innerHTML = (0.0).toFixed(2);
document.getElementById("total_per_person").innerHTML = (0.0).toFixed(2);
rst_btn.disabled = true;
rst_btn.classList.add("button-disabled");

/* eventlistner for all buttons, updating tip value and calling calc func */
buttons.forEach((element) => {
  element.addEventListener("click", () => {
    updateclass();
    element.classList.add("active-btn");
    custom_tip.value = "";
    tip_value = element.value;
    calculate_total();
  });
});

// function to remove active-btn class from all buttons
function updateclass() {
  buttons.forEach((button) => {
    button.classList.remove("active-btn");
  });
}

/* eventlistner for entering bill input */
amount.addEventListener("input", () => {
  calculate_total();
});

// event listner for textbox for custom tip entry
custom_tip.addEventListener("input", () => {
  updateclass();
  tip_value = custom_tip.value;

  if (custom_tip.value != 0 && !isNaN(custom_tip.value)) {
    calculate_total();
  }
});

// eventlistner for input for no of people
no_of_people.addEventListener("input", () => {
  calculate_total();
  checkerror();
});

// calc function
function calculate_total() {
  // fetching,intialising variable values
  let total_amount = parseInt(amount.value);
  let total_tip_percent = parseInt(tip_value) / 100;
  let total_people = parseInt(no_of_people.value);
  let total_tip_per_person;
  let total_amount_per_person;

  /* if all three are numbers */
  if (
    !isNaN(total_amount) &&
    !isNaN(total_tip_percent) &&
    !isNaN(total_people) &&
    total_people != 0
  ) {
    rst_btn.disabled = false;
    rst_btn.classList.remove("button-disabled");
    total_tip_per_person = (total_amount * total_tip_percent) / total_people;
    total_amount_per_person =
      (total_amount * (1 + total_tip_percent)) / total_people;
  }
  //  if amount and number of people are entered but tip value is not entered
  else if (!isNaN(total_amount) && !isNaN(total_people) && total_people != 0) {
    rst_btn.disabled = false;
    rst_btn.classList.remove("button-disabled");
    total_amount_per_person = total_amount / total_people;
    total_tip_per_person = 0;
  }
  // if none of them are entered
  else {
    total_amount_per_person = 0;
    total_tip_per_person = 0;
    rst_btn.disabled = true;
    rst_btn.classList.add("button-disabled");
  }

  // updating value on html rounded off to 2 decimal places
  document.getElementById("tip_per_person").innerHTML =
    total_tip_per_person.toFixed(2);
  document.getElementById("total_per_person").innerHTML =
    total_amount_per_person.toFixed(2);
}

function checkerror() {
  if (
    !isNaN(parseInt(no_of_people.value)) &&
    parseInt(no_of_people.value) == 0
  ) {
    document.getElementById("dzero_error").style.display = "block";
    document.getElementById("people_input").classList.add("people_input_error");
  } else {
    document.getElementById("dzero_error").style.display = "none";
    document
      .getElementById("people_input")
      .classList.remove("people_input_error");
  }
}
