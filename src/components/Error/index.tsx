// 错误弹窗组件
export default function ErrorModal({
    error,
    onClose,
}: {
    error: string;
    onClose: () => void;
}) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
                <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 mr-4">
                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-red-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                        </div>
                    </div>
                    <h3 className="text-lg font-medium text-red-700">
                        处理错误
                    </h3>
                </div>
                <p className="text-gray-700 mb-6">{error}</p>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                        关闭
                    </button>
                </div>
            </div>
        </div>
    );
}
