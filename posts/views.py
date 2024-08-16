from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views import View
from posts.models import Post
from .forms import PostForm

class IndexView(View):
  def get(self, request, *args, **kwargs):
    posts =  Post.objects.all().all().order_by('-created_at')
    form = PostForm()
    return render(request, 'posts/index.html', {'posts': posts, 'form': form})
  
  def post(self, request, *args, **kwargs):
    form = PostForm(request.POST)
    if form.is_valid():
      post = form.save()
      return JsonResponse({
        'content': post.content,
        'created_at': post.created_at
      })
    else :
      return JsonResponse({
            'errors': form.errors
        }, status=400)
# class CreateView(View):
#   def get(self, request, *args, **kwargs):
#     form = PostForm()
#     return render(request, 'posts/create.html', {'form': form})
    
#   def post(self, request, *args, **kwargs):
#     form = PostForm(request.POST)
#     if form.is_valid():
#       form.save()
#     return redirect('posts:index')
