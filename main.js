async function collection(source, target, options = {}) {
    const { config, utils } = options;
    const { tauriFetch: fetch } = utils;
    const { auth_token: authToken } = config;

    if (authToken === undefined || authToken.length === 0) {
        throw new Error("authToken not found");
    }

    let body = {
        "business_id": 6,
        "words": [source]
    };

    try {
        console.log("Sending POST request...");
        let res = await fetch("https://apiv3.shanbay.com/wordscollection/words_bulk_upload", {
            method: "POST",
            headers: {
                "Cookie": `auth_token=${authToken}`,
                "Content-Type": "application/json;charset=UTF-8"
            },
            body: {
                type: "Json",
                payload: body
            }
        });

        console.log("POST response:", res);

        if (res.ok) {
            const result = res.data;
            console.log("POST result:", result);

            if (result.msg) {
                throw new Error(result.msg);
            } else if (result.id || result.task_id) {
                const taskId = result.id || result.task_id;
                console.log("Task ID:", taskId);

                // 添加延遲，等待任務處理
                await new Promise(resolve => setTimeout(resolve, 2000));

                console.log("Sending GET request to check task status...");
                let check_res = await fetch("https://apiv3.shanbay.com/wordscollection/words_bulk_upload", {
                    method: "GET",
                    query: { "business_id": "6", "task_id": taskId },
                    headers: {
                        "Cookie": `auth_token=${authToken}`
                    }
                });

                console.log("GET response:", check_res);

                if (check_res.ok) {
                    const check_result = check_res.data;
                    console.log("GET result:", check_result);

                    if (check_result.failed_count !== undefined) {
                        const { failed_count } = check_result;
                        if (failed_count > 0) {
                            throw new Error(`Failed to add ${failed_count} words`);
                        } else {
                            console.log("Words added successfully");
                            return true;
                        }
                    } else {
                        throw new Error("Unexpected check result format");
                    }
                } else {
                    throw new Error(`Check request failed: ${check_res.status} ${JSON.stringify(check_res.data)}`);
                }
            } else {
                throw new Error(`Unexpected result format: ${JSON.stringify(result)}`);
            }
        } else {
            throw new Error(`Http Request Error\nHttp Status: ${res.status}\n${JSON.stringify(res.data)}`);
        }
    } catch (error) {
        console.error("Error in collection function:", error);
        throw error;
    }
}
