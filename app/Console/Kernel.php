<?php

namespace App\Console;

use App\Models\Transfer;
use Carbon\Carbon;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->call(function () {
            $dateToFlush = Carbon::now()->subMinutes(config('app.flush_transfers_after_n_minutes'));

            Transfer::where('type', 'message')->where('created_at', '<', $dateToFlush)->delete();

            $oldFiles = Transfer::where('type', 'file')->where('created_at', '<', $dateToFlush);
            \Storage::delete($oldFiles->get()->pluck('content')->all());
            $oldFiles->delete();
        })->everyMinute();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
