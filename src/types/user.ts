export interface OneUser {
  userId: number;
  username: string;
}

export interface MyInfo {
  userId: number;
  email: string;
  username: string;
  createdAt: string;
  imageUrl: string;
  intro: string;
  phone: string;
  adress: string;
  point: number;
}

export interface userInformationUpdate {
  currentPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
  newUsername?: string;
}
