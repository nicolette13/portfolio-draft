// TIPPY TOOLTIPS

tippy('[data-tippy-content', {
    theme: 'custom', 
    delay: [200],
    followCursor: true,
    duration: [400]
}); 




// LIGHT/DARK MODE

const themeToggleBtn = document.getElementById('theme-toggle'); 

const htmlElem = document.documentElement; 

themeToggleBtn.addEventListener('click', () => {
    function setTheme(theme){
        htmlElem.setAttribute('data-theme', theme); 
        localStorage.setItem('theme', theme); 
    }
    function toggleTheme(){
       const currentTheme = htmlElem.getAttribute('data-theme'); 
       const newTheme = currentTheme === 'light' ? 'dark' : 'light'; 
        setTheme(newTheme); 
    }

    function themeTransition(){
        htmlElem.classList.add('theme-transition'); 
    }
}); 


// TOGGLE FONT SIZES

let body = document.getElementById('main'); 

let smallBtn = document.getElementById('small'); 
let medBtn = document.getElementById('medium'); 
let largeBtn = document.getElementById('large'); 

smallBtn.addEventListener('click', function(e){
    body.style.fontSize = '14px';
}); 

medBtn.addEventListener('click', function(e){
    body.style.fontSize = '18px';
}); 

largeBtn.addEventListener('click', function(e){
    body.style.fontSize = '22px'; 
}); 
