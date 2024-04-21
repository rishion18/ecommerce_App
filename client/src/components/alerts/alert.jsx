import { useEffect, useState } from "react"

const Alert = ({message , type , setAlertBody}) => {

const[mount , setMount] = useState(true)

useEffect(() => {
  setTimeout(() => {
    setAlertBody('')
    setMount(false)
  } , 5000)
} , [])

if(!mount){
    return null
}

    return(
        <div className={`absolute ${type === 'info'?'bg-green-500':'bg-yellow-500'} w-3/4 h-24 transform left-1/2 -translate-x-1/2  transition ease-in translate-y-28`}>
           {message}
        </div>
    )
}

export default Alert