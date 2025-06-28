import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Upload, FileText, CheckCircle, Sparkles } from 'lucide-react';

const UploadStory = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [form, setForm] = useState({
    title: '',
    genre: '',
    description: '',
    content: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleEditorChange = (content) => {
    setForm(prev => ({ ...prev, content }));
    if (error) setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { title, genre, description, content } = form;

    if (!title.trim() || !genre.trim() || !description.trim() || !content.trim()) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await axios.post('/stories/upload', form, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setSuccess(true);
      setForm({ title: '', genre: '', description: '', content: '' });

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="max-w-md mx-auto p-6">
          <Card className="text-center shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="pt-12 pb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-2xl mb-4 text-gray-900">Story Published!</CardTitle>
              <CardDescription className="mb-6 text-lg text-gray-600">
                Your story has been successfully published and is now live for everyone to read.
              </CardDescription>
              <div className="flex items-center justify-center gap-2 text-emerald-600">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-sm font-medium">Redirecting to home...</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Upload className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Write a New Story
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Share your creativity and inspire others with your unique storytelling
          </p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5" />
              </div>
              Story Details
            </CardTitle>
            <CardDescription className="text-purple-100 text-lg">
              Fill in the details below to publish your masterpiece
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <Alert className="border-red-200 bg-red-50 shadow-sm">
                  <AlertDescription className="text-red-800 font-medium">{error}</AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label htmlFor="title" className="text-lg font-semibold text-gray-700">
                    Story Title
                  </Label>
                  <Input 
                    id="title" 
                    name="title" 
                    value={form.title} 
                    onChange={handleChange} 
                    required 
                    className="h-12 text-lg border-2 border-gray-200 focus:border-purple-500 transition-colors"
                    placeholder="Enter your story title..."
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="genre" className="text-lg font-semibold text-gray-700">
                    Genre
                  </Label>
                  <Input 
                    id="genre" 
                    name="genre" 
                    value={form.genre} 
                    onChange={handleChange} 
                    required 
                    className="h-12 text-lg border-2 border-gray-200 focus:border-purple-500 transition-colors"
                    placeholder="e.g., Fantasy, Romance, Mystery..."
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="description" className="text-lg font-semibold text-gray-700">
                  Short Description
                </Label>
                <Input
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  className="h-12 text-lg border-2 border-gray-200 focus:border-purple-500 transition-colors"
                  placeholder="Write a compelling summary of your story..."
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="content" className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  Full Story
                </Label>
                <div className="border-2 border-gray-200 rounded-lg overflow-hidden focus-within:border-purple-500 transition-colors">
                  <Editor
                    id="content"
                    apiKey={import.meta.env.VITE_TEXT_API_KEY}
                    value={form.content}
                    init={{
                      height: 500,
                      menubar: false,
                      plugins: [
                        'advlist autolink lists link charmap preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste help wordcount'
                      ],
                      toolbar:
                        'undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                      content_style: 'body { font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif; font-size:16px; line-height: 1.6; }'
                    }}
                    onEditorChange={handleEditorChange}
                  />
                </div>
              </div>

              <div className="pt-6">
                <Button 
                  type="submit" 
                  className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-200" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                      Publishing Your Story...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-3 h-5 w-5" />
                      Publish Story
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UploadStory;