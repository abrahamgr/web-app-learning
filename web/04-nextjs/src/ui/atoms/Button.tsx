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
      className={`lastPage rounded-lg bg-slate-600 px-4 py-2 hover:bg-slate-400 disabled:bg-slate-700 disabled:hover:bg-slate-700 ${className ?? ''}`}
    />
  )
}
