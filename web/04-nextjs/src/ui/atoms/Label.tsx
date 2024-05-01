export function Label({
  className,
  ...props
}: React.AllHTMLAttributes<HTMLLabelElement>) {
  return (
    <label {...props} className={`flex flex-col py-1 ${className ?? ''}`} />
  )
}
