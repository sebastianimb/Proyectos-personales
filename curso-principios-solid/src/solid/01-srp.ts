(() => {
  interface Product {
    id: number;
    name: string;
  }

  // Usualmente, esto es una clase para controlar la vista que es desplegada al usuario
  // Recuerden que podemos tener muchas vistas que realicen este mismo trabajo.
  class ProductService {
    loadProduct(id: number) {
      console.log("Producto: ", { id, name: "OLED Tv" });
    }
    saveProduct(product: Product) {
      console.log("Guardando en base de datos", product);
    }
  }
  class Mailer {
    notifyClients() {
      console.log("Enviando correo a los clientes");
    }
  }
  class ProductBloc {
    private productSerive: ProductService;
    private mailer: Mailer;

    constructor(productService: ProductService, mailer: Mailer) {
      this.productSerive = productService;
      this.mailer = mailer;
    }

    loadProduct(id: number) {
      this.productSerive.loadProduct(id);
    }

    saveProduct(product: Product) {
      this.productSerive.saveProduct(product);
    }

    notifyClients() {
      this.mailer.notifyClients();
    }
  }

  class CartBloq {
    onAddToCart(productId: number) {
      // Agregar al carrito de compras
      console.log("Agregando al carrito ", productId);
    }
  }

  const productSerive = new ProductService();
  const mailer = new Mailer();
  const productBloc = new ProductBloc(productSerive, mailer);
  const cartBloq = new CartBloq();

  productBloc.loadProduct(10);
  productBloc.saveProduct({ id: 10, name: "OLED TV" });
  productBloc.notifyClients();
  cartBloq.onAddToCart(10);
})();
