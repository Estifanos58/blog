import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../store/store';
import { EditIcon, Trash2Icon } from 'lucide-react'; // Using consistent icon names

function PostCard({ item }) {
  const navigate = useNavigate();
  const { setSelectedPost, setUpdatePost } = useStore();

  const handleUpdate = () => {
    setUpdatePost(item);
    navigate('/post');
  };

  const handleDelete = () => {
    // Add your delete logic here (e.g., API call)
    console.log('Delete post with id:', item.id);
  };

  return (
    <div className="w-full sm:w-[48%] lg:w-[32%] max-w-[700px] border border-black rounded-md overflow-hidden shadow-md">
      {/* Top Banner */}
      <div className="bg-white px-4 py-2 border-b border-black">
        <span className="tracking-[4px] font-medium text-gray-800 text-sm">FEATURED POST</span>
      </div>

      {/* Image Section */}
      <div className="relative w-full h-[250px] bg-gray-100 flex items-center justify-center">
        <img
          src={item.image || '/placeholder.jpg'}
          alt={item.title}
          className="object-contain h-full"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <EditIcon onClick={handleUpdate} className="w-5 h-5 cursor-pointer text-black hover:text-blue-600" />
          <Trash2Icon onClick={handleDelete} className="w-5 h-5 cursor-pointer text-black hover:text-red-600" />
        </div>
      </div>

      {/* Content Section */}
      <Link to={`/post/${item.id}`} onClick={() => setSelectedPost(item)} className="bg-white px-4 py-3 block cursor-pointer hover:bg-gray-50 transition">
        {/* Metadata */}
        <p className="text-sm text-gray-500">
          Admin &middot; {new Date(item.createdAt).toLocaleDateString()} &middot; 2 min read
        </p>

        {/* Title */}
        <h2 className="mt-2 text-xl md:text-2xl font-semibold text-gray-900">{item.title}</h2>

        {/* Description */}
        <p className="mt-2 text-gray-700 text-base font-light">
          {item.description?.length > 90 ? item.description.substring(0, 90) + '...' : item.description}
        </p>
      </Link>
    </div>
  );
}

export default PostCard;
