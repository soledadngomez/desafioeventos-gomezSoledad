let productos = [];

let formulario;
let inputId;
let inputNombre;
let inputAutor;
let inputEditorial;
let inputPrecioVenta;
let inputCantidad;
let contenedorProductos;

class Producto {
  constructor(id, nombre, autor, editorial, precioVenta, cantidad) {
    this.id = id;
    this.nombre = nombre.toUpperCase();
    this.autor = autor.toUpperCase();
    this.editorial = editorial.toUpperCase();
    this.precioVenta = precioVenta;
    this.cantidad = cantidad;
  }

  calcularPrecioVenta = () => this.precioVenta * this.cantidad;
}

function inicializarElementos() {
  formulario = document.getElementById("formulario");
  inputId = document.getElementById("inputId");
  inputNombre = document.getElementById("inputNombreProducto");
  inputAutor = document.getElementById("inputAutorProducto");
  inputEditorial = document.getElementById("inputEditorialProducto");
  inputPrecioVenta = document.getElementById("inputPrecioVenta");
  inputCantidad = document.getElementById("inputCantidad");
  contenedorProductos = document.getElementById("contenedorProductos");
}

function inicializarEventos() {
  formulario.onsubmit = (event) => validarFormulario(event);
}

function validarFormulario(event) {
  event.preventDefault();
  let idProducto = inputId.value;
  let nombre = inputNombre.value;
  let autor = inputAutor.value;
  let editorial = inputEditorial.value;
  let precioVenta = parseFloat(inputPrecioVenta.value);
  let cantidad = parseInt(inputCantidad.value);

  const idExiste = productos.some((producto) => producto.id === idProducto);
  if (!idExiste) {
    let producto = new Producto(
      idProducto,
      nombre,
      autor,
      editorial,
      precioVenta,
      cantidad
    );

    productos.push(producto);
    formulario.reset();

    mostrarProductos();
  } else {
    alert("El id ya existe");
  }
}

function eliminarProducto(idProducto) {
  let columnaBorrar = document.getElementById(`columna-${idProducto}`);
  let indiceBorrar = productos.findIndex(
    (producto) => Number(producto.id) === Number(idProducto)
  );

  productos.splice(indiceBorrar, 1);
  columnaBorrar.remove();
}

function mostrarProductos() {
  contenedorProductos.innerHTML = "";
  productos.forEach((producto) => {
    let column = document.createElement("div");
    column.className = "col-md-4 mt-3";
    column.id = `columna-${producto.id}`;
    column.innerHTML = `
            <div class="card">
                <div class="card-body">
                <p class="card-text">ID:
                    <b>${producto.id}</b>
                </p>
                <p class="card-text">Nombre:
                    <b>${producto.nombre}</b>
                </p>
                <p class="card-text">Autor:
                    <b>${producto.autor}</b>
                </p>
                <p class="card-text">Editorial:
                    <b>${producto.editorial}</b>
                </p>
                <p class="card-text">Precio venta:
                    <b>${producto.precioVenta}</b>
                </p>
                <p class="card-text">Cantidad:
                    <b>${producto.cantidad}</b>
                </p>
                </div>
                <div class="card-footer">
                    <button class="btn btn-danger" id="botonEliminar-${producto.id}" >Eliminar</button>
                </div>
            </div>`;

    contenedorProductos.append(column);

    let botonEliminar = document.getElementById(`botonEliminar-${producto.id}`);
    botonEliminar.onclick = () => eliminarProducto(producto.id);
  });
}

function main() {
  inicializarElementos();
  inicializarEventos();
}

main();