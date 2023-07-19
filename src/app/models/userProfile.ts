// import { Post } from "./post";

export interface UserProfile {
  id:string;
  fullName:string;
  gender: string;
  age: number;
  joinedAt: Date;
  graduationYear: Date;
  imageUrl:string;
  images:  Image[];
  posts: Posts[]
}

export interface Image {
    id: string;
    imageUrl: string;
    isMain: boolean;
    imageMetadata:any;
}

export interface Posts {
  id: string;
  createdAt: string;
  updatedAt: string;
  content:string;
  imageUrl:string;
  imageMetadata:string;
}
