import { config } from '@/config';

interface RequestOptions {
        url: string;
        method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
        data?: any;
        header?: any;
}

export const request = <T = any>(options: RequestOptions): Promise<T> => {
        return new Promise((resolve, reject) => {
                uni.request({
                        url: `${config.baseUrl}${options.url}`,
                        method: options.method || 'GET',
                        data: options.data,
                        header: {
                                'Content-Type': 'application/json',
                                ...options.header,
                        },
                        success: (res: any) => {
                                if (res.statusCode >= 200 && res.statusCode < 300) {
                                        resolve(res.data as T);
                                } else {
                                        uni.showToast({
                                                title: res.data?.detail?.error || res.data?.error || '请求失败',
                                                icon: 'none',
                                        });
                                        reject(res.data);
                                }
                        },
                        fail: (err) => {
                                uni.showToast({
                                        title: '网络请求失败',
                                        icon: 'none',
                                });
                                reject(err);
                        },
                });
        });
};
