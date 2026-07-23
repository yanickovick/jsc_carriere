/*=========================================
        MENU RESPONSIVE
=========================================*/

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

}

/*=========================================
        FERMER LE MENU AU CLIC
=========================================*/

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});

/*=========================================
        NAVBAR AU SCROLL
=========================================*/

const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {

    if(window.scrollY > 80){

        nav.style.background = "rgba(8,24,35,.95)";
        nav.style.backdropFilter = "blur(8px)";
        nav.style.transition = ".3s";

    }else{

        nav.style.background = "transparent";
        nav.style.backdropFilter = "none";

    }

});

/*=========================================
        APPARITION AU SCROLL
=========================================*/

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:.2
});

document.querySelectorAll(
".service-card,.equipment-card,.project,.advantage,.testimonial,.about-image,.about-content"
).forEach(el=>{

    el.classList.add("hidden");

    observer.observe(el);

});
/*=========================================
        COMPTEURS ANIMÉS
=========================================*/

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const counter = entry.target;

            const target = +counter.dataset.target;

            let count = 0;

            const speed = target / 120;

            const updateCounter = () => {

                if (count < target) {

                    count += speed;

                    counter.innerText = Math.ceil(count);

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.innerText = target;

                }

            };

            updateCounter();

            counterObserver.unobserve(counter);

        }

    });

}, {

    threshold: 0.5

});

counters.forEach(counter => {

    counterObserver.observe(counter);

});

/*=========================================
        LIGHTBOX GALERIE
=========================================*/

const galleryImages = document.querySelectorAll(".project img");

const lightbox = document.createElement("div");

lightbox.id = "lightbox";

lightbox.innerHTML = `
    <span id="closeLightbox">&times;</span>
    <img id="lightboxImg" src="" alt="">
`;

document.body.appendChild(lightbox);

const lightboxImg = document.getElementById("lightboxImg");

galleryImages.forEach(image => {

    image.addEventListener("click", () => {

        lightbox.style.display = "flex";

        lightboxImg.src = image.src;

    });

});

document.getElementById("closeLightbox").addEventListener("click", () => {

    lightbox.style.display = "none";

});

lightbox.addEventListener("click", e => {

    if (e.target === lightbox) {

        lightbox.style.display = "none";

    }

});

/*=========================================
        BOUTON RETOUR EN HAUT
=========================================*/

const topButton = document.createElement("button");

topButton.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';

topButton.className = "top-button";

document.body.appendChild(topButton);

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        topButton.classList.add("show-top");

    } else {

        topButton.classList.remove("show-top");

    }

});

topButton.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});
/*=========================================
        FORMULAIRE DE DEVIS
=========================================*/

const form = document.getElementById("quoteForm");
const sendBtn = document.getElementById("sendBtn");
const messageBox = document.getElementById("formMessage");

if (form) {

    form.addEventListener("submit", async function(e){

        e.preventDefault();

        sendBtn.disabled = true;
        sendBtn.innerHTML = "Envoi en cours...";

        messageBox.style.color = "#555";
        messageBox.innerHTML = "Préparation de votre demande...";

        const data = {

            name: document.getElementById("name").value,

            company: document.getElementById("company").value,

            phone: document.getElementById("phone").value,

            email: document.getElementById("email").value,

            sandType: document.getElementById("sandType").value,

            quantity: document.getElementById("quantity").value,

            location: document.getElementById("location").value,

            date: document.getElementById("date").value,

            message: document.getElementById("message").value

        };

        try{

            /*
            Remplace cette URL par celle de ton
            Cloudflare Worker.
            */

            // const response = await fetch("https://ton-worker.workers.dev",{
            //
            //     method:"POST",
            //     headers:{
            //         "Content-Type":"application/json"
            //     },
            //     body:JSON.stringify(data)
            //
            // });

            // if(!response.ok){
            //     throw new Error();
            // }

            console.log(data);

            messageBox.style.color = "green";

            messageBox.innerHTML =
            "Votre demande de devis a été enregistrée avec succès.";

            form.reset();

        }

        catch(error){

            console.error(error);

            messageBox.style.color = "red";

            messageBox.innerHTML =
            "Une erreur est survenue. Veuillez réessayer.";

        }

        finally{

            sendBtn.disabled = false;

            sendBtn.innerHTML = "Envoyer la demande";

        }

    });

}

/*=========================================
        ANNEE AUTOMATIQUE
=========================================*/

const year = document.getElementById("year");

if(year){

    year.textContent = new Date().getFullYear();

}