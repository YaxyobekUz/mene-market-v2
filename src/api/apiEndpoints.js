const apiEndpoints = {
  logout: "logout",
  loginUser: "login",
  createUser: "api/users",
  getUserData: "profile",
  verifyOtp: "api/users/verifyOTP",
  resendOtp: "api/users/resendOTP",

  getProducts: "api/products",
  getProduct: (id) => `api/products/${id}`,
  getProductComments: (id) => `api/comments/product/${id}`,

  getNews: "api/news",
  getNewsById: (id) => `api/news/${id}`,

  getBlogs: "api/blogs",
  getBlogById: (id) => `api/blogs/${id}`,

  getStreams: "api/oqim",
  getStream: (id) => `api/oqim/${id}`,
  createStream: (id) => `api/oqim/${id}`,
  createStreamOrder: (id) => `api/oqim/${id}/order`,


  createOrder: (id) => `api/orders/${id}`,

  getPayments: "api/payments",
  createPayment: "api/payments",

  createComment: (id) => `api/comments/${id}`,
};

export default apiEndpoints;
