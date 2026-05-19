import React,{useState} from 'react'
import {
    APIProvider,
    map,
    AdvanceMArker,
    Pin,
    InfoWindow,
} from '@vis.gl/react-google-maps'
export default function map() {
  return (
    <APIProvider apiKey={process.env.VITE_GOOGLE_MAPS_API_KEY}>
        <div style={height="100vh" , width="100%"}>

        </div>
    </APIProvider>
  )
}
