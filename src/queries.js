import { HttpError } from 'wasp/server'

export const getProjects = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Project.findMany({
    where: {
      userId: context.user.id
    }
  });
}

export const getImages = async ({ projectId }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const images = await context.entities.Image.findMany({
    where: {
      project: {
        id: projectId,
        userId: context.user.id
      }
    }
  });

  return images;
}
