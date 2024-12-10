import React, {useId} from "react";

function Select({
    options,
    label,
    className,
    ...props
},ref) {
    const id = useId()
    return(
        <div className="w-full">
            {label && <label htmlFor={id} className=""></label>}         {/*if labei is present */}
            <select
                id={id}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 
                    duration-200 border border-gray-200 w-full ${className}`}
                {...props} 
                ref={ref}   
            >
                {options?.map((option)=>(                       //here basically "options" is a array that contains many "option"... if any option is present in options then we applied map
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select);       // you can also wrap this way And also can do wrap at first when you write function (like Input.jsx )