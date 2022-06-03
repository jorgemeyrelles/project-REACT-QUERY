import { QueryClientProvider } from "react-query";
import "./App.css";
import { InfinitePeople } from "./people/InfinitePeople";
import { queryClient } from "./queryClient";
import { ReactQueryDevtools } from "react-query/devtools";
// import { InfiniteSpecies } from "./species/InfiniteSpecies";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Infinite SWAPI</h1>
        <InfinitePeople />
        {/* <InfiniteSpecies /> */}
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
