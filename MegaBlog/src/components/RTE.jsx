// ********RTE: Real Time Editor -> for this we use "tinymce"  *********
import React from "react";
import {Editor} from "@tinymce/tinymce-react"
import { Controller } from "react-hook-form";     //Here we use controller to pass the control without using Hooks

export default function RTE({name, control, label, defaultValue =""}) {        //Here control pass (gives) the control which function call it
    return (
      <div className='w-full'> 
        {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
  
        <Controller
            name={name || "content"}
            control={control}
            render={({field : {onChange}}) =>(
                <Editor
                    initialValue={defaultValue}
                    init={{                                 //which are you want to edit
                        initialValue : defaultValue,
                        height :500,
                        menubar : true,
                        plugins: [
                            "image",
                            "advlist",
                            "autolink",
                            "lists",
                            "link",
                            "image",
                            "charmap",
                            "preview",
                            "anchor",
                            "searchreplace",
                            "visualblocks",
                            "code",
                            "fullscreen",
                            "insertdatetime",
                            "media",
                            "table",
                            "code",
                            "help",
                            "wordcount",
                            "anchor",
                        ],
                        toolbar:
                        "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                        content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                    }}
                    onEditorChange = {onChange}   //it change the field of editor 
                />
            )}
            
        />
      
  
      </div>
    )
}