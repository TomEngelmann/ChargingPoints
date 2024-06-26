import * as React from "react"
import Svg, { Path } from "react-native-svg"

interface ILocation{
    width: number;
    height: number;
    color: string;
}

export default function Location({width, height, color}: ILocation){
    return(
        <Svg
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke={color}
        width={width}
        height={height}
        >
        <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
        />
        </Svg>
    )
}