document.addEventListener("DOMContentLoaded", function () {
    renderProducts();
  });
  
  document.getElementById('product-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const name = document.getElementById('name').value.trim();
    const sku = document.getElementById('sku').value.trim();
    const quantity = parseInt(document.getElementById('quantity').value);
    const cost = parseFloat(document.getElementById('cost').value);
    const price = parseFloat(document.getElementById('price').value);
    const tax = parseFloat(document.getElementById('tax').value);
  
    const product = { name, sku, quantity, cost, price, tax };
  
    let products = JSON.parse(localStorage.getItem('products')) || [];
  
    if (this.dataset.editingIndex) {
      // Editing existing product
      const index = parseInt(this.dataset.editingIndex);
      products[index] = product;
      delete this.dataset.editingIndex;
    } else {
      // Adding new product
      products.push(product);
    }
  
    localStorage.setItem('products', JSON.stringify(products));
    this.reset();
    renderProducts();
  });
  
  function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
  
    const products = JSON.parse(localStorage.getItem('products')) || [];
  
    products.forEach((product, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${product.name}</td>
        <td>${product.sku}</td>
        <td>${product.quantity}</td>
        <td>
          <button onclick="editProduct(${index})">Edit</button>
          <button onclick="deleteProduct(${index})">Delete</button>
        </td>
      `;
      productList.appendChild(row);
    });
  }
  
  function deleteProduct(index) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    renderProducts();
  }
  
  function editProduct(index) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products[index];
  
    document.getElementById('name').value = product.name;
    document.getElementById('sku').value = product.sku;
    document.getElementById('quantity').value = product.quantity;
    document.getElementById('cost').value = product.cost;
    document.getElementById('price').value = product.price;
    document.getElementById('tax').value = product.tax;
  
    document.getElementById('product-form').dataset.editingIndex = index;
  }
  