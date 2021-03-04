import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/theme/ayu-dark.css';
import algorithmsImage from '../../../assets/spritesmith-algorithms.png';

const SpriteGenerator = () => {
  const [formInputs, setFormInputs] = useState({
    folderName: '',
    outputFileName: 'output_sprite',
    algorithm: 'binary-tree',
    padding: 1,
  });
  const { folderName, outputFileName, padding } = formInputs;

  const [copyStatus, setCopyStatus] = useState('Copy Code');

  const [spriteLink, setSpriteLink] = useState('');

  const [cssFileLink, setCssFileLink] = useState('');

  const [cssCode, setCssCode] = useState('');

  const [showLoader, setShowLoader] = useState(false);

  const [isSvgType, setIsSvgType] = useState(false);

  const handleChange = (evt) => {
    setFormInputs({
      ...formInputs,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = (evt) => {
    // Avoid page refresh
    evt.preventDefault();

    if (folderName === '') {
      toast.error('Folder name cannot be blank');
      return;
    }

    if (showLoader) {
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth',
        });
      }, 500);

      return;
    }

    setShowLoader(true);
    setSpriteLink('');
    setCopyStatus('Copy Code');
    setCssCode('');
    setCssFileLink('');

    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 500);

    axios
      .post('sprite-generator', {
        ...formInputs,
        isSvgType,
      })
      .then((response) => {
        toast.success(
          'Sprite Image and CSS File Generated Successfully and Uploaded to Cloudinary folder'
        );

        setSpriteLink(response.data.spriteUrl);

        setCssFileLink(response.data.cssFileUrl);

        setCssCode(response.data.cssCode);

        setFormInputs({
          ...formInputs,
          folderName: '',
          outputFileName: 'output_sprite',
          padding: 1,
        });

        setShowLoader(false);
      })
      .catch((error) => {
        toast.error(
          'Error occured, please check name of the cloudinary folder and types of files in it.'
        );

        if (error?.response?.data?.error?.message) {
          toast.error(error?.response?.data?.error?.message);
        } else if (error?.response?.data?.error) {
          toast.error(error?.response?.data?.error);
        }

        setShowLoader(false);
      });
  };

  const copyCode = () => {
    navigator.clipboard.writeText(cssCode);
    toast.success('Copied the CSS code to Clipboard!');
    setCopyStatus('Copied!');
  };

  useEffect(() => {
    toast.success('Welcome!');
  }, []);

  return (
    <div className='container-fluid d-flex flex-column align-items-center'>
      <ToastContainer draggable={false} transition={Zoom} autoClose={3000} />
      <form className='col-9 mb-3'>
        <div className='form-group'>
          <label className='font-weight-bold'>Cloudinary Folder Name</label>

          <input
            type='text'
            name='folderName'
            value={folderName}
            className='form-control'
            placeholder='Enter Folder Name'
            onChange={handleChange}
            required={true}
          />

          <small className='form-text text-muted'>
            Enter the name of the folder in Cloudinary which you want to access.
          </small>

          <small className='form-text text-muted'>
            <strong>Note:</strong> If the target folder is nested in another
            folder, add the relative path of the folder.
          </small>

          <small className='form-text text-muted'>
            <strong>Example:</strong> If target folder{' '}
            <strong>'transform-blocks'</strong> is inside{' '}
            <strong>'transforms'</strong> folder, use the path{' '}
            <strong>'transforms/transform-blocks'.</strong>
            <p>
              Do not add '/' at front or back, just between the folder names.
            </p>
          </small>
        </div>
        <hr />
        <div className='form-check'>
          <input
            className='form-check-input position-static'
            type='checkbox'
            name='isSvgType'
            onChange={(e) => {
              setIsSvgType(e.target.checked);
            }}
          />

          <label className='ml-2'>
            Select if all contents of the folder are of <strong>SVG</strong>{' '}
            type
          </label>

          <small
            className='form-text text-muted'
            style={{ marginLeft: '-20px' }}
          >
            <strong>Note:</strong> All items in the Cloudinary folder should be
            either of <strong>SVG</strong> type or{' '}
            <strong>PNG, JPG, JPEG</strong> type.
          </small>
        </div>
        <hr />
        <div className='form-group'>
          <label className='font-weight-bold'>Output Sprite Name:</label>

          <small className='form-text text-muted mb-2'>
            Default: output_sprite
          </small>

          <input
            type='text'
            name='outputFileName'
            value={outputFileName}
            className='form-control'
            placeholder='Enter Folder Name'
            onChange={handleChange}
          />

          <small className='form-text text-muted'>
            Enter the name you want for your generated Sprite Image and the CSS
            file.
          </small>
        </div>
        <hr />

        {!isSvgType && (
          <>
            <div className='form-group'>
              <label className='font-weight-bold'>Sprite Algorithm:</label>

              <small className='form-text text-muted mb-2'>
                Default: binary-tree (most space conservative)
              </small>

              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='algorithm'
                  value='binary-tree'
                  onChange={handleChange}
                  defaultChecked='true'
                />
                <label className='form-check-label'>binary-tree</label>
              </div>

              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='algorithm'
                  value='left-right'
                  onChange={handleChange}
                />
                <label className='form-check-label'>left-right</label>
              </div>

              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='algorithm'
                  value='diagonal'
                  onChange={handleChange}
                />
                <label className='form-check-label'>diagonal</label>
              </div>

              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='algorithm'
                  value='alt-diagonal'
                  onChange={handleChange}
                />
                <label className='form-check-label'>alt-diagonal</label>
              </div>

              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='algorithm'
                  value='top-down'
                  onChange={handleChange}
                />
                <label className='form-check-label'>top-down</label>
              </div>

              <small className='form-text text-muted'>
                Select the algorithm want for your Sprite Image. It will define
                the way your sprite image will look. The algorithms work as
                shown below:
              </small>
              <div className='w-50'>
                <img
                  src={algorithmsImage}
                  alt='Algorithms'
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              </div>
            </div>

            <hr />

            <div className='form-group'>
              <label className='font-weight-bold'>
                Padding Between Images in Sprite Sheet: (in px)
              </label>

              <small className='form-text text-muted mb-2'>Default: 1</small>

              <input
                type='number'
                name='padding'
                value={padding}
                className='form-control'
                placeholder='Enter Padding in Number (Considered in pixels)'
                onChange={handleChange}
              />

              <small className='form-text text-muted'>
                Enter the padding you want between the images for your generated
                Sprite Image.
              </small>
            </div>

            <hr />
          </>
        )}

        <div className='d-flex justify-content-end'>
          <button
            type='submit'
            disabled={!folderName || !outputFileName || showLoader}
            className='btn btn-success btn-lg'
            onClick={handleSubmit}
          >
            {showLoader ? 'Generating...' : 'Generate Sprite'}
          </button>
        </div>
      </form>

      {(spriteLink || showLoader) && (
        <div style={{ height: '500px' }} className='m-5'>
          <h2 className='m-3 text-center pb-3'>Generated Sprite:</h2>
          <div className='h-100 d-flex flex-column justify-content-center align-items-center overflow-auto mb-5'>
            {spriteLink && (
              <img
                src={spriteLink}
                alt='Generated Sprite'
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            )}
            {showLoader && (
              <div className='overflow-hidden d-flex flex-column align-items-center'>
                <div className='spinner-border text-primary' role='status'>
                  <span className='sr-only'>Loading...</span>
                </div>
              </div>
            )}
          </div>
          {cssFileLink && (
            <p className='text-center p-3'>
              <hr />
              <a
                href={cssFileLink}
                target='_blank'
                className='btn btn-info'
                rel='noreferrer'
                download
              >
                Click to open CSS file in new tab
              </a>
            </p>
          )}
          {cssCode && (
            <div className='pb-5'>
              <h2 className='text-center pb-3'>
                CSS Code to use the Generated Sprite:
              </h2>

              <div
                className='overflow-auto d-flex justify-content-center'
                style={{ maxHeight: '500px', position: 'relative' }}
              >
                <button
                  style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    zIndex: '1',
                  }}
                  className='btn btn-primary-outline btn-danger'
                  onClick={copyCode}
                >
                  {copyStatus}
                </button>
                <CodeMirror
                  className='col-9'
                  value={cssCode}
                  options={{
                    theme: 'ayu-dark',
                    mode: 'css',
                    readOnly: true,
                    cursorBlinkRate: -1,
                    scrollbarStyle: null,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SpriteGenerator;
