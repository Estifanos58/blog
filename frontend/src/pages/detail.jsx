import React from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../store/store';
import { PortableText } from '@portabletext/react';

function Detail() {
  const { selectedPost } = useStore();
  const { id } = useParams();

  if (!selectedPost) {
    return <p className="text-center mt-10">Loading post...</p>;
  }

  const getParsedText = (content) => {
    if (!content) return [];
    return JSON.parse(selectedPost.content)
  }

  return (
    <div className="flex justify-center px-4 py-10">
      <div className="relative w-full max-w-5xl border border-black">
        {/* Featured Post Ribbon */}
        <div className="absolute -top-5 left-5 bg-white px-5 py-2 border border-black">
          <h2 className="uppercase tracking-[4px] text-2xl font-semibold">Featured Post</h2>
        </div>

        {/* Image */}
        <div className="w-full h-[300px] md:h-[400px] bg-gray-200 overflow-hidden">
          <img
            src={selectedPost.image || '/placeholder.jpg'}
            alt={selectedPost.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-6 bg-white">
          {/* Meta */}
          <p className="text-sm text-gray-600 mb-1">
            Posted &middot;{' '}
            {new Date(selectedPost.createdAt || Date.now()).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}{' '}
            &middot; 2 min read
          </p>

          {/* Title */}
          <h1 className="text-xl md:text-3xl font-bold mb-2">{selectedPost.title}</h1>

          {/* Description */}
          <p className="text-base text-gray-800 leading-relaxed">
            {selectedPost.description ||
              'Create a blog post subtitle that summarizes your post in a few short, punchy sentences and entices your audience to continue reading....'}
          </p>

          {/* PortableText */}
          <p className='text-sm text-gray-950'>{selectedPost.content}</p>
        </div>
      </div>
    </div>
  );
}

export default Detail;
