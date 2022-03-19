import { Field } from "formik"

const FormField = (props) => {
  return (
    <div className="mb-3">
      <label htmlFor={props.id} className="font-bold">
        {props.label}
      </label>
      <Field
        className={`w-full rounded py-2 px-3 mt-1 ${
          props.touchedType && props.errorType
            ? "border-2 border-red-500 errorField"
            : "border-2 border-gray-300"
        }`}
        as={props.type}
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
      ></Field>
      {props.touchedType && props.errorType && (
        <div className="errorField text-red-500 font-bold">
          {props.errorType}
        </div>
      )}
    </div>
  )
}

export default FormField
