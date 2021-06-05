import http from "../config";
class userService {
  saveUser = async (data) => {
    return await http.post("user/create", {
      name: data.name,
      country: data.country,
      profession: data.profession,
      experience: data.experience,
      email: data.email,
    });
  };

  updateUser = async (data) => {
    return await http.put(`user/update/${data.id}`, {
      name: data.name,
      country: data.country,
      profession: data.profession,
      experience: data.experience,
      email: data.email,
    });
  };

  deleteUser = async (id) => {
    return await http.delete(`user/delete/${id}`);
  };

  getUser = async () => {
    try {
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
