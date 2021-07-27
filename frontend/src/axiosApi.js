import axios from 'axios'


const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/',
    timeout: 5000,
    headers: {
        'Authorization': "JWT " + localStorage.getItem('access'),
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});



axiosInstance.interceptors.response.use(
    response => response,
    error => {
      const originalRequest = error.config;
      
      if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
          const refresh_token = JSON.parse(localStorage.getItem('jwtToken')).refresh;

          return axiosInstance
              .post('/accounts/login/refresh/', {refresh: refresh_token})
              .then((response) => {

                  localStorage.setItem("jwtToken", JSON.stringify(response.data));

                  axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
                  originalRequest.headers['Authorization'] = "JWT " + response.data.access;

                  return axiosInstance(originalRequest);
              })
              .catch(err => {
                  console.log(err)
              });
      }
      return Promise.reject(error);
  }
);
export default axiosInstance