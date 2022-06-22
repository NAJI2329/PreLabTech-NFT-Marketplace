import axios from "axios";

export default {
  createCollection(formData) {
    return axios.post("/collection/createCollection", formData).then((response) => {
      return response.data;
    });
  },
  verifyCollection(_id, contract_address) {
    return axios.post("/collection/verifyCollection", { _id, contract_address }).then((response) => {
      return response.data;
    });
  },
  getCollections(address, chain) {
    return axios.post("/collection/getCollections", { address, chain }).then((response) => {
      return response.data;
    });
  },
  getCollectionData(shortUrl, chain) {
    return axios.post("/collection/getCollectionData", { shortUrl, chain }).then((response) => {
      return response.data;
    });
  },
  getNFTData(_id) {
    return axios.get("/collection/getNFTData/"+_id).then((response) => {
      return response.data;
    });
  }
};
