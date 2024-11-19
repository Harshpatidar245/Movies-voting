import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { movies } from './data/movies';
import { MovieCard } from './components/MovieCard';
import { MovieDialog } from './components/MovieDialog';
import { Header } from './components/Header';

const queryClient = new QueryClient();

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onSelect={setSelectedMovie}
              />
            ))}
          </div>
        </main>

        {selectedMovie && (
          <MovieDialog
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
          />
        )}
      </div>
      <Toaster position="bottom-center" />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;