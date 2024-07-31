async function collection(source, target, options = {}) {
  const { config, utils } = options;
  const { tauriFetch: fetch } = utils;
  const { auth_token: authToken } = config;

  if (authToken === undefined || authToken.length === 0) {
    throw "authToken not found";
  }

  let body = {
    business_id: 6,
    words: [source],
  };

  let res = await fetch(
    "https://apiv3.shanbay.com/wordscollection/words_bulk_upload",
    {
      method: "POST",
      headers: {
        Cookie: `auth_token=${authToken}`,
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: {
        type: "Json",
        payload: body,
      },
    },
  );

  if (res.ok) {
    const result = res.data;
    if (result.msg) {
      throw result.msg;
    } else if (result["task_id"]) {
      let check_res = await fetch(
        "https://apiv3.shanbay.com/wordscollection/words_bulk_upload",
        {
          method: "GET",
          query: { business_id: "6", task_id: result["task_id"] },
          headers: {
            Cookie: `auth_token=${authToken}`,
          },
        },
      );
      const check_result = check_res.data;
      const { failed_count } = check_result;
      if (failed_count > 0) {
        throw "Failed to add words";
      } else {
        return true;
      }
    } else {
      throw JSON.stringify(result);
    }
  } else {
    throw `Http Request Error\nHttp Status: ${res.status}\n${JSON.stringify(res.data)}`;
  }
}
