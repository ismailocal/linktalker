<?php

/**
 * Created by PhpStorm.
 * User: ismailocal
 * Date: 29.09.2017
 * Time: 21:57
 */

namespace Model;

class User extends \Illuminate\Database\Eloquent\Model {

    protected $table = 'user';
    protected $hidden = ['password'];
    protected $guarded = [];
    protected $appends = array('avatar');

    public function getAvatarAttribute() {
        return 'https://tr.gravatar.com/avatar/' . md5($this->mail);
    }

}
