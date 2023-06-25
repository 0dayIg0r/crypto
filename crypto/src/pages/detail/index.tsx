import styles from "./detail.module.css";
import {useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
function Detail() {
  const { crypto } = useParams()

  useEffect(()=>{
    function getData(){
      fetch(``)
    }
    getData()
  },[])
  
  
 return (
  <div>

  </div>
 )
}

export default Detail;
