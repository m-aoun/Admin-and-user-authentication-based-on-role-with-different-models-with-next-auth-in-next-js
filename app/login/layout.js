import { Toaster } from "react-hot-toast"

const layout = ({children}) => {
  return (
    <>
        <Toaster />
        {children}
    </>
  )
}

export default layout