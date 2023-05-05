import axios from "axios";

export const getCategories = async () => {
  return await axios.get("http://127.0.0.1:2001/categories");
};

export const getCategory = async (slug) => {
  return await axios.get(`http://127.0.0.1:2001/category/${slug}`);
};

export const removeCategory = async (slug, authhToken) => {
  return await axios.delete(`http://127.0.0.1:2001/category/${slug}`, {
    headers: {
      token: authhToken,
    },
  });
};

export const updateCategory = async (slug, category, authhToken) => {
  return await axios.put(`http://127.0.0.1:2001/category/${slug}`, category, {
    headers: {
      token: authhToken,
    },
  });
};

export const createCategory = async (category, authhToken) => {
  return await axios.post(`http://127.0.0.1:2001/category`, category, {
    headers: {
      token: authhToken,
    },
  });
};


export const getCategroySubs = async(_id)  => {
  return await axios.get(`http://127.0.0.1:2001/category/sub/${_id}`);
}
