'use server';

import dotenv from "dotenv";

dotenv.config();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;


const BASE_URL = "https://generativelanguage.googleapis.com";

export async function uploadArrayBuffer(arrayBuffer: ArrayBuffer, displayName: String, modelName: "flash" | "pro", args: String | null) {
  // Kirolos
  const numBytes = arrayBuffer.byteLength;

  // Step 1: Initial resumable request defining metadata
  const initialResponse = await fetch(`${BASE_URL}/upload/v1beta/files?key=${GOOGLE_API_KEY}`, {
    method: 'POST',
    headers: {
      'X-Goog-Upload-Protocol': 'resumable',
      'X-Goog-Upload-Command': 'start',
      'X-Goog-Upload-Header-Content-Length': numBytes.toString(),
      'X-Goog-Upload-Header-Content-Type': 'application/pdf',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ file: { display_name: displayName } }),
  });

  if (!initialResponse.ok) {
    throw new Error(`Failed to start upload: ${initialResponse.statusText}`);
  }

  // Extract upload URL from headers
  const uploadUrl = initialResponse.headers.get('x-goog-upload-url');
  if (!uploadUrl) {
    throw new Error('Upload URL not found in response headers');
  }
  console.log('Upload URL:', uploadUrl);

  // Step 2: Upload the actual bytes
  const uploadResponse = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      'Content-Length': numBytes.toString(),
      'X-Goog-Upload-Offset': '0',
      'X-Goog-Upload-Command': 'upload, finalize',
    },
    body: arrayBuffer, // Directly use the ArrayBuffer here
  });

  const fileInfo = await uploadResponse.json();
  const fileUri = fileInfo?.file?.uri;

  if (!fileUri) {
    throw new Error('File URI not found after upload');
  }
  console.log('File URI:', fileUri);

  // Step 3: Generate content using the uploaded file
  const generateContentResponse = await fetch(
    `${BASE_URL}/v1beta/models/gemini-1.5-${modelName}:generateContent?key=${GOOGLE_API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text:
                  `Summarize this lecture pdf and don't mention the lecture, ${args ? args : ''} and format the result as an html file at least 400 word don't write ${'```html'} and only answer with the summarization`
              },
              {
                file_data: {
                  mime_type: 'application/pdf',
                  file_uri: fileUri,
                },
              },
            ],
          },
        ],
      }),
    }
  );

  if (!generateContentResponse.ok) {
    throw new Error(`Failed to generate content: ${generateContentResponse.statusText}`);
  }

  const contentResult = await generateContentResponse.json();

  // Step 4: Extract and log content
  const generatedTexts = contentResult.candidates?.flatMap((candidate: any) =>
    candidate.content?.parts?.map((part: any) => part.text)
  );
  return generatedTexts;
}
