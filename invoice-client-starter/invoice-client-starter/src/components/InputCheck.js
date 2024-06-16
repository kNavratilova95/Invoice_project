export function InputCheck(props) {
  // supported types for element input
  const INPUTS = ["checkbox", "radio"];

  // validation of type
  const type = props.type.toLowerCase();
  const checked = props.checked || "";

  if (!INPUTS.includes(type)) {
    return null;
  }

  return (
    <div className="form-group form-check">
      <label className="form-check-label">
        {/* rendering with the current type */}
        <input
          type={props.type}
          className="form-check-input"
          name={props.name}
          value={props.value}
          checked={checked}
          onChange={props.handleChange}
        />{" "}
        {props.label}
      </label>
    </div>
  );
}

export default InputCheck;