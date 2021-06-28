<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('index');
});

Route::post('/upload', function (\Illuminate\Http\Request $request) {
    $request->validate([
        'files.*' => 'required_without:message|nullable|file',
        'message' => 'required_without:files|nullable|string',
    ], [
        'files.*.required_without' => "Fichier(s) ou message requis !",
        'message.required_without' => "Fichier(s) ou message requis !",
    ]);

    $code = mt_rand(1000, 9999);

    if ($request->has('files') && $request->file('files')) {
        foreach ($request->file('files') as $file) {
            $path = $file->store('files');

            $transfer = new \App\Models\Transfer();
            $transfer->type = 'file';
            $transfer->original_name = $file->getClientOriginalName();
            $transfer->content = $path;
            $transfer->code = $code;
            $transfer->saveOrFail();
        }

    }

    if ($request->has('message') && $request->input('message')) {
        $transfer = new \App\Models\Transfer();
        $transfer->type = 'message';
        $transfer->content = $request->input('message');
        $transfer->code = $code;
        $transfer->saveOrFail();
    }

    return response()->json(['message' => $code]);
});

Route::get('/retrieve/{code}', function (string $code) {
    $transfer = \App\Models\Transfer::where('code', $code)->orderBy('type', 'desc');

    if (!$transfer->exists()) abort(404);

    $transfer = $transfer->get();

    return \App\Http\Resources\TransferResource::collection($transfer);
})->middleware('throttle');

Route::get('/retrieve/{code}/download/{id}', function (string $code, int $id) {
    $file = \App\Models\Transfer::where('code', $code)->where('id', $id)->firstOrFail();

    return response()->redirectTo(
        Storage::temporaryUrl(
            $file->content,
            now()->addMinutes(5),
            [
                'ResponseContentType' => 'application/octet-stream',
                'ResponseContentDisposition' => "attachment; filename={$file->original_name}",
            ]
        )
    );
});
