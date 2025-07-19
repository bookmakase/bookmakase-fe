"use client";

import React, { useEffect, useState } from "react";
import MyPageNav from "./_components/MyPageNav";
import Button from "@/components/ui/Button";

import { useIntroUpdate } from "@/hooks/mutation/useIntroUser";
import { useMyIntro } from "@/hooks/query/useMyInfo";
import { useInformationUpdate } from "@/hooks/mutation/useInformationUser";

interface InformationPayload {
  currentPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
  newUsername?: string;
}

export default function MyPage() {
  const { data, isPending, isError } = useMyIntro();

  const [intro, setIntro] = useState(data?.intro);

  useEffect(() => {
    if (data) setIntro(data.intro);
  }, [data]);

  const [isIntroEdit, setIsIntroEdit] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");

  const [isInformationEdit, setIsInformationEdit] = useState(false);
  const [isPasswordEdit, setIsPasswordEdit] = useState(false);
  const [isNickNameEdit, setIsNickNameEdit] = useState(false);

  const { mutate: updateIntro, isPending: isIntroPending } = useIntroUpdate();
  const { mutate: updateInformation, isPending: isInformationPending } =
    useInformationUpdate();

  if (isPending) return <p className="flex-1 text-center">Loading…</p>;
  if (isError || !data)
    return <p className="flex-1 text-center">에러가 발생했어요.</p>;

  const handleClickEditIntro = () => {
    setIntro(data.intro);
    setIsIntroEdit(true);
  };

  const handleClickIntroUpdate = () => {
    updateIntro(intro, {
      onSuccess: () => {
        setIsIntroEdit(false);
      },
    });
  };

  const handleClickIntroCancel = () => {
    setIsIntroEdit((prev) => !prev);
  };

  const handleClickEditInformation = () => {
    setIsInformationEdit((prev) => !prev);
  };

  const handleClickInformationUpdate = () => {
    const payload: InformationPayload = {};

    if (isPasswordEdit) {
      if (!currentPassword || !newPassword || !confirmNewPassword) {
        alert("비밀번호 변경 필드를 모두 입력해주세요.");
        return;
      }

      if (currentPassword === newPassword) {
        alert(
          "변경할 비밀번호가 기존 비밀번호와 동일합니다. 새로 변경해주세요."
        );
        return;
      }

      if (newPassword !== confirmNewPassword) {
        alert("새 비밀번호가 일치하지 않습니다.");
        return;
      }

      payload.currentPassword = currentPassword;
      payload.newPassword = newPassword;
      payload.confirmNewPassword = confirmNewPassword;
    }

    if (isNickNameEdit) {
      if (!newUsername.trim()) {
        alert("변경할 닉네임을 입력해주세요.");
        return;
      }

      if (newUsername === data.username) {
        alert("변경할 닉네임을 입력해주세요.");
        return;
      }
      payload.newUsername = newUsername;
    }

    if (Object.keys(payload).length === 0) {
      setIsInformationEdit(false);
      return;
    }

    updateInformation(payload, {
      onSuccess: () => {
        setIsInformationEdit(false);
        setIsNickNameEdit(false);
        setIsPasswordEdit(false);
      },
    });
    setIsInformationEdit((prev) => !prev);
  };

  const handleClickInformationCancel = () => {
    setIsInformationEdit((prev) => !prev);
  };

  const handleClickPasswordChange = () => {
    setIsPasswordEdit((prev) => !prev);
  };

  const handleClickUserNameChange = () => {
    setIsNickNameEdit((prev) => !prev);
  };

  return (
    <div className="w-full min-h-[calc(100vh-120px)] flex justify-center items-center px-2 py-10">
      <MyPageNav />
      <div className="min-h-[calc(100vh-200px)] flex-1/3  flex flex-col px-12 py-10 gap-4">
        {/* 내 소개 */}
        <div className="flex justify-between items-center">
          <h1 className="font-bold">소개</h1>
          {isIntroEdit ? (
            <div className="flex gap-2">
              <Button
                onClick={handleClickIntroUpdate}
                disabled={isIntroPending}
              >
                {isIntroPending ? "처리 중..." : "완료"}
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
        <div className="flex-1 w-full  border-2 flex justify-center items-center rounded-3xl shadow">
          <textarea
            value={intro}
            readOnly={!isIntroEdit}
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
              isIntroEdit
                ? ""
                : "북마카세에 오신걸 환영합니다. 나를 알리는 소개글을 작성해주세요."
            }
          />
        </div>

        {/* 내정보 수정 */}
        <div className="flex justify-between items-center">
          <h1 className="font-bold">내 정보</h1>
          {isInformationEdit ? (
            <div className="flex gap-2">
              <Button
                onClick={handleClickInformationUpdate}
                disabled={isInformationPending}
              >
                {isInformationPending ? "처리 중..." : "완료"}
              </Button>
              <Button
                color="cancel"
                variant="outline"
                onClick={handleClickInformationCancel}
              >
                취소
              </Button>
            </div>
          ) : (
            <Button onClick={handleClickEditInformation}>수정</Button>
          )}
        </div>

        {/*  */}
        <div className="flex-1 w-full  border-2 flex flex-col px-10 justify-center gap-5 rounded-3xl shadow py-3">
          <h1 className="font-bold">기본 정보</h1>
          {/* 이메일 */}
          <div className="flex">
            <p className="w-[150px] inline-block">이메일</p>
            <p>{data.email}</p>
          </div>

          {/* 비밀번호 */}
          {isInformationEdit ? (
            <div className="flex justify-between items-center">
              <div className="flex">
                {isPasswordEdit ? (
                  <div className="flex flex-col gap-5">
                    <div className="flex ">
                      <label htmlFor="" className="w-[150px] inline-block">
                        비밀번호
                      </label>
                      <input
                        value={currentPassword ?? ""}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        type="password"
                        placeholder="기존 비밀번호를 입력해주세요."
                        className="w-[250px] inline-block"
                      />
                    </div>

                    <div>
                      <label htmlFor="" className="w-[150px] inline-block">
                        새 비밀번호
                      </label>
                      <input
                        value={newPassword ?? ""}
                        onChange={(e) => setNewPassword(e.target.value)}
                        type="password"
                        placeholder="새로운 비밀번호를 입력해주세요."
                        className="w-[250px] inline-block"
                      />
                    </div>

                    <div>
                      <label htmlFor="" className="w-[150px] inline-block">
                        새 비밀번호 확인
                      </label>
                      <input
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        type="password"
                        placeholder="다시 입력해주세요."
                        className="w-[250px] inline-block"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <label htmlFor="" className="w-[150px] inline-block">
                      비밀번호
                    </label>
                    <input type="password" placeholder="******" disabled />
                  </>
                )}
              </div>
              {isPasswordEdit ? (
                <Button
                  onClick={handleClickPasswordChange}
                  color="cancel"
                  variant="outline"
                >
                  취소
                </Button>
              ) : (
                <Button onClick={handleClickPasswordChange}>수정</Button>
              )}
            </div>
          ) : (
            <>
              <div className="flex items-center">
                <label htmlFor="" className="w-[150px] inline-block">
                  비밀번호
                </label>
                <input type="password" placeholder="******" disabled />
              </div>
            </>
          )}

          {/* 닉네임 */}
          {isInformationEdit ? (
            <div className="flex justify-between items-center">
              <div className="flex">
                {isNickNameEdit ? (
                  <div className="flex justify-center">
                    <label htmlFor="" className="w-[150px] inline-block">
                      닉네임
                    </label>
                    <input
                      value={newUsername ?? ""}
                      onChange={(e) => setNewUsername(e.target.value)}
                      type="text"
                      placeholder="변경할 닉네임을 입력해주세요"
                      className="w-[250px] inline-block"
                    />
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <label htmlFor="" className="w-[150px] inline-block">
                      닉네임
                    </label>
                    <input type="text" value={data.username} disabled />
                  </div>
                )}
              </div>
              {isNickNameEdit ? (
                <Button
                  onClick={handleClickUserNameChange}
                  color="cancel"
                  variant="outline"
                >
                  취소
                </Button>
              ) : (
                <Button onClick={handleClickUserNameChange}>수정</Button>
              )}
            </div>
          ) : (
            <div className="flex">
              <label htmlFor="" className="w-[150px] inline-block">
                닉네임
              </label>
              <input type="text" value={data.username} disabled />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
