<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class DeleteUserController extends Controller
{
    public function destroy(Request $request): Response
    {
        if (! $request->user()) {
            return response(status: 419);
        }

        User::destroy($request->user()->id);

        return response()->noContent();
    }
}
