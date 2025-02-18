import http from "../http-common_tut";

class TutorialDataService {
  getAll() {
    return http.get("/tutorials");
  }
}

export default new TutorialDataService();