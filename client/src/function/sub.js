import axios from "axios";

export const getSubs = async () => {
  return await axios.get("http://127.0.0.1:2001/subs");
};

export const getSub = async (slug) => {
  return await axios.get(`http://127.0.0.1:2001/sub/${slug}`);
};

export const removeSub = async (slug, authhToken) => {
  return await axios.delete(`http://127.0.0.1:2001/sub/${slug}`, {
    headers: {
      token: authhToken,
    },
  });
};

export const updateSub = async (slug, sub, authhToken) => {
  return await axios.put(`http://127.0.0.1:2001/sub/${slug}`, sub, {
    headers: {
      token: authhToken,
    },
  });
};

export const createSub = async (sub, authhToken) => {
  return await axios.post(`http://127.0.0.1:2001/sub`, sub, {
    headers: {
      token: authhToken,
    },
  });
};
