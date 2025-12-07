import axios from 'axios';
import React, { useEffect } from 'react';
import { useAuth } from './useAuth';

const axiosSecure = axios.create({
    baseURL: "http://localhost:3000"
});

const useAxiosSecure = () => {

    const {user}=useAuth()

    useEffect(() => {
        const unsubscribeRequestInterceptor = axios.interceptors.request.use(function (config) {
            // Do something before request is sent
            config.headers.Authorization=`Bearer ${user?.accessToken}`
            return config;
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        },
            // { synchronous: true, runWhen: () => /* This function returns true */}
        );
        const unsubscribeResponseInterceptor = axios.interceptors.response.use(function onFulfilled(response) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            if(response.status==401){
                //TODO: redirect user to login page
            }
            return response;
        }, function onRejected(error) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            return Promise.reject(error);
        });

        return ()=>{
            unsubscribeRequestInterceptor()
            unsubscribeResponseInterceptor()
        }

    })

    return axiosSecure;
};

export default useAxiosSecure;