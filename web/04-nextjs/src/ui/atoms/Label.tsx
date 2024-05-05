export function Label({
  className,
  ...props
}: React.AllHTMLAttributes<HTMLLabelElement>) {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label {...props} className={`flex flex-col py-1 ${className ?? ''}`} />
  )
}
