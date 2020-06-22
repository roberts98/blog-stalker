import React, { useState } from 'react';

import { Comment } from '../../types/comments';
import { addComment } from '../../api/comments';
import { StyledForm } from '../shared/StyledForm';

interface Props {
  postId: string;
  onSubmit: (comment: Comment) => void;
}

function AddComment({ postId, onSubmit }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    body: '',
    post_id: postId,
  });
  const [isLoading, setIsLoading] = useState(false);

  function resetFormData() {
    setFormData((formData) => ({
      ...formData,
      name: '',
      email: '',
      body: '',
    }));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;

    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await addComment(formData);
      onSubmit(res.data.result);
      resetFormData();
    } catch (error) {}

    setIsLoading(false);
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <input onChange={handleChange} value={formData.name} type="name" name="name" required placeholder="Your name" />
      <input
        onChange={handleChange}
        value={formData.email}
        type="email"
        name="email"
        required
        placeholder="Your email"
      />
      <textarea
        onChange={handleChange}
        value={formData.body}
        placeholder="Your comment"
        name="body"
        required
      ></textarea>
      <button type="submit">{isLoading ? 'Submitting' : 'Submit'}</button>
    </StyledForm>
  );
}

export default AddComment;
