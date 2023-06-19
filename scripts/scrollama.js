var body = document.getElementsByTagName('body')[0];
    body.style.backgroundColor = 'black';

    // trigger this function every time the user scrolls
    window.onscroll = function (event) {
        var scroll = window.pageYOffset;
        if (scroll < 300) {
            // green
            body.style.backgroundColor = '#121212';
        } else if (scroll >= 100 && scroll < 300) {
            // yellow
            body.style.backgroundColor = '#E91E63';
        } else if (scroll >= 300 && scroll < 600) {
            // blue
            body.style.backgroundColor = '#FF4081';
        } else if (scroll >= 600 && scroll < 900) {
            // orange
            body.style.backgroundColor = 'lightblue';
        } else if (scroll >= 900 && scroll < 15000) {
            // red
            body.style.backgroundColor = 'orange';
        } else {
            // purple
            body.style.backgroundColor = 'yellow';
        }
    }