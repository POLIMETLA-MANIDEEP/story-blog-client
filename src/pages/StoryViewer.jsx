import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { Card } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { CardDescription } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { CardTitle } from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';
import { Alert } from '@/components/ui/alert';
import { AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, AlertCircle, Calendar, User, BookOpen, Clock } from 'lucide-react';

const StoryViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStory = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/stories/${id}`);
        setStory(res.data);
      } catch (err) {
        setError('Failed to load the story');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
        <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Header Skeleton */}
          <div className="flex items-center justify-between mb-8">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-6 w-40" />
          </div>
          
          {/* Main Content Skeleton */}
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <Skeleton className="h-12 w-3/4 mb-4" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-5 w-32" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-64 w-full mt-8" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center">
        <div className="max-w-lg mx-auto p-6">
          <Card className="text-center shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="pt-12 pb-8">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="h-10 w-10 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Story Not Found</h2>
              <p className="text-lg text-red-700 mb-8">{error}</p>
              <div className="space-y-3">
                <Button 
                  onClick={() => navigate(-1)} 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go Back
                </Button>
                <Button 
                  onClick={() => navigate(-1)} 
                  variant="outline"
                  className="w-full"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Browse All Stories
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            onClick={() => navigate(-1)} 
            variant="ghost" 
            className="text-gray-600 hover:text-gray-900 hover:bg-white/60 backdrop-blur-sm transition-all px-6 py-3 rounded-xl shadow-sm border border-white/20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Stories
          </Button>
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm border border-white/20">
            <Calendar className="h-4 w-4" />
            <span className="font-medium">{formatDate(story.createdAt)}</span>
          </div>
        </div>

        {/* Main Story Card */}
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
          {/* Story Header */}
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-cyan-600 text-white pb-8">
            <div className="space-y-4">
              <CardTitle className="text-3xl md:text-4xl font-bold leading-tight">
                {story.title}
              </CardTitle>
              <CardDescription className="flex flex-wrap items-center gap-4 text-lg">
                <Badge 
                  variant="secondary" 
                  className="bg-white/20 text-white border-white/30 text-sm px-3 py-1 font-medium"
                >
                  {story.genre}
                </Badge>
                {story.uploadedBy?.name && (
                  <div className="flex items-center gap-2 text-indigo-100">
                    <User className="h-4 w-4" />
                    <span className="font-medium">by {story.uploadedBy.name}</span>
                  </div>
                )}
              </CardDescription>
            </div>
          </CardHeader>

          {/* Story Content */}
          <CardContent className="p-5 md:p-20">
            <div className="max-w-none text-gray-800 leading-relaxed text-lg">
              <style jsx>{`
                .story-content h1, .story-content h2, .story-content h3 {
                  color: #1f2937;
                  font-weight: 700;
                  margin-top: 2rem;
                  margin-bottom: 1rem;
                }
                .story-content p {
                  margin-bottom: 1.5em;
                  line-height: 1.8;
                  text-align: justify;
                }
                .story-content strong {
                  color: #374151;
                  font-weight: 600;
                }
                .story-content em {
                  color: #4b5563;
                }
                .story-content ul, .story-content ol {
                  margin: 1.5em 0;
                  padding-left: 2em;
                }
                .story-content li {
                  margin-bottom: 0.5em;
                  line-height: 1.7;
                }
              `}</style>
              <div 
                dangerouslySetInnerHTML={{ __html: story.content }}
                className="story-content"
              />
            </div>
          </CardContent>

          {/* Story Footer */}
          <div className="bg-gray-50 px-8 md:px-12 py-6 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Published on {formatDate(story.createdAt)}</span>
              </div>
              <div className="flex gap-3">
                <Button 
                  onClick={() => navigate(-1)}
                  variant="outline"
                  className="border-gray-300 hover:bg-gray-50"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button 
                  onClick={() => navigate(-1)}
                  className="bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  More Stories
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StoryViewer;