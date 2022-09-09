import { RootDispatch } from "../store";
import { useDispatch } from "react-redux";

export const useTypedDispatch: () => RootDispatch = useDispatch;
