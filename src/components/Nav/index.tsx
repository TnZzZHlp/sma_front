import { useState } from "react";

export default function Nav() {
    const [showNav, setShowNav] = useState(false);
    return (
        <div
            className={`absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center rounded-lg bg-white shadow-xl/25  rounded-xl
 ${showNav ? "top-3" : "-top-12"} transition-all duration-500 ease-in-out`}
            onMouseEnter={() => setShowNav(true)}
            onMouseLeave={() => setShowNav(false)}
        >
            <NavItem text="解题" onClick={() => (window.location.href = "/")} />
            <NavItem
                text="检查"
                onClick={() => (window.location.href = "/check")}
            />
        </div>
    );
}

function NavItem({ text, onClick }: { text: string; onClick?: () => void }) {
    const [hover, setHover] = useState(false);
    const hoverStyle = hover ? "bg-gray-100" : "";

    return (
        <div
            className={`m-4 cursor-pointer px-4 py-2 rounded-lg transition-all duration-500 ease-in-out  ${hoverStyle}`}
            onClick={onClick}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {text}
        </div>
    );
}
