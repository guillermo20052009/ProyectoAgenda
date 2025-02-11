import http from "../http-common";

class AgendaDataService {
  getAll() {
    return http.get("/contacts");
  }

  get(id) {
    return http.get(`/contacts/${id}`);
  }

  create(data) {
    return http.post("/contacts", data);
  }

  update(id, data) {
    return http.put(`/contacts/${id}`, data);
  }

  delete(id) {
    return http.delete(`/contacts/${id}`);
  }

  deleteAll() {
    return http.delete(`/contacts`);
  }
}

export default new AgendaDataService();