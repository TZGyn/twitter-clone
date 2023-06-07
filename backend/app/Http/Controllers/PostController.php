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
            ->where(column: 'sequence', operator: '>', value: $lastPost)
            ->take(10)
            ->get();

        return response([
            'status' => 200,
            'data' => $posts,
        ]);
    }
}
