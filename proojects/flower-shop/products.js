document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');

    // Product data
    const products = [
        {
            id: 1,
            name: "Red Rose Bouquet",
            price: 29.99,
            description: "A dozen beautiful red roses, perfect for romantic occasions.",
            image: "https://i.postimg.cc/zDn2NBh9/download-13.jpg",
            category: "roses"
        },
        {
            id: 2,
            name: "Golden Leaf Arrangement",
            price: 39.99,
            description: "Elegant arrangement with golden leaves and seasonal flowers.",
            image: "https://i.postimg.cc/YCjxvq42/download-14.jpg",
            category: "arrangements"
        },
        {
            id: 3,
            name: "Pink Flower Basket",
            price: 34.99,
            description: "Charming basket filled with pink peonies and baby's breath.",
            image: "https://i.postimg.cc/pXKmkwgQ/download-15.jpg",
            category: "arrangements"
        },
        {
            id: 4,
            name: "Black Rose Single Stem",
            price: 12.99,
            description: "Exotic black rose, a unique gift for special occasions.",
            image: "https://i.postimg.cc/2j2cytHw/download-16.jpg",
            category: "roses"
        },
        {
            id: 5,
            name: "White Rose Bouquet",
            price: 27.99,
            description: "Pure white roses symbolizing purity and new beginnings.",
            image: "https://i.postimg.cc/GhjDJB8J/download-17.jpg",
            category: "roses"
        },
        {
            id: 6,
            name: "Sunflower Collection",
            price: 32.99,
            description: "Bright and cheerful sunflowers to brighten any room.",
            image: "https://i.postimg.cc/dQ6Q5G61/download-18.jpg",
            category: "seasonal"
        },
        {
            id: 7,
            name: "Lavender Field",
            price: 45.99,
            description: "Relaxing lavender arrangement with eucalyptus.",
            image: "https://i.postimg.cc/nzLSp8yN/download-19.jpg",
            category: "arrangements"
        },
        {
            id: 8,
            name: "Orchid Elegance",
            price: 49.99,
            description: "Exotic phalaenopsis orchid in a ceramic pot.",
            image: "https://i.postimg.cc/7LjX8CNJ/download-20.jpg",
            category: "plants"
        }
    ];

    // Display products
    function displayProducts(productsToDisplay = products) {
        const productsGrid = document.getElementById('productsGrid');
        
        if (!productsGrid) {
            console.error('productsGrid element not found!');
            return;
        }

        productsGrid.innerHTML = '';

        productsToDisplay.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            // Create image with error handling
            const img = new Image();
            img.src = product.image;
            img.alt = product.name;
            img.className = 'product-img';
            img.onerror = function() {
                this.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
            };
            
            productCard.innerHTML = `
                <div class="img-container"></div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            `;
            
            // Insert the image properly
            productCard.querySelector('.img-container').appendChild(img);
            productsGrid.appendChild(productCard);
        });

        // Add event listeners to "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                const product = products.find(p => p.id === productId);
                if (product) {
                    console.log('Adding to cart:', product.name);
                    // addToCart(product); // Uncomment when cart.js is ready
                }
            });
        });
    }

    // Show product modal
    function showProductModal(productId) {
        const product = products.find(p => p.id === productId);
        const modal = document.getElementById('productModal');
        const modalContent = document.getElementById('modalContent');
        
        if (!product || !modal || !modalContent) {
            console.error('Modal elements not found!');
            return;
        }
        
        modalContent.innerHTML = `
            <div class="modal-product">
                <div class="modal-product-image">
                    <img src="${product.image}" alt="${product.name}" class="modal-img">
                </div>
                <div class="modal-product-info">
                    <h2>${product.name}</h2>
                    <p class="modal-product-price">$${product.price.toFixed(2)}</p>
                    <p class="modal-product-description">${product.description}</p>
                    <button class="add-to-cart modal-add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `;

        // Add event listener to modal's "Add to Cart" button
        document.querySelector('.modal-add-to-cart')?.addEventListener('click', function() {
            console.log('Adding to cart from modal:', product.name);
            // addToCart(product); // Uncomment when cart.js is ready
            modal.style.display = 'none';
        });

        modal.style.display = 'block';
        
        // Close modal when clicking outside content
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Initialize products
    displayProducts();
    
    // Add event listeners to product images for modal view
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('product-img')) {
            const productCard = e.target.closest('.product-card');
            if (productCard) {
                const productId = parseInt(productCard.querySelector('.add-to-cart')?.getAttribute('data-id'));
                if (productId) {
                    showProductModal(productId);
                }
            }
        }
    });
});