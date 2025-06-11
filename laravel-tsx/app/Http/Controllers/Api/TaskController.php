<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    public function index()
    {
        $this->authorize('viewAny', Task::class);
        return response()->json(Task::with(['project', 'assignedUser'])->latest()->get());
    }

    public function store(Request $request)
    {
        $this->authorize('create', Task::class);

        $validator = Validator::make($request->all(), [
            'project_id' => 'required|exists:projects,id',
            'assigned_id' => 'nullable|exists:users,id',
            'name' => 'required|string|max:100',
            'description' => 'nullable|string',
            'status' => 'required|string|in:todo,doing,done',
            'due_date' => 'required|date|after_or_equal:today',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $task = Task::create($request->all());

        return response()->json($task, 201);
    }

    public function show(Task $task)
    {
        $this->authorize('view', $task);
        return response()->json($task->load(['project', 'assignedUser']));
    }

    public function update(Request $request, Task $task)
    {
        $this->authorize('update', $task);

        $validator = Validator::make($request->all(), [
            'project_id' => 'sometimes|exists:projects,id',
            'assigned_id' => 'nullable|exists:users,id',
            'name' => 'sometimes|string|max:100',
            'description' => 'nullable|string',
            'status' => 'sometimes|string|in:todo,doing,done',
            'due_date' => 'sometimes|date|after_or_equal:today',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $task->update($request->all());

        return response()->json($task);
    }

    public function destroy(Task $task)
    {
        $this->authorize('delete', $task);
        $task->delete();
        
        return response()->json(['message' => 'Task deleted']);
    }
}
