export const getProducts = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products');
    if (!response.ok) {
      throw new Error('Error al traer los productos');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    if (!response.ok) {
      throw new Error('Error al traer el producto');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
