import { DispatchType } from "../store";
import { useDispatch } from "react-redux";

export const useTypedDispatch: () => DispatchType = useDispatch;
