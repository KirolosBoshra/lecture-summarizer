'use client'

import { uploadArrayBuffer } from '@/lib/gemini-call';
import { useState, ChangeEvent, FormEvent, Dispatch, SetStateAction } from 'react';

interface UploadFormProps {
  setContentAction: Dispatch<SetStateAction<String | null>>;
  setIsErrorAction: Dispatch<SetStateAction<String | null>>;
};

export default function UploadForm({ setContentAction, setIsErrorAction }: UploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [model, setModel] = useState<'flash' | 'pro'>('flash');
  const [optionalArgs, setOptionalArgs] = useState<String | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleArgsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.currentTarget.value;
    if (text) {
      setOptionalArgs(text);
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (file && (model == 'flash' || model == 'pro')) {
      setContentAction(null);
      setIsLoading(true);
      const buf = await file.arrayBuffer();
      try {
        const cont = await uploadArrayBuffer(buf, file.name, model, optionalArgs);
        setContentAction(cont);
      } catch (error) {
        console.error('Error:', error);
        setIsErrorAction(error as String);
      } finally {
        setIsLoading(false);
      }
    }

  };

  return (
    // Abdelwahab
    // Ziad Khaled
    // Ziad Hesham
    <form onSubmit={handleSubmit}>
      <div className="flex flex-row max-sm:flex-col max-sm:space-y-4 items-center justify-center space-x-2">
        <label htmlFor="upload" className="cursor-pointer p-2 rounded-lg bg-black text-white dark:text-black 
          dark:bg-white hover:bg-gray-950 dark:hover:bg-black dark:hover:text-white">
          Browse Lecture
        </label>
        <input type="file" id="upload" className="hidden" onChange={handleFileChange} required />

        <span className="flex px-2 items-center w-64 h-10 bg-zinc-100 dark:bg-zinc-50 rounded-lg text-zinc-400">{(file && `${file.name}`) || "Select Lecture First"}</span>

        <select name="model" id="model" value={model} onChange={(e) => setModel(e.target.value as 'flash' | 'pro')} className="w-40 h-10 border-zinc-300 rounded-lg text-black">
          <option value="flash">Flash: Faster</option>
          <option value="pro">Pro: Slower But Smarter</option>
        </select>
      </div>
      <div className="flex flex-col items-center justify-center text-black py-4">
        <input type="text" id="args" className="w-3/4 max-sm:w-full h-10 bg-zinc-100 dark:bg-zinc-50 rounded-lg p-2"
          placeholder="Optional Arguments: Translate, Additional Instructions"
          onChange={handleArgsChange} />
      </div>
      <div className="flex items-center justify-center py-8">
        {!isLoading && (
          <div>
            <label htmlFor="submit" className="cursor-pointer">
              <div className="flex items-center justify-center w-28 h-28 
              border-4 border-black dark:border-zinc-100 rounded-full text-black dark:text-zinc-100 font-bold text-lg 
              transition-shadow duration-300 hover:shadow-[0_0_15px_5px_rgba(0,0,0,0.7)] dark:hover:shadow-[0_0_15px_5px_rgba(255,255,255,0.7)]">
                Summarize
              </div>
            </label>
            <input type="submit" id="submit" className="hidden" />
          </div>
        )
        }
        {isLoading && <div
          className="inline-block h-28 w-28 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status">
          <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >Loading...</span>
        </div>
        }
      </div>
    </form>
  )
}
