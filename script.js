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

/* Get modal */

const form = document.getElementById('form');
const result = document.getElementById('result');

    //lottie //
        function playAnimation() {
            const animationPath = 'images/lottie.json';
            const animation = lottie.loadAnimation({
                container: result,
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
                    let json = await response.json();
                    if (response.status == 200) {
                        result.style.display = "block";
                    } else {
                        console.log(response);
                        result.style.display = "block";
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
            };
        
                form.addEventListener("submit", function (e) {
                    e.preventDefault();
                    submitForm();
                    playAnimation();
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

            if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                element.placeholder = selectedTranslations[translationKey];
            }
        }
    });
}

function switchLanguage(language) {
    currentLanguage = language;
    loadLanguageFile(language);
}

loadLanguageFile(currentLanguage);

document.querySelectorAll('.tri-state-toggle-button').forEach(button => {
    button.addEventListener('click', event => {
        document.querySelectorAll('.tri-state-toggle-button').forEach(btn => btn.classList.remove('active'));

        button.classList.add('active');

        const language = button.dataset.language;
        document.querySelector('#name').placeholder = data[language].name;
        document.querySelector('#please').placeholder = data[language].please;
    });
});

  
  var data = {
    "en": {
      "name": "Enter full name",
      "message": "Please provide a brief description of your experience, or any other relative information you would like to share..."
    },
    "ukr": {
      "name": "Введіть повне ім'я",
      "please": "Будь ласка, надайте короткий опис свого досвіду або будь-якої іншої відповідної інформації, яку ви хотіли б поділитися ...",
    }
  }


const linkInfo = [
    { color: '#fff', text: 'ПОТРIБНI ВОДIЇ' },
    { color: '#0084ff', text: 'JOIN THE FLEET' },
    { color: '#189c30', text: 'ИЩЕМ ВОДИТЕЛЕЙ' },
    { color: '#eeff00', text: 'ПОТРIБНI ВОДIЇ' },
    { color: '#fff', text: 'JOIN THE FLEET' },
    { color: '#e9622d', text: 'ИЩЕМ ВОДИТЕЛЕЙ' },

  ];
  
  const iconClass = 'fas fa-truck-pickup'; 
  let currentIndex = 0;
  
  function updateLinkAppearance() {
    const link = document.getElementById('join');
    const currentInfo = linkInfo[currentIndex];
  
    link.style.color = currentInfo.color;
    link.innerHTML = `<i class="${iconClass}"></i> ${currentInfo.text}`;
  
    currentIndex = (currentIndex + 1) % linkInfo.length;
  }
  
const intervalId = setInterval(updateLinkAppearance, 5000);

  type="text/javascript"
  src="https://app.termly.io/resource-blocker/e70fcce7-1cbb-4e1a-a246-497b4c62c06c?autoBlock=on"
