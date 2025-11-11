import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { listCategoryApi } from '../api/category';
import type { categoryData } from '../interfaces/category';

// Types
interface Article {
  _id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  like: any[];
  dislike: any[];
  block: any[];
}


// ==================== ArticleForm Component ====================
interface ArticleFormProps {
  initialData: Partial<Article> & { _id?: string };
  onSubmit: (data: FormData) => void;
  onCancel?: () => void;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [image, setImage] = useState<File | string>(initialData.image || '');
  const [tags, setTags] = useState<string[]>(initialData.tags || []);
  const [category, setCategory] = useState(initialData.category || '');
  const [tagInput, setTagInput] = useState('');
  const [imagePreview, setImagePreview] = useState<string>(initialData.image || '');

  const [categories,setCategories] = useState<categoryData[]>([])

  const fetchCategory = async () => {
        const categoryData = await listCategoryApi();
        if (categoryData.success) {
           setCategories(categoryData.data);
        } else {
           toast.error(categoryData.message);
        }
     };
  
     useEffect(() => {
        fetchCategory();
     }, []);

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setTagInput('');
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast.error('Title and Description are required');
      return;
    }

    const formData = new FormData();
    if (initialData._id) formData.append('_id', initialData._id);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('tags', JSON.stringify(tags));

    if (image instanceof File) {
      formData.append('image', image, image.name);
    } else if (typeof image === 'string' && image) {
      formData.append('imageUrl', image);
    }

    onSubmit(formData);
  };

  return (
    <div className="space-y-6">
      {/* Title Field */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Article Title <span className="text-red-500">*</span>
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
          placeholder="Enter an engaging title for your article"
        />
      </div>

      {/* Description Field */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all resize-none"
          placeholder="Write a compelling description..."
        />
        <div className="text-right text-xs text-gray-500 mt-1">
          {description.length} characters
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Featured Image
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-indigo-400 transition-all cursor-pointer bg-gray-50">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            {imagePreview ? (
              <div className="space-y-3">
                <img
                  src={imagePreview}
                  alt="preview"
                  className="max-h-48 mx-auto rounded-lg shadow-md"
                />
                <p className="text-sm text-indigo-600 font-semibold">
                  Click to change image
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-5xl">📸</div>
                <p className="text-gray-600 font-semibold">
                  Click to upload an image
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, or GIF (Max 5MB)
                </p>
              </div>
            )}
          </label>
        </div>
      </div>

      {/* Category Field */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Category
        </label>
        <select
          aria-label='select category'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all bg-white"
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Tags Field */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Tags
        </label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
            placeholder="Type a tag and press Add"
            className="flex-grow px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
          />
          <button
            type="button"
            onClick={addTag}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
          >
            Add
          </button>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-xl">
            {tags.map((tag) => (
              <span
                key={tag}
                onClick={() => removeTag(tag)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full cursor-pointer hover:from-indigo-200 hover:to-purple-200 transition-all group"
                title="Click to remove"
              >
                <span className="font-semibold">#{tag}</span>
                <span className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  ×
                </span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-4 border-t-2 border-gray-100">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
        )}
        <button
          type="button"
          onClick={handleSubmit}
          className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          {initialData._id ? '✓ Update Article' : '+ Create Article'}
        </button>
      </div>
    </div>
  );
};

export default ArticleForm
