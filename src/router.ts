import Solution from "./components/Solution";
import Check from "./components/Check";
import { useState } from "react";

export function Route(path: string) {
    // 通过 history API 修改浏览器地址栏
    window.history.pushState({}, "", path);
    // 触发 popstate 事件
    window.dispatchEvent(new PopStateEvent("popstate"));
}

export function useRouter() {
    const [pathname, setPathname] = useState(window.location.pathname);

    // 监听 popstate 事件
    window.addEventListener("popstate", () => {
        if (window.location.pathname !== pathname) {
            setPathname(window.location.pathname);
        }
    });

    switch (pathname) {
        case "/":
            return Solution;
        case "/check":
            return Check;
        default:
            return Solution;
    }
}
