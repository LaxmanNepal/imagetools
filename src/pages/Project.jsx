import React from 'react';
import { useParams } from 'wasp/client/router';
import { useQuery, useAction, getImages, uploadImage } from 'wasp/client/operations';

const ProjectPage = () => {
  const { projectId } = useParams();
  const { data: images, isLoading, error } = useQuery(getImages, { projectId });
  const uploadImageFn = useAction(uploadImage);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleUploadImage = (url) => {
    if (url.trim() !== '') {
      uploadImageFn({ url, projectId });
    }
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Project Details</h1>
      <div className='mb-4'>
        <input 
          type='text' 
          placeholder='Image URL' 
          className='px-2 py-1 border rounded text-lg' 
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleUploadImage(e.target.value);
              e.target.value = '';
            }
          }}
        />
        <button
          onClick={() => {
            const input = document.querySelector('input');
            handleUploadImage(input.value);
            input.value = '';
          }}
          className='ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded'
        >
          Upload Image
        </button>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        {images.map((image) => (
          <div key={image.id} className='p-2 bg-gray-100 rounded'>
            <img src={image.url} alt='Project' className='w-full h-auto rounded'/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectPage;
