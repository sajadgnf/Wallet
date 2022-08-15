import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export const notify = (type, text) => {
    type === "error" ?
        toast.error(text) :
        toast.success(text)
}