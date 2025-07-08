
import { Suspense } from "react";
import RecommendationBookPage from "./RecommendationBookPage";

export default function Page() {
    return (
        <Suspense fallback={<div>로딩 중...</div>}>
            <RecommendationBookPage />
        </Suspense>
    );
}
