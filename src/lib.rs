use serde_json::{json, Value};
use std::collections::HashMap;
use std::error::Error;

#[no_mangle]
pub fn collection(
    source: &str,
    _target: &str,
    _from: &str,
    _to: &str,
    needs: HashMap<String, String>,
) -> Result<Value, Box<dyn Error>> {
    let client = reqwest::blocking::ClientBuilder::new().build()?;
    let token = match needs.get("auth_token") {
        Some(token) => token.to_string(),
        None => return Err("Please provide token".into()),
    };
    let body = json!({
            "business_id": 6,
            "words":[source]
    });
    let res: Value = client
        .post("https://apiv3.shanbay.com/wordscollection/words_bulk_upload")
        .header("Cookie", format!("auth_token={}", token))
        .header("Content-Type", "application/json;charset=UTF-8")
        .json(&body)
        .send()?
        .json()?;

    if let Some(json) = res.as_object() {
        if let Some(msg) = json.get("msg") {
            return Err(msg.as_str().unwrap().to_string().into());
        }
        if let Some(id) = json.get("task_id") {
            let check_res: Value = client
                .get("https://apiv3.shanbay.com/wordscollection/words_bulk_upload")
                .query(&[("business_id", "6"), ("task_id", id.as_str().unwrap())])
                .header("Cookie", format!("auth_token={}", token))
                .send()?
                .json()?;
            if let Some(json) = check_res.as_object() {
                if let Some(count) = json.get("failed_count") {
                    if count.as_u64().unwrap() > 0 {
                        return Err("Failed to add words".into());
                    }
                }
            }
        }
    }
    Ok(Value::Bool(true))
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn try_request() {
        let mut needs = HashMap::new();
        needs.insert("auth_token".to_string(), "".to_string());
        let result = collection("pot", "你好", "en", "zh_cn", needs);
        println!("{result:?}");
    }
}
