import React from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  const { handleOpenCreateModal } = props;

  return (
    <div className='w-100 py-3' style={{ backgroundColor: "#292a30" }}>
      <nav class="navbar navbar-expand-lg col-11 mx-auto">
        <Link className='blog-goBack' to='/'>
          <span class="navbar-brand text-white" href="#">My Blog</span>
        </Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse d-flex" id="navbarSupportedContent">

        </div>
      </nav>
    </div>
  )
};

export default Navbar;
