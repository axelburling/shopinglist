export interface User {
  user_id: string;
  user_name: string;
  user_email: string;
  user_password: string;
  fam_id: string[];
}

export interface UserMeme {
  user_id: string;
  user_name: string;
  user_email: string;
}

export interface Item {
  pro_id: string;
  user_id: string;
  requsted_by: string;
  product_name: string;
  requsted_at: string;
}

export interface Res {
  id: string;
  name: string;
}

export interface SearchUser {
  user_id: string;
  user_name: string;
  user_email: string;
}
