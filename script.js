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

/* Get popup */

const form = document.getElementById('form');
const result = document.getElementById('result');

    //lottie //
        function playAnimation(){
            const animationPath = 'images/GtMdyX8iUw.json';
            const container = document.getElementById('result');

            const animation = lottie.loadAnimation({
                container: container,
                renderer: 'svg',
                loop: false,
                autoplay: true,
                path: animationPath,
            });


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
                    playAnimation();
                } else {
                    console.log(response);
                    result.innerHTML = json.message;
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
            });}
        
    
                form.addEventListener("submit", function (e) {
                    e.preventDefault();
                    submitForm();
                    playAnimation();
                    }
                    );}