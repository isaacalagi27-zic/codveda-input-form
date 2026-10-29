const form = document.getElementById("registrationForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");


const successMessage = document.getElementById("successMessage");


const fields = [
  nameInput,
  emailInput,
  passwordInput,
  confirmPasswordInput
];


// Validate each input field
function validateField(input) {
  const value = input.value.trim();
  let error = "";

  if (input === nameInput) {
    if (value === "") {
      error = "Full name is required.";
    } else if (value.length < 2) {
      error = "Name must contain at least 2 characters.";
    }
  }


  if (input === emailInput) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


      if (value === "") {
      error = "Email address is required.";
    } else if (!emailPattern.test(value)) {
      error = "Please enter a valid email address.";
    }
  }



  if (input === passwordInput) {
    if (value === "") {
      error = "Password is required.";
    } else if (value.length < 8) {
      error = "Password must contain at least 8 characters.";
    } else if (!/[A-Z]/.test(value)) {
      error = "Include at least one uppercase letter.";
    } else if (!/[a-z]/.test(value)) {
      error = "Include at least one lowercase letter.";
    } else if (!/[0-9]/.test(value)) {
      error = "Include at least one number.";
    } else if (!/[^A-Za-z0-9]/.test(value)) {
      error = "Include at least one special character.";
    }
  }


  if (input === confirmPasswordInput) {
    if (value === "") {
      error = "Please confirm your password.";
    } else if (value !== passwordInput.value) {
      error = "Passwords do not match.";
    }
  }

  showError(input, error);
  return error === "";
}

// Display or clear error messages
function showError(input, message) {
  const errorElement = document.getElementById(input.id + "Error");


   errorElement.textContent = message;

    input.classList.toggle("invalid", message !== "");
  input.classList.toggle("valid", message === "" && input.value.trim() !== "");



 input.setAttribute("aria-invalid", message !== "" ? "true" : "false");
}


// Check fields when users type
fields.forEach(function (input) {
  input.addEventListener("input", function () {
    successMessage.textContent = "";


    validateField(input);

    // Recheck confirmation if the original password changes
    if (input === passwordInput && confirmPasswordInput.value !== "") {
      validateField(confirmPasswordInput);
    }
  });


  // Validate when users leave a field
  input.addEventListener("blur", function () {
    validateField(input);
  });
});


// Handle form submission without reloading the page
form.addEventListener("submit", function (event) {
  event.preventDefault();


  let formIsValid = true;

  fields.forEach(function (input) {
    if (!validateField(input)) {
      formIsValid = false;
    }
  });



if (formIsValid) {
    successMessage.textContent =
      "Success! Your form has been validated successfully.";

    form.reset();

    fields.forEach(function (input) {
      input.classList.remove("valid", "invalid");
      input.setAttribute("aria-invalid", "false");
    });


     } else {
    successMessage.textContent = "";

    const firstInvalidField = fields.find(function (input) {
      return input.getAttribute("aria-invalid") === "true";
    });

    
     if (firstInvalidField) {
      firstInvalidField.focus();
    }
  }
});




