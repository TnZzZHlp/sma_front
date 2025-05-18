import { useState, useEffect } from "react";
import ErrorModal from "../Error";
import "./index.css";
import { MathJax } from "better-react-mathjax";
import Collapse from "../Collapse";

// 定义解题结果接口
interface Question {
    steps: { content: string }[];
    knowledge: {
        category: string;
        content: string;
        importance: "HIGH" | "MEDIUM" | "LOW";
    }[];
}

interface SolutionResult {
    questions: Question[];

    other_error: string | null;
}

export default function Solution() {
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [solution, setSolution] = useState<SolutionResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

    // 处理API返回的错误
    useEffect(() => {
        if (solution && solution.other_error) {
            setShowErrorModal(true);
        }
    }, [solution]);

    // 处理文件上传
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
            setError(null);
        }
    };

    // 处理表单提交
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!image) {
            setError("请先上传题目图片");
            return;
        }

        setLoading(true);
        setSolution(null);
        setError(null);
        setShowErrorModal(false);

        try {
            const formData = new FormData();
            formData.append("image", image);

            const response = await fetch("/ai/solution", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP错误! 状态码: ${response.status}`);
            }

            const result = await response.json();
            setSolution(result);
            // 错误会在 useEffect 中处理
        } catch (err) {
            const errorMessage = `上传失败: ${
                err instanceof Error ? err.message : String(err)
            }`;
            setError(errorMessage);
            // 显示常规错误(非API返回的错误)
            setShowErrorModal(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                    上传题目
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-4 hover:border-blue-500 transition-colors cursor-pointer">
                        {image ? (
                            <div className="relative">
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="题目预览"
                                    className="max-w-full max-h-[300px] mx-auto rounded"
                                />
                                <button
                                    type="button"
                                    onClick={() => setImage(null)}
                                    className="absolute top-2 right-2 bg-white/80 rounded-full p-1 shadow hover:bg-white"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-gray-700"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                        ) : (
                            <label className="flex flex-col items-center justify-center min-h-[200px] cursor-pointer">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-12 w-12 text-gray-400 mb-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                                <p className="text-gray-500">
                                    点击这里上传图片
                                </p>
                            </label>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={loading || !image}
                        className="w-full py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed active:bg-blue-800 transition-all duration-500 ease-in-out"
                    >
                        {loading ? "解析中..." : "开始解题"}
                    </button>
                </form>
                {error && <p className="mt-4 text-red-500">{error}</p>}
            </div>

            {/* 右侧结果区域 */}
            <div className="w-full md:w-2/3 flex flex-col lg:flex-row gap-4">
                {/* 解题步骤 */}
                <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                        解题步骤
                    </h2>

                    {loading && (
                        <div className="flex items-center justify-center h-32">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                        </div>
                    )}

                    {solution && (
                        <div className="max-h-[calc(100vh-130px)] overflow-y-auto pr-2">
                            <div className="space-y-4 px-1">
                                {solution.questions.map((question, qIndex) => (
                                    <Collapse
                                        title={`第${qIndex + 1}问`}
                                        key={qIndex}
                                    >
                                        {question.steps.map((step, index) => (
                                            <div
                                                key={index}
                                                className="flex group bg-blue-50 rounded-lg p-3 transition-all duration-200 cursor-default my-2"
                                            >
                                                <div className="flex-shrink-0 mr-4">
                                                    <div
                                                        className={`flex items-center justify-center w-8 h-8 rounded-full font-semibold transition-colors `}
                                                    >
                                                        {index + 1}
                                                    </div>
                                                </div>
                                                <div>
                                                    <p
                                                        className={`leading-relaxed text-base`}
                                                    >
                                                        <MathJax>
                                                            {step.content}
                                                        </MathJax>
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </Collapse>
                                ))}
                            </div>
                        </div>
                    )}

                    {!loading && !solution && (
                        <div className="flex items-center justify-center h-48 text-gray-400 italic">
                            <p>上传题目后，AI将在这里展示解题思路</p>
                        </div>
                    )}
                </div>

                {/* 知识点 */}
                <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                        相关知识点
                    </h2>

                    {loading && (
                        <div className="flex items-center justify-center h-32">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                        </div>
                    )}

                    {solution && (
                        <div className="space-y-4 max-h-[calc(100vh-130px)] overflow-y-auto">
                            {solution.questions.map((item, index) => (
                                <Collapse
                                    key={index}
                                    title={`第${index + 1}问`}
                                >
                                    {item.knowledge.map((item, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className={`p-4 rounded-md shadow-sm border-l-4 my-4  ${
                                                    item.importance === "HIGH"
                                                        ? "border-red-500"
                                                        : item.importance ===
                                                          "MEDIUM"
                                                        ? "border-yellow-500"
                                                        : "border-green-500"
                                                }`}
                                            >
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="font-medium text-gray-700">
                                                        {item.category}
                                                    </span>
                                                    <span
                                                        className={`px-2 py-1 text-xs rounded-full ${
                                                            item.importance ===
                                                            "HIGH"
                                                                ? "bg-red-100 text-red-800"
                                                                : item.importance ===
                                                                  "MEDIUM"
                                                                ? "bg-yellow-100 text-yellow-800"
                                                                : "bg-green-100 text-green-800"
                                                        }`}
                                                    >
                                                        {item.importance ===
                                                        "HIGH"
                                                            ? "重要"
                                                            : item.importance ===
                                                              "MEDIUM"
                                                            ? "中等"
                                                            : "普通"}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600">
                                                    <MathJax>
                                                        {item.content}
                                                    </MathJax>
                                                </p>
                                            </div>
                                        );
                                    })}
                                </Collapse>
                            ))}
                        </div>
                    )}

                    {!loading && !solution && (
                        <div className="flex items-center justify-center h-48 text-gray-400 italic">
                            <p>上传题目后，AI将在这里展示相关知识点</p>
                        </div>
                    )}
                </div>
            </div>

            {/* 错误弹窗 */}
            {showErrorModal && (
                <ErrorModal
                    error={solution?.other_error || error || "未知错误"}
                    onClose={() => setShowErrorModal(false)}
                />
            )}
        </>
    );
}
