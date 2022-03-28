import Alpine from 'alpinejs'
import persist from '@alpinejs/persist'
import Slider from './Slider.js'

window.Alpine = Alpine
Alpine.plugin(persist)
Alpine.data('Slider', Slider)

Alpine.start()

let Sunrise = {
    updateQuantity(line, qty){
         fetch('/cart/change.js', {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity: qty, line: line })
        }).then(response => response.json())
        .then(data => { 
            // fire javascript event on window
            window.dispatchEvent(new Event('cart-updated'));
            
        })
        .catch((error) => { 
            console.error('Error:', error);
        });
    }
}

window.Sunrise = Sunrise