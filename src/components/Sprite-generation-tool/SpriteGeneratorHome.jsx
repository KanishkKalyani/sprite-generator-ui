import React, { useState } from 'react';
import axios from 'axios';
import SpriteGenAuth from './sprite-gen-auth/SpriteGenAuth';
import SpriteGenerator from './sprite-generator/SpriteGenerator';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

const SpriteGeneratorHome = () => {

  const [authenticated, setAuthenticated] = useState(false);

  return (
    <div className='container-fluid d-flex flex-column align-items-center'>
      <h1 className='m-2 mb-4 text-danger font-weight-bolder text-center row'>
        Hevo Sprite Generator
      </h1>

      {!authenticated && <SpriteGenAuth setAuthenticated={setAuthenticated}/>}
      {authenticated && <SpriteGenerator />}
    </div>
  );
}

export default SpriteGeneratorHome;