import { Suspense, lazy } from "react";
// import FiberContainer from './components/r3f/FiberContainer';
import Leftbar from "./components/Sidebar/Leftbar";
import SearchProvider from "./contexts/SearchProvider";

const FiberContainer = lazy(() =>
  import("./components/r3f/FiberContainer").then((m) => ({
    default: m.default,
  }))
);

const App = () => {
  // const { data, isLoading, isError } = useQuery<string[]>({
  // 	queryKey: ['combobox_sat_names'],
  // 	queryFn: async () => {
  // 		const res = await fetch(`${SERVER_URL}/v1/info/satellite`);
  // 		return await res.json();
  // 	},
  // });

  return (
    // container
    <SearchProvider>
      <div className="flex h-full ">
        <div className="">
          <Leftbar />
        </div>
        <div className=" flex-1 relative ">
          <Suspense fallback={<div>Loading ....</div>}>
            <FiberContainer />
          </Suspense>
        </div>
      </div>
    </SearchProvider>
  );
};

export default App;
