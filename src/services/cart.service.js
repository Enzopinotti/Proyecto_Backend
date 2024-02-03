import { CartDao } from "../daos/factory.js";
import { ProductDao } from "../daos/factory.js";




export const getCarts = async () => {
  try {
    return await CartDao.get();
  } catch (error) {
    throw error;
  }
};

export const getCartById = async (cartId) => {
  try {
    return await CartDao.getById(cartId);
  } catch (error) { 
    throw error;
  }
};

export const getCartByUserId = async (userId) => {
  try {
    return await CartDao.getByUserId(userId);
  } catch (error) {
    throw error;
  }
}

export const createCart = async (cartData) => {
    try {
      return await CartDao.add(cartData);
    } catch (error) {
      throw error;
    }
}

export const addToCurrentCart = async (userId, productId) => {
  try {
    // Verifica si el usuario tiene un carrito existente
    const existingCart = await CartDao.getByUserId(userId);
    const product = await ProductDao.getById(productId);
    if (existingCart.status === 'success') {
      // Si el usuario tiene un carrito existente, agrega el producto al carrito actual
      const result = await CartDao.addProduct(existingCart.payload._id, product);
      return result;
    } else {
      // Si el usuario no tiene un carrito, crea un nuevo carrito y agrega el producto
      const newCart = await CartDao.add({ user: userId, products: [] });
      const result = await CartDao.addProduct(newCart.payload._id, product);
      return result;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addProductToCart = async (cartId, productId) => {
    try {
        const product = await ProductDao.getById(productId);
        return await CartDao.addProduct(cartId, product);
    } catch (error) {
        throw error;
    }
};

export const updateCart = async (cartId, products) => {
    try {
      return await CartDao.update(cartId, products);
    } catch (error) {
      throw error;
    }
};

export const changeProductQuantity = async (cartId, productId, quantity) => {
    try {
      return await CartDao.updateProductQuantity(cartId, productId, quantity);
    } catch (error) {
      throw error;
    }
};

export const deleteProductFromCart = async (cartId, productId) => {
    try {
        return await CartDao.deleteProduct(cartId, productId);
    } catch (error) {
        throw error;
    }
};
  
export const deleteAllProducts = async (cartId) => {
    try {
        return await CartDao.clear(cartId);
    } catch (error) {
        throw error;
    }
};

export const deleteCart = async (id) => {
  try {
    return await CartDao.delete(id);
  }catch (error) {
    throw new Error(`Error al eliminar el carrito: ${error.message}`);
  }
};

export const getCartSummary = async (userId) => {
  try {
    
      // Llama a la capa de persistencia para obtener el resumen del carrito desde la base de datos
      const cartSummary = await CartDao.getCartSummary(userId);
      return cartSummary;
  } catch (error) {

      throw new Error('Error al obtener el resumen del carrito desde la capa de servicio');
  }
};