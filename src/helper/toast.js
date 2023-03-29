import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
export const Notify = (props) => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
      theme="light"
    />
  )
}

export const toastAlert = (type, mess) => {
  switch (type) {
    case "warn":
      toast.warn(mess, {
        position: "top-center",
        autoClose: 1200,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
      break
    case "success":
      toast.success(mess, {
        position: "top-center",
        autoClose: 1200,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
      break
    case "error":
      toast.error(mess, {
        position: "top-center",
        autoClose: 1200,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
      break
    default:
      break
  }
}
