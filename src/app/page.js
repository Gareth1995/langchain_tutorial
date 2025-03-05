import Image from "next/image";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ChatPromptTemplate } from "@langchain/core/prompts";

// imports for question/answer functionality
import { SqlDatabase } from "langchain/sql_db";
import { DataSource } from "typeorm";

export default async function Home() {

  // // instantiate model
  // const model = new ChatOpenAI({ model: "gpt-4" });
  // const messages = [
  //   new SystemMessage("Translate the following from English into Italian"),
  //   new HumanMessage("hi!"),
  // ];
  
  // // invoke GPT models
  // const gptOutput = await model.invoke(messages);
  // console.log(gptOutput);

  // const textPrompt = await model.invoke("Hello");
  // console.log('Text Prompt:', textPrompt);

  // const textPrompt2 = await model.invoke([{ role: "user", content: "Hello" }]);
  // console.log('Text Prompt 2:', textPrompt2);

  // const textPrompt3 = await model.invoke([new HumanMessage("hi!")]);
  // console.log('Text Prompt 3:', textPrompt3);

  // // streaming response
  // const stream = await model.stream(messages);

  // const chunks = [];
  // for await (const chunk of stream) {
  //   chunks.push(chunk);
  //   console.log(`${chunk.content}|`);
  // }

  // // Using messaging templates
  // const systemTemplate = "Translate the following from English into {language}";

  // const promptTemplate = ChatPromptTemplate.fromMessages([
  //   ["system", systemTemplate],
  //   ["user", "{text}"],
  // ]);

  // const promptValue = await promptTemplate.invoke({
  //   language: "italian",
  //   text: "hi!",
  // });
  
  // // see full output
  // console.log('prompt template output:', promptValue);

  // // see messages
  // console.log('Prompt messages:', promptValue.toChatMessages());

  // // invoke model with prompt template
  // const response = await model.invoke(promptValue);
  // console.log(`prompt template output: ${response.content}`);

  const datasource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432, // Default PostgreSQL port
    username: "postgres", // Replace with your username
    password: "password123", // Replace with your password
    database: "hospitality_app", // Replace with your database name
  });
  
  const db = await SqlDatabase.fromDataSourceParams({
    appDataSource: datasource,
  });
  
  const postgresQueryOutput = await db.run("SELECT * FROM reviews LIMIT 10;");
  console.log(postgresQueryOutput);



  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.js
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
