import cartModel from "../models/cart.model.js"
import { calculateTotalPrice } from "../../../utils.js";

export default class CartManager {
    constructor() {}

    get = async () => {
        try {
            const carts = await cartModel.find();
            return { status: "success", payload: carts };
        }catch (error) {
            return { status: "error", error: `Error al obtener carritos: ${error.message}` };
        }
    }

    getById = async (id) => {
        try {
            const cart = await cartModel.findById(id);
            if (!cart) {
                return { status: "error", error: "Carrito no encontrado" };
            }
            return { status: "success", payload: cart };
        } catch (error) {
            return { status: "error", error: `Error al obtener el carrito: ${error.message}` };
        }
    }
    
    getByUserId = async (userId) => {
        try {
            const cart = await cartModel.findOne({ user: userId });
            if (!cart) {
                return { status: "error", error: "Carrito no encontrado" };
            }
            return { status: "success", payload: cart };
        } catch (error) {
            return { status: "error", error: `Error al obtener el carrito: ${error.message}` };
        }
    }

    add = async (cart) => {
        try {
            const newCart = await cartModel.create(cart);
            return { status: "success", payload: newCart };
        } catch (error) {
            return { status: "error", error: `Error al agregar el carrito: ${error.message}` };
        }
    }

    update = async (id, products) => {
        try {
            const updatedCart = await cartModel.findByIdAndUpdate(
                id,
                { $set: { products: products } },
                { new: true }
            );
    
            if (!updatedCart) {
                return { status: "error", error: "Carrito no encontrado" };
            }
    
            return { status: "success", payload: updatedCart };
        } catch (error) {
            return { status: "error", error: `Error al actualizar el carrito: ${error.message}` };
        }
    };

    delete = async (id) => {
        try {
            const deletedCart = await cartModel.findByIdAndDelete(id);
            if (!deletedCart) {
                return { status: "error", error: "Carrito no encontrado" };
            }
            return { status: "success", payload: deletedCart };
        } catch (error) {
            return { status: "error", error: `Error al eliminar el carrito: ${error.message}` };
        }
    }

    deleteProduct = async (id, productId) => {
        try {
            const updatedCart = await cartModel.findByIdAndUpdate(
                id,
                { $pull: { products: { product: productId } } },
                { new: true }
            );
    
            if (!updatedCart) {
                return { status: "error", error: "Carrito no encontrado" };
            }
    
            return { status: "success", payload: updatedCart };
        } catch (error) {
            return { status: "error", error: `Error al eliminar el producto del carrito: ${error.message}` };
        }
    }

    addProduct = async (id, product) => {
        try {
            const cart = await cartModel.findById(id);
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }
            console.log('cart en persistencia: ', cart)
            // Verificar si el producto ya existe en el carrito
            const existingProduct = cart.products.find(
                (item) => String(item.product._id) === String(product._id)
            );
            console.log('existingProduct: ', existingProduct)
            if (existingProduct) {
                // Si el producto ya existe, aumenta la cantidad en uno
                existingProduct.quantity += 1;
            } else {
                // Si el producto no está en el carrito, se agrega con cantidad 1
                cart.products.push({ product: product, quantity: 1 });
            }
    
            // Guardar el carrito actualizado utilizando el método save de Mongoose
            const updatedCart = await cart.save();
            return updatedCart;
        } catch (error) {
            throw error;
        }
    };
    
    
    updateProductQuantity = async (id, productId, quantity) => {
        try {
            // Verificar si el carrito existe y no está vacío
            const cart = await cartModel.findOne({ _id: id });
    
            if (!cart || cart.products.length === 0) {
                throw new Error('Carrito no encontrado o vacío.');
            }
    
            // Actualizar la cantidad del producto
            const result = await cartModel.updateOne(
                { _id: id, "products.product": productId },
                { $set: { "products.$.quantity": quantity } }
            );
    
            if (result.nModified === 0) {
                throw new Error('No se encontró el carrito o el producto en el carrito.');
            }
    
            return result;
        } catch (error) {
            throw error;
        }
    }
    clear = async (id) => {
        
        return await cartModel.findByIdAndUpdate(id, { products: [] })
    }

    getCartSummary = async (userId) => {
        try {

            console.log('id en mongodb: ', userId)
            // Obtén el carrito específico por el ID del usuario
            const cart = await cartModel.findOne({ user: userId });
            
    
            if (!cart) {
                return null; // Puedes manejar esto de la manera que desees, por ejemplo, lanzar un error
            }
    
            // Utiliza la función calculateTotalPrice para calcular el precio total del carrito
            const totalPrice = calculateTotalPrice(cart.products);
    
            return {
                totalItems: cart.products.length,
                totalPrice,
            };
        } catch (error) {
            console.error('Error al obtener el resumen del carrito desde la base de datos:', error);
            throw new Error('Error al obtener el resumen del carrito desde la base de datos');
        }
    }
}