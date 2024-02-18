import { TextField, Button, Typography, Paper } from '@mui/material';
import { createPost, updatePost } from '../../actions/posts';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './styles.css';


const Form = ({ currentId, setCurrentId }) => {

    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedfile: '',
    });

    const dispatch = useDispatch();
    const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if (post) {
            setPostData({
                title: post.title || '',
                // message: post.message || '',            // Not setting message for now because it gives error and ruins the rest also
                tags: post.tags || '',
                selectedfile: post.selectedfile || '',
            });
            console.log("Post data:", postData);
        }
    }, [post]);
    
    const clear = () => {
        setCurrentId(0);
        setPostData({ title: '', message: '', tags: '', selectedfile: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId === 0) {
            dispatch(createPost({ ...postData, name: user?.result?.name }));
            clear();
        } else {
            console.log(user?.result?.name);
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
            clear();
        }
    };

    if (!user?.result?.name) {
        return (
            <Paper className='paper' elevation={6}>
                <Typography variant="h6" align="center" className='signintointeract'>
                    Sign in to create and interact.
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper className='paper' elevation={6}>
            <form autoComplete="off" noValidate className='form' onSubmit={handleSubmit}>
                <Typography variant="h6" style={{ marginBottom: '7px', color: '#c8102e' }}>
                    {currentId ? 'Edit' : 'Post'}
                </Typography>

                <TextField
                    name='title'
                    variant='outlined'
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                    style={{ marginBottom: '7px', fontSize: '18px' }}
                />

                <ReactQuill
                    name='message'
                    value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e })}
                    modules={{
                        toolbar: [
                            [{ header: [1, 2, false] }],
                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                            ['link', 'image'],
                            ['clean'],
                        ],
                    }}
                    formats={[
                        'header',
                        'bold', 'italic', 'underline', 'strike', 'blockquote',
                        'list', 'bullet', 'indent',
                        'link', 'image',
                    ]}

                    placeholder='Description : Note
                    Please copy paste the message elsewhere before editing!'
                    style={{ marginBottom: '75px', minHeight: '200px' }}
                />

                <TextField
                    name='tags'
                    variant='outlined'
                    label="Tags"
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
                />

                <div className="fileInput">
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setPostData({ ...postData, selectedfile: base64 })}
                    />
                </div>

                <Button
                    className='buttonSubmit'
                    variant='contained'
                    color='primary'
                    size='large'
                    type='submit'
                    fullWidth
                    style={{ marginBottom: '10px', backgroundColor: '#c8102e' }}
                >
                    Post
                </Button>

                <Button
                    variant='outlined'
                    size='small'
                    onClick={clear}
                    fullWidth
                    style={{ backgroundColor: 'white', color: '#c8102e' }}
                >
                    Clear
                </Button>
            </form>
        </Paper>
    );
};

export default Form;