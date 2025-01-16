"use client";

import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo-client";
import ProjectTaskManager from "./ProjectTaskManager";

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <div className="h-screen w-screen flex flex-col bg-gray-100">
        <ProjectTaskManager />
      </div>
    </ApolloProvider>
  );
}
