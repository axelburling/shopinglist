import { User } from './arrayTypes';

export interface FAM {
  fam_id: string;
  fam_name: string;
  image: string;
}

export interface ADDFAM {
  user_id: string;
  name: string;
  user: User;
}
