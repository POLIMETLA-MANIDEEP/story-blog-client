import React, { useState } from 'react';
import axios from '../api/axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Lightbulb, Send, CheckCircle } from 'lucide-react';

const SuggestionBox = () => {
  const [idea, setIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!idea.trim()) {
      setError('Please write a suggestion before submitting');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await axios.post(
        '/suggestions',
        { idea },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess(true);
      setIdea('');
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit suggestion');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setIdea(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Lightbulb className="h-12 w-12 text-yellow-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Share Your Ideas</h1>
        <p className="text-gray-600">
          Have a story idea you'd love to see written? Share it with our community!
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Submit Story Idea
          </CardTitle>
          <CardDescription>
            Your suggestions help inspire new stories for our community to enjoy.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-800">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="border-green-200 bg-green-50">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Thank you for your suggestion! We'll review it soon.
                  </AlertDescription>
                </div>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="idea">Your Story Idea</Label>
              <Textarea
                id="idea"
                rows={6}
                className="resize-none"
                placeholder="What kind of story would you love to read? Be as detailed as you'd like - include genre, themes, characters, or plot ideas..."
                value={idea}
                onChange={handleChange}
                disabled={loading}
              />
              <p className="text-xs text-gray-500">
                {idea.length}/1000 characters
              </p>
            </div>

            <div className="flex gap-3">
              <Button 
                type="submit" 
                disabled={loading || !idea.trim()}
                className="flex-1"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Submit Idea
                  </>
                )}
              </Button>
              
              <Button 
                type="button" 
                variant="outline"
                onClick={() => {
                  setIdea('');
                  setError('');
                }}
                disabled={loading}
              >
                Clear
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">💡 Tips for Great Suggestions</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Be specific about the genre or theme you're interested in</li>
          <li>• Share what kind of characters or settings appeal to you</li>
          <li>• Mention any particular mood or message you'd like to see</li>
          <li>• Don't worry about plot details - even vague ideas are valuable!</li>
        </ul>
      </div>
    </div>
  );
};

export default SuggestionBox;