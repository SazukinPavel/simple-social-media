// Use throughout your app instead of plain `useDispatch` and `useSelector`
import {DispatchType} from "../store";
import {useDispatch} from "react-redux";

export const useTypedDispatch: () => DispatchType = useDispatch
