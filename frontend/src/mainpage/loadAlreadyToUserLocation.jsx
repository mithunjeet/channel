import { useParams } from "react-router"

 function LoadJobAlreadyToUserLocation() {
    const data = useParams()
    console.log(data.state)
    return (
      <>
      <h1>hii from load ... </h1> 
    </>)
}

export default  LoadJobAlreadyToUserLocation