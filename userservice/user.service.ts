import { CookieHelper } from "@/helper/cookie.helper";
import { Fetch } from "@/lib/Fetch";

const config = {
    headers: {
        "Content-Type": "application/json",
    },
};

export const UserService = {
    login: async ({ email, password }: { email: string, password: string }, context = null) => {
        // const userToken = CookieHelper.get({ key: "token", context });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        return await Fetch.post(`/auth/login`, { email, password }, config);
    },

    me: async () => {
        const userToken = CookieHelper.get({ key: "access_token" });
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },
        };
        return await Fetch.get('/auth/me', config);
    },
    
    updateMe: async (data:any) => {
        const userToken = CookieHelper.get({ key: "access_token" });
        const config = {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        };
        return await Fetch.patch('/auth/update',data, config);
    },
    
    logout: async (id: string) => {
        console.log("User id : ", id)
        const userToken = CookieHelper.get({ key: "access_token" });
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: userToken,
            },
        };
        return await Fetch.post('/logout', { userid: id }, config);
    },
    sendCodeForgotPassword: async ({email}:{email:string}) => {
        const userToken = CookieHelper.get({ key: "access_token" });
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },
        };
        return await Fetch.post('/auth/forgot-password', { email}, config);
    },
    validateCode: async ({email,token}:{email:string,token:string}) => {
        const userToken = CookieHelper.get({ key: "access_token" });
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },
        };
        return await Fetch.post('/auth/verify-email', { email,token}, config);
    },
    resetPassword: async ({email,token,password}:{email:string,token:string,password: string}) => {
        const userToken = CookieHelper.get({ key: "access_token" });
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },
        };
        return await Fetch.post('/auth/verify-email', { email,token,password}, config);
    },
    
    getUsers: async ({perPage,page}:{perPage:number,page:number}) => {
        const userToken = CookieHelper.get({ key: "access_token" });
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },
        };
        return await Fetch.get(`/admin/dashborad/active-users-product?perPage=${perPage}&page=${page}`, config);
    },

    getProductUploadRequest: async ({perPage,page}:{perPage:number,page:number}) => {
        const userToken = CookieHelper.get({ key: "access_token" });
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },
        };
        return await Fetch.get(`/admin/dashborad/product-upload-requests?perPage=${perPage}&page=${page}`, config);
    },

    acceptProduct: async ( productId:string) => {
        const userToken = CookieHelper.get({ key: "access_token" });
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },
        };
        return await Fetch.post(`/admin/dashborad/approve-product/${productId}`,{}, config);
    },

    rejectProduct: async ( productId:string) => {
        const userToken = CookieHelper.get({ key: "access_token" });
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },
        };
        return await Fetch.post(`/admin/dashborad/reject-product/${productId}`,{}, config);
    },
    getRecentCompleteOrders: async ({type,limit,page}:{type:string,limit?:number,page?:number}) => {
        const userToken = CookieHelper.get({ key: "access_token" });
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },
        };
        if(type === "completed")
            return await Fetch.get(`/admin/dashborad/recent-complete-orders?perPage=${limit}&page=${page}`, config);
        if(type === "pending")
            return await Fetch.get(`/admin/dashborad/recent-pending-orders?perPage=${limit}&page=${page}`, config);
        if(type === "cancelled")
            return await Fetch.get(`/admin/dashborad/recent-cancelled-orders?perPage=${limit}&page=${page}`, config);
    },
    getPayments: async ({limit,page}:{limit?:number,page?:number}) => {
        const userToken = CookieHelper.get({ key: "access_token" });
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },
        };
        return await Fetch.get('/payments', config);
    },
    getCarrierPayments: async ({limit,page}:{limit?:number,page?:number}) => {
        const userToken = CookieHelper.get({ key: "access_token" });
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },
        };
        return await Fetch.get('/carrier-payout', config);
    },
    getDocuments: async ({limit,page}:{limit?:number,page?:number}) => {
        const userToken = CookieHelper.get({ key: "access_token" });
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },
        };
        return await Fetch.get('/documents', config);
    },
    getDashboardStatus: async () => {
        const userToken = CookieHelper.get({ key: "access_token" });
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },
        };
        return await Fetch.get('/dashboar-status', config);
    },
    getPerformanceData: async ({filter}:{filter:string}) => {
        const userToken = CookieHelper.get({ key: "access_token" });
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },
        };
        return await Fetch.get(`/performance/${filter}`, config);
    },
}