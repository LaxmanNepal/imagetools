import React, { useState } from 'react';
import { useAction } from 'wasp/client/operations';
import { createProject } from 'wasp/client/operations';

const CreateProjectPage = () => {
  const createProjectFn = useAction(createProject);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateProject = () => {
    createProjectFn({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Project</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Project Title"
          className="w-full px-3 py-2 border rounded mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Project Description"
          className="w-full px-3 py-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button
        onClick={handleCreateProject}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create Project
      </button>
    </div>
  );
};

export default CreateProjectPage;
