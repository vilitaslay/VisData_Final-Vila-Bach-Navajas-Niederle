
var body = document.getElementsByTagName('body')[0];
    body.style.backgroundColor = '#121212';

    // trigger this function every time the user scrolls
    window.onscroll = function (event) {
        var scroll = window.pageYOffset;
        if (scroll < 300) {
            // green
            body.style.backgroundColor = '#121212';
        } else if (scroll >= 100 && scroll < 300) {
            // yellow
            body.style.backgroundColor = 'hsl(22, 6, 25)';
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


    window.onscroll = function (event) {
        var scroll = window.pageYOffset;
        var windowHeight = window.innerHeight;
        var scrollHeight = document.documentElement.scrollHeight - windowHeight;
        
        var color;
        
        if (scroll < scrollHeight * 0.2) {
            // Gris inicial
            color = interpolateColors('#808080', '#FF69B4', scroll / (scrollHeight * 0.2));
        } else if (scroll < scrollHeight * 0.4) {
            // Transición de rosa a gris
            color = interpolateColors('#FF69B4', '#808080', (scroll - scrollHeight * 0.2) / (scrollHeight * 0.2));
        } else if (scroll < scrollHeight * 0.6) {
            // Transición de gris a amarillo pastel
            color = interpolateColors('#808080', '#FFFF99', (scroll - scrollHeight * 0.4) / (scrollHeight * 0.2));
        } else if (scroll < scrollHeight * 0.8) {
            // Transición de amarillo pastel a verde amarronado opaco
            color = interpolateColors('#FFFF99', '#556B2F', (scroll - scrollHeight * 0.6) / (scrollHeight * 0.2));
        } else {
            // Verde amarronado opaco
            color = '#556B2F';
        }
        
        body.style.backgroundColor = color;
    }
    
    function interpolateColors(color1, color2, ratio) {
        var r1 = parseInt(color1.substring(1, 3), 16);
        var g1 = parseInt(color1.substring(3, 5), 16);
        var b1 = parseInt(color1.substring(5, 7), 16);
        
        var r2 = parseInt(color2.substring(1, 3), 16);
        var g2 = parseInt(color2.substring(3, 5), 16);
        var b2 = parseInt(color2.substring(5, 7), 16);
        
        var r = Math.round(r1 + (r2 - r1) * ratio);
        var g = Math.round(g1 + (g2 - g1) * ratio);
        var b = Math.round(b1 + (b2 - b1) * ratio);
        
        return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }
    
    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? '0' + hex : hex;
    }
    