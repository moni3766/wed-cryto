// API Base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
    };
};

const handleResponse = async (response: Response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'An error occurred' }));
        throw new Error(error.error || error.message || 'Request failed');
    }
    return response.json();
};

export const authAPI = {
    login: async (email: string, password: string) => {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        return handleResponse(response);
    },

    register: async (data: {
        email: string;
        password: string;
        firstName?: string;
        lastName?: string;
        phone?: string;
        referralCode?: string;
    }) => {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },
};

export const userAPI = {
    getProfile: async () => {
        const response = await fetch(`${API_BASE_URL}/users/profile`, {
            headers: getAuthHeaders(),
        });
        return handleResponse(response);
    },

    updateProfile: async (data: any) => {
        const response = await fetch(`${API_BASE_URL}/users/profile`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },
};

export const dashboardAPI = {
    getStats: async () => {
        const response = await fetch(`${API_BASE_URL}/dashboard/stats`, {
            headers: getAuthHeaders(),
        });
        return handleResponse(response);
    },
};

export const transactionAPI = {
    getUserTransactions: async () => {
        const response = await fetch(`${API_BASE_URL}/transactions`, {
            headers: getAuthHeaders(),
        });
        return handleResponse(response);
    },

    // 🟢 Đã bổ sung phương thức createWithdrawal
    createWithdrawal: async (data: { amount: number; method: string; walletAddress: string }) => {
        const response = await fetch(`${API_BASE_URL}/transactions/withdraw`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    // 🟢 Đã bổ sung phương thức createDeposit (hữu ích cho trang nạp tiền)
    createDeposit: async (data: { amount: number; method: string; txHash?: string }) => {
        const response = await fetch(`${API_BASE_URL}/transactions/deposit`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },
};

export default {
    auth: authAPI,
    user: userAPI,
    dashboard: dashboardAPI,
    transaction: transactionAPI,
};