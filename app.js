const texts = ['Web Developer', 'Competitive Programmer'];
let currentIndex = 0;
let isDeleting = false;
let charIndex = 0;
let typingSpeed = 150;
let deleteSpeed = 100;
let pauseTime = 2000;

function typeText() {
    const rotatingTextElement = document.getElementById('rotating-text');
    const currentText = texts[currentIndex];

    if (isDeleting) {
        rotatingTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = deleteSpeed;
    } else {
        rotatingTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 150;
    }

    if (!isDeleting && charIndex === currentText.length) {
        typingSpeed = pauseTime;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        currentIndex = (currentIndex + 1) % texts.length;
        typingSpeed = 500;
    }

    setTimeout(typeText, typingSpeed);
}

// Functions for skill animation remain unchanged
function animatePercentage(element, targetPercentage) {
  const percentageElement = element.querySelector('.skill-percentage');
  let currentPercentage = 0;
  const stepTime = 15; 

  percentageElement.style.display = 'block';
  element.querySelector('.skill-name').style.display = 'none';

  function step() {
    if (currentPercentage <= targetPercentage) {
      percentageElement.textContent = currentPercentage + '%';
      element.style.background = `conic-gradient(var(--primary-color) 0% ${currentPercentage}%, var(--border-color) ${currentPercentage}% 100%)`;
      currentPercentage++;
      setTimeout(step, stepTime);
    } else {
      percentageElement.textContent = targetPercentage + '%';
      element.style.background = `conic-gradient(var(--primary-color) 0% ${targetPercentage}%, var(--border-color) ${targetPercentage}% 100%)`;
    }
  }

  step();
}

function resetSkill(element) {
  const percentageElement = element.querySelector('.skill-percentage');
  percentageElement.style.display = 'none';
  element.querySelector('.skill-name').style.display = 'block';
  element.style.background = `conic-gradient(var(--primary-color) 0% 0%, var(--border-color) 0% 100%)`;
}

function toggleSkill(element) {
  const isActive = element.classList.contains('active');

  document.querySelectorAll('.skill-circle').forEach(skill => {
    skill.classList.remove('active');
    resetSkill(skill);
  });

  if (!isActive) {
    element.classList.add('active');
    const targetPercentage = parseInt(element.getAttribute('data-percentage'), 10);
    animatePercentage(element, targetPercentage);
  }
}

// Single DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(typeText, 1000);

  document.querySelectorAll('.skill-circle').forEach(skill => {
    skill.style.background = `conic-gradient(var(--primary-color) 0% 0%, var(--border-color) 0% 100%)`;
    skill.querySelector('.skill-percentage').style.display = 'none';
    skill.querySelector('.skill-name').style.display = 'block';

    skill.addEventListener('click', () => toggleSkill(skill));
  });
});
