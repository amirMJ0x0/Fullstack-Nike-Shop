import { Suspense } from "react";
import Loading from "../components/share/Loading";

const WithSuspense = (Component) => (props) =>
  (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );

export default WithSuspense;
