"use client";
import UploadForm from "./ui/upload-form";
import Header from "./ui/header";
import { useState } from "react";
import Summary from "./ui/summary";

import { Orbitron } from 'next/font/google';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export default function Home() {

  const [content, setContent] = useState<String | null>(null);
  const [isError, setIsError] = useState<String | null>(null);

  // Mario

  return (
    <main className="flex flex-col w-full max-w-full max-h-full space-y-8">
      <Header />

      <div className="flex flex-col space-y-10 items-center justify-evenly">
        <span className={`${orbitron.className} text-[100px] max-sm:text-5xl`}>Summarizer</span>
        <UploadForm setContentAction={setContent} setIsErrorAction={setIsError} />
      </div>

      {content && <Summary content={content} />}
      {isError &&
        <div className="flex flex-col items-center justify-center ">
          <div className="bg-red-500 w-72 h-72 rounded-md p-8 text-sm">
            {isError}
          </div>
        </div>}
      {!content &&
        <div className="flex flex-col p-8 items-center justify-center">
          <h1>Lecture Summarizer</h1>
          <p className="text-lg"><strong>Lecture Summarizer</strong> is an innovative web platform designed to streamline the process of summarizing lengthy lectures, seminars, or presentations into concise, easy-to-understand summaries. Leveraging advanced AI and natural language processing (NLP) algorithms, the website converts text-based lecture content into clear and accurate summaries that can be downloaded in popular formats such as PDF and Word.</p>
        </div>
      }
    </main>
  )
}
