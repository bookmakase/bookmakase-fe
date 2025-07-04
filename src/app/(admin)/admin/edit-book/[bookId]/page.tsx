'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { fetchBook, updateBook } from '@/api/admin';
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

export default function EditBookPage() {
    const router = useRouter();
    const { bookId } = useParams<{ bookId: string }>();
    const [form, setForm] = useState(initialForm);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadBook = async () => {
            try {
                const book = await fetchBook(Number(bookId));
                setForm({
                    title: book.title,
                    contents: book.contents || '',
                    isbn: book.isbn || '',
                    publishedAt: book.publishedAt || '',
                    authors: book.authors?.join(', ') || '',
                    translators: book.translators?.join(', ') || '',
                    publisher: book.publisher || '',
                    price: book.price?.toString() || '',
                    salePrice: book.salePrice?.toString() || '',
                    count: book.count?.toString() || '',
                    thumbnail: book.thumbnail || '',
                    status: book.status || '',
                });
            } catch (err: unknown) {
                const message = err instanceof Error ? err.message : '데이터를 불러오는 데 실패했습니다';
                setError(message);
            }
        };
        loadBook();
    }, [bookId]);

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

            await updateBook(Number(bookId), payload);
            router.push('/admin/books');
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : '업데이트에 실패했습니다';
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
            <h1 className="text-2xl font-bold mb-6">📗 도서 수정</h1>

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
                    수정 저장
                </Button>
            </div>
        </div>
    );
}
