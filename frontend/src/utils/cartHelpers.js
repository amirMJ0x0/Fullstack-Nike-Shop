export const getCartFromLocalStorage = () => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : { items: [] };
};

export const saveCartToLocalStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

export const clearCartFromLocalStorage = () => {
    localStorage.removeItem("cart");
};

export const addProductToLocalCart = (productId, quantity) => {
    const cart = getCartFromLocalStorage();
    const existingItem = cart.items.find((item) => item.productId === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({ productId, quantity });
    }

    saveCartToLocalStorage(cart);
    return cart;
};

export const removeProductFromLocalCart = (productId) => {
    const cart = getCartFromLocalStorage();
    cart.items = cart.items.filter((item) => item.productId !== productId);
    saveCartToLocalStorage(cart);
    return cart;
};
