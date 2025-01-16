import { useSubscription } from "@apollo/client";
import { TASK_ADDED, GET_TASKS_BY_PROJECT } from "@/app/graphql/queries";

export const useTaskSubscription = (selectedProjectId: string | null) => {
  useSubscription(TASK_ADDED, {
    variables: { projectId: selectedProjectId },
    skip: !selectedProjectId,

    onSubscriptionData: async ({ client, subscriptionData }) => {
      const newTask = subscriptionData.data?.taskAdded;
      if (!newTask) return;

      try {
        const existingTasks = client.readQuery({
          query: GET_TASKS_BY_PROJECT,
          variables: { projectId: selectedProjectId },
        });

        client.writeQuery({
          query: GET_TASKS_BY_PROJECT,
          variables: { projectId: selectedProjectId },
          data: {
            tasks: [newTask, ...existingTasks.tasks],
          },
        });
      } catch (cacheError) {
        console.warn(
          "Cache miss for project tasks. Fetching tasks from the backend.",
          cacheError
        );

        const { data } = await client.query({
          query: GET_TASKS_BY_PROJECT,
          variables: { projectId: selectedProjectId },
        });

        client.writeQuery({
          query: GET_TASKS_BY_PROJECT,
          variables: { projectId: selectedProjectId },
          data: {
            tasks: [newTask, ...data.tasks],
          },
        });
      }
    },
  });
};
