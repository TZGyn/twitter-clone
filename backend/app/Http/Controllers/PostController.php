<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PostController extends Controller
{
    public function index(Request $request): Response
    {
        $lastPost = 0;

        if ($request->lastPost) {
            $lastPost = $request->lastPost;
        }

        $posts = Post::query()
            // ->select([
            //     'title',
            //     'description',
        // ])
            ->where(column: 'sequence', operator: '>', value: $lastPost)
            ->take(10)
            ->get();

        return response([
            'status' => 200,
            'data' => $posts,
        ]);
    }

    public function store(Request $request): Response
    {
        $postId = Post::query()->max(column: 'sequence');

        $postId = ! $postId ? 1 : $postId + 1;

        Post::query()->create([
            'title' => "This is Post {$postId}",
            'description' => "post {$postId} description",
        ]);

        return response([
            'status' => 200,
            'message' => "Create Post {$postId} Success!",
        ]);
    }

    public function show(string $id): Response
    {
        $post = Post::query()->find($id);

        return response([
            'status' => 200,
            'data' => $post,
        ]);
    }
}
