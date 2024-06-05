<?php

use Anthropic\Laravel\Facades\Anthropic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::post('/claude-van-damme', function (Request $request) {
    $imageData = $request['image'];
    $imageType = $imageData->getMimeType();

    $imageData = base64_encode($imageData->getContent());

    $result = Anthropic::messages()->create([
        'model' => 'claude-3-sonnet-20240229',
        'max_tokens' => 1024,
        'messages' => [
            [
                "role" => "user",
                "content" => [
                    [
                        "type" => "image",
                        "source" => [
                            "type" => "base64",
                            "media_type" => $imageType,
                            "data" => $imageData,
                        ],
                    ],
                    [
                        "type" => "text",
                        "text" => "Describe this image."
                    ]
                ],
            ],
        ],
    ]);
    return Inertia::render('Welcome', [
        'answer' => $result->content[0]->text
    ]);
});
