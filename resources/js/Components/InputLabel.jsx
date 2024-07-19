export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={`block font-medium text-sm  dark:text-gray-300 ` + className}>
            {value ? value : children}
        </label>
    );
}
