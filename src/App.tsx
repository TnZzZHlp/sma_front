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
            <Component />
        </MathJaxContext>
    );
}

export default App;
