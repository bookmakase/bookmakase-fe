import { instance } from "@/lib/axios";
import { api } from "@/constants/apiPath";
import { BookItem, PageInfo, CreateBookFormData } from "@/types/admin";


export const fetchBooks = async (page: number): Promise<{ content: BookItem[]; pageInfo: PageInfo }> => {
    try {
        const response = await instance.get(`${api.admin.books}?page=${page}`);
        return response.data;
    } catch (err: unknown) {
        let message = '도서 목록 불러오기에 실패했습니다.';
        if (
            typeof err === 'object' &&
            err !== null &&
            'response' in err &&
            typeof (err as any).response?.data?.message === 'string'
        ) {
            message = (err as any).response.data.message;
        }

        throw new Error(message);
    }
};


export const createBook = async (formData: CreateBookFormData) => {
    try {
        const response = await instance.post(`${api.admin.books}`, {
            ...formData,
            authors: formData.authors.split(',').map((s: string) => s.trim()),
            translators: formData.translators.split(',').map((s: string) => s.trim()),
            price: parseInt(formData.price),
            salePrice: parseInt(formData.salePrice),
            count: parseInt(formData.count),
        });

        return response.data;
    }  catch (err: unknown) {
        let message = '도서 생성에 실패했습니다.';
        if (
            typeof err === 'object' &&
            err !== null &&
            'response' in err &&
            typeof (err as any).response?.data?.message === 'string'
        ) {
            message = (err as any).response.data.message;
        }

        throw new Error(message);
    }
};