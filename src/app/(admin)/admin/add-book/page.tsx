'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBook } from '@/api/admin'; 
import InputFeild from '@/components/ui/InputFeild';
import Button from '@/components/ui/Button';

export default function AddBookPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        title: '',
        contents: '',
        isbn: '',
        publishedAt: '',
        authors: '',
        translators: '',
        publisher: '',
        price: '',
        salePrice: '',
        count: '',
        thumbnail: '',
        status: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            await createBook(form); // ✅ axios 대신 createBook 사용
            router.push('/admin/books');
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('알 수 없는 오류가 발생했습니다.');
            }
        }
    };

    return (
        <div className="p-10 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">📘 도서 등록</h1>

            <div className="space-y-4">
                <InputFeild id="title" labelText="제목 *" name="title" value={form.title} onChange={handleChange} />
                <InputFeild id="contents" labelText="소개" name="contents" value={form.contents} onChange={handleChange} />
                <InputFeild id="isbn" labelText="ISBN" name="isbn" value={form.isbn} onChange={handleChange} />
                <InputFeild id="publishedAt" labelText="출판일 (YYYY-MM-DD)" name="publishedAt" value={form.publishedAt} onChange={handleChange} />
                <InputFeild id="authors" labelText="저자 (콤마로 구분)" name="authors" value={form.authors} onChange={handleChange} />
                <InputFeild id="translators" labelText="번역자 (콤마로 구분)" name="translators" value={form.translators} onChange={handleChange} />
                <InputFeild id="publisher" labelText="출판사" name="publisher" value={form.publisher} onChange={handleChange} />
                <InputFeild id="price" labelText="정가" name="price" value={form.price} onChange={handleChange} />
                <InputFeild id="salePrice" labelText="할인가" name="salePrice" value={form.salePrice} onChange={handleChange} />
                <InputFeild id="count" labelText="재고 수량 *" name="count" value={form.count} onChange={handleChange} />
                <InputFeild id="thumbnail" labelText="표지 URL" name="thumbnail" value={form.thumbnail} onChange={handleChange} />
                <InputFeild id="status" labelText="상태 (정상 판매/예약 판매/품절)" name="status" value={form.status} onChange={handleChange} />
            </div>

            <p className="text-[var(--color-cancel)] mt-4">{error}</p>

            <div className="mt-6">
                <Button onClick={handleSubmit} size="lg" color="main">
                    도서 등록
                </Button>
            </div>
        </div>
    );
}
