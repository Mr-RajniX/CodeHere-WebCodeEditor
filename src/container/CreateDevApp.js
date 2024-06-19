import { useState, useEffect } from "react";
import "./CreateDevApp.css";
import Editor from "@monaco-editor/react";
import Navbar from "./Navbar";
import Axios from "axios";

function CreateDevApp() {
    const [userCode, setUserCode] = useState(``);
    const [userLang, setUserLang] = useState("python");
    const [userTheme, setUserTheme] = useState("vs-dark");
    const [fontSize, setFontSize] = useState(20);
    const [userInput, setUserInput] = useState("");
    const [userOutput, setUserOutput] = useState("");
    const [loading, setLoading] = useState(false);

    const options = {
        fontSize: fontSize,
    };

    // Default code snippets for various languages
    const defaultCode = {
        python: "# Enter your Python code here\nprint('Hello, world!')",
        cpp: "// Enter your C++ code here\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << 'Hello, world!' << endl;\n    return 0;\n}",
        java: "// Enter your Java code here\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println('Hello, world!');\n    }\n}",
        c: "// Enter your C code here\n#include <stdio.h>\n\nint main() {\n    printf('Hello, world!');\n    return 0;\n}",
        // Add more languages and their default code here
    };

    // Update userCode when userLang changes
    useEffect(() => {
        setUserCode(defaultCode[userLang] || "");
    }, [userLang]);

    function compile() {
        setLoading(true);
        if (userCode === ``) {
            return;
        }

        // Post request to compile endpoint
        Axios.post(`http://localhost:8000/compile`, {
            code: userCode,
            language: userLang,
            input: userInput,
        })
            .then((res) => {
                setUserOutput(res.data.output);
            })
            .catch((err) => {
                setUserOutput(
                    `Error: ${
                        err.response ? err.response.data.error : err.message
                    }`
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const clearOutput = () => {
        setUserOutput("");
    };

    return (
        <div className="CreateDevApp">
            <Navbar
                userLang={userLang}
                setUserLang={setUserLang}
                userTheme={userTheme}
                setUserTheme={setUserTheme}
                fontSize={fontSize}
                setFontSize={setFontSize}
                userCode={userCode}
            />
            <div className="main">
                <div className="left-container">
                    <Editor
                        options={options}
                        height="calc(100vh - 50px)"
                        width="100%"
                        theme={userTheme}
                        language={userLang}
                        value={userCode}
                        onChange={(value) => {
                            setUserCode(value);
                        }}
                    />
                </div>
                <div className="right-container">
                    <h4>Input:</h4>
                    <div className="input-box">
                        <textarea
                            id="code-inp"
                            onChange={(e) => setUserInput(e.target.value)}
                        />
                    </div>
                    <button className="run-btn p-2" onClick={compile}>
                        Run
                    </button>
                    <h4>Output:</h4>
                    <div className="output-box">
                        {loading ? (
                            <div className="spinner-box">Loading...</div>
                        ) : (
                            <pre>{userOutput}</pre>
                        )}
                    </div>
                    <button onClick={clearOutput} className="clear-btn p-2">
                        Clear
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateDevApp;
