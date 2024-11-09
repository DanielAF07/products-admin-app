export interface TesloProduct {
  id:          string;
  title:       string;
  price:       number;
  description: string;
  slug:        string;
  stock:       number;
  sizes:       Size[];
  gender:      Gender;
  tags:        string[];
  images:      string[];
  user:        tesloUser;
}

export enum Gender {
  Kid = "kid",
  Men = "men",
  Women = "women",
}

export enum Size {
  L = "L",
  M = "M",
  S = "S",
  Xl = "XL",
  Xs = "XS",
  Xxl = "XXL",
}

export interface tesloUser {
  id:       string;
  email:    string;
  fullName: string;
  isActive: boolean;
  roles:    string[];
}
