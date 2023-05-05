import axios from "axios";

export const createProduct = async (product, authhToken) => {
  return await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: {
      token: authhToken,
    },
  });
};

export const getProductsByCount = async (count) => {
  return await axios.get(`${process.env.REACT_APP_API}/products/${count}`);
};

export const removeProduct = async (slug, authhToken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/products/${slug}`, {
    headers: {
      token: authhToken,
    },
  });
};

export const getProduct = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);
};

export const updateProduct = async (slug, product, authhToken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/product/${slug}`,
    product,
    {
      headers: {
        token: authhToken,
      },
    }
  );
};

export const getProducts = async (sort, order, page) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/products`,
    sort,
    order,
    page
  );
};

export const getproductCount = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/products/total`);
};

export const productStar = async (productId, star, authhToken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/product/star/${productId}`,
    { star },
    {
      headers: {
        token: authhToken,
      },
    }
  );
};

export const getRelated = async (productId) => {
  return await axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`);
};