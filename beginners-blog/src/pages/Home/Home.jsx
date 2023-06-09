import React, { useState, useEffect } from 'react';
import EmptyList from '../../components/common/EmptyList';
import BlogList from '../../components/Home/BlogList';
import Header from '../../components/Home/Header';
import { blogList } from '../../config/data';
import CreateModal from '../../components/Home/CreateModal';
import { fetchCreateBlog, fetchDeleteBlogApi, fetchListBlogsApi, fetchEditBlog, fetchListCategoryApi } from '../../api/blogsAPI.jsx';
import PaginationComponent from '../../components/common/Pagination/Pagination';
import { Alert, Backdrop, CircularProgress, Snackbar } from '@mui/material';
import { useLocation } from 'react-router-dom'
import { red } from '@mui/material/colors';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
const initialValue = {
  blogName: '',
  description: '',
  category: '',
  tags: '',
  image: '',
}
const options = [
  { value: 'sport', label: 'Sport' },
  { value: 'social', label: 'Social' },
  { value: 'health', label: 'Health' },
  { value: 'tech', label: 'Tech' },
  { value: 'drama', label: 'Drama' },
  { value: 'travel', label: 'Travel' },
  { value: 'fitness', label: 'Fitness' },
  { value: 'beauty', label: 'Beauty' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'environment', label: 'Enviroment' },
  { value: 'politics', label: 'Politics' },
  { value: 'finance', label: 'Finance' },
]
const initPaginator = {
  pageCount: 10,
  currentPage: 1
}
const Home = ({ props }) => {
  const [blogs, setBlogs] = useState(blogList);
  const [paginator, setPaginator] = useState(initPaginator);
  const [searchKey, setSearchKey] = useState('');
  const [show, setShow] = useState(false);
  const [createParams, setCreateParams] = useState(initialValue);
  const [page, setPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [errors, setErrors] = useState({ blogName: '', category: '', image: '' })
  const [showDialogCover, setShowDialogCover] = useState(false);

  const [coverPage, setCoverPage] = useState('https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')
  const handleOpenDialogCover = () => {
    setShowDialogCover(true);
  }
  const handleOnChangeCover = (event) => {
    setCoverPage(event.target.value);
  }
  const [snackbarState, setSnackbarState] = useState({
    openSuccess: false,
    openFail: false,
    vertical: 'top',
    horizontal: 'right',
  });

  useEffect(async () => {
    setOpen(true)
    const result = await fetchListBlogsApi(createParamSearch());
    const listCategories = await fetchListCategoryApi();
    if (listCategories) {
      setCategories([...listCategories.data.data.map(x => x._id)])
    }
    if (result.data.success) {
      setBlogs(result.data.data.items);
      setPaginator(result.data.data.paginator);
      setOpen(false)
    }
  }, [searchKey, selectedCategory, page])


  const handleOnPageChange = async (page) => {
    setOpen(true)
    const result = await fetchListBlogsApi({ page: page, itemPerpage: itemPerPage });
    if (result.data.success) {
      setBlogs(result.data.data.items);
      setPaginator(result.data.data.paginator);
      setTimeout(function () {
        setOpen(false)
      }, 200);
    };
  }

  const filterCategory = async (category) => {
    setOpen(true)
    await setSelectedCategory(category)
    const result = await fetchListBlogsApi(createParamSearch({}));
    if (result.data.success) {
      setBlogs(result.data.data.items);
      setPaginator(result.data.data.paginator);
      setTimeout(function () {
        setOpen(false)
      }, 200);
    };
  }

  const createParamSearch = (paramSearch) => {
    return { page: page, itemPerpage: itemPerPage, search: searchKey, category: selectedCategory, ...paramSearch }
  }

  const resetParamSearch = () => {
    setPage(1);
    setItemPerPage(5);
    setSearchKey('')
    setSelectedCategory('')
  }

  // Handle Dialog
  const handleCloseCreateModal = () => {
    setCreateParams(initialValue)
    setShow(false);
  }
  const handleOpenCreateModal = () => {
    setShow(true);
  }
  const handleSubmit = async () => {
    let formatTags = [];
    if (Array.isArray(createParams.tags)) {
      if (createParams.tags.length > 0) {
        formatTags = createParams.tags.map(tag => tag?.value);
      }
    }
    const tempParams = {
      ...createParams,
      tags: formatTags
    }
    const result = await fetchCreateBlog(tempParams);
    if (result.data.success) {
      setSnackbarState({ ...snackbarState, openSuccess: true, openFail: false })
      resetParamSearch();
      const result = await fetchListBlogsApi(createParamSearch({ category: '' }));
      if (result.data.success) {
        setBlogs(result.data.data.items);
        setPaginator(result.data.data.paginator);
        setTimeout(function () {
          setOpen(false)
        }, 200);
      }
    } else {
      setSnackbarState({ ...snackbarState, openSuccess: false, openFail: true })
      console.log(result.data);
      setErrors(result.data.errors.errors)
    }
    setShow(false);
    setCreateParams(initialValue)
  }

  // handle create 
  const handleOnChange = (event, type = null) => {
    if (type) {
      setCreateParams({
        ...createParams,
        tags: event,
      })
    } else {
      setCreateParams({
        ...createParams,
        [event.target.name]: event.target.value,
      })
    }
  }

  // Search submit
  const handleSearchBar = (e) => {
    handleSearchResults();
  };

  // Search for blog by category
  const handleSearchResults = async () => {
    const result = await fetchListBlogsApi(createParamSearch());
    if (result.data.success) {
      setBlogs(result.data.data.items);
      setPaginator(result.data.data.paginator);
      setOpen(false)
    }
  };

  // Clear search and show all blogs
  const handleClearSearch = () => {
    setSearchKey('');
  };


  const handleCloseSnackbar = () => {
    setSnackbarState({ ...snackbarState, openSuccess: false, openFail: false });
  };

  const handleSetSearchKey = (searchKey) => {
    setSearchKey(searchKey)
  }

  return (
    <div style={{ backgroundColor: 'rgb(225 225 225)' }}>
      {/* Page Header */}
      <Header handleOpenDialogCover={handleOpenDialogCover} coverPage={coverPage} />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        anchorOrigin={{ vertical: snackbarState.vertical, horizontal: snackbarState.horizontal }}
        open={snackbarState.openSuccess}
        onClose={handleCloseSnackbar}
        autoHideDuration={3500}
        key={snackbarState.vertical + snackbarState.horizontal + snackbarState.openFail + snackbarState.openSuccess}
      >
        {
          snackbarState.openSuccess &&
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            Add blog successfully!
          </Alert>
        }
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: snackbarState.vertical, horizontal: snackbarState.horizontal }}
        open={snackbarState.openFail}
        onClose={handleCloseSnackbar}
        autoHideDuration={3500}
        key={snackbarState.vertical + snackbarState.horizontal}
      >
        {
          snackbarState.openFail &&
          <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
            Add blog failed!
            {
              errors.blogName &&
              <div>
                Blog name is required
              </div>
            }
            {
              errors.category &&
              <div>
                Category is required
              </div>
            }
            {
              errors.image &&
              <div>
                Image link is required
              </div>
            }
          </Alert>
        }
      </Snackbar>
      <div className='container mt-2'>
        {/* Blog List & Empty View */}
        <BlogList categories={categories}
          selectedCategory={selectedCategory}
          handleFilterCaterogy={filterCategory}
          handleOpenCreateModal={handleOpenCreateModal}
          blogs={blogs}
          value={searchKey}
          handleSearchKey={handleSetSearchKey}
          clearSearch={handleClearSearch}
          formSubmit={handleSearchBar}
          age={page} />
        <div className="d-flex justify-content-center mt-2">
          <PaginationComponent paginator={paginator} onPageChange={handleOnPageChange} itemPerPage={itemPerPage} />
        </div>
        <CreateModal
          show={show}
          handleClose={handleCloseCreateModal}
          handleSubmit={handleSubmit}
          title={'Create a new blog'}
          handleOnChange={handleOnChange}
          createParams={createParams}
          options={options}
        />
        <Modal
          show={showDialogCover}
          onHide={() => setShowDialogCover(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Cover page link</Form.Label>
              <Form.Control type="email" placeholder="Enter cover link" onChange={(event) => handleOnChangeCover(event)} />
            </Form.Group>
          </Modal.Body>

        </Modal>
      </div>
    </div >
  );
};

export default Home;
