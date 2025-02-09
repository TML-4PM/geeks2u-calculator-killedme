document.addEventListener("DOMContentLoaded", async function () {
    const productListContainer = document.getElementById("product-list");
    const quoteOutput = document.getElementById("quote-output");

    let products = [];

    async function loadProducts() {
        try {
            const response = await fetch("data/04_productList.json");
            products = await response.json();
            renderProducts();
        } catch (error) {
            console.error("Error loading products:", error);
        }
    }

    function renderProducts() {
        products.forEach(product => {
            const productItem = document.createElement("div");
            productItem.innerHTML = `
                <label>${product.name} - $${product.price}</label>
                <input type="number" min="0" data-id="${product.sku}" placeholder="Qty">
            `;
            productListContainer.appendChild(productItem);
        });
    }

    document.getElementById("calculate").addEventListener("click", function () {
        let total = 0;
        let selectedProducts = [];

        document.querySelectorAll("input[type='number']").forEach(input => {
            const quantity = parseInt(input.value);
            if (quantity > 0) {
                const product = products.find(p => p.sku === input.dataset.id);
                if (product) {
                    selectedProducts.push({ ...product, quantity });
                    total += product.price * quantity;
                }
            }
        });

        quoteOutput.innerHTML = `<h3>Total Price: $${total.toFixed(2)}</h3>`;
    });

    loadProducts();
});
