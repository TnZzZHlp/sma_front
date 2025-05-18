import { MathJaxContext } from "better-react-mathjax";
import Nav from "./components/Nav";
import { useRouter } from "./router";

function App() {
    const Component = useRouter();

    return (
        <MathJaxContext
            config={{
                loader: { load: ["[tex]/html"] },
                tex: {
                    packages: { "[+]": ["html"] },
                    inlineMath: [
                        ["$", "$"],
                        ["\\(", "\\)"],
                    ],
                    displayMath: [
                        ["$$", "$$"],
                        ["\\[", "\\]"],
                    ],
                },
            }}
        >
            <Nav />
            <div className="flex flex-col md:flex-row w-full min-h-screen p-4 gap-4 bg-gray-100">
                <Component />
            </div>
        </MathJaxContext>
    );
}

export default App;
