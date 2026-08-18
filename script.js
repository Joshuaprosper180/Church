const menuToggle = document.getElementById("menu-toggle");

const navMenu = document.getElementById("nav-menu");


menuToggle.addEventListener("click", function () {

    navMenu.classList.toggle("active");

});


const navLinks = document.querySelectorAll("nav a");


navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navMenu.classList.remove("active");

    });

});
