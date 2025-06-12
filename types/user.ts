export interface AuthData {
  email?: string;
  userId?: string;
  role?: string;
  firstName?: string;
  lastName?: string;
  isAuth?: boolean;
}

export interface Client {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  created_at: string;
  updated_at: string;
}

export interface Employee {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  dob: string;
  doj: string;
  salary: number;

  created_at: string;
  updated_at: string;
}
