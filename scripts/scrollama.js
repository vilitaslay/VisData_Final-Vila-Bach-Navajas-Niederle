
var body = document.getElementsByTagName('body')[0];
    body.style.backgroundColor = "#121212";

    // trigger this function every time the user scrolls
    window.onscroll = function (event) {
        var scroll = window.pageYOffset;
        if (scroll < 300) {
            // al inicio nos interesa el fondo normal
            body.style.backgroundColor = '#121212';
        } else if (scroll >= 100 && scroll < 300) {
            //llegamos a la seccion de Debut
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
         if (scroll < scrollHeight * 0.4) {
            // Transición de rosa a gris
            color = interpolateColors('#121212', '#808080', (scroll - scrollHeight * 0.2) / (scrollHeight * 0.2));
        } 
        else if (scroll < scrollHeight * 0.5) {
            // Transición de gris a amarillo pastel
            color = interpolateColors('#808080', '#d26a90', (scroll - scrollHeight * 0.4) / (scrollHeight * 0.2));
        } 
        else if (scroll < scrollHeight * 0.6) {
            // Transición de gris a amarillo pastel
            color = interpolateColors('#d26a90', '#6f7071', (scroll - scrollHeight * 0.5) / (scrollHeight * 0.2));
        } 
        else if (scroll < scrollHeight * 0.7) {
            // Transición de amarillo pastel a verde amarronado opaco
            color = interpolateColors('#6f7071', '#e3de82', (scroll - scrollHeight * 0.6) / (scrollHeight * 0.2));
        } 
        else if (scroll < scrollHeight * 0.8){
            color = interpolateColors('#e3de82', '#5b858f', (scroll - scrollHeight* 0.7) / (scrollHeight * 0.2));
        }
        else if (scroll < scrollHeight * 0.9){
            color = interpolateColors('#5b858f', '#121212', (scroll - scrollHeight* 0.8) / (scrollHeight * 0.2));
        }
        else {
            color = "#121212"
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
    