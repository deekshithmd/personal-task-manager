"use client";
import React, { useState } from "react";
import addTask from "@/firebase/firestore/addTask";
import getTask from "@/firebase/firestore/getTasks";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { setTasks } from "@/features/task/taskSlice";
import RequiresAuth from "@/components/RequireAuth";
import deleteTask from "@/firebase/firestore/deleteTask";
import updateTask from "@/firebase/firestore/updateTask";
import { TaskType } from "@/types/types";

export default function Tasks() {
  const userData = useSelector((state: RootState) => state.auth.user);
  const taskList = useSelector((state: RootState) => state.tasks.tasks);
  const [taskData, setTaskData] = useState<TaskType>({
    taskName: "",
    taskDescription: "",
    isCompleted: false,
  });
  const [editData, setEditData] = useState<TaskType>({});
  const [newTask, setNewTask] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const dispatch = useDispatch();

  const updateTasks = async () => {
    const { taskArray } = await getTask(userData?.uid);
    dispatch(setTasks(taskArray));
  };

  const handleAddTask = async (e: any) => {
    e.preventDefault();
    await addTask({
      taskName: taskData?.taskName || "",
      taskDescription: taskData?.taskDescription || "",
      uid: userData?.uid,
    });
    updateTasks();
    setNewTask(false);
    setTaskData({
      taskName: "",
      taskDescription: "",
      isCompleted: false,
    });
  };

  const handleCompleted = async (data: any) => {
    await updateTask({
      uid: userData?.uid,
      docId: data?.id,
      data: { isCompleted: true },
    });
    updateTasks();
  };

  const handleEditData = async (e: any) => {
    e.preventDefault();
    await updateTask({
      uid: userData?.uid,
      docId: editData?.id,
      data: {
        taskName: editData?.taskName,
        taskDescription: editData?.taskDescription,
      },
    });
    updateTasks();
    setShowEdit(false);
    setEditData({});
  };

  const handleDeleteTask = async (docId: string) => {
    await deleteTask({ uid: userData?.uid, docId });
    updateTasks();
  };

  return (
    <RequiresAuth>
      <div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={() => setNewTask(true)}
          >
            Create New Task
          </button>
        </div>
        {newTask && (
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <h1 className="text-2xl font-semibold mb-4">Add a Task</h1>
            <form id="taskForm" className="space-y-4" onSubmit={handleAddTask}>
              <div>
                <label htmlFor="taskName" className="block font-medium">
                  Task Name
                </label>
                <input
                  type="text"
                  name="taskName"
                  className="mt-1 p-2 w-full border rounded-md"
                  value={taskData?.taskName}
                  onChange={(e) =>
                    setTaskData((prev) => ({
                      ...prev,
                      taskName: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div>
                <label htmlFor="taskDescription" className="block font-medium">
                  Task Description
                </label>
                <textarea
                  name="taskDescription"
                  rows={3}
                  className="mt-1 p-2 w-full border rounded-md"
                  value={taskData?.taskDescription}
                  onChange={(e) =>
                    setTaskData((prev) => ({
                      ...prev,
                      taskDescription: e.target.value,
                    }))
                  }
                  required
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        )}
        {showEdit && (
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <h1 className="text-2xl font-semibold mb-4">Add a Task</h1>
            <form id="taskForm" className="space-y-4" onSubmit={handleEditData}>
              <div>
                <label htmlFor="taskName" className="block font-medium">
                  Task Name
                </label>
                <input
                  type="text"
                  name="taskName"
                  className="mt-1 p-2 w-full border rounded-md"
                  value={editData?.taskName}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      taskName: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div>
                <label htmlFor="taskDescription" className="block font-medium">
                  Task Description
                </label>
                <textarea
                  name="taskDescription"
                  rows={3}
                  className="mt-1 p-2 w-full border rounded-md"
                  value={editData?.taskDescription}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      taskDescription: e.target.value,
                    }))
                  }
                  required
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Update Task
                </button>
              </div>
            </form>
          </div>
        )}
        <div>
          <h1 className="text-2xl">Task List</h1>
          <div>
            {taskList?.map((task, index) => {
              return (
                <div
                  className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden"
                  key={index}
                >
                  <div className="px-4 py-2">
                    <h2
                      className={`font-bold text-xl mb-2 ${
                        task?.isCompleted ? "line-through" : ""
                      }`}
                    >
                      {task?.taskName}
                    </h2>
                    <p
                      className={`text-gray-700 text-base ${
                        task?.isCompleted ? "line-through" : ""
                      }`}
                    >
                      {task?.taskDescription}
                    </p>
                  </div>
                  <div className="px-4 py-2">
                    {!task?.isCompleted && (
                      <>
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
                          onClick={() =>
                            handleCompleted({ ...task, isCompleted: true })
                          }
                        >
                          Completed
                        </button>
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                          onClick={() => {
                            setEditData(task);
                            setShowEdit(true);
                          }}
                        >
                          Edit
                        </button>
                      </>
                    )}
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDeleteTask(task?.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </RequiresAuth>
  );
}
