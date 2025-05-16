import { useState, type ReactNode } from "react";

export default function Collapse({
    children,
    title,
}: {
    children: ReactNode;
    title: string;
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mb-4 rounded-lg border border-gray-200 bg-white shadow-md ">
            <div
                className="flex justify-between items-center p-4 cursor-pointer select-none hover:bg-gray-50 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="font-medium text-gray-700">{title}</div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 text-gray-500 transform transition-transform duration-300 ${
                        isOpen ? "rotate-180" : "rotate-0"
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
            <div className={` ${isOpen ? "opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="p-4 border-t border-gray-200">{children}</div>
            </div>
        </div>
    );
}
