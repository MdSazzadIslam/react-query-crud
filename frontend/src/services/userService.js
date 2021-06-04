import http from "../config";
class userService {
  saveUser = async (data) => {
    debugger;
    return await http.post("user/create", {
      name: data.name,
      country: data.country,
      profession: data.profession,
      experience: data.experience,
      email: data.email,
    });
    /* .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => console.log(err)); */
  };

  updateUser = async (id, data) => {
    debugger;
    return await http
      .put(`user/update/${id}`, {
        data,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
  };

  deleteUser = async (id) => {
    debugger;
    return await http
      .delete(`user/delete/${id}`)
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
  };

  getUser = async () => {
    try {
      debugger;
      return await http.get("user");
    } catch (err) {
      console.log(err);
    }
  };
  getUserById = async (id) => {
    try {
      return await http.get(`user//${id}`);
    } catch (err) {
      console.log(err);
    }
  };
}
export default new userService();
