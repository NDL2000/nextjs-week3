import { taskService } from "@/features/tasks/task.service";
import { updateTaskAction, TaskState } from "@/actions/task.action";
import EditTaskForm from "./EditTaskForm";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const task = await taskService.getById(id);

  return <EditTaskForm task={task} />;
}
