document.addEventListener('DOMContentLoaded', () => {
    // Shopping List Functionality
    const shoppingInput = document.getElementById('shoppingInput');
    const shoppingItems = document.getElementById('shoppingItems');
    
    if(shoppingInput && shoppingItems) {
        shoppingInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const newItem = document.createElement('li');
                newItem.className = 'flex items-center gap-2 py-1';
                newItem.innerHTML = `
                    <input type="checkbox" class="mr-2">
                    <span class="flex-1">${shoppingInput.value}</span>
                    <button onclick="this.parentElement.remove()" 
                            class="text-red-500 hover:text-red-700">
                      ×
                    </button>
                `;
                shoppingItems.appendChild(newItem);
                shoppingInput.value = '';
            }
        });

        document.querySelector('.print-button')?.addEventListener('click', () => {
            window.print();
        });
    }
});