/* 
   MENU FILTERING & NUTRITION LOGIC
*/

function initMenu() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item-card');
    const lang = localStorage.getItem('preferred_lang') || 'en';

    // --- 1. FILTERING LOGIC ---
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and add to clicked one
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');

            menuItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                // Show item if category is 'all' or matches
                if (category === 'all' || itemCategory === category) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    //  NUTRITION OVERLAY LOGIC 
    menuItems.forEach(item => {
        const overlay = item.querySelector('.nutrition-overlay');
        const data = item.getAttribute('data-nutrition');

        if (overlay && data) {
            const nutrition = JSON.parse(data);
            
            // Build content using translation dictionary
            overlay.innerHTML = `
                <div class="nutrition-content">
                    <h4>Nutrition</h4>
                    <p><strong>Protein:</strong> ${nutrition.P}</p>
                    <p><strong>Carbs:</strong> ${nutrition.C}</p>
                    <p><strong>Fat:</strong> ${nutrition.F}</p>
                    <small>Est. values</small>
                </div>
            `;
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initMenu();

});

// Translation dictionary

const translations = {
    en: {
        // Navigation
        "nav-home": "Home", "nav-about": "About", "nav-menu": "Menu", "nav-contact": "Contact", "nav-order": "Order",
        "nav-home-link": "../index.html", "nav-about-link": "about.html", "nav-menu-link": "menu.html", "nav-contact-link": "contact.html", "nav-order-link": "order.html",
        // Order Page Content
        "hero-title": "Review Your Order and Checkout",
        "hero-desc": "Please review your selections before completing your purchase.",
        "cart-title": "Your Cart Items", "th-item": "Item", "th-price": "Price", "th-qty": "Qty", "th-total": "Total",
        "btn-clear": "Clear Cart", "subtotal": "Subtotal:", "vat-note": "Prices include VAT where applicable.",
        "delivery-title": "Delivery Details", "lbl-name": "Name", "lbl-phone": "Phone Number", "lbl-address": "Delivery Address", "btn-complete": "Complete Order",
        // Thank You Page Content
        "thank-title": "Thank You for Your Order!",
        "thank-msg": "Your order has been received. A confirmation will be sent to your email shortly.",
        "motto": "“Traditional Taste, Modern Speed.”",
        "next-steps-title": "What Happens Next?",
        "next-steps-desc": "Our kitchen is preparing your meal. Stay tuned for a confirmation call or email!",
        "btn-back-home": "Back to Homepage",
        // System Messages
        "empty-msg": "Your cart is empty.",
        "confirm-clear": "Are you sure you want to clear the cart?",
        "msg-success": "Order details prepared! Opening email app...",
        

    },
    am: {
        // Navigation
        "nav-home": "መነሻ", "nav-about": "ስለ እኛ", "nav-menu": "ዝርዝር ምግብ", "nav-contact": "አግኙን", "nav-order": "ትዕዛዝ",
        "nav-home-link": "../index_am.html", "nav-about-link": "about_am.html", "nav-menu-link": "menu_am.html", "nav-contact-link": "contact_am.html", "nav-order-link": "order_am.html",
        // Order Page Content
        "hero-title": "ትዕዛዝዎን ይከልሱ እና ይክፈሉ",
        "hero-desc": "እባክዎ ከመክፈልዎ በፊት ትዕዛዝዎን ያረጋግጡ።",
        "cart-title": "የትዕዛዝዎ ዝርዝር", "th-item": "ምግብ", "th-price": "ዋጋ", "th-qty": "ብዛት", "th-total": "ጠቅላላ",
        "btn-clear": "ሁሉንም ሰርዝ", "subtotal": "ድምር:", "vat-note": "ዋጋዎች የተጨማሪ እሴት ታክስን ያካትታሉ።",
        "delivery-title": "የማድረሻ መረጃ", "lbl-name": "ሙሉ ስም", "lbl-phone": "ስልክ ቁጥር", "lbl-address": "የማድረሻ አድራሻ", "btn-complete": "ትዕዛዙን ጨርስ",
        // Thank You Page Content
        "thank-title": "ስለ ትዕዛዝዎ እናመሰግናለን!",
        "thank-msg": "ትዕዛዝዎ ደርሶናል። በቅርቡ በኢሜልዎ ማረጋገጫ ይላክለታል።",
        "motto": "“የባህል ጣዕም፣ የዘመነ ፍጥነት።”",
        "next-steps-title": "ቀጥሎ ምን ይከሰታል?",
        "next-steps-desc": "ምግብዎን እያዘጋጀን ነው። ለበለጠ መረጃ በስልክ ቁጥርዎ እንደውላለን!",
        "btn-back-home": "ወደ መነሻ ገጽ ተመለስ",
        // System Messages
        "empty-msg": "ትዕዛዝዎ ባዶ ነው።",
        "confirm-clear": "እርግጠኛ ነዎት ሁሉንም መሰረዝ ይፈልጋሉ?",
        "msg-success": "ትዕዛዝዎ ተዘጋጅቷል! የኢሜል መተግበሪያ በመከፈት ላይ ነው...",
       
    }
};

/*  LANGUAGE LOGIC*/
function changeLanguage(lang) {
    localStorage.setItem('preferred_lang', lang);
    document.documentElement.lang = lang;

    // Update all text elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) el.textContent = translations[lang][key];
    });

    // Update all navigation links
    document.querySelectorAll('[data-i18n-link]').forEach(el => {
        const key = el.getAttribute('data-i18n-link');
        if (translations[lang][key]) el.setAttribute('href', translations[lang][key]);
    });

    if (typeof renderOrderPage === "function") renderOrderPage();
}
/* 
   3. CART CORE LOGIC
 */
let cart = JSON.parse(localStorage.getItem('dine_cart'))  ||[];

function saveCart() {
    localStorage.setItem('dine_cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const countEl = document.querySelector('.cart-count');
    if (countEl) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        countEl.textContent = totalItems;
    }
}

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    saveCart();
    alert(name + " added to cart!");
}

/* 
   4. RENDER ORDER PAGE
 */
function renderOrderPage() {
    const container = document.getElementById('cart-items-container');
    const totalEl = document.getElementById('order-total-amount');
    if (!container) return;

    const lang = localStorage.getItem('preferred_lang')  ||'en';
    container.innerHTML = '';

    if (cart.length === 0) {
        container.innerHTML = <tr><td colspan="5" style="text-align:center; padding:20px;">${translations[lang]['empty-msg']}</td></tr>;
        if (totalEl) totalEl.textContent = "0.00";
        return;
    }

    let total = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        container.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>ETB ${item.price}</td>
                <td>
                    <div class="qty-controls">
                        <button onclick="changeQty(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQty(${index}, 1)">+</button>
                    </div>
                </td>
                <td>ETB ${itemTotal.toFixed(2)}</td>
                <td><button onclick="removeItem(${index})"><i class="fas fa-trash"></i></button></td>
            </tr>`;
    });
    if (totalEl) totalEl.textContent = total.toFixed(2);
}

function changeQty(index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) cart.splice(index, 1);
    saveCart();
    renderOrderPage();
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    renderOrderPage();
}

function clearCart() {
    const lang = localStorage.getItem('preferred_lang')  ||'en';
    if (confirm(translations[lang]['confirm-clear'])) {
        cart = [];
        saveCart();
        renderOrderPage();
    }
}


function submitOrder(event) {
    event.preventDefault();
    const lang = localStorage.getItem('preferred_lang')  ||'en';
    
    if (cart.length === 0) {
        alert(translations[lang]['empty-msg']);
        return;
    }

    const name = document.getElementById('cust-name').value;
    const phone = document.getElementById('cust-phone').value;
    const address = document.getElementById('cust-address').value;
    const total = document.getElementById('order-total-amount').textContent;

    let orderDetails = cart.map(item => `${item.name} x${item.quantity} - ETB ${item.price * item.quantity}`).join('%0D%0A');

    const mailtoLink = `mailto:kaleb.dereje.0123@gmail.com?subject=New Order - ${name}&body=Customer: ${name}%0D%0APhone: ${phone}%0D%0AAddress: ${address}%0D%0A%0D%0AOrder:%0D%0A${orderDetails}%0D%0A%0D%0ATotal: ETB ${total}`;

    window.location.href = mailtoLink;
    
    
    cart = [];
    localStorage.removeItem('dine_cart');

    setTimeout(() => {
        window.location.href = (lang === 'am') ? "../assets/service/thankyou-am.html" : "../assets/service/thankyou.html";
    }, 800);
}


document.addEventListener('DOMContentLoaded', () => {
    // Language Init
    const savedLang = localStorage.getItem('preferred_lang') || 'en';
    changeLanguage(savedLang);

    // UI Init
    updateCartCount();
    renderOrderPage();

// Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }
});
