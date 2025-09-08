import { Suspense } from "react";
import Loading from "../components/share/Loading";

const WithSuspense = (Component) => {
  return (props) => {
    return (
      <Suspense fallback={<Loading />}>
        <Component {...props} />
      </Suspense>
    );
  };
};

export default WithSuspense;
