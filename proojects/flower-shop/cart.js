// Cart functionality
let cart = [];
const cartCount = document.getElementById('cartCount');
const cartBtn = document.getElementById('cartBtn');

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('flowerShopCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('flowerShopCart', JSON.stringify(cart));
}

// Update cart count display
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Add item to cart
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCartCount();
    saveCart();
    showCartNotification(product.name);
}

// Show add to cart notification
function showCartNotification(productName) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <p>${productName} added to cart!</p>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 2000);
}

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', loadCart);

// Cart button click event
cartBtn.addEventListener('click', function(e) {
    e.preventDefault();
    showCartModal();
});

// Show cart modal
function showCartModal() {
    const modalContent = document.getElementById('modalContent');
    
    if (cart.length === 0) {
        modalContent.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h2>Your cart is empty</h2>
                <p>Start shopping to add items to your cart</p>
                <button id="continueShoppingBtn">Continue Shopping</button>
            </div>
        `;
        
        document.getElementById('continueShoppingBtn').addEventListener('click', function() {
            modal.style.display = 'none';
            document.querySelector('.featured-products').scrollIntoView({ behavior: 'smooth' });
        });
    } else {
        modalContent.innerHTML = `
            <div class="cart-modal">
                <h2>Your Shopping Cart</h2>
                <div class="cart-items" id="cartItems"></div>
                <div class="cart-summary">
                    <p>Total: <span id="cartTotal">$${calculateCartTotal().toFixed(2)}</span></p>
                    <button id="checkoutBtn">Proceed to Checkout</button>
                    <button id="continueShoppingBtn2">Continue Shopping</button>
                </div>
            </div>
        `;
        
        displayCartItems();
        
        document.getElementById('checkoutBtn').addEventListener('click', function() {
            alert('Proceeding to checkout! In a real app, this would redirect to checkout page.');
        });
        
        document.getElementById('continueShoppingBtn2').addEventListener('click', function() {
            modal.style.display = 'none';
            document.querySelector('.featured-products').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    modal.style.display = 'block';
}

// Display cart items in modal
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                <p>Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <div class="cart-item-actions">
                <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                <button class="quantity-btn increase" data-id="${item.id}">+</button>
                <button class="remove-btn" data-id="${item.id}"><i class="fas fa-trash"></i></button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    
    // Add event listeners to quantity buttons
    document.querySelectorAll('.decrease').forEach(btn => {
        btn.addEventListener('click', function() {
            updateCartItemQuantity(parseInt(this.getAttribute('data-id')), -1);
        });
    });
    
    document.querySelectorAll('.increase').forEach(btn => {
        btn.addEventListener('click', function() {
            updateCartItemQuantity(parseInt(this.getAttribute('data-id')), 1);
        });
    });
    
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            removeCartItem(parseInt(this.getAttribute('data-id')));
        });
    });
}

// Update cart item quantity
function updateCartItemQuantity(productId, change) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += change;
        
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        
        updateCartCount();
        saveCart();
        showCartModal(); // Refresh cart modal
    }
}

// Remove item from cart
function removeCartItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    saveCart();
    showCartModal(); // Refresh cart modal
}

// Calculate cart total
function calculateCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}