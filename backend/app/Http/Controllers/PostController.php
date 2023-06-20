<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
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

    public function userPosts(User $user, Request $request): Response
    {
        $request->validate(
            [
                'lastUserPost' => 'required|integer',
            ]
        );

        $lastUserPost = 0;

        if ($request->lastUserPost) {
            $lastUserPost = $request->lastUserPost;
        }

        $userPosts = $user->posts()
            ->getQuery()
            ->where(column: 'sequence', operator: '>', value: $lastUserPost)
            ->take(10)
            ->get();

        return response(
            [
                'status' => 200,
                'data' => $userPosts,
            ]
        );
    }
}
