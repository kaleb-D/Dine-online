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
