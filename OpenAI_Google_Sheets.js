// API KEY and variables 
const apiKey = "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";
const model = "text-davinci-003"
const temperature = 0.2
const maxTokens = 10

function createRequestBody(prompt) {
  const requestBody = {
    "model": model,
    "prompt": prompt,
    "temperature": temperature,
    "max_tokens": maxTokens,
  };
  return requestBody;
}

function createRequestPayload(requestBody) {
  const requestPayload = {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Bearer "+apiKey
    },
    "payload": JSON.stringify(requestBody)
  }
  return requestPayload;
}

// Text Completion
function ChatGPT(prompt, cell) {
  prompt = prompt+cell+":"

  const requestBody = createRequestBody(prompt)
  const requestPayload = createRequestPayload(requestBody)
  const response = UrlFetchApp.fetch("https://api.openai.com/v1/completions", requestPayload);
  console.log(response.getContentText())
  const responseBody = JSON.parse(response.getContentText());
  const answer= responseBody.choices[0].text

  return answer
}