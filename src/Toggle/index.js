import React, { useRef, useLayoutEffect } from 'react'
import { TweenLite } from 'gsap'

export default function Toggle({
  value = false,
  onClick,
  duration = 0.5,
  scale = 1,
  length = 120,
  borderWidth = 1,
  borderColor = '#333',
  knobColor = '#c0c0c0',
  hasBoldText = false,
  onTextValue = 'OPEN',
  onTextColor = '#ffffff',
  onTextBorderColor = '#333',
  onBackgroundColor = '#228b22',
  offTextValue = 'CLOSED',
  offTextColor = '#ffffff',
  offTextBorderColor = '#333',
  offBackgroundColor = '#b22222',
  style = null,
}) {
  const knobRef = useRef(null)
  const backgroundRef = useRef(null)
  const onTextRef = useRef(null)
  const offTextRef = useRef(null)

  const radius = 16
  const onPosition = { x: 0 }
  const offPosition = { x: length - radius * 2 }

  useLayoutEffect(
    () => {
      TweenLite.fromTo(
        knobRef.current,
        duration,
        value ? onPosition : offPosition,
        value ? offPosition : onPosition
      )

      TweenLite.fromTo(
        backgroundRef.current,
        duration,
        { fill: value ? offBackgroundColor : onBackgroundColor },
        { fill: value ? onBackgroundColor : offBackgroundColor }
      )

      TweenLite.fromTo(
        onTextRef.current,
        duration / 3,
        {
          fillOpacity: value ? 0 : 1,
          strokeWidth: value ? borderWidth / 2 : 1,
        },
        {
          fillOpacity: !value ? 0 : 1,
          strokeWidth: !value ? 0 : borderWidth / 2,
        }
      ).then(() => {
        TweenLite.fromTo(
          onTextRef.current,
          0,
          {
            visibility: value ? 'hidden' : 'visible',
          },
          {
            visibility: value ? 'visible' : 'hidden',
          }
        )
      })

      TweenLite.fromTo(
        offTextRef.current,
        duration / 3,
        {
          fillOpacity: !value ? 0 : 1,
          strokeWidth: !value ? borderWidth / 2 : 1,
        },
        {
          fillOpacity: value ? 0 : 1,
          strokeWidth: value ? 0 : borderWidth / 2,
        }
      ).then(() => {
        TweenLite.fromTo(
          offTextRef.current,
          0,
          {
            visibility: !value ? 'hidden' : 'visible',
          },
          {
            visibility: !value ? 'visible' : 'hidden',
          }
        )
      })
    },
    // eslint-disable-next-line
    [value]
  )

  return (
    <span
      style={{ width: length * scale, height: radius * 2 * scale, ...style }}
    >
      <svg
        viewBox={`0 0 ${length + 2 * borderWidth} ${radius * 2}`}
        width={length * scale}
        height={radius * 2 * scale}
      >
        <mask id="mask">
          <rect
            width={length + 2 * borderWidth}
            height={radius * 2 + 2 * borderWidth}
            x={borderWidth - borderWidth}
            y={-borderWidth}
            rx={radius}
            fill="white"
            stroke="white"
            strokeWidth={borderWidth}
          />
        </mask>
        <g ref={backgroundRef} onClick={onClick} mask="url(#mask)">
          <rect
            width={length}
            height={radius * 2}
            x={borderWidth}
            rx={radius}
            stroke={borderColor}
            strokeWidth={borderWidth}
          />
          <g ref={knobRef} id="knob-and-text-group">
            <text
              ref={onTextRef}
              id="on-text"
              x={-radius * 0.2}
              y="55%"
              textAnchor="end"
              dominantBaseline="middle"
              fill={onTextColor}
              fontSize="18"
              fontWeight={hasBoldText ? 'bold' : 'normal'}
              stroke={onTextBorderColor}
              strokeWidth={borderWidth / 2}
            >
              {onTextValue}
            </text>
            <circle
              cx={radius + borderWidth}
              cy={radius}
              r={radius}
              fill={knobColor}
              stroke={borderColor}
              strokeWidth={borderWidth}
            />
            <text
              ref={offTextRef}
              id="off-text"
              x={2 * radius * 1.2}
              y="55%"
              textAnchor="start"
              dominantBaseline="middle"
              fill={offTextColor}
              fontSize="18    "
              fontWeight={hasBoldText ? 'bold' : 'normal'}
              stroke={offTextBorderColor}
              strokeWidth={borderWidth / 2}
            >
              {offTextValue}
            </text>
            )
          </g>
        </g>
      </svg>
    </span>
  )
}
