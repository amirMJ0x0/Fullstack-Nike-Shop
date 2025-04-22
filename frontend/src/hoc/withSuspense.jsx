import { Suspense } from "react";
import Loading from "../components/share/Loading";

const withSuspense = (Component) => (props) =>
  (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );

export default withSuspense;
