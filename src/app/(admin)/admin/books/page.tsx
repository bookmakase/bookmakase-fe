import { Suspense } from 'react';
import BookList from './BookList';

export default function AdminBooksPage() {
    return (
        <Suspense fallback={<div className="p-10">로딩 중...</div>}>
            <BookList />
        </Suspense>
    );
}
