import { Posts } from "./Posts";
import { QueryClientProvider } from 'react-query';
import "./App.css";
import { queryClient } from "./queryClient";
import { ReactQueryDevtools } from 'react-query/devtools'

function App() {
  return (
    // provide React Query client to App
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Blog Posts</h1>
        <Posts />
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
