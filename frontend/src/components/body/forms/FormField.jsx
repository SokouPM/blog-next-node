import { Field } from "formik"

const FormField = (props) => {
  return (
    <div className="mb-3">
      <label htmlFor={props.id} className="font-bold">
        {props.label}
      </label>
      <Field
        className={`w-full rounded py-1 px-2 mt-1 ${
          props.touchedType && props.errorType
            ? "border-2 border-red-500"
            : "border border-gray-300"
        }`}
        as={props.type}
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
      ></Field>
      {props.touchedType && props.errorType && (
        <div className="text-red-500">{props.errorType}</div>
      )}
    </div>
  )
}

export default FormField
