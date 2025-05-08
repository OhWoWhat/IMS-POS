let products = JSON.parse(localStorage.getItem('products')) || [];
let cart = [];

function renderProductOptions() {
  const select = document.getElementById('product-select');
  select.innerHTML = '<option value="">Select Product</option>'; // Clear previous options

  products.forEach((p, i) => {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = `${p.name} - $${p.price} (Stock: ${p.quantity})`;
    select.appendChild(option);
  });
}

function addToCart() {
  const productIndex = document.getElementById('product-select').value;
  const quantity = parseInt(document.getElementById('quantity').value);

  if (productIndex === "" || isNaN(quantity) || quantity <= 0) {
    alert("Please select a product and enter a valid quantity.");
    return;
  }

  const product = products[productIndex];

  if (quantity > product.quantity) {
    alert("Not enough stock.");
    return;
  }

  // Check if already in cart
  const existing = cart.find(item => item.index == productIndex);
  if (existing) {
    if (existing.qty + quantity > product.quantity) {
      alert("Exceeds available stock.");
      return;
    }
    existing.qty += quantity;
  } else {
    cart.push({ index: productIndex, qty: quantity });
  }

  document.getElementById('quantity').value = ''; // Reset input
  renderCart();
}

function renderCart() {
  const tbody = document.getElementById('cart-list');
  tbody.innerHTML = '';
  let totalAmount = 0;

  cart.forEach((item, i) => {
    const product = products[item.index];
    const qty = item.qty;
    const price = parseFloat(product.price);
    const taxRate = parseFloat(product.tax || 0);

    const subtotal = price * qty;
    const tax = subtotal * (taxRate / 100);
    const total = subtotal + tax;

    totalAmount += total;

    tbody.innerHTML += `
      <tr>
        <td>${product.name}</td>
        <td>${qty}</td>
        <td>$${price.toFixed(2)}</td>
        <td>$${subtotal.toFixed(2)}</td>
        <td>$${tax.toFixed(2)}</td>
        <td>$${total.toFixed(2)}</td>
        <td><button onclick="removeFromCart(${i})">Remove</button></td>
      </tr>
    `;
  });

  document.getElementById('total-count').textContent = totalAmount.toFixed(2);
}

function removeFromCart(i) {
  cart.splice(i, 1);
  renderCart();
}

function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty.");
    return;
  }

  cart.forEach(item => {
    products[item.index].quantity -= item.qty;
  });

  localStorage.setItem('products', JSON.stringify(products));
  cart = [];
  alert("Transaction complete!");
  location.reload();
}

// Initialize
renderProductOptions();
