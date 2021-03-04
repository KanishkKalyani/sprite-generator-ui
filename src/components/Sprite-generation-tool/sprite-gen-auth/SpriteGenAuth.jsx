import React, { useState } from 'react';
import { toast, ToastContainer, Zoom } from 'react-toastify';

const SpriteGenAuth = ({ setAuthenticated }) => {
  const [cloudinaryKey, setCloudinaryKey] = useState('');

  const handleChange = (event) => {
    setCloudinaryKey(event.target.value);
  };

  const handleFormSubmission = (event) => {
    event.preventDefault();
    if (process.env.REACT_APP_CLOUDINARY_API_KEY !== cloudinaryKey) {
      toast.error('Wrong API key entered');
    } else {
      setAuthenticated(
        process.env.REACT_APP_CLOUDINARY_API_KEY === cloudinaryKey
      );
    }
  };

  return (
    <div className='container-fluid d-flex flex-column align-items-center'>
      <ToastContainer draggable={false} transition={Zoom} autoClose={3000} />

      <form className='col-6 m-3'>
        <div className='form-group'>
          <label className='font-weight-bold'>
            Enter Hevo Cloudinary API Key:
          </label>

          <small className='form-text text-muted mb-3'>
            You can get the API key from Hevo Cloudinary Account Dashboard or
            from one of the Devs
          </small>

          <input
            type='text'
            name='cloudinaryKey'
            value={cloudinaryKey}
            className='form-control'
            placeholder='Enter Cloudinary API Key'
            onChange={handleChange}
          />
        </div>

        <div className='d-flex justify-content-center mt-4'>
          <button
            type='submit'
            className='btn btn-primary'
            disabled={cloudinaryKey.length !== 15}
            onClick={handleFormSubmission}
          >
            Authenticate
          </button>
        </div>
      </form>
    </div>
  );
};

export default SpriteGenAuth;
