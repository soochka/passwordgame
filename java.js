const passwordForm = document.getElementById('passwordForm');
const passwordInput = document.getElementById('passwordInput');
const requirementsContainer = document.querySelector('.requirements-container');
const secretButton = document.getElementById('secretButton');

const requirements = [
  { requirement: /\d/g, description: 'ספרות שסכומן הוא הגיל שלך' },
  { requirement: /ברונו/g, description: 'האיש שעשה לנו טוב רגע לפני המלחמה' },
  { requirement: /תחת/g, description: 'האיבר של הדמות שקיעקנו' },
  { requirement: /מנגו/g, description: '**** גלידת סורבה ' },
  { requirement: /2/g, description: 'מספר החודש שבו אשים לו עוקב' },
  { requirement: /נונו/g, description: 'הערתי אותך בבוקר בניצה הראשון לזמרת הזו' },
  { requirement: /קיפוד/g, description: 'מה עף מעל הראש שלנו בים באילת' },
  { requirement: /14/g, description: 'מספר השיר בסטליסט שבכית לו'},
  { requirement: /פרחים/g, description: 'ברונו מקווה שהוא ייקנה לך' },
  { requirement: /חבר/g, description: 'מה את מאחלת לעצמך כל שנה?' }
];

let currentRequirementIndex = 0;

passwordForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const enteredPassword = passwordInput.value;

  requirementsContainer.innerHTML = ''; // Clear previous requirements

  let isValid = true;

  for (let i = 0; i < requirements.length; i++) {
    const validationResult = requirements[i].requirement.test(enteredPassword);

    const requirementElement = document.createElement('div');
    requirementElement.textContent = requirements[i].description;

    if (!validationResult) {
      requirementElement.classList.add('requirement', 'invalid');
      requirementsContainer.appendChild(requirementElement);
      currentRequirementIndex = i; // Set current index to the missed requirement
      isValid = false;
      break;
    }
  }

  if (isValid) {
    secretButton.style.backgroundColor = ''; // Reset button color
    secretButton.removeAttribute('disabled'); // Enable the button
  } else {
    secretButton.style.backgroundColor = ''; // Reset button color if invalid input
    secretButton.setAttribute('disabled', 'disabled'); // Disable the button if invalid input
  }

  requirementsContainer.style.opacity = '1';
});

// Monitor changes in the input field
passwordInput.addEventListener('input', function() {
  const currentValue = passwordInput.value;

  for (let i = currentRequirementIndex; i < requirements.length; i++) {
    const validationResult = requirements[i].requirement.test(currentValue);

    if (!validationResult) {
      const requirementElement = document.createElement('div');
      requirementElement.textContent = requirements[i].description;
      requirementElement.classList.add('requirement', 'invalid');

      requirementsContainer.innerHTML = '';
      requirementsContainer.appendChild(requirementElement);
      currentRequirementIndex = i;
      break;
    }
  }

  // Check if the input contains the word "חבר"
  const isFriendWordPresent = currentValue.includes('חבר');
  if (isFriendWordPresent) {
    secretButton.style.backgroundColor = 'green'; // Change button color to green
    secretButton.removeAttribute('disabled'); // Enable the button
    secretButton.addEventListener('click', function() {
      window.location.href = 'indians.html'; // Redirect to another address
    });
  } else {
    secretButton.style.backgroundColor = ''; // Reset button color if word is removed
    secretButton.setAttribute('disabled', 'disabled'); // Disable the button if word is removed
    secretButton.removeEventListener('click', function() {
      window.location.href = 'indians.html'; // Remove click event listener
    });
  }
});