import showdown from 'showdown';
import SearchBGIcons from './common/SearchBGIcons';
import React, { useEffect, useRef, useState } from 'react';
import PostOnWordPress from './PostOnWordPress';
import CategoriesList from './CategoriesList';
import axios from 'axios';
import { useApi } from '../context/ApiContext';
import { IoIosSearch } from 'react-icons/io';
import { Editor } from '@tinymce/tinymce-react';
const GPT_API_KEY = import.meta.env.VITE_GPT_API_KEY;
const EDITOR_API_KEY = import.meta.env.VITE_EDITOR_API_KEY;

const Hero = () => {
  const [editorValue, setEditorValue] = useState('');
  const [isEditorLoading, setisEditorLoading] = useState(false);
  const { loading, error, content, getContent } = useApi();
  const linkRef = useRef();
  const handleProductDetail = async (e) => {
    e.preventDefault();
    if (linkRef.current.value === '') {
      alert('Please add product link from amazon.com');
    } else {
      await getContent(linkRef.current.value);
    }
  };

  const fetchData = async (prompt, productData) => {
    const options = {
      method: 'POST',
      url: 'https://chatgpt-42.p.rapidapi.com/gpt4',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': GPT_API_KEY,
        'X-RapidAPI-Host': 'chatgpt-42.p.rapidapi.com',
      },
      data: {
        messages: [
          {
            role: 'user',
            content: `${prompt}\n${JSON.stringify(productData)}`,
          },
        ],
        tone: 'Balanced',
      },
    };

    try {
      const response = await axios.request(options);
      const result = response.data.result;
      const converter = new showdown.Converter();
      const convertedContent = converter.makeHtml(result);
      setEditorValue(convertedContent);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const prompt = `Generate an Affiliate Review for the Below Product Data. Please start the response directly with the product review, omitting any introductory context: 

    // # Title
    // [Product Title Here]
    // Instruction: don't start mentioned title. Product title should be catchy and short.
  
    // ### Description
    // [Product Description Here]
    // Instruction: don't start mentioned description. Please start with directly description content.
  
    // ## Pros
    // - [Pro 1]
    // - [Pro 2]
    // - [Pro 3]
    // - [Pro 4]
  
    // # Cons
    // - [Con 1]
    // - [Con 2]
    // - [Con 3]
    // - [Con 4]
  
    // # Detail Overview
    // [Provide a detailed overview of the product here.]
    // Instruction: don't start mentioned detail overview heading. Please start with directly descriptive content`;
    if (content && !error) {
      fetchData(prompt, content);
    }
  }, [content, error]);

  const handleEditorChange = (contentData, editor) => {
    setEditorValue(contentData);
  };

  return (
    <>
      <div className="relative overflow-hidden">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-800 dark:text-gray-200">
              Insights
            </h1>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Stay in the know with insights from industry experts.
            </p>
            <div className="mt-7 sm:mt-12 mx-auto max-w-xl relative">
              <form onSubmit={handleProductDetail}>
                <div className="relative z-10 flex space-x-3 p-3 bg-white border rounded-lg shadow-lg shadow-gray-100 dark:bg-slate-900 dark:border-gray-700 dark:shadow-gray-900/[.2]">
                  <div className="flex-[1_0_0%]">
                    <label
                      htmlFor="hs-search-article-1"
                      className="block text-sm text-gray-700 font-medium dark:text-white"
                    >
                      <span className="sr-only">Search article</span>
                    </label>
                    <input
                      ref={linkRef}
                      disabled={loading}
                      type="text"
                      name="hs-search-article-1"
                      id="hs-search-article-1"
                      className="py-2.5 px-4 block w-full border-transparent rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
                      placeholder="Search article"
                    />
                  </div>
                  <div className="flex-[0_0_auto]">
                    <button
                      type="submit"
                      className="flex justify-center items-center h-[2.875rem] w-[2.875rem] text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      disabled={loading}
                    >
                      {loading ? (
                        <span
                          className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </span>
                      ) : (
                        <IoIosSearch className="text-2xl" />
                      )}
                    </button>
                  </div>
                </div>
              </form>
              <SearchBGIcons />
            </div>

            <CategoriesList />
            <div className="container mt-10">
              <h1 className="mb-10 text-4xl font-bold">TinyMCE Editor</h1>
              <div className="mb-5">
                <PostOnWordPress postData={editorValue} />
              </div>

              <div
                hidden={!isEditorLoading}
              >
                <p className="mb-10">Please Wait Content is almost ready...</p>
                <div
                  className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                  role="status"
                  aria-label="loading"
                >
                  <span className="sr-only">Loading...</span>
                </div>{' '}
              </div>

              <div hidden={isEditorLoading}>
                <Editor
                  apiKey={EDITOR_API_KEY}
                  // init={{
                  //   plugins:
                  //     'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
                  //   toolbar:
                  //     'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                  //   tinycomments_mode: 'embedded',
                  //   tinycomments_author: 'Author name',
                  //   mergetags_list: [
                  //     {value: 'First.Name', title: 'First Name'},
                  //     {value: 'Email', title: 'Email'},
                  //   ],
                  //   ai_request: (request, respondWith) =>
                  //     respondWith.string(() =>
                  //       Promise.reject('See docs to implement AI Assistant')
                  //     ),
                  // }}

                  initialValue=""
                  value={editorValue}
                  onEditorChange={handleEditorChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
