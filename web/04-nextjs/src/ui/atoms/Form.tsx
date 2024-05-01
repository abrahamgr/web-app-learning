export function Form({
  className,
  ...props
}: React.AllHTMLAttributes<HTMLFormElement>) {
  return (
    <form
      {...props}
      className={`rounded-lg border-[1px] border-slate-700 px-5 py-10 ${className ?? ''}`}
    />
  )
}
