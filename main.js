import '/resources/scss/main.scss';
import Alpine from 'alpinejs';

import Answer from './resources/js/Answer';

Alpine.data('Answer', Answer);
Alpine.start();


window.addEventListener("load", ()=>{
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
        document.documentElement.msRequestFullscreen();
    }
})