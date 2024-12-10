import React, {useId} from "react"

const Input=React.forwardRef(function Input({        //Here Input function is wraped by forwardRef  Hooks
    label,
    type="text",
    className="",
    ...props
}, ref) {

    const id=useId()                    //create the unique id for each Input field
    return(
        <div className="w-full ">
            {label && <label className="inline-block mb-1 pl-1"      // if "label" present then create label
            htmlFor={id}> 
                {label} 
            </label>
            }
            <input 
                type={type}
                className={`px-3 py-3 rounded-lg bg-white text-black 
                            outline-none focus:bg-gray-50 duration-200 border-gray-200 
                            w-full ${className}`} 
                ref={ref}
                {...props}
                id={id}      //Here , same unique id generate for label as well as its corresponding input field ...
                             //for this ,if we click at a label the currsor focus its corresponding input field  
            />
        </div>
    )

})

export default Input;

// forwardRef is a higher-order function that allows you to pass a ref from a parent component to a 
//child component, which then forwards that ref to a DOM node or another component. This enables parent components
// to access or manipulate a child component’s DOM element.


//Here we use forwardRef Hooks for :=>  we use the input field at muitipule components (like: at take passwod , take email..)
//so the diff-diff "ref" ids are needed to acess or make link between component & input field




