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
  errors,
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
}) => {
  const onChange = (e: any) => {
     onChangeHandler && onChangeHandler(e);
  };

  // const value = value || "";



  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={name}
        className="text-[14px] font-medium text-[var(--primary)] text-start"
      >
        {label}
        {required && <span className="text-[var(--red)]"> *</span>}
      </label>

      {(type === "text" || type === "number" || type === "email" || type === "textarea" || type === "date") && (
        <input
          type={type}
          value={value}
          onChange={onChangeHandler}
          name={name}
          className={`w-full h-[44px] border border-[var(--borderGray)]/50 rounded-md p-2 outline-none text-[14px] ${errors ? "border-[var(--red)]" : ""}`}
          placeholder={placeholder}
        />
      )}


      {type === "dropdown" && (
        <Dropdown
          options={options || []}
          onChangeHandler={onChange}
          value={value || ""}
          name={name}
          errors={errors}
        />
      )}
      {errors && <p className="text-[var(--red)] text-[12px]">{errors}</p>}
    </div>
  );
};

export default Input;
