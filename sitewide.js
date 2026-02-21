// TIPPY TOOLTIPS

tippy('[data-tippy-content', {
    theme: 'custom', 
    delay: [200],
    followCursor: true,
    duration: [400]
}); 


//  LIGHT/DARK MODE 

 const toggleBtn = document.querySelector('input[type="checkbox"]');

 const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null; 
        if(currentTheme){
            document.documentElement.setAttribute('data-bs-theme', currentTheme);
            if(currentTheme === 'dark'){
                toggleBtn.checked = true; 
            }
        }
        
    function changeTheme(e){
        if(e.target.checked){
            document.documentElement.setAttribute('data-bs-theme', 'dark'); 
            localStorage.setItem('theme', 'dark'); 
        } else{
            document.documentElement.setAttribute('data-bs-theme', 'light');
            localStorage.setItem('theme', 'light'); 
        }
    }

    
    toggleBtn.addEventListener('change', changeTheme, false); 



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
