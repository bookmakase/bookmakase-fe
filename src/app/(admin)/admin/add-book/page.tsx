'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBook } from '@/api/admin';
import InputFeild from '@/components/ui/InputFeild';
import Button from '@/components/ui/Button';

const initialForm = {
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
};

export default function AddBookPage() {
    const router = useRouter();
    const [form, setForm] = useState(initialForm);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                ...form,
                authors: form.authors.split(',').map((s) => s.trim()),
                translators: form.translators.split(',').map((s) => s.trim()),
                price: Number(form.price),
                salePrice: Number(form.salePrice),
                count: Number(form.count),
            };

            await createBook(payload);
            router.push('/admin/books');
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
            setError(message);
        }
    };


    const fields = [
        { id: 'title', label: '제목 *' },
        { id: 'contents', label: '소개' },
        { id: 'isbn', label: 'ISBN' },
        { id: 'publishedAt', label: '출판일 (YYYY-MM-DD)' },
        { id: 'authors', label: '저자 (콤마로 구분)' },
        { id: 'translators', label: '번역자 (콤마로 구분)' },
        { id: 'publisher', label: '출판사' },
        { id: 'price', label: '정가' },
        { id: 'salePrice', label: '할인가' },
        { id: 'count', label: '재고 수량 *' },
        { id: 'thumbnail', label: '표지 URL' },
        { id: 'status', label: '상태 (정상 판매/예약 판매/품절)' },
    ];

    return (
        <div className="p-10 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">📘 도서 등록</h1>

            <div className="space-y-4">
                {fields.map(({ id, label }) => (
                    <InputFeild
                        key={id}
                        id={id}
                        labelText={label}
                        name={id}
                        value={form[id as keyof typeof form]}
                        onChange={handleChange}
                    />
                ))}
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
