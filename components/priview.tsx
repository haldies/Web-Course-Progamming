"use client";


import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.snow.css";

interface PriviewProps {
    value: string;
};

export const Preview = ({
    value,

}: PriviewProps) => {

    const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), {
        ssr: false
    }), [])

    return (

            <ReactQuill
            theme="bubble"
            value={value}
            readOnly
            />
    );

};


