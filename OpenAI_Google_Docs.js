// API KEY and variables 
const apiKey = "";
const model = "text-davinci-003"
const temperature = 0.2
const maxTokens = 1000

// UI MENU
function onOpen() {
  DocumentApp.getUi().createMenu("ChatGPT")
  .addItem("Gen Ideas", "generateIdeas")
  .addItem("Gen Paragraph", "generateParagraph")
  .addItem("Completion", "textCompletion")
  .addToUi();
}

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
function textCompletion() {
  const doc = DocumentApp.getActiveDocument()
  const selectedText = doc.getSelection().getRangeElements()[0].getElement().asText().getText()
  const body = doc.getBody()
  const prompt = selectedText;
  const requestBody = createRequestBody(prompt)
  const requestPayload = createRequestPayload(requestBody)
    
  const response = UrlFetchApp.fetch("https://api.openai.com/v1/completions", requestPayload);
  const responseText = response.getContentText();
  const json = JSON.parse(responseText);
  Logger.log(json['choices'][0]['text'])
  para = body.appendParagraph(json['choices'][0]['text'])
}


// Generate Ideas
function generateIdeas() {
  const doc = DocumentApp.getActiveDocument()
  const selectedText = doc.getSelection().getRangeElements()[0].getElement().asText().getText()
  const body = doc.getBody()
  const prompt = "Genrate 3 blog ideas around the word" + selectedText;
  const requestBody = createRequestBody(prompt)
  const requestPayload = createRequestPayload(requestBody)
    
  const response = UrlFetchApp.fetch("https://api.openai.com/v1/completions", requestPayload);
  const responseText = response.getContentText();
  const json = JSON.parse(responseText);
  Logger.log(json['choices'][0]['text'])
  para = body.appendParagraph(json['choices'][0]['text'])
}

// Generate Paragraph
function generateParagraph() {
  const doc = DocumentApp.getActiveDocument()
  const selectedText = doc.getSelection().getRangeElements()[0].getElement().asText().getText()
  const body = doc.getBody()
  const prompt = "Write a 100 word paragraph on" + selectedText;
  const requestBody = createRequestBody(prompt)
  const requestPayload = createRequestPayload(requestBody)

  const response = UrlFetchApp.fetch("https://api.openai.com/v1/completions", requestPayload);
  const responseText = response.getContentText();
  const json = JSON.parse(responseText);
  Logger.log(json['choices'][0]['text'])
  para = body.appendParagraph(json['choices'][0]['text'])
}
