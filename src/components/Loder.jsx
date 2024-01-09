import React from 'react'
import {ThreeCircles} from "react-loader-spinner";
export default function Loder(props) {
    const {visible,height="80",width="80",color="#4fa94d"} = props
  return (
    <div style={{}}>
        <ThreeCircles
  visible={visible}
  height={height}
  width={width}
  color={color}
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  />
    </div>
  )
}
