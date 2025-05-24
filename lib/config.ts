interface ApiEndpoints {
  ask: string;
  getUser: string;
  updateUser: string;
}

const API_ENDPOINTS: ApiEndpoints = {
  ask: '/ask',
  getUser: '/getUser',
  updateUser: '/updateUser',
};

export const API_CONFIG = {
  // 是否使用代理
  USE_PROXY: true,
  
  // 后端API地址
  BACKEND_URL: 'http://35.220.240.126:8092',
  
  // API端点配置
  endpoints: API_ENDPOINTS,
  
  // 获取API URL的方法
  getApiUrl: (endpoint: string) => {
    if (API_CONFIG.USE_PROXY) {
      // 使用通用代理路由
      return `/api/proxy${endpoint}`;
    }
    return `${API_CONFIG.BACKEND_URL}${endpoint}`;
  },
  
  // 便捷方法，直接通过端点名称获取URL
  getEndpointUrl: (endpointName: keyof ApiEndpoints) => {
    const endpoint = API_ENDPOINTS[endpointName];
    return API_CONFIG.getApiUrl(endpoint);
  }
}; 