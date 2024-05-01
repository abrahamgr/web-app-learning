type AsTextField = 'text' | 'textarea'
type InputProps = React.InputHTMLAttributes<HTMLInputElement>
type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

interface BaseTextFieldProps {
  as: AsTextField
}
// type TextFieldProps<T = AsTextField> = T extends 'text'
//   ? InputProps
//   : TextAreaProps

// type TextFieldProps2<T extends BaseTextFieldProps> = T['as'] extends 'text'
//   ? InputProps
//   : TextAreaProps

type TextFieldProps = BaseTextFieldProps & (InputProps | TextAreaProps)

export function TextField({ as, className, ...props }: TextFieldProps) {
  if (as === 'text') {
    return (
      <input
        {...(props as InputProps)}
        className={`flex flex-col rounded-md px-2 py-1 text-zinc-900 ${className ?? ''}`}
      />
    )
  }
  return (
    <textarea
      {...(props as TextAreaProps)}
      className={`flex flex-col rounded-md px-2 py-1 text-zinc-900 ${className ?? ''}`}
    />
  )
}
