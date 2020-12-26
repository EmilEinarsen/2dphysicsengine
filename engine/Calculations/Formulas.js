const meterToPixelRatio = 3779.5275590551

export const pixelToMeter = pixel => pixel * ( 1 / meterToPixelRatio )

export const meterToPixel = meter => meter * meterToPixelRatio