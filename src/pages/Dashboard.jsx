import React from 'react';
import { useQuery } from 'wasp/client/operations';
import { getProjects } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const DashboardPage = () => {
  const { data: projects, isLoading, error } = useQuery(getProjects);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className="p-4">
      {projects.map((project) => (
        <div key={project.id} className="bg-gray-100 p-4 mb-4 rounded-lg">
          <h2 className="text-xl font-bold">{project.title}</h2>
          <p>{project.description}</p>
          <Link to={`/projects/${project.id}`} className="text-blue-500 hover:underline">
            View Project
          </Link>
        </div>
      ))}
    </div>
  );
}

export default DashboardPage;
