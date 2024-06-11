export default function InputField({
    name,
    type,
    value,
    placeholder,
    onChange,
    className,
    ...props
}) {
    return (
        <input
            type={type || "text"}
            name={name}
            value={value}
            placeholder={placeholder}
            className={`w-full ${className ? className : null
                } bg-white outline-none text-black rounded-lg pl-2`}
            onChange={onChange}
            {...props}
        />
    );
}
