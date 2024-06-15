import '/resources/scss/main.scss';
import Alpine from 'alpinejs';

import Answer from './resources/js/Answer';
import popUp from './resources/js/popUp';

Alpine.data('Answer', Answer);
Alpine.data('popUp', popUp);
Alpine.start();

document.documentElement.requestFullscreen();
