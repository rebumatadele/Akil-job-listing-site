import React from 'react'
import Description from '@/app/components/Description'
interface Props {
    params: {id: number}
}
const page = ({params: {id}} : Props) => {
    
  return (
    <Description id={id}></Description>
  )
}

export default page
