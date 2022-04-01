import { Field } from "formik"

const FormField = (props) => {
  return (
    <div className="mb-3">
      <label htmlFor={props.id} className="font-bold text-pink-700">
        {props.label}
      </label>
      <Field
        className={`w-full rounded bg-white/5 py-2 px-3 text-pink-400 mt-1 ${
          props.touchedType && props.errorType
            ? "border-4 border-red-600 errorField"
            : "border-2 border-pink-400"
        }`}
        as={props.type}
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        rows={props.rows}
      ></Field>
      {props.touchedType && props.errorType && (
        <div className="errorField text-red-600 text-xl font-bold">
          {props.errorType}
        </div>
      )}
    </div>
  )
}

export default FormField
