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

