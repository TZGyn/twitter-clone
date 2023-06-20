<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PostController extends Controller
{
    public function index(Request $request): Response
    {
        $request->validate(
            [
                'lastPost' => 'required|integer',
            ]
        );

        $lastPost = $request->lastPost;

        $posts = Post::query()
            ->where(column: 'sequence', operator: '>', value: $lastPost)
            ->take(10)
            ->get();

        return response(
            [
                'status' => 200,
                'data' => $posts,
            ]
        );
    }

    public function store(Request $request): Response
    {
        $request->validate(
            [
                'title' => 'required|string',
                'description' => 'required|string',
            ]
        );

        $user = $request->user();

        if (! ($user instanceof User)) {
            return response(
                [
                    'status' => 400,
                    'message' => 'Invalid user',
                ]
            );
        }

        $user->posts()->create(
            [
                'title' => $request->title,
                'description' => $request->description,
            ]
        );

        return response(
            [
                'status' => 200,
                'message' => 'Create Post Success!',
            ]
        );
    }

    public function show(string $id): Response
    {
        $post = Post::query()->find($id);

        return response(
            [
                'status' => 200,
                'data' => $post,
            ]
        );
    }
    }
}
