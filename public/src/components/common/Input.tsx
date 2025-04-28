import Dropdown from "./Dropdown";

const Input = ({
  label,
  placeholder,
  name,
  required = false,
  type = "text",
  options,
  onChangeHandler,
  value,
  disabled = false,
  errors,
  size = "default",
}: {
  label?: string;
  placeholder: string;
  name: string;
  required?: boolean;
  type?: string;
  options?: { name: string; value: any }[];
  onChangeHandler?: (e: any) => void;
  value?: any;
  errors?: string;
  disabled?: boolean;
  size?: "small" | "default";
}) => {
  const onChange = (e: any) => {
    onChangeHandler && onChangeHandler(e);
  };

  // const value = value || "";

  const inputHeight = size === "small" ? "h-[32px]" : "h-[44px]";
  const fontSize = size === "small" ? "text-[12px]" : "text-[14px]";
  const labelSize = size === "small" ? "text-[12px]" : "text-[14px]";

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={name}
        className={`${labelSize} font-medium text-[var(--primary)] text-start`}
      >
        {label}
        {required && <span className="text-[var(--red)]"> *</span>}
      </label>

      {(type === "text" ||
        type === "number" ||
        type === "email" ||
        type === "textarea" ||
        type === "date") && (
        <input
          type={type}
          value={value}
          onChange={onChangeHandler}
          disabled={disabled}
          name={name}
          className={`w-full ${inputHeight} border border-[var(--borderGray)]/50 rounded-md p-2 outline-none ${fontSize} ${
            errors ? "border-[var(--red)]" : ""
          }`}
          placeholder={placeholder}
        />
      )}

      {type === "dropdown" && (
        <Dropdown
          options={options || []}
          onChangeHandler={onChange}
          value={value || ""}
          name={name}
          disabled={disabled}
          errors={errors}
          size={size}
        />
      )}
      {errors && <p className="text-[var(--red)] text-[12px]">{errors}</p>}
    </div>
  );
};

export default Input;
