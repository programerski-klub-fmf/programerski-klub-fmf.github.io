// script, that clears the warning that the website doesn't use cookies
document.addEventListener('DOMContentLoaded', () => {

    document.getElementById("cookie-button").addEventListener('click', () => {
        document.getElementById("no-cookies").style.display = "none";
    });

});

