export interface Comment {
  id: string;
  post_id: string;
  name: string;
  email: string;
  body: string;
}

export interface CommentDTO {
  name: string;
  email: string;
  body: string;
  post_id: string;
}
