"use client";

import React, { useEffect, useState } from "react";
import MyPageNav from "./_components/MyPageNav";
import Button from "@/components/ui/Button";

import { useIntroUpdate } from "@/hooks/mutation/useIntroUser";
import { useMyIntro } from "@/hooks/query/useMyInfo";

export default function MyPage() {
  const [intro, setIntro] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const { data } = useMyIntro();
  const { mutate: updateIntro, isPending } = useIntroUpdate();

  const handleClickEditIntro = () => {
    setIntro(data?.intro ?? "");
    setIsEdit(true);
  };

  const handleClickIntroUpdate = () => {
    updateIntro(intro, {
      onSuccess: () => {
        setIsEdit(false);
      },
    });
  };

  const handleClickIntroCancel = () => {
    setIsEdit((prev) => !prev);
  };

  useEffect(() => {
    if (data?.intro !== undefined) {
      setIntro(data?.intro);
    }
  }, [data]);

  return (
    <div className="w-full min-h-[calc(100vh-120px)] flex justify-center items-center px-2 py-10">
      <MyPageNav />
      <div className="min-h-[calc(100vh-200px)] flex-8/12 flex flex-col px-36 py-10 gap-4">
        {/* 내 소개 */}
        <div className="flex justify-between items-center">
          <h1 className="font-bold">소개</h1>
          {isEdit ? (
            <div className="flex gap-2">
              <Button onClick={handleClickIntroUpdate} disabled={isPending}>
                {isPending ? "처리 중..." : "완료"}
              </Button>
              <Button
                color="cancel"
                variant="outline"
                onClick={handleClickIntroCancel}
              >
                취소
              </Button>
            </div>
          ) : (
            <Button onClick={handleClickEditIntro}>수정</Button>
          )}
        </div>
        <div className="flex-1 w-full  border-2 flex justify-center items-center">
          <textarea
            value={intro ?? ""}
            readOnly={!isEdit}
            onChange={(e) => {
              setIntro(e.target.value);
            }}
            className="
              w-full h-full resize-none
              border-none outline-none bg-transparent
              leading-relaxed 
              text-center
              tracking-widest
            "
            placeholder={
              isEdit
                ? ""
                : "북마카세에 오신걸 환영합니다. 나를 알리는 소개글을 작성해주세요."
            }
          />
        </div>

        {/* 내정보 수정 */}
        <div className="flex-1 w-full border-2">
          <h1>내정보 수정</h1>
        </div>
      </div>
    </div>
  );
}
