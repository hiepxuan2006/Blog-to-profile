import { FormFeedback, FormGroup, Input, Label } from "reactstrap"

export const InputField = (props) => {
  const {
    field,
    form,
    label,
    placeholder,
    type,
    disabled = false,
    defaultValue,
  } = props
  const { name, value, onChange, onBlur } = field
  const { errors, touched } = form
  const showError = errors[name] && touched[name]
  return (
    <FormGroup className="form-group">
      <Input
        // onChange={handleChangeDataLogin}
        type={type}
        defaultValue={defaultValue}
        {...field}
        className={`form-style ${showError ? "is-invalid" : ""}`}
        placeholder={placeholder}
        id={name}
        autoComplete="off"
      />
      {label && <Label htmlFor="">{label}</Label>}
      {/* <FormFeedback>{showError && errors[name]}</FormFeedback> */}
    </FormGroup>
  )
}
