export default function Select({
    name,
    value,
    options,
    onChange,
    placeholder,
    className,
}) {
    return (
        <select
            name={name}
            value={value}
            className={`w-full ${className ? className : null} bg-white outline-none text-black rounded-lg pl-2 mb-3 cursor-pointer text-sm`}
            onChange={onChange}
        >
            <option value='' hidden>
                {placeholder}
            </option>
            {options.map((option) => (
                <option key={option.value} value={option.value} className='font-normal text-[14px] py-5 h-[232px]'>
                    {option.label}
                </option>
            ))}
        </select>
    );
}
