import { HttpError } from 'wasp/server'

export const createProject = async ({ title, description }, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Project.create({
    data: {
      title,
      description,
      user: { connect: { id: context.user.id } }
    }
  });
}

export const uploadImage = async ({ url, projectId }, context) => {
  if (!context.user) { throw new HttpError(401) };

  // Ensure the project belongs to the current user
  const project = await context.entities.Project.findUnique({
    where: { id: projectId },
    select: { userId: true }
  });
  if (project.userId !== context.user.id) { throw new HttpError(403) };

  // Create and return the new image
  const image = await context.entities.Image.create({
    data: {
      url,
      project: { connect: { id: projectId } }
    }
  });

  return image;
}
