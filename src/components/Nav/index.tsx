import { useState } from "react";
import { Route } from "../../router";

export default function Nav() {
    const [showNav, setShowNav] = useState(false);
    return (
        <div
            className={`absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center rounded-lg bg-white shadow-xl/25  rounded-xl
 ${showNav ? "top-3" : "-top-14 pb-4"} transition-all duration-500 ease-in-out`}
            onMouseEnter={() => {
                setShowNav(true);
            }}
            onMouseLeave={() => {
                setShowNav(false);
            }}
            onTouchStart={() => {
                setShowNav(true);
                setTimeout(() => {
                    setShowNav(false);
                }, 3000);
            }}
        >
            <NavItem
                text="解题"
                onClick={() => {
                    Route("/");
                }}
            />
            <NavItem
                text="检查"
                onClick={() => {
                    Route("/check");
                }}
            />
        </div>
    );
}

function NavItem({ text, onClick }: { text: string; onClick?: () => void }) {
    return (
        <a
            className={`m-2 cursor-pointer px-4 py-2 rounded-lg transition-all duration-500 ease-in-out  bg-gray-100 hover:bg-gray-200`}
            onClick={onClick}
        >
            {text}
        </a>
    );
}
