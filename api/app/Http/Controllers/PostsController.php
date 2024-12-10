<?php

namespace App\Http\Controllers;

use App\Models\Posts;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
class PostsController extends Controller
{
    public function index()
    {
        $posts = Posts::all();
        return response()->json($posts);
    }

    public function show($id)
    {
        $post = Posts::find($id);
        if($post){
            return response()->json($post);
        }else{
            return response()->json([
                'message'=>'Post not found'
            ], 404);
        }
    }

    public function store(Request $request)
    {
        $data = [
            'id'=>Str::uuid(),
            'name'=> $request->name,
            'description'=> $request->description
        ];
        $post = Posts::create($data);
    
        return response()->json([
            $post,
            'message'=> 'Post added'
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $post = Posts::find($id);
        $post->name = $request->name;
        $post->description = $request->description;
        $post->save();
        return response()->json($post);
    }

    public function destroy($id)
    {
        $post = Posts::find($id);

        if (!$post) {
            return response()->json(['message' => 'Posts not found'], 404);
        }

        $post->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }
}
