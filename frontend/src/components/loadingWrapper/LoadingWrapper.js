import { useSelector } from "react-redux";
import Loader from "../loader/Loader";

const LoadingWrapper = ({ children }) => {
  const loading = useSelector((state) => state.loading);
  const { loading: loadingState } = loading;

  return loadingState ? <Loader /> : children;
};

export default LoadingWrapper;
