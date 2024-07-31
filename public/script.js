// JS event Listner
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('nav ul li a');
    // stores them in a NodeList named navLinks
    navLinks.forEach(link => {
        // for each link, it executes the provided callback function
        link.addEventListener('click', function () {
            // adds an event listener to the current link
            // when link clicked callback fn inside gets executed
            navLinks.forEach(nav => nav.classList.remove('active'));
            //ensuring that active class will be given only when link is clicked
            this.classList.add('active');
            // adds the 'active' class to the currently clicked link
        });
    });
});
