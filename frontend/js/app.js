// function mostrarVista(vista) {
//   document.getElementById("view-home").classList.remove("active");
//   document.getElementById("view-menu").classList.remove("active");
//   document.getElementById("view-contact").classList.remove("active");

//   document.getElementById("view-" + vista).classList.add("active");
// }
//NAVEGACION SPA

const enlaces = document.querySelectorAll(".nav-link");

enlaces.forEach(function (enlace) {
  enlace.addEventListener("click", function (evento) {
    evento.preventDefault();

    const vista = enlace.dataset.view;

    document.querySelectorAll(".view").forEach(function (seccion) {
      seccion.classList.remove("active");
    });

    document.getElementById("view-" + vista).classList.add("active");
  });
});
//PRODUCTOS
const productos = [
  {
    id: 1,
    nombre: "Cargadores",
    descripcion: "Cargadores de tipo B y C",
    precio: 45,
  },
  {
    id: 2,
    nombre: "Audifonos",
    descripcion: "Audifonos de cable como de bluetooth",
    precio: 50,
  },
  {
    id: 3,
    nombre: "Protectores",
    descripcion: "Protectores definidos y a su personalizacion",
    precio: 60,
  },
  {
    id: 4,
    nombre: "Baterias",
    descripcion: "Baterias Originales de los modelos samsung y apple",
    precio: 150,
  },
  {
    id: 5,
    nombre: "Pantallas",
    descripcion: "Pantallas Originales de marca samsung y apple",
    precio: "150",
  },
  {
    id: 6,
    nombre: "Soporte de celular",
    descripcion: "Soportes de cualquier tamaño para su celular",
    precio: "100",
  },
  {
    id: 7,
    nombre: "Protectores para cables USB",
    descripcion: "Soportes perzonalisados a su gusto",
    precio: "40",
  },
  {
    id: 8,
    nombre: "Fundas Transparentes",
    descripcion: "Fundas para los celulares Samsung y Apple",
    precio: "15",
  },
  {
    id: 9,
    nombre: "Mandos de mano",
    descripcion: "Mandos adaptables a los celulares Samsung y Apple",
    precio: "70",
  },
];

//ESTADO DEL CARRITO
let carrito = [];

function actualizarContador() {
  const contador = document.getElementById("cart-count");
  contador.textContent = carrito.length;
}
//RENDER PRODUCTOS
function renderizarProductos() {
  //Crear contenedor de cada producto
  const contenedor = document.getElementById("products-container");
  contenedor.innerHTML = "";
  productos.forEach(function (producto) {
    contenedor.innerHTML += `
      <div class="product-card">
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <span class="product-price">Bs. ${producto.precio}</span>

        <button class="btn-add" data-id="${producto.id}">
          Agregar al carrito
        </button>
      </div>
    `;
  });

  // Funcionamiento botones
  const botones = document.querySelectorAll(".btn-add");

  botones.forEach(function (boton) {
    boton.addEventListener("click", function () {
      const id = parseInt(this.dataset.id);

      const producto = productos.find((p) => p.id === id);

      // carrito.push(producto);
      const existente = carrito.find((p) => p.id === producto.id);

      if (existente) {
        existente.cantidad += 1;
      } else {
        carrito.push({ ...producto, cantidad: 1 });
      }

      actualizarContador();
      renderizarCarrito();
    });
  });
}

//CONTADOR CARRITO
function actualizarContador() {
  const contador = document.getElementById("cart-count");
  contador.textContent = carrito.length;
}

//RENDER CARRITO
function renderizarCarrito() {
  const contenedor = document.getElementById("cart-container");

  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>El carrito está vacío</p>";
    return;
  }

  carrito.forEach(function (producto) {
    contenedor.innerHTML += `
      <div class="cart-item">
        <p>${producto.nombre} (x ${producto.cantidad})</p>
        <span>Bs. ${producto.precio}</span>
      </div>
    `;
  });
  const total = carrito.reduce((acc, producto) => {
    return acc + producto.precio * producto.cantidad;
  }, 0);

  contenedor.innerHTML += `<h3>Total: Bs. ${total}</h3>`;
}

renderizarProductos();
renderizarCarrito();
