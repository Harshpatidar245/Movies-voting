import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCommentStore = create()(
  persist(
    (set, get) => ({
      comments: [],
      addComment: (movieId, content, user) => {
        const newComment = {
          id: crypto.randomUUID(),
          movieId,
          userId: user.id,
          username: user.username,
          content,
          timestamp: Date.now(),
        };
        set((state) => ({
          comments: [...state.comments, newComment],
        }));
      },
      getComments: (movieId) => {
        return get().comments.filter((comment) => comment.movieId === movieId);
      },
    }),
    {
      name: 'comments-storage',
    }
  )
);