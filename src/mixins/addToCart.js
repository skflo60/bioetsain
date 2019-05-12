import { mapActions } from 'vuex';
import { getProductById } from '@/utils/utils';

export default {
  methods: {
    ...mapActions(['addCart', 'incrementCart']),
    addToCart(product) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      if (cart.length) {
        let item = getProductById(cart, product._id);

        if (item) {
          // check if is not new item
          this.incrementCart(item);
          localStorage.setItem('cart', JSON.stringify(cart));
        } else {
          this.updateToCart(cart, product);
        }
      } else {
        this.updateToCart(cart, product);
      }
    },
    updateToCart(cart, product) {
      let item = {
        id: product._id,
        image: product.image,
        name: product.name,
        price: product.price,
        subtotal: product.price * 1,
        qty: 1
      };
      cart.push(item);
      this.addCart(item);
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }
};
