<?php

/**
 * Created by PhpStorm.
 * User: ismailocal
 * Date: 29.09.2017
 * Time: 21:57
 */

namespace Model;

class Pit extends \Illuminate\Database\Eloquent\Model {

    protected $table = 'pit';
    protected $guarded = [];

    public function posts() {
        return $this->hasMany(\Model\Post::class);
    }
    
    public function post() {
        return $this->hasOne(\Model\Post::class);
    }
    
    public function users() {
        return $this->belongsToMany(\Model\User::class, 'post', 'pit_id', 'user_id');
    }
    
    public function user() {
        return $this->belongsToMany(\Model\User::class, 'post', 'pit_id', 'user_id')->limit(1);
    }

}
