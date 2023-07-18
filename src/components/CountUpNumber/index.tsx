import { createRef } from "react";
import { useCountUp, } from "react-countup";

interface CountUpNumberProps {
  ref?: string;
  end: number;
  start?: number | undefined;
  duration?: number;
  prefix?: string;
  decimals?: number;
  decimal?: string
}
export function CountUpNumber({
  start= 0,
  duration= 1,
  end= 0,
  prefix= 'R$',
  decimals= 2,
  decimal= '.',
  ref,
}: CountUpNumberProps) {
  useCountUp({
    start,
    duration,
    end,
    prefix,
    decimals,
    decimal,
    ref: createRef(),
  })

  return (
    <strong ref={ref}></strong>
  );
}

export default CountUpNumber;