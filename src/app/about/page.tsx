import Header from "../ui/header";
import "@/app/markdown.css"

export default function About() {

  // Mohamed Nasser
  // Bishoy
  return (
    <main className="flex flex-col w-screen max-h-full space-y-8 overflow-y-hidden">
      <Header />
      <span className="text-6xl max-sm:5xl p-14 max-sm:p-8 underline underline-offset-8">About Us</span>
      <div className="flex flex-col w-3/4 max-sm:w-full px-12 max-sm:px-10 text-xl overflow-y-hidden">
        <h1>AI Lecture Summarizer</h1>
        <p>
          The <strong>AI Lecture Summarizer</strong>
          is a cutting-edge online platform designed to help students, professionals, and educators quickly and efficiently digest lecture content. By leveraging powerful AI algorithms, the website processes long, complex lecture notes, files, and automatically generates clear, concise summaries that capture the key points, concepts, and insights.
        </p>

        <h2>Key Features:</h2>
        <div >
          <ul>
            <li><span >AI-Powered Summarization:</span> The platform uses advanced natural language processing (NLP) algorithms to analyze and summarize lengthy lecture materials, ensuring only the most important information is highlighted.</li>
            <li><span >Multiple File Formats:</span> Users can upload lecture content in various formats such as text documents, audio, and video files. The AI adapts to each format, ensuring accurate and relevant summaries are produced.</li>
            <li><span >Downloadable Summaries:</span> After the AI generates the summary, users can download it in their preferred format, either as a <strong>PDF</strong> or <strong>Word document</strong>. This feature makes it easy to keep organized and share summaries for future reference or study.</li>
            <li><span >Customizable Summaries:</span> The platform allows users to adjust the level of detail in the summaries, whether they need a brief overview or a more in-depth analysis, based on their specific needs.</li>
            <li><span >Time-Saving & Efficient:</span> Instead of spending hours reviewing lecture materials, users can quickly obtain a well-structured, easy-to-read summary, saving valuable time while ensuring they retain critical information.</li>
            <li><span >Intuitive Interface:</span> The website offers an intuitive, user-friendly interface that allows anyone, regardless of technical skills, to upload and summarize lecture content in just a few clicks.</li>
          </ul>
        </div>

        <h2>Use Cases:</h2>
        <div >
          <ul>
            <li><span >Students:</span> Quickly create study aids and revision notes by summarizing entire lecture series or chapters.</li>
            <li><span >Professionals:</span> Extract key takeaways from long conference presentations or training sessions for future reference.</li>
            <li><span >Educators:</span> Share concise summaries of important lectures or lessons with students, making learning materials more accessible.</li>
          </ul>
        </div>

        <p>Whether you’re revising for exams, preparing for meetings, or looking to streamline your lecture notes, the AI Lecture Summarizer helps you capture the essence of your content in a fraction of the time. Simply upload, let the AI work its magic, and download your summary as a PDF or Word document, ready to be reviewed or shared.</p>
      </div>
      <span className="text-6xl max-sm:5xl p-14 max-sm:p-8 underline underline-offset-8">Team Members</span>
      <div className="text-[30px] max-sm:text-xl px-12">
        <table className="border-none">
          <tbody>
            <tr>
              <td>Kirillos Boshra</td>
              <td className="px-8">2022030098</td>
            </tr>
            <tr>
              <td>Mario Suleiman</td>
              <td className="px-8">2022030095</td>
            </tr>
            <tr>
              <td>Abdelwahab Ehab</td>
              <td className="px-8">2022030078</td>
            </tr>
            <tr>
              <td>Mohamed Nasser</td>
              <td className="px-8">2022030115</td>
            </tr>
            <tr>
              <td>Mohamed Ayman</td>
              <td className="px-8">2022030063</td>
            </tr>
            <tr>
              <td>Ziad Khaled</td>
              <td className="px-8">2022030094</td>
            </tr>
            <tr>
              <td>Amr Mamdouh</td>
              <td className="px-8">2022030002</td>
            </tr>
            <tr>
              <td>Bishoy Tarek</td>
              <td className="px-8">2022030108</td>
            </tr>
            <tr>
              <td>Ziad Hesham</td>
              <td className="px-8">2022030033</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  )
}
