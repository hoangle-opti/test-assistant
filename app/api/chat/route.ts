import { RemoteRunnable } from "@langchain/core/runnables/remote";
import type { RunnableConfig } from "@langchain/core/runnables";
import { streamText, LangChainAdapter, type Message } from "ai";
 
export const maxDuration = 30;
 
export async function POST(req: Request) {
  const { messages } = await req.json();
 
  // TODO replace with your own langserve URL
  const remoteChain = new RemoteRunnable<
    { messages: Message },
    string,
    RunnableConfig
  >({
    url: "<YOUR_LANGSERVE_URL>",
  });
 
  const stream = await remoteChain.stream({
    messages,
  });
 
  return LangChainAdapter.toDataStreamResponse(stream);
}