import { Typography } from "./ui/Typography"

type Props = {
  label: string
  value: React.ReactNode
}

export function ParamRow({ label, value }: Props) {
  return (
    <Typography variant="p">
      <strong>{label}:</strong> <span>{value}</span>
    </Typography>
  )
}
