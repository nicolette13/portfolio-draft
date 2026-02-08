// LIGHT/DARK MODE

const themeToggleBtn = document.getElementById('theme-toggle'); 
const htmlElm = document.documentElement; 

function setTheme(theme){
    htmlElm.setAttribute('data-theme', theme); 
    localStorage.setItem('theme', theme); 
}

function toggleTheme(){
    const currentTheme = htmlElm.getAttribute('data-theme'); 
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'; 
    setTheme(newTheme); 
}

themeToggleBtn.addEventListener('click', toggleTheme); 


// TOGGLE FONT SIZE  

let container = document.getElementById('container'); 
let smallBtn = document.getElementById('small'); 
let mediumBtn = document.getElementById('medium'); 
let largeBtn = document.getElementById('large'); 

smallBtn.addEventListener('click', function(e){
    container.style.fontSize = '14px'; 
}); 

mediumBtn.onclick = function(e){
    container.style.fontSize = '18px';  
}

largeBtn.onclick = function(e){
    container.style.fontSize = '22px'; 
}


