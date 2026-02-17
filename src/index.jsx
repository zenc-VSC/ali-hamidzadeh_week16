/* eslint-disable react/prop-types */
const Input = ({ handleChange, hint, value }) => {
  return (
    <div className="input">
      <input type="text" id="input" onChange={handleChange} value={value} />

      {hint && (
        <label htmlFor="input">
          <span style={{ visibility: "hidden" }}>{value}</span>
          {hint}
        </label>
      )}
    </div>
  );
};

export default Input;
