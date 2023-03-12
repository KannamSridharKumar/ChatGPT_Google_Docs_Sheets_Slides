// API KEY and variables 
const apiKey = "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";
const model = "text-davinci-003"
const temperature = 0.2
const maxTokens = 200

// UI MENU
function onOpen() {
    SlidesApp.getUi().createMenu("ChatGPT")
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
  
  // Completion
  function textCompletion() {
    const presentation = SlidesApp.getActivePresentation();
    const selectedText = presentation.getSelection().getCurrentPage().getShapes()[0].getText().asString();
    const slide = presentation.getSelection().getCurrentPage();
    const requestBody = createRequestBody(selectedText)
    const requestPayload = createRequestPayload(requestBody)
    
    const response = UrlFetchApp.fetch("https://api.openai.com/v1/completions", requestPayload);
    const responseText = response.getContentText();
    const json = JSON.parse(responseText);
    const generatedText = json['choices'][0]['text'];
    slide.insertTextBox(generatedText.toString());
  }

  
