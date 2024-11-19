import { formatDistance } from 'date-fns';
import { Clock, Star, User, X } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useCommentStore } from '../store/useCommentStore';

export function MovieDialog({ movie, onClose }) {
  const [comment, setComment] = useState('');
  const { user, isAuthenticated } = useAuthStore();
  const { addComment, getComments } = useCommentStore();
  const comments = getComments(movie.id);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!user || !comment.trim()) return;
    
    addComment(movie.id, comment.trim(), user);
    setComment('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="relative h-64">
          <img
            src={movie.imageUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {movie.runtime} min
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                {movie.rating}
              </span>
            </div>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-16rem)]">
          <div className="space-y-4">
            <p className="text-gray-600">{movie.description}</p>
            
            <div className="flex flex-wrap gap-2">
              {movie.genre.map((g) => (
                <span
                  key={g}
                  className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600"
                >
                  {g}
                </span>
              ))}
            </div>
            
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Cast</h3>
              <p className="text-gray-600">{movie.cast.join(', ')}</p>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-4">Comments</h3>
              
              {isAuthenticated ? (
                <form onSubmit={handleSubmitComment} className="mb-6">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows={3}
                  />
                  <button
                    type="submit"
                    disabled={!comment.trim()}
                    className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                  >
                    Post Comment
                  </button>
                </form>
              ) : (
                <p className="text-gray-500 mb-6">Please log in to comment.</p>
              )}
              
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="border-b pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-5 h-5 text-gray-400" />
                      <span className="font-medium">{comment.username}</span>
                      <span className="text-sm text-gray-500">
                        {formatDistance(comment.timestamp, new Date(), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-gray-600">{comment.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}