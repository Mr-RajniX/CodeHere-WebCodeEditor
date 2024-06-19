import React from 'react';
import Select from 'react-select';
import './Navbar.css';
import { Logo } from "../assets/index"
import { Link } from 'react-router-dom';

const Navbar = ({ userLang, setUserLang, userTheme,
    setUserTheme, fontSize, setFontSize, userCode }) => {
    const languages = [
        { value: "c", label: "C" },
        { value: "cpp", label: "C++" },
        { value: "python", label: "Python" },
        { value: "java", label: "Java" },
    ];
    const themes = [
        { value: "vs-dark", label: "Dark" },
        { value: "light", label: "Light" },
    ];

    const downloadCode = () => {
        console.log("User code:", userCode); // Log userCode
        const element = document.createElement("a");
        const file = new Blob([userCode], { type: "text/plain" });
        element.href = URL.createObjectURL(file);
        if (userLang === 'java') {
            element.download = `main.${getFileExtension(userLang)}`;
        } else {
            element.download = `code.${getFileExtension(userLang)}`;
        }
        document.body.appendChild(element);
        element.click();
    }
    

    const getFileExtension = (language) => {
        const extensions = {
            python: "py",
            cpp: "cpp",
            java: "java",
            c: "c",
        };
        return extensions[language] || "txt";
    }

    return (
        <div className="navbar">
            <Link to={"/home"}>
                <img
                    src={Logo}
                    alt="Logo"
                    className="object-contain w-40 h-auto"
                />
            </Link>
            <Select options={languages} value={userLang}
                onChange={(e) => setUserLang(e.value)}
                placeholder={userLang} />
            <Select options={themes} value={userTheme}
                onChange={(e) => setUserTheme(e.value)}
                placeholder={userTheme} />
            <label>Font Size</label>
            <input type="range" min="18" max="30"
                value={fontSize} step="2"
                onChange={(e) => { setFontSize(e.target.value) }} />
            <button onClick={downloadCode} className="download-btn top-0 right-0 py-2 px-3 text-xl">
                Download
            </button>
        </div>
    )
}

export default Navbar;
