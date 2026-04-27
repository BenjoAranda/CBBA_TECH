// =============================================
//  CBBA TECH - app.js
// =============================================

// ── NAVEGACIÓN SPA ──────────────────────────
const enlaces = document.querySelectorAll(".nav-link");

enlaces.forEach(function (enlace) {
  enlace.addEventListener("click", function (evento) {
    evento.preventDefault();

    const vista = enlace.dataset.view;

    // Ocultar todas las vistas
    document.querySelectorAll(".view").forEach(function (seccion) {
      seccion.classList.remove("active");
    });

    // Quitar activo de todos los links
    enlaces.forEach(function (link) {
      link.classList.remove("active");
    });

    // Mostrar la vista seleccionada y marcar link activo
    document.getElementById("view-" + vista).classList.add("active");
    enlace.classList.add("active");
  });
});

// ── PRODUCTOS ───────────────────────────────
const productos = [
  { id: 1, nombre: "Cargadores",           descripcion: "Cargadores de tipo B y C",                          precio: 45  },
  { id: 2, nombre: "Audifonos",            descripcion: "Audifonos de cable como de bluetooth",               precio: 250 },
  { id: 3, nombre: "Protectores",          descripcion: "Protectores definidos y a su personalizacion",       precio: 60  },
  { id: 4, nombre: "Baterias",             descripcion: "Baterias Originales de los modelos Samsung y Apple", precio: 150 },
  { id: 5, nombre: "Pantallas",            descripcion: "Pantallas Originales de marca Samsung y Apple",      precio: 150 },
  { id: 6, nombre: "Soporte de celular",   descripcion: "Soportes de cualquier tamaño para su celular",       precio: 100 },
  { id: 7, nombre: "Protectores USB",      descripcion: "Protectores personalizados a su gusto",              precio: 40  },
  { id: 8, nombre: "Fundas Transparentes", descripcion: "Fundas para celulares Samsung y Apple",              precio: 15  },
  { id: 9, nombre: "Mandos de mano",       descripcion: "Mandos adaptables a celulares Samsung y Apple",      precio: 70  },
];

// ── ESTADO DEL CARRITO ──────────────────────
let carrito = [];

function guardarCarrito() {
  localStorage.setItem("tech_carrito", JSON.stringify(carrito));
}

function cargarCarrito() {
  const carritoGuardado = localStorage.getItem("tech_carrito");
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
  }
}

// ── ACTUALIZAR CONTADOR ─────────────────────
function actualizarContador() {
  const contador = document.getElementById("cart-count");
  const total = carrito.reduce((acc, p) => acc + p.cantidad, 0);
  contador.textContent = total;

  // Animación "bump"
  contador.classList.remove("bump");
  void contador.offsetWidth; // fuerza reflow para reiniciar la animación
  contador.classList.add("bump");
  setTimeout(() => contador.classList.remove("bump"), 300);
}

// ── RENDER PRODUCTOS ────────────────────────
function renderizarProductos() {
  const contenedor = document.getElementById("products-container");
  contenedor.innerHTML = "";

  productos.forEach(function (producto) {
    contenedor.innerHTML += `
      <div class="product-card">
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <span class="product-price">Bs. ${producto.precio}</span>
        <button class="btn-add" data-id="${producto.id}">+ Agregar</button>
      </div>
    `;
  });

  // Eventos de los botones
  document.querySelectorAll(".btn-add").forEach(function (boton) {
    boton.addEventListener("click", function () {
      const id = parseInt(this.dataset.id);
      const producto = productos.find((p) => p.id === id);
      const existente = carrito.find((p) => p.id === id);

      if (existente) {
        existente.cantidad += 1;
      } else {
        carrito.push({ ...producto, cantidad: 1 });
      }

      guardarCarrito();
      actualizarContador();
      renderizarCarrito();

      // Feedback visual
      this.textContent = "✔ Agregado";
      const btn = this;
      setTimeout(() => { btn.textContent = "+ Agregar"; }, 1000);
    });
  });
}

// ── RENDER CARRITO ──────────────────────────
function renderizarCarrito() {
  const contenedor = document.getElementById("cart-container");
  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = `
      <div class="cart-empty">
        <span class="cart-empty-icon">🛒</span>
        <h3>Tu carrito está vacío</h3>
        <p>Agrega productos desde el menú</p>
      </div>
    `;
    return;
  }

  // Renderizar cada item
  carrito.forEach(function (producto) {
    contenedor.innerHTML += `
      <div class="cart-item">
        <div class="cart-item-info">
          <p class="cart-item-name">${producto.nombre}</p>
          <p class="cart-item-price">Bs. ${producto.precio} c/u</p>
        </div>
        <div class="cart-item-controls">
          <button class="qty-btn" data-action="decrease" data-id="${producto.id}">−</button>
          <span class="qty-value">${producto.cantidad}</span>
          <button class="qty-btn" data-action="increase" data-id="${producto.id}">+</button>
        </div>
        <div class="cart-item-total">
          Bs. ${(producto.precio * producto.cantidad).toFixed(2)}
        </div>
      </div>
    `;
  });

  // Total general
  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  contenedor.innerHTML += `
    <div class="cart-summary">
      <div class="cart-summary-row">
        <span>Subtotal</span>
        <span>Bs. ${total.toFixed(2)}</span>
      </div>
      <div class="cart-summary-row">
        <span>Envío</span>
        <span>Gratis 🎉</span>
      </div>
      <div class="cart-total-row">
        <span class="cart-total-label">Total</span>
        <span class="cart-total-amount">Bs. ${total.toFixed(2)}</span>
      </div>
      <button class="btn-checkout" onclick="alert('¡Pedido confirmado! Gracias por tu compra 🎉')">
        🛍️ Confirmar Pedido
      </button>
    </div>
  `;

  // Eventos botones + y −
  contenedor.querySelectorAll(".qty-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const id = parseInt(this.dataset.id);
      const accion = this.dataset.action;
      const item = carrito.find((p) => p.id === id);

      if (!item) return;

      if (accion === "increase") {
        item.cantidad += 1;
      } else if (accion === "decrease") {
        item.cantidad -= 1;
        if (item.cantidad <= 0) {
          carrito = carrito.filter((p) => p.id !== id);
        }
      }

      guardarCarrito();
      actualizarContador();
      renderizarCarrito();
    });
  });
}

// ── INIT ────────────────────────────────────
cargarCarrito();
renderizarProductos();
renderizarCarrito();
actualizarContador();
