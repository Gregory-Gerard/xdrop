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

    $otherTransfers = \App\Models\Transfer::all();

    do {
        $code = mt_rand(1000, 9999);
    } while ($otherTransfers->contains('code', $code));

    if ($request->has('files') && $request->file('files')) {
        foreach ($request->file('files') as $file) {
            $path = Storage::putFile('files', $file);

            $transfer = new \App\Models\Transfer();
            $transfer->type = 'file';
            $transfer->original_name = $file->getClientOriginalName();
            $transfer->content = $path;
            $transfer->code = $code;
            $transfer->size = $file->getSize();
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
})->middleware('throttle:5,1');

Route::get('/retrieve/{code}', function (string $code, \Illuminate\Http\Request $request) {
    $transfer = \App\Models\Transfer::where('code', $code)->orderBy('type', 'desc');

    if (!$transfer->exists()) abort(404);

    $transfer = $transfer->get();

    if ($request->ajax()) {
        return \App\Http\Resources\TransferResource::collection($transfer);
    }

    return view('retrieve')->with('transfer', $transfer);
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
