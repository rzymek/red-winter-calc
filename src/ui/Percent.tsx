export function Percent(props: { value: number }) {
  if (isNaN(props.value)) {
    return <></>;
  }
  return <>{Math.round(props.value * 100)}%</>;
}