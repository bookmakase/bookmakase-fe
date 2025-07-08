// import { getUserInfo } from "@/api/user";
// import { useAuthStore } from "@/store/auth";
// import { useQuery } from "@tanstack/react-query";

// export function useGetMe() {
//   const setAuth = useAuthStore((s) => s.setAuth);

//   return useQuery({
//     queryKey: ["me"],
//     queryFn: getUserInfo,
//     enabled: !!localStorage.getItem("accessToken"), // 토큰 있을 때만
//     staleTime: 5,
//     // onSuccess: (user) => {
//     //   setAuth({ isLogin: true, role: user.role });
//     // },
//   });
// }
