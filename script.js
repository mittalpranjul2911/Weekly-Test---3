const Products = [
    { id: 1, name: 'Product-1', price: 100 },
    { id: 2, name: 'Product-2', price: 200 },
    { id: 3, name: 'Product-3', price: 300 },
  ];
  
  let cart = [];
  
  function renderProductList() {
    const productList = document.querySelector('#product-list tbody');
    productList.innerHTML = '';
  
    Products.forEach(product => {
      const row = document.createElement('tr');
      row.classList.add('product-item');
      row.innerHTML = `
        <td>${product.name}</td>
        <td>$${product.price}</td>
        <td><button onclick="addToCart(${product.id})">+</button></td>
        <td><button onclick="removeFromCart(${product.id})">-</button></td>
      `;
      productList.appendChild(row);
    });
  }
  
  function renderCart() {
    const cartTable = document.querySelector('#cart tbody');
    cartTable.innerHTML = '';
  
    if (cart.length === 0) {
      cartTable.innerHTML = '<tr><td colspan="3">No Product added to the cart</td></tr>';
    } else {
      cart.forEach(item => {
        const row = document.createElement('tr');
        row.classList.add('cart-item');
        row.innerHTML = `
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>$${item.price * item.quantity}</td>
        `;
        cartTable.appendChild(row);
      });
  
      const totalPrice = document.getElementById('total-price');
      const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
      totalPrice.textContent = `Total Price: $${total}`;
    }
  }
  
  function addToCart(productId) {
    const product = Products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
  
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ id: productId, name: product.name, price: product.price, quantity: 1 });
    }
  
    renderCart();
  }
  
  function removeFromCart(productId) {
    const existingItem = cart.find(item => item.id === productId);
  
    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity--;
      } else {
        cart = cart.filter(item => item.id !== productId);
      }
    }
  
    renderCart();
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    renderProductList();
    renderCart();
  });
