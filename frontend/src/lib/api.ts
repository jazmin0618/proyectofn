const API_URL = 'http://localhost:3001'; // Puerto de NestJS

export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  register: async (userData: any) => {
    // ⬅️ TRANSFORMAR los datos antes de enviarlos
    const backendData = {
      email: userData.email,
      name: userData.name,
      password: userData.password,
      occupation: userData.career, // career -> occupation
      purpose: userData.study_level, // study_level -> purpose
    };
    
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(backendData),
    });
    return response.json();
  },
};