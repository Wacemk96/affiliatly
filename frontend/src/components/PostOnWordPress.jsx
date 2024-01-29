import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BsSend } from 'react-icons/bs';

const PostOnWordPress = ({ postData }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [postLink, setPostLink] = useState(null);
  const auth = { username: username, password: password };
  const [open, setOpen] = useState(false);
  const cls = `transition duration-1000 ${open ? '' : 'hidden'}`


  const extractTitle = () => {
    const doc = new DOMParser().parseFromString(postData, 'text/html');
    const firstH1 = doc.querySelector('h1');
    if (firstH1) {
      return firstH1.textContent;
    } else {
      console.log('No <h1> element found in postData');
      return '';
    }
  };
  const createPost = async (e) => {
    e.preventDefault();
    const postTitle = extractTitle();
    try {
      const response = await axios.post(
        'https://app.waseemk.com/wp-json/wp/v2/posts',
        {
          title: postTitle,
          content: postData,
          status: 'publish',
        },
        { auth }
      );
      // console.log('Post created successfully:', response.data);
      setPostLink(response.data.link);
      alert('Post created successfully');
      setPassword('');
      setUsername('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };
  const SubmitPost = () => {
    setOpen(!open)
  }

  return (
    <>
      <div className="flex justify-between">

        <div className="form">
          <form className={cls} onSubmit={createPost}>
            <div className="text-left my-5">
              <p>Enter your WordPress Username and Application Password</p>
              <p>
                If you wana test it is enter demo password and username
                <li>
                  demo username: <strong>admin</strong>
                </li>
                <li>
                  demo password: <strong> 06ZV JpL8 sWig p6dJ rGkr z1jd</strong>
                </li>
                {postLink === null ? (
                  ''
                ) : (
                  <div className="mt-6">
                    <a
                      target="_blank"
                      href={`${postLink}`}
                    >
                      <button
                        type="button"
                        className="py-2 px-6 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      >
                        View Post
                      </button>
                    </a>
                  </div>
                )}
              </p>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <input
                  type="text"
                  className="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Enter username"
                  autoComplete='true'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                  <svg className="flex-shrink-0 w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                </div>
              </div>
              <div className="relative">
                <input
                  type="password"
                  className="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Enter password"
                  autoComplete='true'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                  <svg className="flex-shrink-0 w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z" /><circle cx="16.5" cy="7.5" r=".5" /></svg>
                </div>
              </div>
              <button
                type="submit"
                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                data-hs-overlay="#hs-basic-modal"
              >
                <BsSend />
                Submit Post
              </button>
            </div>
          </form>
        </div>
        <div>
          <button onClick={SubmitPost} type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
            Login
          </button>
        </div>
      </div>
      {/* <div id="hs-basic-modal" className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden w-full h-full fixed top-0 start-0 z-[80] opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none">
        <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 opacity-0 transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
              <h3 className="font-bold text-gray-800 dark:text-white">
                Modal title
              </h3>
              <button type="button" className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#hs-basic-modal">
                <span className="sr-only">Close</span>
                <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto">
              <p className="mt-1 text-gray-800 dark:text-gray-400">
                This is a wider card with supporting text below as a natural lead-in to additional content.
              </p>
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
              <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#hs-basic-modal">
                Close
              </button>
              <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default PostOnWordPress;
