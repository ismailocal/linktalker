<?php

/**
 * Created by PhpStorm.
 * User: ismailocal
 * Date: 29.09.2017
 * Time: 21:57
 */

namespace Model;

class Post extends \Illuminate\Database\Eloquent\Model {

    protected $table = 'post';
    protected $guarded = [];

    public function user() {
        return $this->belongsTo(\Model\User::class);
    }

}
