export type ResponseType<Type> = {
  statusCode: number;
  data: Type;
};
export interface TokenApi {
  success: boolean;
  token: string;
}

export interface UserApi {
  count: number;
  links: any;
  page: number;
  success: boolean;
  total_pages: number;
  total_users: number;
  users: User[];
}

export interface User {
  id: number;
  name: string;
  phone: string;
  photo: string;
  email: string;
  position?: string;
  position_id?: number;
  registration_timestamp?: number;
}
export interface PositionQuery {
  success: boolean;
  positions: Position[];
}

export interface Position {
  id: number;
  name: string;
}

export interface NewUser {
  token: string;
  body: NewUserForm;
}

export interface NewUserForm {
  name: string;
  email: string;
  phone: number;
  position_id: number;
  photo: File;
}
