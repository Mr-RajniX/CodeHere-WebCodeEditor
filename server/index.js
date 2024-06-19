const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

// Your JDoodle client ID and client secret
const JDoodleClientId = "c565d4aa45a68055744c03d9f320f67c";
const JDoodleClientSecret = "44fd730dfe147f6829c34037f1e56b90d7c60b2fe5e5d661f486705f034f5650";

app.post("/compile", async (req, res) => {
    const { code, language, input } = req.body;

    // Define language IDs for JDoodle API
    const languageMap = {
        python: "python3",
        cpp: "cpp17",
        java: "java",
        c: "c", // Added C language support
        // Add more languages as needed
    };

    const languageType = languageMap[language];
    if (!languageType) {
        return res.status(400).send({ error: "Unsupported language" });
    }

    const options = {
        method: 'POST',
        url: 'https://api.jdoodle.com/v1/execute',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            script: code,
            language: languageType,
            versionIndex: '0', // For the latest version
            stdin: input,
            clientId: JDoodleClientId,
            clientSecret: JDoodleClientSecret
        }
    };

    try {
        const response = await axios.request(options);
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Something went wrong' });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
