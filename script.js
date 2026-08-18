```javascript
document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    const navLinks = document.querySelectorAll("#nav-menu a");


    // MOBILE MENU

    menuToggle.addEventListener("click", function () {

        navMenu.classList.toggle("active");


        // Change menu icon

        if (navMenu.classList.contains("active")) {

            menuToggle.textContent = "✕";

            menuToggle.setAttribute(
                "aria-label",
                "Close navigation menu"
            );

        } else {

            menuToggle.textContent = "☰";

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        }

    });


    // CLOSE MENU AFTER CLICKING A LINK

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("active");

            menuToggle.textContent = "☰";

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        });

    });

});
```
