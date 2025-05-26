document.addEventListener('DOMContentLoaded', () => {
    // Shopping List Functionality
    const shoppingInput = document.getElementById('shoppingInput');
    const shoppingItems = document.getElementById('shoppingItems');
    
    if(shoppingInput && shoppingItems) {
        shoppingInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const newItem = document.createElement('li');
                newItem.innerHTML = `
                    <input type="checkbox">
                    <span>${shoppingInput.value}</span>
                    <button onclick="this.parentElement.remove()">×</button>
                `;
                shoppingItems.appendChild(newItem);
                shoppingInput.value = '';
            }
        });

        document.querySelector('.print-button')?.addEventListener('click', () => {
            window.print();
        });
    }

    // Search Functionality
    const searchButton = document.querySelector('.search-button');
    const searchInput = document.querySelector('.search-input');
    
    if(searchButton && searchInput) {
        const executeSearch = () => {
            const term = searchInput.value.trim();
            if(term) window.location.href = `/search?q=${encodeURIComponent(term)}`;
        };
        
        searchButton.addEventListener('click', executeSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') executeSearch();
        });
    }

    // Smooth Scroll Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Newsletter Subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    if(newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input').value;
            // Add subscription logic here
            console.log('Subscribed email:', email);
            newsletterForm.reset();
        });
    }
     

    // Cookie Consent
    const cookieBanner = document.querySelector('.cookie-banner');
    if(cookieBanner && !localStorage.getItem('cookiesAccepted')) {
        cookieBanner.style.display = 'flex';
        document.querySelector('.accept-cookies').addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.style.display = 'none';
        });
    }

    // Service Worker Registration
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('ServiceWorker registration successful');
                })
                .catch(err => {
                    console.log('ServiceWorker registration failed:', err);
                });
        });
    }

    // Lazy Loading Images
    const lazyImages = document.querySelectorAll('img.lazy');
    if(lazyImages.length > 0 && 'IntersectionObserver' in window) {
        const lazyImageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove('lazy');
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(lazyImage => {
            lazyImageObserver.observe(lazyImage);
        });
    }

    // Recipe Card Interactions
    document.querySelectorAll('.recipe-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if(mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
            mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
            navLinks.style.display = isExpanded ? 'none' : 'flex';
        });
    }

    // AI Recipe Generator
    const aiGeneratorForm = document.querySelector('.ai-generator form');
    if(aiGeneratorForm) {
        aiGeneratorForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const ingredients = aiGeneratorForm.querySelector('input').value;
            // Add AI API call here
            console.log('Generating recipes for:', ingredients);
        });
    }
});

// Global Functions
function filterRecipes() {
    // Add recipe filtering logic
}

function loadMoreRecipes() {
    // Add infinite scroll logic
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', addToCart);
});

function checkout() {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }
  
    // Optionally: Save cart to localStorage
    localStorage.setItem('homePlateCart', JSON.stringify(cart));
    
    // Redirect to checkout page
    window.location.href = "checkout.html";
  }
  