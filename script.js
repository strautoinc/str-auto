/* Sticky navbar */
const nav = document.querySelector('#nav-menu');
const navTop = nav.offsetTop;

function stickyNavigation() {
    if (window.scrollY >= navTop) {
        document.body.style.paddingTop = nav.offsetHeight + 'px';
        document.body.classList.add('fixed-nav');
    } else {
        document.body.style.paddingTop = 0;
        document.body.classList.remove('fixed-nav');
    }
}

window.addEventListener('scroll', stickyNavigation);
/* form submit */
const form = document.getElementById('form');
const result = document.getElementById('result');

// Lottie //
function playAnimation() {
    const animationPath = 'images/lottie.json';
    const container = document.getElementById('result');

    const animation = lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: animationPath,
    });
}

function submitForm() {
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    result.innerHTML = "Processing...";

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
    .then(async (response) => {
        let jsonResponse = await response.json();
        if (response.status === 200) {
            result.style.display = "block";
            playAnimation();
        } else {
            console.log(response);
            result.style.display = "block";
            playAnimation();
        }
    })
    .catch((error) => {
        result.innerHTML = "Something went wrong!";
    })
    .then(function () {
        form.reset();
        setTimeout(() => {
            result.style.display = "none";
        }, 4000);
    });
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    submitForm();
});

/* language switcher */
let currentLanguage = 'en';
const translations = {};

function loadLanguageFile(language) {
  fetch(`./${language}.json`)
    .then(response => response.json())
    .then(data => {
      translations[language] = data;
      updateContent();
    })
    .catch(error => console.error('Error loading language file', error));
}

function updateContent() {
  const selectedTranslations = translations[currentLanguage];

  document.querySelectorAll('[data-translate]').forEach(element => {
    const translationKey = element.dataset.translate;
    if (selectedTranslations.hasOwnProperty(translationKey)) {
      element.innerText = selectedTranslations[translationKey];
    }
  });
}

function switchLanguage(language) {
  currentLanguage = language;
  loadLanguageFile(language);
}

loadLanguageFile(currentLanguage);

$(document).ready(function(){
    $(".tri-state-toggle-button").click(function(){
      $(".tri-state-toggle-button").removeClass("active");
      $(this).addClass("active");

      const language = $(this).data('language');
      switchLanguage(language);
    });
  });
