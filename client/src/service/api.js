
import axios from 'axios';
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config.js';
import { getAccessToken, getType } from '../utils/common-utils.js';



const API_URL = 'http://localhost:8000/';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "Accept": "application/json, form-data",
        "Content-Type": "application/json",
    }
});


axiosInstance.interceptors.request.use(
    function (config) {
        if(config.TYPE.params){
            config.params= config.TYPE.params;

        } else if(config.TYPE.query){
            config.url = config.url+'/'+config.TYPE.query;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    function (response) {
        return processResponse(response);
    },
    function (error) {
        return Promise.reject(processError(error));
    }
)


const processResponse = (response) => {
    if (response?.status === 200) {
        return { isSuccess: true, data: response.data }
    } else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        }
    }
}


const processError = async (error) => {
    if (error.response) {
        console.log("Error in Response: ", error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.status
        }
    } else if (error.request) {
        console.log("Error in Request: ", error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ""
        }
    } else {
        console.log("Error in Network: ", error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkFailure,
            code: ""
        }
    }
}


const API = {};


for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgrees, showDownloadProgrees) => axiosInstance({
        method: value.method,
        url: value.url,
        data: value.method==='DELETE' ? {} : body,
        responseType: value.responseType,
        headers:{
            authorization: getAccessToken()
        },
        TYPE:getType(value,body),
        onUploadProgress: function (progressEvent) {
            if (showUploadProgrees) {
                let precentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                showUploadProgrees(precentageCompleted);
            }
        },
        onDownloadProgress: function (progressEvent) {
            if (showDownloadProgrees) {
                let precentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                showDownloadProgrees(precentageCompleted);
            }
        }
    });
}

export { API };