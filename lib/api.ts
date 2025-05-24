import axios from 'axios';
import { API_CONFIG } from './config';

// 通用API调用函数
export const apiCall = async (
  endpoint: string, 
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: unknown
) => {
  try {
    const url = API_CONFIG.getApiUrl(endpoint);
    console.log(`API调用: ${method} ${url}`);
    
    const config: {
      method: string;
      url: string;
      timeout: number;
      headers: Record<string, string>;
      data?: unknown;
    } = {
      method,
      url,
      timeout: 120000, //2分钟超时
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (data) {
      config.data = data;
    }

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(`API调用失败 (${method} ${endpoint}):`, error);
    throw error;
  }
};

// 便捷方法
export const api = {
  // 问答API
  ask: (question: string) => 
    apiCall('/ask', 'POST', { question }),
    
  // 用户相关API
  getUser: (userId: string) => 
    apiCall(`/getUser?userId=${userId}`, 'GET'),
    
  updateUser: (userData: Record<string, unknown>) => 
    apiCall('/updateUser', 'PUT', userData),
    
  // 可以继续添加更多API方法
}; 