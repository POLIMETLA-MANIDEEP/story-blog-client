import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, User } from 'lucide-react';

const Home = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/stories');
        setStories(res.data);
      } catch (err) {
        setError('Failed to fetch stories');
        console.error('Error fetching stories:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="h-80 shadow-lg">
                <CardHeader className="pb-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-3" />
                  <Skeleton className="h-4 w-full mb-3" />
                  <Skeleton className="h-4 w-2/3 mb-4" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="max-w-md mx-auto p-6">
          <Card className="border-red-200 bg-red-50 shadow-lg">
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-red-600" />
              </div>
              <p className="text-red-800 text-lg font-medium">{error}</p>
              <Button 
                onClick={() => window.location.reload()} 
                className="mt-4"
                variant="outline"
              >
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Story Collection
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing stories from our community of writers and storytellers
          </p>
        </div>

        {stories.length === 0 ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <Card className="text-center py-16 px-8 max-w-md mx-auto shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent>
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="h-10 w-10 text-gray-400" />
                </div>
                <CardTitle className="text-2xl mb-4 text-gray-900">No Stories Yet</CardTitle>
                <CardDescription className="text-lg text-gray-600 mb-6">
                  Be the first to share your story with the community!
                </CardDescription>
                <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Link to="/upload">Write Your Story</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story) => (
              <Card
                key={story._id}
                className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm shadow-lg overflow-hidden"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <CardTitle className="text-xl font-bold line-clamp-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                      {story.title}
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant="secondary" 
                      className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-0 font-medium"
                    >
                      {story.genre}
                    </Badge>
                    {story.uploadedBy?.name && (
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <User className="h-3 w-3" />
                        <span className="truncate">{story.uploadedBy.name}</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col space-y-4">
                  <CardDescription className="line-clamp-2 text-sm text-gray-600 font-medium">
                    <div dangerouslySetInnerHTML={{ __html: story.description }} />
                  </CardDescription>
                  <div className="text-gray-700 text-sm leading-relaxed prose max-w-none line-clamp-[8] flex-grow">
                    <div dangerouslySetInnerHTML={{ __html: story.content }} />
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <Button 
                      asChild 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-md group-hover:shadow-lg transition-all"
                    >
                      <Link to={`/story/${story._id}`} className="flex items-center justify-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Read Full Story
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;