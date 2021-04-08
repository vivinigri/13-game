import React from "react"
import Svg, { Path, G } from "react-native-svg"

type Props = {
  color?: string
  width?: string
  height?: string
}

type PathProps = {
  color?: string
  x?: number
  y?: number
  scale?: number
  rotation?: number
  opacity?: number
}

const Background = ({
  color = "#000",
  width = "200",
  height = "250",
}: Props) => {
  // return <Copas x="100" y="100" color={color} />
  return (
    <Svg width={width} height={height} viewBox="0 0 100 125">
      <Copas x={0} y={0} color={color} />
      <Copas x={100} y={0} color={color} />
      <Copas x={0} y={125} color={color} />
      <Copas x={100} y={125} color={color} />
    </Svg>
  )
}

// rotate(45)
const Copas = ({
  x,
  y,
  color,
  scale = 0.5,
  opacity = 0.3,
  rotation = 0,
}: PathProps) => (
  <G
    fillOpacity={opacity}
    stroke="#00000000"
    fill={color}
    strokeWidth={1}
    transform={`scale(${scale}) translate(${x},${y}) rotate(${rotation})`}
  >
    <Path d="M88.174,19.797c-4.792-4.978-11.234-7.426-17.711-7.426c-6.572,0-13.18,2.521-18.137,7.479l-1.358,1.358  c-0.098,0.098-0.226,0.146-0.354,0.146c-0.128,0-0.256-0.049-0.354-0.146l-1.358-1.358c-4.957-4.957-11.566-7.478-18.137-7.479  c-6.477,0-12.918,2.448-17.711,7.426c-9.359,9.721-9.247,25.19,0.336,34.773l36.516,36.516c0.195,0.195,0.451,0.293,0.707,0.293  s0.512-0.098,0.707-0.293l36.516-36.516C97.422,44.987,97.534,29.519,88.174,19.797z M85.009,51.742L50.615,86.137L16.22,51.742  c-7.969-7.969-8.096-21.055-0.283-29.171c3.85-3.999,9.116-6.201,14.829-6.201c5.721,0,11.301,2.299,15.309,6.307l1.358,1.358  c0.85,0.85,1.98,1.318,3.182,1.318c1.202,0,2.332-0.468,3.182-1.318l1.358-1.358c4.008-4.008,9.588-6.307,15.309-6.307  c5.713,0,10.979,2.202,14.829,6.201C93.106,30.687,92.979,43.773,85.009,51.742z" />
  </G>
)

const Ouros = ({ x = 0, y = 0, color = "#000" }: PathProps) => (
  <Path
    x={x}
    y={y}
    fill={color}
    d="M80.591,49.651L50.41,6.35C50.311,6.207,50.155,6.136,50,6.136s-0.311,0.071-0.41,0.214l-30.181,43.3  c-0.119,0.171-0.12,0.398-0.002,0.569l30.181,43.919c0.099,0.145,0.256,0.217,0.412,0.217s0.313-0.072,0.412-0.217L80.593,50.22  C80.711,50.048,80.71,49.821,80.591,49.651z M50,87.676L24.076,49.951L50,12.757l25.924,37.194L50,87.676z"
  />
)

const Espadas = ({ x = 0, y = 0, color = "#000" }: PathProps) => (
  <Path
    x={x}
    y={y}
    fill={color}
    d="M65.663,90.422c-4.916-0.799-9.671-6.147-13.445-9.922l-1.611-1.611c-0.098-0.098-0.226-0.146-0.354-0.146  c-0.128,0-0.256,0.049-0.354,0.146L48.288,80.5c-3.775,3.775-8.53,9.123-13.445,9.922c-0.243,0.04-0.423,0.239-0.423,0.485v3.572  c0,0.276,0.224,0.5,0.5,0.5h30.667c0.276,0,0.5-0.224,0.5-0.5v-3.572C66.086,90.661,65.906,90.461,65.663,90.422z M42.86,90.979  c2.596-1.903,4.939-4.285,7.011-6.391c0.128-0.13,0.255-0.26,0.381-0.388c0.126,0.128,0.254,0.258,0.382,0.388  c2.072,2.107,4.415,4.488,7.011,6.391H42.86z M84.966,40.439L50.96,6.433c-0.195-0.195-0.451-0.293-0.707-0.293  s-0.512,0.098-0.707,0.293L15.539,40.439C6.297,49.681,6.5,64.79,16.147,73.774c4.379,4.078,9.957,6.064,15.557,6.064  c6.151,0,12.329-2.395,16.977-7.042l1.226-1.226c0.096-0.096,0.221-0.144,0.347-0.144s0.251,0.048,0.347,0.144l1.226,1.226  c4.647,4.647,10.826,7.042,16.977,7.042c5.601,0,11.177-1.985,15.557-6.064C94.005,64.79,94.208,49.681,84.966,40.439z   M81.632,70.847c-3.456,3.218-8.012,4.991-12.831,4.991c-5.26,0-10.417-2.14-14.148-5.871l-1.226-1.226  c-0.848-0.848-1.976-1.315-3.175-1.315s-2.327,0.467-3.175,1.315l-1.226,1.226c-3.731,3.731-8.888,5.871-14.148,5.871  c-4.818,0-9.375-1.772-12.831-4.991c-3.849-3.585-6.02-8.447-6.113-13.691c-0.093-5.247,1.898-10.179,5.608-13.889l31.885-31.885  l31.885,31.885c3.71,3.709,5.701,8.642,5.608,13.889C87.653,62.4,85.481,67.262,81.632,70.847z"
  />
)

const Paus = ({ x = 0, y = 0, color = "#000" }: PathProps) => (
  <Path
    x={x}
    y={y}
    fill={color}
    d="M72.539,33.789c-0.255-0.051-0.424-0.283-0.392-0.542c0.261-2.053,0.258-4.188-0.082-6.379  C70.347,15.79,60.647,7.383,49.436,7.334c-0.034,0-0.069,0-0.103,0c-12.703,0-23,10.297-23,23c0,0.988,0.064,1.96,0.186,2.915  c0.033,0.258-0.136,0.489-0.391,0.54C14.853,36.046,6.553,46.541,7.789,58.735c1.056,10.419,10.939,19.893,21.39,20.552  c0.499,0.031,0.996,0.047,1.488,0.047c7.452,0,14.07-3.547,18.273-9.041c0.101-0.132,0.247-0.197,0.393-0.197  s0.293,0.066,0.393,0.197c4.203,5.494,10.822,9.041,18.273,9.041c0.493,0,0.988-0.016,1.487-0.047  c11.094-0.699,20.27-9.492,21.391-20.552C92.114,46.541,83.814,36.046,72.539,33.789z M86.898,58.331  c-0.922,9.094-8.515,16.387-17.662,16.963c-0.411,0.026-0.827,0.039-1.236,0.039c-5.962,0-11.464-2.723-15.096-7.471  c-0.859-1.123-2.16-1.768-3.571-1.768c-1.41,0-2.711,0.644-3.57,1.767c-3.632,4.748-9.135,7.471-15.096,7.471  c-0.409,0-0.825-0.013-1.237-0.039c-8.548-0.538-16.801-8.465-17.662-16.963c-0.996-9.828,5.515-18.693,15.146-20.621  c2.299-0.46,3.868-2.642,3.573-4.967c-0.102-0.802-0.154-1.613-0.154-2.41c0-10.477,8.523-19,19-19l0.086,0  c9.236,0.04,17.273,6.982,18.694,16.148c0.268,1.728,0.29,3.498,0.066,5.261c-0.296,2.326,1.275,4.508,3.574,4.968  C81.384,39.639,87.894,48.504,86.898,58.331z M64.996,90.422c-4.916-0.799-9.671-6.147-13.445-9.922l-1.611-1.611  c-0.098-0.098-0.226-0.146-0.354-0.146c-0.128,0-0.256,0.049-0.354,0.146L47.621,80.5c-3.775,3.775-8.53,9.123-13.446,9.922  c-0.243,0.04-0.423,0.239-0.423,0.485v3.572c0,0.276,0.224,0.5,0.5,0.5h30.667c0.276,0,0.5-0.224,0.5-0.5v-3.572  C65.419,90.661,65.24,90.461,64.996,90.422z M42.194,90.979c2.596-1.903,4.939-4.285,7.011-6.392  c0.128-0.13,0.255-0.259,0.381-0.388c0.126,0.128,0.253,0.257,0.381,0.388c2.072,2.107,4.415,4.488,7.011,6.391H42.194z"
  />
)

export default Background
