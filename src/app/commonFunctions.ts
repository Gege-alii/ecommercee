import Swal from "sweetalert2";

let wishlist: { id: any }[] = [];
let cart: { quantity: number; id: any }[] = [];
let position = 0;
let userLogged = isBrowser() ? localStorage.getItem('logged') : null;

// Helper to check if we're in a browser environment
function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}


export function AddToCart(product: any,quantity_product:number) {
  if (isBrowser()) {
    cart = JSON.parse(localStorage.getItem('cart')!) || [];

    const existingProduct = cart.find((element: { id: any }) => element.id === product.id);

    if (existingProduct) {
      Swal.fire({
        title: "Your cart already has this product",
        text: "We will increase the quantity",
        icon: "success",
      });

      position = cart.indexOf(existingProduct);
      cart[position].quantity += quantity_product;
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      Added(product,quantity_product);
    }
  }
}

function Added(product: any,quantity_product:number) {
  let cart_product = {
    id: product.id,
    name: product.title,
    price: product.price,
    image:product.image,
    quantity:quantity_product,
    user:userLogged
  };

  cart.push(cart_product);
  
  if (isBrowser()) {
    localStorage.setItem('cart', JSON.stringify(cart));
    Swal.fire({
      title: "Good job!",
      text: "Your product is added successfully to your cart",
      icon: "success",
    });
  }
}

export function AddToWishList(product: any) {
  if (isBrowser()) {
    wishlist = JSON.parse(localStorage.getItem('wishlist')!) || [];

    const existingWishlistProduct = wishlist.find((element: { id: any }) => element.id === product.id);

    if (existingWishlistProduct) {
      Swal.fire({
        title: "Error!",
        text: "Your Wishlist already has this product",
        icon: "error",
      });
    } else {
      let wishlist_product = {
        id: product.id,
        name: product.title,
        price: product.price,
        image:product.image,
        user:userLogged,
        rating:product.rating.rate,
        count:product.rating.count

      };
      wishlist.push(wishlist_product);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));

      Swal.fire({
        title: "Good job!",
        text: "Your product is added successfully to your Wishlist",
        icon: "success",
      });
    }
  }
}



