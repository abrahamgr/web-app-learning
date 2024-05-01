export function Button({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button
      {...props}
      className={`rounded-lg bg-slate-600 px-4 py-2 hover:bg-slate-400 ${className ?? ''}`}
    />
  )
}
